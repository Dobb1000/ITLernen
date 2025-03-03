let isContextMenuOpen = false;
const canvas = document.getElementById("umlCanvas");
const ctx = canvas.getContext("2d");
let classes = [];
let lines = [];
let selectedClass = null;
let startAssociationClass = null;
let isDragging = false;
let offsetX, offsetY;
const contextMenu = document.getElementById("contextMenu");

let tempInheritance = null; // Temporärer Pfeil für Vererbung

let tempAssociation = null;
function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
                
    /**
     * Your drawings need to be inside this function otherwise they will be reset when 
     * you resize the browser window and the canvas goes will be cleared.
     */
  }
  
  resizeCanvas();

function saveToFile() {
    const plantUML = exportToPlantUML();
    const blob = new Blob([plantUML], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);

    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
    a.download = `uml_diagram_${timestamp}.pmlu`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function loadFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;
        importFromPlantUML(content);
    };
    reader.readAsText(file);
}


function resizeCanvasIfNeeded(classObject) {
    let padding = 50; // Zusätzlicher Platz, den wir hinzufügen
    let newWidth = canvas.width;
    let newHeight = canvas.height;

    if (classObject.x + classObject.width + padding > canvas.width) {
        newWidth = classObject.x + classObject.width + padding;
    }
    if (classObject.y + classObject.height + padding > canvas.height) {
        newHeight = classObject.y + classObject.height + padding;
    }

    if (newWidth !== canvas.width || newHeight !== canvas.height) {
        canvas.width = newWidth;
        canvas.height = newHeight;
        drawCanvas();
    }
}

function loadPlantUMLFromFile() {
    let params = new URLSearchParams(document.location.search);
    let fileName = params.get("file");

    if (!fileName) {
        console.error("Keine Datei in der URL angegeben.");
        return;
    }

    fetch(`./../data//${fileName}.pmlu`)
        .then(response => response.text())
        .then(data => {
            importFromPlantUML(data); // Importiere den PlantUML-Code
        })
        .catch(error => console.error("Fehler beim Laden der Datei:", error));
}

// Beim Laden der Seite die Funktion ausführen
document.addEventListener("DOMContentLoaded", loadPlantUMLFromFile);
const fileInput = document.getElementById("associationFile");
fileInput.addEventListener("change", loadFromFile);



function addClass() {
    const newClass = {
        id: classes.length,
        name: "Class" + (classes.length + 1),
        x: 50 + (classes.length * 20) % 700,
        y: 50 + (classes.length * 20) % 400,
        attributes: [],
        methods: [],
        isAbstract: false,
        width: 100,  // Mindestbreite
        height: 50,   // Mindesthöhe
        error: false,
        abstracterror: false
    };
    classes.push(newClass);
    adjustClassSize(newClass);
    drawCanvas();

}


function clearCanvas() {
    classes = [];
    lines = [];
    drawCanvas();
    //document.getElementById("plantumlCode").value = "";

}

function drawCanvas(newlines) {
    adjustCanvasSize(); // Stelle sicher, dass das Canvas angepasst wird

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lines = newlines || lines;
    lines.forEach(line => {

        let { startX, startY, endX, endY } = getEdgePoints(line.start, line.end);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        
        ctx.strokeStyle = "black";
        if (line.error === true) {
            ctx.strokeStyle = "red";
        }
        ctx.lineWidth = 2;
        ctx.stroke();

        if (line.type === "inheritance") {
            // Pfeilspitze zeigt zur ersten Klasse (start)
            drawHollowWideArrowhead(ctx, startX, startY, endX, endY);
        } else {
            if (line.bidirectional) {
                drawArrowhead(ctx, startX, startY, endX, endY);
                drawArrowhead(ctx, endX, endY, startX, startY);
            } else {
                drawArrowhead(ctx, startX, startY, endX, endY);
            }
        }

        drawAssociationText(ctx, line, startX, startY, endX, endY);
    });

    function drawAssociationText(ctx, line, startX, startY, endX, endY) {
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";

        const angle = Math.atan2(endY - startY, endX - startX);
        const textOffset = 30;
        const textSpacing = 25;

        let textXStart = startX + textOffset * Math.cos(angle);
        let textYStart = startY + textOffset * Math.sin(angle);
        let textXEnd = endX - textOffset * Math.cos(angle);
        let textYEnd = endY - textOffset * Math.sin(angle);

        ctx.fillText(line.roleNameStart || "", textXStart, textYStart);
        ctx.fillText(line.multiplicityStart || "", textXStart, textYStart + textSpacing);

        ctx.fillText(line.roleNameEnd || "", textXEnd, textYEnd);
        ctx.fillText(line.multiplicityEnd || "", textXEnd, textYEnd + textSpacing);
    }



    classes.forEach(c => {
        adjustClassSize(c);

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(c.x, c.y, c.width, c.height);
        ctx.strokeStyle = "black";
        if (c.error === true) {
            ctx.strokeStyle = "red";
        }
        ctx.strokeRect(c.x, c.y, c.width, c.height);

        if (c.abstracterror === true) {
            ctx.fillStyle = "red";
        } else {
            ctx.fillStyle = "black";
        }
        
        ctx.fillText(c.isAbstract ? c.name + " {abstract}" : c.name, c.x + 10, c.y + 20);

        let offsetY = c.y + 30;
        ctx.beginPath();
        ctx.moveTo(c.x, offsetY);
        ctx.lineTo(c.x + c.width, offsetY);
        ctx.stroke();
        offsetY += 15;

        c.attributes.forEach(attr => {
            if (attr.trim().includes("§3")) {
                attr = attr.replace("§3", "")
                ctx.fillStyle = "red";
            } else {
                ctx.fillStyle = "black";
            }
            if (attr.trim().includes("{static}")) {
                attr = attr.replace("{static}", "")
                ctx.fillText(attr, c.x + 10, offsetY);
                //underline
                ctx.beginPath();
                ctx.moveTo(c.x + 10, offsetY + 2);
                ctx.lineTo(c.x + 10 + ctx.measureText(attr).width, offsetY + 2);
                ctx.stroke();
                offsetY += 2;


            } else {
                ctx.fillText(attr, c.x + 10, offsetY);

            }
            ctx.fillStyle = "black";



            offsetY += 15;
        });

        ctx.beginPath();
        ctx.moveTo(c.x, offsetY);
        ctx.lineTo(c.x + c.width, offsetY);
        ctx.stroke();
        offsetY += 15;
        ctx.fillStyle = "black";

        c.methods.forEach(method => {

            if (method.trim().includes("§3")) {
                method = method.replace("§3", "")
                ctx.fillStyle = "red";
            } else {
                ctx.fillStyle = "black";
            }
            if (method.trim().includes("{static}")) {
                method = method.replace("{static}", "")
                ctx.fillText(method, c.x + 10, offsetY);
                //underline
                ctx.beginPath();
                ctx.moveTo(c.x + 10, offsetY + 2);
                ctx.lineTo(c.x + 10 + ctx.measureText(method).width, offsetY + 2);
                ctx.stroke();
                offsetY += 2;
                ctx.fillStyle = "black";


            } else {
                ctx.fillText(method, c.x + 10, offsetY);

            }


            ctx.fillStyle = "black";


            offsetY += 15;
        });

    });
}


function drawTriangleArrowhead(ctx, fromX, fromY, toX, toY) {
    const headLength = 12; // Länge der Pfeilspitze
    const angle = Math.atan2(toY - fromY, toX - fromX); // Winkel berechnen

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6),
        toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6),
        toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke(); // Hohler Pfeil für Vererbung
}



function getEdgePoints(start, end) {

    const startCenterX = start.x + start.width / 2;
    const startCenterY = start.y + start.height / 2;
    const endCenterX = end.x + end.width / 2;
    const endCenterY = end.y + end.height / 2;

    const deltaX = endCenterX - startCenterX;
    const deltaY = endCenterY - startCenterY;
    const angle = Math.atan2(deltaY, deltaX);

    // Abstand um den Pfeil nicht zu überdecken (jetzt größer!)
    const arrowPadding = 20; // Abstand vergrößert, um den Strich VOR dem Pfeil zu stoppen

    // Startpunkt leicht außerhalb der Klasse
    const startX = startCenterX + (start.width / 2 + arrowPadding / 2) * Math.cos(angle);
    const startY = startCenterY + (start.height / 2 + arrowPadding / 2) * Math.sin(angle);

    // Endpunkt STOPPT JETZT VOR der Pfeilbasis
    const endX = endCenterX - (end.width / 2 + arrowPadding + 5) * Math.cos(angle);
    const endY = endCenterY - (end.height / 2 + arrowPadding + 5) * Math.sin(angle);

    return { startX, startY, endX, endY };
}


function getClassAtPosition(x, y) {
    // Alle Klassen filtern, die an dieser Position sind
    let overlappingClasses = classes.filter(c =>
        x >= c.x && x <= c.x + c.width &&
        y >= c.y && y <= c.y + c.height
    );

    // Falls mehrere übereinanderliegen → Die zuletzt erstellte (oberste) auswählen
    if (overlappingClasses.length > 0) {
        return overlappingClasses[overlappingClasses.length - 1]; // Letzte Klasse im Array = oberste
    }
    return null; // Falls keine Klasse dort ist
}




canvas.addEventListener("mousedown", (event) => {
    if (isContextMenuOpen) return; // Kein Dragging, wenn Kontextmenü offen

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    selectedClass = getClassAtPosition(x, y);

    if (event.button === 2) { // Rechtsklick -> Kontextmenü
        if (selectedClass) {
            event.preventDefault();
            contextMenu.style.left = `${event.clientX}px`;
            contextMenu.style.top = `${event.clientY}px`;
            contextMenu.style.display = "block";
        }
        return;
    }

    if (startInheritanceClass) {
        // ⛔ Verhindere Dragging, wenn eine Vererbung erstellt wird!
        event.stopPropagation();
        return;
    }

    if (startAssociationClass) {
        // Falls eine Assoziation aktiv ist, verbinde Klassen
        if (selectedClass && selectedClass !== startAssociationClass) {
            lines.push({ start: startAssociationClass, end: selectedClass, type: "association" });
            startAssociationClass = null;
            drawCanvas();
        }
    } else if (selectedClass) {
        // Falls KEINE Assoziation/Vererbung läuft: Beginne mit Dragging
        isDragging = true;
        offsetX = x - selectedClass.x;
        offsetY = y - selectedClass.y;
    }
});

function drawTempInheritance(event) {
    if (!tempInheritance) return;

    const rect = canvas.getBoundingClientRect();
    tempInheritance.startX = event.clientX - rect.left;
    tempInheritance.startY = event.clientY - rect.top;

    drawCanvas(); // Alles neu zeichnen
    drawDashedArrow(tempInheritance.startX, tempInheritance.startY,
                    tempInheritance.start.x + tempInheritance.start.width / 2,
                    tempInheritance.start.y + tempInheritance.start.height / 2);
}

function drawDashedArrow(fromX, fromY, toX, toY) {
    ctx.setLineDash([5, 5]); // Gestrichelte Linie
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]); // Linie zurücksetzen

    drawHollowTriangleArrowhead(ctx, fromX, fromY, toX, toY);
}

function drawHollowTriangleArrowhead(ctx, fromX, fromY, toX, toY) {
    const headLength = 12;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke(); // Nur umranden, nicht füllen
}

function drawHollowWideArrowhead(ctx, fromX, fromY, toX, toY) {
    const headLength = 12;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke(); // Nur umranden, nicht füllen
}


canvas.addEventListener("mousemove", (event) => {
    if (isDragging && selectedClass && !startInheritanceClass && !isContextMenuOpen) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY- rect.top;

        selectedClass.x = x - offsetX;
        selectedClass.y = y - offsetY;
        drawCanvas();
        autoScroll(event);
        resizeCanvasIfNeeded(selectedClass);


    }
});

document.getElementById("contextMenu").addEventListener("mousedown", (event) => {
    event.stopPropagation(); // Prevent the menu from eating clicks

});
document.addEventListener("contextmenu", (event) => {
    event.preventDefault(); // Verhindert das Standardmenü überall!
});

canvas.addEventListener("mousedown", (event) => {
    if (isContextMenuOpen) return; // Don't drag if menu is open

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left; // ✅ Use pageX instead of clientX
    const y = event.clientY - rect.top;  // ✅ Use pageY instead of clientY

    selectedClass = getClassAtPosition(x, y);

    if (startAssociationClass) {
        // If an association is in progress, create the line
        if (selectedClass && selectedClass !== startAssociationClass) {
            lines.push({ start: startAssociationClass, end: selectedClass, type: "association" });
            startAssociationClass = null;
            drawCanvas();
        }
        return;
    }

    if (selectedClass) {
        isDragging = true;
        offsetX = x - selectedClass.x;
        offsetY = y - selectedClass.y;
    }
});




canvas.addEventListener("mouseup", () => {
    isDragging = false;
});

let selectedAssociation = null;

let selectedInheritance = null;

canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    isContextMenuOpen = true;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left + window.scrollX; // Berücksichtige Scroll-Offset
    const y = event.clientY - rect.top + window.scrollY;  // Berücksichtige Scroll-Offset

    selectedClass = getClassAtPosition(x, y);
    selectedAssociation = getAssociationAtPosition(x, y);
    selectedInheritance = getInheritanceAtPosition(x, y);

    // Kontextmenü für Klassen anzeigen
    if (selectedClass) {
        document.getElementById("contextMenu").style.left = `${event.clientX + window.scrollX}px`;
        document.getElementById("contextMenu").style.top = `${event.clientY + window.scrollY}px`;
        document.getElementById("contextMenu").style.display = "block";
        document.getElementById("associationContextMenu").style.display = "none";
        document.getElementById("inheritanceContextMenu").style.display = "none";
        return;
    }

    // Kontextmenü für Assoziationen anzeigen
    if (selectedAssociation) {
        document.getElementById("associationContextMenu").style.left = `${event.clientX + window.scrollX}px`;
        document.getElementById("associationContextMenu").style.top = `${event.clientY + window.scrollY}px`;
        document.getElementById("associationContextMenu").style.display = "block";
        document.getElementById("contextMenu").style.display = "none";
        document.getElementById("inheritanceContextMenu").style.display = "none";
        return;
    }

    // Kontextmenü für Vererbungen anzeigen
    if (selectedInheritance) {
        document.getElementById("inheritanceContextMenu").style.left = `${event.clientX + window.scrollX}px`;
        document.getElementById("inheritanceContextMenu").style.top = `${event.clientY + window.scrollY}px`;
        document.getElementById("inheritanceContextMenu").style.display = "block";
        document.getElementById("contextMenu").style.display = "none";
        document.getElementById("associationContextMenu").style.display = "none";
        return;
    }

    // Wenn nichts getroffen wurde, verstecke alle Menüs
    document.getElementById("contextMenu").style.display = "none";
    document.getElementById("associationContextMenu").style.display = "none";
    document.getElementById("inheritanceContextMenu").style.display = "none";
    isContextMenuOpen = false;
});
function getInheritanceAtPosition(x, y) {
    return lines.find(line => {
        if (line.type !== "inheritance") return false;

        const { startX, startY, endX, endY } = getEdgePoints(line.start, line.end);

        const distance = Math.abs((endY - startY) * x - (endX - startX) * y + endX * startY - endY * startX) /
                         Math.sqrt((endY - startY) ** 2 + (endX - startX) ** 2);

        return distance < 10 && !getClassAtPosition(x, y);
    });
}

function getAssociationAtPosition(x, y) {
    return lines.find(line => {
        if (line.type !== "association") return false; // Nur Assoziationen berücksichtigen

        const { startX, startY, endX, endY } = getEdgePoints(line.start, line.end);

        const distance = Math.abs((endY - startY) * x - (endX - startX) * y + endX * startY - endY * startX) /
                         Math.sqrt((endY - startY) ** 2 + (endX - startX) ** 2);

        return distance < 10 && !getClassAtPosition(x, y);
    });
}



function editAssociation(event) {
    if (!selectedAssociation || selectedAssociation.type !== "association") return;

    document.getElementById("roleNameStart").value = selectedAssociation.roleNameStart || "";
    document.getElementById("multiplicityStart").value = selectedAssociation.multiplicityStart || "";
    document.getElementById("roleNameEnd").value = selectedAssociation.roleNameEnd || "";
    document.getElementById("multiplicityEnd").value = selectedAssociation.multiplicityEnd || "";
    document.getElementById("bidirectional").checked = selectedAssociation.bidirectional || false;

    const editor = document.getElementById("associationEditor");
    editor.style.left = `${event.clientX}px`;
    editor.style.top = `${event.clientY}px`;
    editor.style.display = "block";

    document.getElementById("associationContextMenu").style.display = "none";
}



function saveAssociationDetails() {
    if (!selectedAssociation) return;

    selectedAssociation.roleNameEnd = document.getElementById("roleNameEnd").value.trim() || "";
    selectedAssociation.multiplicityEnd = document.getElementById("multiplicityEnd").value.trim() || "";
    selectedAssociation.bidirectional = document.getElementById("bidirectional").checked;

    if (selectedAssociation.bidirectional) {
        selectedAssociation.roleNameStart = document.getElementById("roleNameStart").value.trim() || "";
        selectedAssociation.multiplicityStart = document.getElementById("multiplicityStart").value.trim() || "";
    } else {
        selectedAssociation.roleNameStart = "";
        selectedAssociation.multiplicityStart = "";
    }

    closeAssociationEditor();
    drawCanvas();
}



function closeAssociationEditor() {
    document.getElementById("associationEditor").style.display = "none";
    selectedAssociation = null;
}

function startAssociation() {
    if (!selectedClass) return;

    startAssociationClass = selectedClass;
    tempAssociation = { start: selectedClass, endX: selectedClass.x, endY: selectedClass.y };

    // 🛑 Disable dragging while drawing an association
    isDragging = false;

    // Listen for mouse movements to show the temporary association line
    canvas.addEventListener("mousemove", drawTempAssociation);
    canvas.addEventListener("mousedown", handleAssociationClick, { once: true });

    contextMenu.style.display = "none"; // Close context menu
}


function drawTempAssociation(event) {
    if (!tempAssociation) return;

    const rect = canvas.getBoundingClientRect();
    tempAssociation.endX = event.clientX - rect.left;
    tempAssociation.endY = event.clientY - rect.top;

    drawCanvas(); // Redraw everything
    drawArrow(tempAssociation.start.x + tempAssociation.start.width / 2,
              tempAssociation.start.y + tempAssociation.start.height / 2,
              tempAssociation.endX, tempAssociation.endY);
}

function drawArrow(fromX, fromY, toX, toY) {
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.stroke();

    drawArrowhead(ctx, fromX, fromY, toX, toY);
}


function handleAssociationClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.pageX - rect.left;
    const y = event.pageY - rect.top;
    const targetClass = getClassAtPosition(x, y);

    if (targetClass && targetClass !== startAssociationClass) {
        lines.push({ start: startAssociationClass, end: targetClass, type: "association" });
    }

    // ✅ Re-enable dragging after association is created
    isDragging = false;

    tempAssociation = null;
    startAssociationClass = null;
    canvas.removeEventListener("mousemove", drawTempAssociation);
    drawCanvas();
}


function drawArrowhead(ctx, fromX, fromY, toX, toY) {
    const headLength = 10; // Länge der Pfeilspitze
    const angle = Math.atan2(toY - fromY, toX - fromX); // Winkel der Linie

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6),
        toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6),
        toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.lineTo(toX, toY);
    ctx.fillStyle = "black";
    ctx.fill();
}


function getClosestClass(x, y, association) {
    const distStart = Math.hypot(association.start.x - x, association.start.y - y);
    const distEnd = Math.hypot(association.end.x - x, association.end.y - y);
    return distStart < distEnd ? association.start : association.end;
}



function openEditorFromMenu() {
    const rect = canvas.getBoundingClientRect();
    openEditor(selectedClass, event.clientX - rect.left, event.clientY - rect.top);
    contextMenu.style.display = "none";
}


function openEditor(cls, x, y) {
    if (!cls) return; // Falls keine Klasse ausgewählt wurde, nichts tun

    selectedClass = cls; // Speichert die aktuelle Klasse für spätere Bearbeitung

    // Füllt die Felder des Editors mit den Daten der Klasse
    document.getElementById("className").value = cls.name;
    document.getElementById("classAttributes").value = cls.attributes.join("\n");
    document.getElementById("classMethods").value = cls.methods.join("\n");
    document.getElementById("classAbstract").checked = cls.isAbstract;

    // Zeigt den Editor an der Mausposition an
    const editor = document.getElementById("classEditor");
    editor.style.left = x + "px";
    editor.style.top = y + "px";
    editor.style.display = "block"; // Sicherstellen, dass er sichtbar ist
}


function saveClassDetails() {
    if (selectedClass) {
        selectedClass.name = document.getElementById("className").value;
        selectedClass.attributes = document.getElementById("classAttributes").value.split("\n").filter(attr => attr.trim() !== "");
        selectedClass.methods = document.getElementById("classMethods").value.split("\n").filter(method => method.trim() !== "");
        selectedClass.isAbstract = document.getElementById("classAbstract").checked;

        adjustClassSize(selectedClass); // Größe aktualisieren
        closeEditor();
        drawCanvas();
    }
}

function formatString(input) {
    if (input.trim().endsWith("{static}")) {
        input = addSpaceIfNeeded(input);
        input = input.replace("{static}", "");
        let last = input.substring(1);
        let first = input[0];
        input = first + " {static}" + last;
    } else if (input.trim().endsWith("{abstract}")) {
        input = addSpaceIfNeeded(input);
        input = input.replace("{abstract}", "");
        let last = input.substring(1);
        let first = input[0];
        input = first + " {abstract}" + last;
    } else {
        input = addSpaceIfNeeded(input);
    }
    return input;
}

function addSpaceIfNeeded(str) {
    if (str.length > 1 && str[0] !== ' ' && str[1] !== ' ') {
        return str[0] + ' ' + str.slice(1);
    }
    return str;
}


function adjustClassSize(cls) {
    const ctx = canvas.getContext("2d");
    ctx.font = "16px Arial";

    let maxWidth = ctx.measureText(cls.name).width + 20;
    cls.attributes.forEach(attr => {
        maxWidth = Math.max(maxWidth, ctx.measureText(attr).width + 20);
    });
    cls.methods.forEach(method => {
        maxWidth = Math.max(maxWidth, ctx.measureText(method).width + 20);
    });
    if (cls.isAbstract) {
        maxWidth += ctx.measureText("{abstract}").width + 20;
    }

    // Mindestbreite setzen
    cls.width = Math.max(maxWidth, 100);

    // Höhe berechnen: zusätzliche 30px unterhalb der letzten Methode
    let lineHeight = 20;
    let totalLines = 1 + cls.attributes.length + cls.methods.length;
    cls.height = Math.max(50, totalLines * lineHeight + 30); // Erhöhe zusätzlichen Abstand nach unten
}

function closeEditor() {
    document.getElementById("classEditor").style.display = "none";
    selectedClass = null;
}



let startInheritanceClass = null; // Speichert die Klasse für Vererbung

function startInheritance() {
    if (!selectedClass) return; // Falls keine Klasse ausgewählt ist, abbrechen

    startInheritanceClass = selectedClass;
    tempInheritance = { start: selectedClass, endX: selectedClass.x, endY: selectedClass.y };

    // 🚫 Dragging deaktivieren!
    isDragging = false;

    // Mausbewegungen erfassen, um den Pfeil zum Cursor zu zeichnen
    canvas.addEventListener("mousemove", drawTempInheritance);
    canvas.addEventListener("mousedown", handleInheritanceClick, { once: true });

    contextMenu.style.display = "none"; // Kontextmenü schließen
}

function handleInheritanceClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const targetClass = getClassAtPosition(x, y);

    if (targetClass && targetClass !== startInheritanceClass) {
        // Zielklasse (Child) erbt von der Startklasse (Parent)
        lines.push({ start: targetClass, end: startInheritanceClass, type: "inheritance" });
    }

    tempInheritance = null;
    startInheritanceClass = null;
    canvas.removeEventListener("mousemove", drawTempInheritance);
    drawCanvas(); // Neu zeichnen, um den temporären Pfeil zu entfernen
}




document.addEventListener("click", (event) => {
    if (!event.target.closest("#contextMenu") &&
        !event.target.closest("#associationContextMenu") &&
        !event.target.closest("#inheritanceContextMenu")) {
        
        document.getElementById("contextMenu").style.display = "none";
        document.getElementById("associationContextMenu").style.display = "none";
        document.getElementById("inheritanceContextMenu").style.display = "none";
        isContextMenuOpen = false;
    }
});


const bidirectionalCheckbox = document.getElementById("bidirectional");
bidirectionalCheckbox.addEventListener("change", function () {
    const disableFields = !this.checked;
    document.getElementById("roleNameStart").disabled = disableFields;
    document.getElementById("multiplicityStart").disabled = disableFields;

    // Falls deaktiviert, leere die Werte
    if (disableFields) {
        document.getElementById("roleNameStart").value = "";
        document.getElementById("multiplicityStart").value = "";
    }
});



function deleteClass() {
    if (!selectedClass) return;

    // Entferne alle Verbindungen (Assoziationen und Vererbungen), die mit dieser Klasse verbunden sind
    lines = lines.filter(line => line.start !== selectedClass && line.end !== selectedClass);
    classes = classes.filter(cls => cls !== selectedClass);

    selectedClass = null;
    drawCanvas();

    document.getElementById("contextMenu").style.display = "none";
        document.getElementById("associationContextMenu").style.display = "none";
        document.getElementById("inheritanceContextMenu").style.display = "none";
        isContextMenuOpen = false;
}

function deleteAssociation() {
    if (!selectedAssociation) return;

    lines = lines.filter(line => line !== selectedAssociation);
    selectedAssociation = null;
    drawCanvas();

    document.getElementById("contextMenu").style.display = "none";
        document.getElementById("associationContextMenu").style.display = "none";
        document.getElementById("inheritanceContextMenu").style.display = "none";
        isContextMenuOpen = false;
}

function deleteInheritance() {
    if (!selectedInheritance) return;

    lines = lines.filter(line => line !== selectedInheritance);
    selectedInheritance = null;
    drawCanvas();

    document.getElementById("contextMenu").style.display = "none";
        document.getElementById("associationContextMenu").style.display = "none";
        document.getElementById("inheritanceContextMenu").style.display = "none";
        isContextMenuOpen = false;
}

function exportToPlantUML() {
    let plantUML = "@startuml\n";

    // Klassen exportieren
    classes.forEach(c => {
        let positionComment = ` // Position: (${c.x}, ${c.y})`;
        plantUML += (c.isAbstract ? "abstract class " : "class ") + c.name + positionComment + " {\n";
        plantUML += "≤attributes≥\n";
        c.attributes.forEach(attr => {
            plantUML += attr + "\n";
        });
        plantUML += "≤methods≥\n";

        c.methods.forEach(method => {
            plantUML += method + "\n";
        });

        plantUML += "}\n";
    });

    // Assoziationen und Vererbungen exportieren
    lines.forEach(line => {
        if (line.type === "inheritance") {
            plantUML += `${line.start.name} --|> ${line.end.name}\n`;
        } else {
            //
            // 

            let startLabel = (line.roleNameStart ? line.roleNameStart : "") + "¿" + (line.multiplicityStart ? line.multiplicityStart.replace(/"/g, "") : "");
            let endLabel = (line.roleNameEnd ? line.roleNameEnd : "") + "¿" + (line.multiplicityEnd ? line.multiplicityEnd.replace(/"/g, "") : "");
            
           
            startLabel = startLabel.trim() ? `"${startLabel.trim()}"` : `""`;
            endLabel = endLabel.trim() ? `"${endLabel.trim()}"` : `""`;
            let assocLabel = line.associationLabel ? ` : ${line.associationLabel}` : "";

            if (line.bidirectional) {
                plantUML += `${line.end.name} ${endLabel} <--> ${startLabel} ${line.start.name}${assocLabel}\n`;
            } else {
                plantUML += `${line.end.name} ${endLabel} <-- ${startLabel} ${line.start.name}${assocLabel}\n`;
            }
        }
    });

    plantUML += "@enduml";
    //document.getElementById("plantumlCode").value = plantUML;
    return plantUML;
}

function importFromPlantUML(plantUMLCode) {
    let lines = plantUMLCode.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('@'));
    let parsedClasses = {};
    let parsedAssociations = [];
    let parsedInheritances = [];
    
    let currentClass = null;
    let selectedtype = null;


    lines.forEach(line => {
      
        


        if (line.startsWith("class ") || line.startsWith("abstract class ")) {
            let positionMatch = line.match(/Position: \(([\d.]+), ([\d.]+)\)/);
            
            let x = positionMatch ? parseInt(positionMatch[1]) : Math.random() * 600 + 50;
            let y = positionMatch ? parseInt(positionMatch[2]) : Math.random() * 400 + 50;
            let isAbstract = line.startsWith("abstract class ");
            let className = line.replace(/abstract class |class /, "").split(" ")[0];
            parsedClasses[className] = {
                name: className,
                attributes: [],
                methods: [],
                isAbstract: isAbstract,
                x: x,
                y: y,
                width: 100,
                height: 50
            };
            currentClass = parsedClasses[className];
            return;
        } else if (line.startsWith("}") && currentClass) {
            currentClass = null;
            selectedtype = null;    
            return;
        } else if (currentClass && line.includes("≤attributes≥")  ) {
            selectedtype = "attributes";
            return;
        } else if (currentClass && line.includes("≤methods≥") ) {
            selectedtype = "methods";
            return;
        } else if (currentClass && selectedtype === "methods") {
            currentClass.methods.push(line);
            // jump next line in the loop
            return;
        } else if (currentClass && selectedtype === "attributes") {
            currentClass.attributes.push(line);
            return;
        }
    });
    
    lines.forEach(line => {
        if (line.includes(" --|> ")) {
            let [child, parent] = line.split(" --|> ").map(x => x.trim());
            if (parsedClasses[child] && parsedClasses[parent]) {
                parsedInheritances.push({ start: parsedClasses[child], end: parsedClasses[parent], type: "inheritance" });
            }
        } else if (line.includes(" <-- ") || line.includes(" <--> ")) {
            let bidirectional = line.includes(" <--> ");
            
            let parts = "";
            if (bidirectional) {
                parts = line.split(/<-->/)
            }else {
                parts = line.split(/<--|-->/);
            }
            
            let startName = parts[0].trim().split(" ")[0]
            let endName = parts[1].substring(1).split(" ")[parts[1].substring(1).split(" ").length - 1]
            

       


           // log rolname and multiplicity

            
            if (parsedClasses[startName] && parsedClasses[endName]) {

                parsedAssociations.push({
                    start: parsedClasses[endName],
                    end: parsedClasses[startName],
                    roleNameStart: parts[1].match(/"([^"]*)"/)[0].replace(/"/g, "").split("¿")[0],
                    multiplicityStart: parts[1].match(/"([^"]*)"/)[0].replace(/"/g, "").split("¿")[1],
                    roleNameEnd: parts[0].match(/"([^"]*)"/)[0].replace(/"/g, "").split("¿")[0],
                    multiplicityEnd: parts[0].match(/"([^"]*)"/)[0].replace(/"/g, "").split("¿")[1],
                    type: "association",
                    bidirectional: bidirectional
                });
            }
        }
    });
    
    classes = Object.values(parsedClasses);
    lines = [...parsedAssociations, ...parsedInheritances];
    drawCanvas(lines);
}

function submitPlantUML() {
    const input = document.getElementById("plantUMLInput").value;
    importFromPlantUML(input);
}

function parsePlantUML(plantUMLCode) {
    let lines = plantUMLCode.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('@'));
    let parsedClasses = {};
    let parsedAssociations = [];
    let parsedInheritances = [];
    
    let currentClass = null;
    let selectedtype = null;


    lines.forEach(line => {
      
        


        if (line.startsWith("class ") || line.startsWith("abstract class ")) {
            let positionMatch = line.match(/Position: \(([\d.]+), ([\d.]+)\)/);
            
            let x = positionMatch ? parseInt(positionMatch[1]) : Math.random() * 600 + 50;
            let y = positionMatch ? parseInt(positionMatch[2]) : Math.random() * 400 + 50;
            let isAbstract = line.startsWith("abstract class ");
            let className = line.replace(/abstract class |class /, "").split(" ")[0];
            parsedClasses[className] = {
                name: className,
                attributes: [],
                methods: [],
                isAbstract: isAbstract,
                x: x,
                y: y,
                width: 100,
                height: 50
            };
            currentClass = parsedClasses[className];
            return;
        } else if (line.startsWith("}") && currentClass) {
            currentClass = null;
            selectedtype = null;    
            return;
        } else if (currentClass && line.includes("≤attributes≥")  ) {
            selectedtype = "attributes";
            return;
        } else if (currentClass && line.includes("≤methods≥") ) {
            selectedtype = "methods";
            return;
        } else if (currentClass && selectedtype === "methods") {
            currentClass.methods.push(line);
            // jump next line in the loop
            return;
        } else if (currentClass && selectedtype === "attributes") {
            currentClass.attributes.push(line);
            return;
        }
    });
    
    lines.forEach(line => {
        if (line.includes(" --|> ")) {
            let [child, parent] = line.split(" --|> ").map(x => x.trim());
            if (parsedClasses[child] && parsedClasses[parent]) {
                parsedInheritances.push({ start: parsedClasses[child], end: parsedClasses[parent], type: "inheritance" });
            }
        } else if (line.includes(" <-- ") || line.includes(" <--> ")) {
            let bidirectional = line.includes(" <--> ");
            
            let parts = "";
            if (bidirectional) {
                parts = line.split(/<-->/)
            }else {
                parts = line.split(/<--|-->/);
            }
            
            let startName = parts[0].trim().split(" ")[0]
            let endName = parts[1].substring(1).split(" ")[parts[1].substring(1).split(" ").length - 1]
            

       


            
            if (parsedClasses[startName] && parsedClasses[endName]) {

                parsedAssociations.push({
                    start: parsedClasses[endName],
                    end: parsedClasses[startName],
                    roleNameStart: parts[1].match(/"([^"]*)"/)[0].replace(/"/g, "").split("¿")[0],
                    multiplicityStart: parts[1].match(/"([^"]*)"/)[0].replace(/"/g, "").split("¿")[1],
                    roleNameEnd: parts[0].match(/"([^"]*)"/)[0].replace(/"/g, "").split("¿")[0],
                    multiplicityEnd: parts[0].match(/"([^"]*)"/)[0].replace(/"/g, "").split("¿")[1],
                    type: "association",
                    bidirectional: bidirectional
                });
            }
        }
    });
    
    return { parsedClasses, parsedAssociations, parsedInheritances };
}




function comparePlantUML(solution, submission) {
    let solutionData = parsePlantUML(solution);
    let submissionData = parsePlantUML(submission);
    let errors = [];
    
    // Vergleich der Klassen
    Object.keys(solutionData.parsedClasses).forEach(className => {
        if (!submissionData.parsedClasses[className]) {
            errors.push(`Fehlende Klasse: ${className}`);
            solutionData.parsedClasses[className].error = true;
        } else {
            let expectedClass = solutionData.parsedClasses[className];
            let submittedClass = submissionData.parsedClasses[className];

            if (expectedClass.isAbstract !== submittedClass.isAbstract) {
                errors.push(`Klasse '${className}' sollte ${expectedClass.isAbstract ? "abstrakt" : "nicht abstrakt"} sein.`);
                expectedClass.abstracterror = `§3${expectedClass.isAbstract}`;
            }
            
            let missingAttributes = expectedClass.attributes.filter(attr => !submittedClass.attributes.includes(attr));
            missingAttributes.forEach(attr => {
                errors.push(`Fehlendes Attribut in '${className}': ${attr}`);
                expectedClass.attributes[expectedClass.attributes.indexOf(attr)] = `§3${attr}`;
            });

            let missingMethods = expectedClass.methods.filter(method => !submittedClass.methods.includes(method));
            missingMethods.forEach(method => {
                errors.push(`Fehlende Methode in '${className}': ${method}`);
                expectedClass.methods[expectedClass.methods.indexOf(method)] = `§3${method}`;
            });

            let extraAttributes = submittedClass.attributes.filter(attr => !expectedClass.attributes.includes(attr));
            extraAttributes.forEach(attr => errors.push(`Zusätzliches Attribut in '${className}': ${attr}`));
            
            let extraMethods = submittedClass.methods.filter(method => !expectedClass.methods.includes(method));
            extraMethods.forEach(method => errors.push(`Zusätzliche Methode in '${className}': ${method}`));

           
        }
    });
 
    // Vergleich der Vererbungen
    solutionData.parsedInheritances.forEach(inh => {
        if (!submissionData.parsedInheritances.find(sinh => sinh.end.name === inh.end.name && sinh.start.name === inh.start.name)) {
            errors.push(`Fehlende Vererbung: ${inh.end.name} erbt nicht von ${inh.start.name}`);
            inh.error = true;
        }
    });
    // Vergleich der Assoziationen
    solutionData.parsedAssociations.forEach(assoc => {
        if (!submissionData.parsedAssociations.some(sassoc =>
            sassoc.start.name === assoc.start.name &&
            sassoc.end.name === assoc.end.name &&
            sassoc.bidirectional === assoc.bidirectional &&
            sassoc.roleNameStart === assoc.roleNameStart &&
            sassoc.multiplicityStart === assoc.multiplicityStart &&
            sassoc.roleNameEnd === assoc.roleNameEnd &&
            sassoc.multiplicityEnd === assoc.multiplicityEnd
        )) {
            errors.push(`Fehlende oder falsche Assoziation: ${assoc.start.name} ${assoc.bidirectional ? "↔" : "→"} ${assoc.end.name} mit ${assoc.bidirectional ? "Bidirektionaler" : "Unidirektionaler"} Beziehung`);
            assoc.error = true;
        }
    });
    classes = Object.values(solutionData.parsedClasses);
    lines = [...solutionData.parsedAssociations, ...solutionData.parsedInheritances];


    
    
    drawCanvas(lines);

    if (errors.length == 0) {
        showAchievement('success', 'Du hast alles richtig gemacht!');
    } else {
       // alle feheler ausgeben
        errors.forEach(error => showAchievement('error', error));
    }

    return errors.length ? errors : confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}

const canvasContainer = document.getElementById("canvasContainer");

function adjustCanvasSize() {
    let maxX = 0;
    let maxY = 0;

    classes.forEach(cls => {
        maxX = Math.max(maxX, cls.x + cls.width + 100);
        maxY = Math.max(maxY, cls.y + cls.height + 100);
    });

    lines.forEach(line => {
        maxX = Math.max(maxX, line.start.x + line.start.width + 100, line.end.x + line.end.width + 100);
        maxY = Math.max(maxY, line.start.y + line.start.height + 100, line.end.y + line.end.height + 100);
    });

    canvas.width = Math.max(window.innerWidth, maxX);
    canvas.height = Math.max(window.innerHeight / 1.3, maxY);
}


canvas.addEventListener("mousemove", (event) => {
    if (isDragging && selectedClass && !isContextMenuOpen) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        selectedClass.x = x - offsetX;
        selectedClass.y = y - offsetY;
        drawCanvas();
    }
});



function autoScroll(event) {
    const edgeThreshold = 50; // Abstand zum Rand, ab dem gescrollt wird
    const scrollSpeed = 10;

    if (event.clientX < edgeThreshold) {
        canvasContainer.scrollLeft -= scrollSpeed;
    }
    if (event.clientX > window.innerWidth - edgeThreshold) {
        canvasContainer.scrollLeft += scrollSpeed;
    }
    if (event.clientY < edgeThreshold) {
        canvasContainer.scrollTop -= scrollSpeed;
    }
    if (event.clientY > window.innerHeight - edgeThreshold) {
        canvasContainer.scrollTop += scrollSpeed;
    }
}
function downloadCanvasAsPNG() {
    const canvas = document.getElementById("umlCanvas");
    const ctx = canvas.getContext("2d");

    // Berechne den sichtbaren Bereich
    let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;

    classes.forEach(cls => {
        minX = Math.min(minX, cls.x);
        minY = Math.min(minY, cls.y);
        maxX = Math.max(maxX, cls.x + cls.width);
        maxY = Math.max(maxY, cls.y + cls.height);
    });

    lines.forEach(line => {
        minX = Math.min(minX, line.start.x, line.end.x);
        minY = Math.min(minY, line.start.y, line.end.y);
        maxX = Math.max(maxX, line.start.x, line.end.x);
        maxY = Math.max(maxY, line.start.y, line.end.y);
    });

    // Sicherheitsabstand
    minX -= 20;
    minY -= 20;
    maxX += 20;
    maxY += 20;

    // Erstelle ein temporäres Canvas mit nur dem relevanten Bereich
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = maxX - minX;
    tempCanvas.height = maxY - minY;
    const tempCtx = tempCanvas.getContext("2d");

    // Kopiere den sichtbaren Bereich auf das neue Canvas
    tempCtx.drawImage(canvas, -minX, -minY);

    // Erstelle ein PNG und starte den Download
    const image = tempCanvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = image;
    a.download = "uml_diagram_visible.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
function downloadCanvasAsSVG() {
    const canvas = document.getElementById("umlCanvas");

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">`;

    // 🎨 **Klassen als Rechtecke mit Text, horizontalen Linien & Abstraktionsmarkierung**
    classes.forEach(cls => {
        let offsetY = cls.y + 30; // Start für Attribute & Methoden

        // 🔲 **Klassen-Container**
        svgContent += `<rect x="${cls.x}" y="${cls.y}" width="${cls.width}" height="${cls.height}" fill="white" stroke="black"/>`;

        // 🏷️ **Klassenname (mit Abstract-Kennzeichnung)**
        let classNameText = cls.isAbstract ? `<tspan font-style="italic">${cls.name}</tspan>` : cls.name;
        svgContent += `<text x="${cls.x + 10}" y="${cls.y + 20}" font-size="14" font-family="Arial">${classNameText}</text>`;

        // 🔹 **Erste Trennlinie nach dem Klassennamen**
        svgContent += `<line x1="${cls.x}" y1="${offsetY}" x2="${cls.x + cls.width}" y2="${offsetY}" stroke="black"/>`;
        offsetY += 15;

        // 📌 **Attribute**
        cls.attributes.forEach(attr => {
            svgContent += `<text x="${cls.x + 10}" y="${offsetY}" font-size="12" font-family="Arial">${attr}</text>`;
            offsetY += 15;
        });

        // 🔹 **Zweite Trennlinie nach den Attributen**
        svgContent += `<line x1="${cls.x}" y1="${offsetY}" x2="${cls.x + cls.width}" y2="${offsetY}" stroke="black"/>`;
        offsetY += 15;

        // 📌 **Methoden**
        cls.methods.forEach(method => {
            svgContent += `<text x="${cls.x + 10}" y="${offsetY}" font-size="12" font-family="Arial">${method}</text>`;
            offsetY += 15;
        });
    });

    // ➖ **Linien für Assoziationen & Vererbungen + Multiplizitäten & Rollennamen**
    lines.forEach(line => {
        const { startX, startY, endX, endY } = getEdgePoints(line.start, line.end);
        let lineStyle = line.type === "inheritance" ? `stroke-dasharray="5,5"` : "";

        // Linie zwischen den Klassen
        svgContent += `<line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="black" stroke-width="2" ${lineStyle}/>`;

        // 🔹 **Pfeilspitzen**
        if (line.type === "inheritance") {
            svgContent += drawSvgHollowArrowhead(startX, startY, endX, endY);
        } else {
            svgContent += drawSvgArrowhead(startX, startY, endX, endY);
            if (line.bidirectional) {
                svgContent += drawSvgArrowhead(endX, endY, startX, startY); // Zweite Pfeilspitze für bidirektionale Assoziation
            }
        }

        // 📌 **Multiplizitäten & Rollennamen (Näher an den Pfeilen!)**
        if (line.type === "association") {
            const angle = Math.atan2(endY - startY, endX - startX);
            const textOffset = 15; // Kleiner Abstand zur Linie
            const textSpacing = 12; // Abstand zwischen Rolle & Multiplizität

            let textXStart = startX + textOffset * Math.cos(angle);
            let textYStart = startY + textOffset * Math.sin(angle);
            let textXEnd = endX - textOffset * Math.cos(angle);
            let textYEnd = endY - textOffset * Math.sin(angle);

            // Startseite der Assoziation
            if (line.roleNameStart || line.multiplicityStart) {
                svgContent += `<text x="${textXStart}" y="${textYStart}" font-size="12" font-family="Arial" text-anchor="middle">${line.roleNameStart || ""}</text>`;
                svgContent += `<text x="${textXStart}" y="${textYStart + textSpacing}" font-size="12" font-family="Arial" text-anchor="middle">${line.multiplicityStart || ""}</text>`;
            }

            // Endseite der Assoziation
            if (line.roleNameEnd || line.multiplicityEnd) {
                svgContent += `<text x="${textXEnd}" y="${textYEnd}" font-size="12" font-family="Arial" text-anchor="middle">${line.roleNameEnd || ""}</text>`;
                svgContent += `<text x="${textXEnd}" y="${textYEnd + textSpacing}" font-size="12" font-family="Arial" text-anchor="middle">${line.multiplicityEnd || ""}</text>`;
            }
        }
    });

    svgContent += `</svg>`;

    // 🖼 **Download SVG-Datei**
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "uml_diagram.svg";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function drawSvgArrowhead(fromX, fromY, toX, toY) {
    const headLength = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    const arrowX1 = toX - headLength * Math.cos(angle - Math.PI / 6);
    const arrowY1 = toY - headLength * Math.sin(angle - Math.PI / 6);
    const arrowX2 = toX - headLength * Math.cos(angle + Math.PI / 6);
    const arrowY2 = toY - headLength * Math.sin(angle + Math.PI / 6);

    return `<polyline points="${toX},${toY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2} ${toX},${toY}" stroke="black" fill="black"/>`;
}

function drawSvgHollowArrowhead(fromX, fromY, toX, toY) {
    const headLength = 12;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    const arrowX1 = toX - headLength * Math.cos(angle - Math.PI / 6);
    const arrowY1 = toY - headLength * Math.sin(angle - Math.PI / 6);
    const arrowX2 = toX - headLength * Math.cos(angle + Math.PI / 6);
    const arrowY2 = toY - headLength * Math.sin(angle + Math.PI / 6);

    return `<polygon points="${toX},${toY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}" stroke="black" fill="white"/>`;
}



canvas.addEventListener("touchstart", (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    selectedClass = getClassAtPosition(x, y);

    if (selectedClass) {
        isDragging = true;
        offsetX = x - selectedClass.x;
        offsetY = y - selectedClass.y;
    }
});

canvas.addEventListener("touchmove", (event) => {
    if (isDragging && selectedClass) {
        event.preventDefault();
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        selectedClass.x = x - offsetX;
        selectedClass.y = y - offsetY;
        drawCanvas();
    }
});

canvas.addEventListener("touchend", () => {
    isDragging = false;
});

let touchTimeout;

let lastTapTime = 0;

canvas.addEventListener("touchstart", (event) => {
    const touch = event.touches[0] || event.changedTouches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    selectedClass = getClassAtPosition(x, y);
    selectedAssociation = getAssociationAtPosition(x, y);
    selectedInheritance = getInheritanceAtPosition(x, y);

    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    lastTapTime = currentTime;



    // Wenn innerhalb von 300ms erneut getippt wird → Kontextmenü öffnen
    if (tapLength < 300) {
        event.preventDefault();

        isContextMenuOpen = true;

        if (selectedClass) {
            document.getElementById("contextMenu").style.left = `${touch.clientX + window.scrollX}px`;
            document.getElementById("contextMenu").style.top = `${touch.clientY + window.scrollY}px`;
            document.getElementById("contextMenu").style.display = "block";
            document.getElementById("associationContextMenu").style.display = "none";
            document.getElementById("inheritanceContextMenu").style.display = "none";
            return;
        }

        // Kontextmenü für Assoziationen anzeigen
        if (selectedAssociation) {
            document.getElementById("associationContextMenu").style.left = `${touch.clientX + window.scrollX}px`;
            document.getElementById("associationContextMenu").style.top = `${touch.clientY + window.scrollY}px`;
            document.getElementById("associationContextMenu").style.display = "block";
            document.getElementById("contextMenu").style.display = "none";
            document.getElementById("inheritanceContextMenu").style.display = "none";
            return;
        }

        // Kontextmenü für Vererbungen anzeigen
        if (selectedInheritance) {
            document.getElementById("inheritanceContextMenu").style.left = `${touch.clientX + window.scrollX}px`;
            document.getElementById("inheritanceContextMenu").style.top = `${touch.clientY + window.scrollY}px`;
            document.getElementById("inheritanceContextMenu").style.display = "block";
            document.getElementById("contextMenu").style.display = "none";
            document.getElementById("associationContextMenu").style.display = "none";
            return;
        }


    } else {
        // Falls nur einmal getippt, Dragging aktivieren
        if (selectedClass) {
            isDragging = true;
            offsetX = x - selectedClass.x;
            offsetY = y - selectedClass.y;
        }
    }
    // Wenn nichts getroffen wurde, verstecke alle Menüs
    document.getElementById("contextMenu").style.display = "none";
    document.getElementById("associationContextMenu").style.display = "none";
    document.getElementById("inheritanceContextMenu").style.display = "none";
    isContextMenuOpen = false;
});


canvas.addEventListener("touchend", () => {
    clearTimeout(touchTimeout);
});

function showContextMenu(x, y) {

}
function closeContextMenu(event) {
    if (!event.target.closest("#contextMenu")) {
        contextMenu.style.display = "none";
        isContextMenuOpen = false;
        document.removeEventListener("touchstart", closeContextMenu);
    }
}

canvas.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    //if (isContextMenuOpen) return; // Kein Dragging, wenn Kontextmenü offen

    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    selectedClass = getClassAtPosition(x, y);




    if (startAssociationClass) {
        // Falls eine Assoziation aktiv ist, verbinde Klassen
        if (selectedClass && selectedClass !== startAssociationClass) {
            lines.push({ start: startAssociationClass, end: selectedClass, type: "association" });
            startAssociationClass = null;
            drawCanvas();
        }





    } // start ineritance
    if (startInheritanceClass !== null) {
        if (selectedClass && selectedClass !== startInheritanceClass) {
            // Hier: Kind erbt von Eltern (startInheritanceClass)
            lines.push({ start: selectedClass, end: startInheritanceClass, type: "inheritance" });
            console.log(lines)
            startInheritanceClass = null;
            drawCanvas();
        }



        return; // Keine weitere Verarbeitung, wenn Vererbungsmodus aktiv war
    }
});

function autoScroll(event) {
    const edgeThreshold = 50; // Abstand zum Rand
    const scrollSpeed = 10;

    const touch = event.touches ? event.touches[0] : event; // Unterstützt Touch und Maus

    if (touch.clientX < edgeThreshold) {
        canvasContainer.scrollLeft -= scrollSpeed;
    }
    if (touch.clientX > window.innerWidth - edgeThreshold) {
        canvasContainer.scrollLeft += scrollSpeed;
    }
    if (touch.clientY < edgeThreshold) {
        canvasContainer.scrollTop -= scrollSpeed;
    }
    if (touch.clientY > window.innerHeight - edgeThreshold) {
        canvasContainer.scrollTop += scrollSpeed;
    }
}

canvas.addEventListener("touchmove", autoScroll);


// Prüfen, ob der Parameter "solution" in der URL vorhanden ist
const urlParams = new URLSearchParams(window.location.search);
const solutionval = urlParams.get("solution");
let solutionContent = null;
if (solutionval) {
    // Button zur Toolbox hinzufügen
    const toolbox = document.getElementById("controls");
    const solutionButton = document.createElement("button");
    solutionButton.textContent = "🎯 Lösung anzeigen";
    solutionButton.addEventListener("click", () => {
        // Inhalt der angegebenen Datei holen und verarbeiten
       comparePlantUML(solutionContent, exportToPlantUML());
    });
    fetch(`./../data/${solutionval}.pmlu`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load solution file: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            solutionContent = data; // Wert in Variable speichern
            console.log("Solution content loaded:", solutionContent);
            // Hier: weitere Logik einfügen, zum Beispiel das Laden der Daten in das Canvas
        })
        .catch(error => {
            console.error("Error loading solution file:", error);
        });
    toolbox.appendChild(solutionButton);
}

function showAchievement(type, message) {
    const container = document.getElementById("achievementContainer");
    const achievement = document.createElement("div");
    achievement.className = "achievement";
    achievement.style.background = type === 'success' ? 'green' : 'red';
    achievement.innerHTML = type === 'success' ? `✅ ${message}` : `❌ ${message}`;

    container.appendChild(achievement);

    setTimeout(() => {
        achievement.style.opacity = "0";
        setTimeout(() => achievement.remove(), 1000);
    }, 4000);
}