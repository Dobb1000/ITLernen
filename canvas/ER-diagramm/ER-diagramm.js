let isContextMenuOpen = false;
const canvas = document.getElementById("umlCanvas");
const ctx = canvas.getContext("2d");
let entityes = [];
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


function resizeCanvasIfNeeded(entityObject) {
    let padding = 50; // Zusätzlicher Platz, den wir hinzufügen
    let newWidth = canvas.width;
    let newHeight = canvas.height;

    if (entityObject.x + entityObject.width + padding > canvas.width) {
        newWidth = entityObject.x + entityObject.width + padding;
    }
    if (entityObject.y + entityObject.height + padding > canvas.height) {
        newHeight = entityObject.y + entityObject.height + padding;
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
        id: entityes.length,
        name: "Class" + (entityes.length + 1),
        x: 50 + (entityes.length * 20) % 700,
        y: 50 + (entityes.length * 20) % 400,
        attributes: [],
        methods: [],
        isAbstract: false,
        width: 200,  // Mindestbreite
        height: 50,   // Mindesthöhe
        error: false,
        abstracterror: false
    };
    entityes.push(newClass);
    adjustClassSize(newClass);
    drawCanvas();

}


function clearCanvas() {
    entityes = [];
    lines = [];
    drawCanvas();
    //document.getElementById("plantumlCode").value = "";

}
function startAddingAttribute() {
    if (!selectedClass) return;
    addAttributeToEntity(selectedClass);
    drawCanvas();
}
function getAttributeAtPosition(x, y) {
    return entityes.find(attr =>
        attr.isOval &&
        x >= attr.x - attr.width / 2 &&
        x <= attr.x + attr.width / 2 &&
        y >= attr.y - attr.height / 2 &&
        y <= attr.y + attr.height / 2
    );
}
function addAttributeToEntity(entity) {
    if (!entity) return;

    // Neues Attribut erstellen
    const newAttribute = {
        id: entityes.length + 1,
        name: "Attribut" + (entity.attributes.length + 1),
        x: entity.x + entity.width + 80, // Rechts neben der Entity
        y: entity.y + (entity.attributes.length * 50), // Unterhalb jedes Attributs
        width: 80,
        height: 40, // Ovale Höhe
        isOval: true, // Markiert es als Oval
        parentEntity: entity // Speichert die zugehörige Entity
    };

    entityes.push(newAttribute);
    lines.push({
        start: entity,
        end: newAttribute,
        type: "attribute"
    });
    drawCanvas();
}

function drawCanvas() {
    adjustCanvasSize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    function drawAssociationText(ctx, line, startX, startY, endX, endY) {
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";

        const textSpacing = 15; // Abstand zwischen Rolle und Multiplikation
        const textOffset = 10;  // Abstand von der Linie (verhindert Überlappung)

        let startEntity = line.start;
        let endEntity = line.end;

        let textXStart, textYStart, textXEnd, textYEnd;

        // Prüfen, ob die Verbindung horizontal oder vertikal ist
        const isHorizontal = Math.abs(endX - startX) > Math.abs(endY - startY);

        if (isHorizontal) {
            // *** Horizontale Verbindung (links ↔ rechts) ***
            if (startX < endX) {
                // Start ist LINKS, End ist RECHTS
                textXStart = startX + startEntity.width / 2 + textOffset;
                textYStart = startY;
                textXEnd = endX - endEntity.width / 2 - textOffset - 5;
                textYEnd = endY;
            } else {
                // Start ist RECHTS, End ist LINKS
                textXStart = startX - startEntity.width / 2 - textOffset;
                textYStart = startY;
                textXEnd = endX + endEntity.width / 2 + textOffset;
                textYEnd = endY;
            }
        } else {
            // *** Vertikale Verbindung (oben ↕ unten) ***
            if (startY < endY) {
                // Start ist OBEN, End ist UNTEN
                textXStart = startX - 5;
                textYStart = startY + startEntity.height / 2 + textOffset;
                textXEnd = endX + 5;
                textYEnd = endY - endEntity.height / 2 - textOffset;
            } else {
                // Start ist UNTEN, End ist OBEN
                textXStart = startX + 5;
                textYStart = startY - startEntity.height / 2 - textOffset;
                textXEnd = endX - 5;
                textYEnd = endY + endEntity.height / 2 + textOffset;
            }
        }

        // Zeichne die Rollennamen und Multiplikationen an die richtige Stelle
        ctx.textAlign = "center"; // Zentriert den Text an der Linie
        ctx.fillText(line.roleNameStart || "", textXStart, textYStart - textSpacing);
        ctx.fillText(line.multiplicityStart || "", textXStart, textYStart);

        ctx.fillText(line.roleNameEnd || "", textXEnd, textYEnd - textSpacing);
        ctx.fillText(line.multiplicityEnd || "", textXEnd, textYEnd);
    }

    // 1️⃣ **Zeichne alle Linien mit orthogonalen Verbindungen**
    lines.forEach(line => {
        let { startX, startY, endX, endY } = getEdgePoints(line.start, line.end);
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        let midX = (startX + endX) / 2;
        let midY = (startY + endY) / 2;
        if (line.type === "attribute") {
            // **Direkte Verbindung für Attribute**
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
        } else {
        if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
            // Horizontale Verbindung mit Knick
            ctx.moveTo(startX, startY);
            ctx.lineTo(midX, startY);
            ctx.lineTo(midX, endY);
            ctx.lineTo(endX, endY);
        } else {
            // Vertikale Verbindung mit Knick
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX, midY);
            ctx.lineTo(endX, midY);
            ctx.lineTo(endX, endY);
        }}
        ctx.stroke();
        drawAssociationText(ctx, line, startX, startY, endX, endY);

    });

    // 2️⃣ **Zeichne die UML-Klassen, Beziehungen und Attribute**
    entityes.forEach(c => {
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        if (c.isOval) {
            ctx.beginPath();
            ctx.ellipse(c.x, c.y, c.width / 2, c.height / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(c.name, c.x, c.y);
        } else if (c.isRelationship) {
            ctx.beginPath();
            ctx.moveTo(c.x, c.y - c.height / 2);
            ctx.lineTo(c.x + c.width / 2, c.y);
            ctx.lineTo(c.x, c.y + c.height / 2);
            ctx.lineTo(c.x - c.width / 2, c.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(c.name, c.x, c.y);
        } else {
            ctx.fillRect(c.x, c.y, c.width, c.height);
            ctx.strokeRect(c.x, c.y, c.width, c.height);
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(c.name, c.x + c.width / 2, c.y + 20);
        }
    });
}


function getEdgePoints(start, end) {

    if (end.isOval) {
        // **Direkte Verbindung von der Mitte der Klasse zur Mitte des Attributs**
        return {
            startX: start.x + start.width / 2,
            startY: start.y + start.height,
            endX: end.x,
            endY: end.y - end.height / 2
        };
    }
    let startX = start.x + start.width / 2;
    let startY = start.y + start.height / 2;
    let endX = end.x + end.width / 2;
    let endY = end.y + end.height / 2;

    let startEdge = { x: startX, y: startY };
    let endEdge = { x: endX, y: endY };

    if (start.isRelationship) {
        startEdge = getDiamondEdge(start, endX, endY);
    }
    if (end.isRelationship) {
        endEdge = getDiamondEdge(end, startX, startY);
    }

    return { startX: startEdge.x, startY: startEdge.y, endX: endEdge.x, endY: endEdge.y };
}


function getDiamondEdge(relationship, targetX, targetY) {
    const halfWidth = relationship.width / 2;
    const halfHeight = relationship.height / 2;
    const dx = targetX - relationship.x;
    const dy = targetY - relationship.y;
    const slope = Math.abs(dy / dx);

    if (slope > halfHeight / halfWidth) {
        return { x: relationship.x, y: dy > 0 ? relationship.y + halfHeight : relationship.y - halfHeight };
    } else {
        return { x: dx > 0 ? relationship.x + halfWidth : relationship.x - halfWidth, y: relationship.y };
    }
}

function getClassAtPosition(x, y) {
    return entityes.find(c => {
        if (c.isRelationship) {
            return (
                x >= c.x - c.width / 2 &&
                x <= c.x + c.width / 2 &&
                y >= c.y - c.height / 2 &&
                y <= c.y + c.height / 2
            );
        } else {
            return (
                x >= c.x &&
                x <= c.x + c.width &&
                y >= c.y &&
                y <= c.y + c.height
            );
        }
    });
}



canvas.addEventListener("mousedown", (event) => {
    if (isContextMenuOpen) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    selectedClass = getClassAtPosition(x, y);
    selectedAttribute = getAttributeAtPosition(x, y);

    if (selectedAttribute) {
        isDragging = true;
        offsetX = x - selectedAttribute.x;
        offsetY = y - selectedAttribute.y;
        return;
    }

    if (selectedClass) {
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

}





canvas.addEventListener("mousemove", (event) => {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (selectedAttribute) {
            selectedAttribute.x = x - offsetX;
            selectedAttribute.y = y - offsetY;
        } else if (selectedClass) {
            selectedClass.x = x - offsetX;
            selectedClass.y = y - offsetY;
        }

        drawCanvas();
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

let isattributcontentmenuopen = false;


canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    isContextMenuOpen = true;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left + window.scrollX; // Berücksichtige Scroll-Offset
    const y = event.clientY - rect.top + window.scrollY;  // Berücksichtige Scroll-Offset

    selectedClass = getClassAtPosition(x, y);
    selectedAssociation = getAssociationAtPosition(x, y);
    selectedInheritance = getInheritanceAtPosition(x, y);

    selectedAttribute = getAttributeAtPosition(x, y);

    if (selectedAttribute) {
        document.getElementById("attributeContextMenu").style.left = `${event.clientX}px`;
        document.getElementById("attributeContextMenu").style.top = `${event.clientY}px`;
        document.getElementById("attributeContextMenu").style.display = "block";

        document.getElementById("contextMenu").style.display = "none";
        document.getElementById("associationContextMenu").style.display = "none";
        document.getElementById("inheritanceContextMenu").style.display = "none";
        return;
    }

    document.getElementById("attributeContextMenu").style.display = "none";
    isattributcontentmenuopen = false;

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

function deleteAttribute() {
    if (!selectedAttribute) return;

    entityes = entityes.filter(attr => attr !== selectedAttribute);
    lines = lines.filter(line => line.end !== selectedAttribute);

    selectedAttribute = null;
    drawCanvas();

    document.getElementById("attributeContextMenu").style.display = "none";
    isContextMenuOpen = false;
}



function saveAttributeDetails() {
    if (!selectedAttribute) return;

    selectedAttribute.name = document.getElementById("attributeName").value.trim();
    closeAttributeEditor();
    drawCanvas();
}

function closeAttributeEditor() {
    document.getElementById("attributeEditor").style.display = "none";
    selectedAttribute = null;
}





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
        if (line.type !== "association") return false;

        let points = getOrthogonalPolyline(line.start, line.end);

        return isPointNearPolyline(x, y, points) && !getClassAtPosition(x, y);
    });
}

function getOrthogonalPolyline(start, end) {
    let { startX, startY, endX, endY } = getEdgePoints(start, end);

    let midX = (startX + endX) / 2;
    let midY = (startY + endY) / 2;

    if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
        return [
            { x: startX, y: startY },
            { x: midX, y: startY },
            { x: midX, y: endY },
            { x: endX, y: endY }
        ];
    } else {
        return [
            { x: startX, y: startY },
            { x: startX, y: midY },
            { x: endX, y: midY },
            { x: endX, y: endY }
        ];
    }
}


function isPointNearPolyline(px, py, points) {
    const threshold = 10; // Maximaler Abstand zum Erkennen des Klicks

    for (let i = 0; i < points.length - 1; i++) {
        let p1 = points[i];
        let p2 = points[i + 1];

        if (isPointNearLine(px, py, p1.x, p1.y, p2.x, p2.y, threshold)) {
            return true;
        }
    }
    return false;
}

function isPointNearLine(px, py, x1, y1, x2, y2, threshold) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let lenSq = dx * dx + dy * dy;

    if (lenSq === 0) return false;

    let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));

    let nearestX = x1 + t * dx;
    let nearestY = y1 + t * dy;

    let dist = Math.sqrt((px - nearestX) ** 2 + (py - nearestY) ** 2);
    return dist <= threshold;
}
function editAssociation(event) {
    if (!selectedAssociation || selectedAssociation.type !== "association") return;

    document.getElementById("multiplicityStart").value = selectedAssociation.multiplicityStart || "";
    document.getElementById("multiplicityEnd").value = selectedAssociation.multiplicityEnd || "";

    const editor = document.getElementById("associationEditor");
    editor.style.left = `${event.clientX}px`;
    editor.style.top = `${event.clientY}px`;
    editor.style.display = "block";

    document.getElementById("associationContextMenu").style.display = "none";
}



function saveAssociationDetails() {
    if (!selectedAssociation) return;

    selectedAssociation.multiplicityEnd = document.getElementById("multiplicityEnd").value.trim() || "";
    selectedAssociation.multiplicityStart = document.getElementById("multiplicityStart").value.trim() || "";

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



function openEditorFromMenu() {
    const rect = canvas.getBoundingClientRect();
    openEditor(selectedClass, event.clientX - rect.left, event.clientY - rect.top);
    contextMenu.style.display = "none";
}


function openEditor(cls, x, y) {
    if (!cls) return; // Falls keine Klasse ausgewählt wurde, nichts tun

    selectedClass = cls; // Speichert die aktuelle Klasse für spätere Bearbeitung

    // Füllt die Felder des Editors mit den Daten der Klasse
    document.getElementById("entityName").value = cls.name;
    document.getElementById("entityAttributes").value = cls.attributes.join("\n");
    document.getElementById("entityMethods").value = cls.methods.join("\n");
    document.getElementById("entityAbstract").checked = cls.isAbstract;

    // Zeigt den Editor an der Mausposition an
    const editor = document.getElementById("entityEditor");
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
        !event.target.closest("#inheritanceContextMenu") &&
        !event.target.closest("#attributeContextMenu")) {

        document.getElementById("contextMenu").style.display = "none";
        document.getElementById("associationContextMenu").style.display = "none";
        document.getElementById("inheritanceContextMenu").style.display = "none";
        document.getElementById("attributeContextMenu").style.display = "none";
        isContextMenuOpen = false;
    }
});




function deleteClass() {
    if (!selectedClass) return;

    // Entferne alle Verbindungen (Assoziationen und Vererbungen), die mit dieser Klasse verbunden sind
    lines = lines.filter(line => line.start !== selectedClass && line.end !== selectedClass);
    entityes = entityes.filter(cls => cls !== selectedClass);

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
    let plantUML = "@startuml\n\n";

    // 🔷 **Entitäten exportieren**
    entityes.forEach(entity => {
        if (entity.isOval || entity.isRelationship) return; // Attribute und Beziehungen überspringen

        // Position als Kommentar speichern
        plantUML += `// Position: (${entity.x}, ${entity.y})\n`;
        plantUML += `entity ${entity.name} {\n`;

        // Attribute innerhalb der Entität ausgeben
        lines.forEach(line => {
            if (line.type === "attribute" && line.start === entity) {
                plantUML += `  ${line.end.name}\n`;
            }
        });

        plantUML += "}\n\n";
    });

    // 🔷 **Relationships separat exportieren**
    entityes.forEach(entity => {
        if (!entity.isRelationship) return;

        plantUML += `// Position: (${entity.x}, ${entity.y})\n`;
        plantUML += `relationship ${entity.name} {\n`;
        plantUML += "}\n\n";
    });

    // 🔷 **Assoziationen und Vererbungen exportieren**
    lines.forEach(line => {
        if (line.type === "association") {

            plantUML += `${line.start.name} "${line.multiplicityStart}" -- "${line.multiplicityEnd}" ${line.end.name}\n`;
        }
    });

    plantUML += "\n@enduml";

    return plantUML;
}

function importFromPlantUML(plantUMLCode) {
    let linesArray = plantUMLCode.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('@'));

    let parsedEntities = {};
    let parsedAssociations = [];
    let currentEntity = null;
    let positions = {};

    linesArray.forEach(line => {
        // **Positionen auslesen**
        if (line.startsWith("// Position:")) {
            let positionMatch = line.match(/(\d+), (\d+)/);
            if (positionMatch) {
                positions.currentX = parseInt(positionMatch[1]);
                positions.currentY = parseInt(positionMatch[2]);
            }
            return;
        }

        // **Entities und Relationships erkennen**
        if (line.startsWith("entity ") || line.startsWith("relationship ")) {
            let parts = line.split(" ");
            let entityName = parts[1];

            let x = positions.currentX || Math.random() * 600 + 50;
            let y = positions.currentY || Math.random() * 400 + 50;

            let isRelationship = line.startsWith("relationship");

            parsedEntities[entityName] = {
                name: entityName,
                attributes: [],
                x: x,
                y: y,
                width: 100,
                height: 50,
                isRelationship: isRelationship
            };
            currentEntity = parsedEntities[entityName];
            return;
        }

        // **Schließen eines Blocks (})**
        if (line.startsWith("}")) {
            currentEntity = null;
            return;
        }

        // **Attribute für Entities speichern (NICHT für Relationships)**
        if (currentEntity && !currentEntity.isRelationship) {
            currentEntity.attributes.push(line);
            return;
        }

        // **Assoziationen (`--`) mit Multiplikationen importieren**
        if (line.includes(" -- ")) {
            let parts = line.split(" -- ").map(x => x.trim());

            let startEntityName = parts[0].split(" ")[0];
            let endEntityName = parts[1].split(" ")[parts[1].split(" ").length - 1];

            let startMultiplicityMatch = parts[0].match(/"([^"]*)"/);
            let endMultiplicityMatch = parts[1].match(/"([^"]*)"/);

            let startMultiplicity = startMultiplicityMatch ? startMultiplicityMatch[1] : "";
            let endMultiplicity = endMultiplicityMatch ? endMultiplicityMatch[1] : "";

            console.log(parts)
            console.log(parts[1])

            if (parsedEntities[startEntityName] && parsedEntities[endEntityName]) {
                parsedAssociations.push({
                    start: parsedEntities[startEntityName],
                    end: parsedEntities[endEntityName],
                    roleNameStart: "",
                    multiplicityStart: startMultiplicity || "",
                    roleNameEnd: "",
                    multiplicityEnd: endMultiplicity || "",
                    type: "association"
                });
            }
            return;
        }
    });

    // **Daten ins Canvas übertragen**
    entityes = Object.values(parsedEntities);
    lines = [...parsedAssociations];

    drawCanvas();
}
function parsePlantUML(plantUMLCode) {
    let linesArray = plantUMLCode.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('@'));

    let parsedEntities = {};
    let parsedAssociations = [];
    let currentEntity = null;
    let positions = {};

    linesArray.forEach(line => {
        // **Positionen auslesen**
        if (line.startsWith("// Position:")) {
            let positionMatch = line.match(/(\d+), (\d+)/);
            if (positionMatch) {
                positions.currentX = parseInt(positionMatch[1]);
                positions.currentY = parseInt(positionMatch[2]);
            }
            return;
        }

        // **Entities und Relationships erkennen**
        if (line.startsWith("entity ") || line.startsWith("relationship ")) {
            let parts = line.split(" ");
            let entityName = parts[1];

            let x = positions.currentX || Math.random() * 600 + 50;
            let y = positions.currentY || Math.random() * 400 + 50;

            let isRelationship = line.startsWith("relationship");

            parsedEntities[entityName] = {
                name: entityName,
                attributes: [],
                x: x,
                y: y,
                width: 100,
                height: 50,
                isRelationship: isRelationship
            };
            currentEntity = parsedEntities[entityName];
            return;
        }

        // **Schließen eines Blocks (})**
        if (line.startsWith("}")) {
            currentEntity = null;
            return;
        }

        // **Attribute für Entities speichern (NICHT für Relationships)**
        if (currentEntity && !currentEntity.isRelationship) {
            currentEntity.attributes.push(line);
            return;
        }

        // **Assoziationen (`--`) mit Multiplikationen importieren**
        if (line.includes(" -- ")) {
            let parts = line.split(" -- ").map(x => x.trim());

            let startEntityName = parts[0].split(" ")[0];
            let endEntityName = parts[1].split(" ")[parts[1].split(" ").length - 1];

            let startMultiplicityMatch = parts[0].match(/"([^"]*)"/);
            let endMultiplicityMatch = parts[1].match(/"([^"]*)"/);

            let startMultiplicity = startMultiplicityMatch ? startMultiplicityMatch[1] : "";
            let endMultiplicity = endMultiplicityMatch ? endMultiplicityMatch[1] : "";

            console.log(parts)
            console.log(parts[1])

            if (parsedEntities[startEntityName] && parsedEntities[endEntityName]) {
                parsedAssociations.push({
                    start: parsedEntities[startEntityName],
                    end: parsedEntities[endEntityName],
                    roleNameStart: "",
                    multiplicityStart: startMultiplicity || "",
                    roleNameEnd: "",
                    multiplicityEnd: endMultiplicity || "",
                    type: "association"
                });
            }
            return;
        }
    });


    return { parsedEntities, parsedAssociations };
}

function comparePlantUML(solution, submission) {
    let solutionData = parsePlantUML(solution);
    let submissionData = parsePlantUML(submission);
    let errors = [];

    // Vergleich der Entitäten & Beziehungen
    Object.keys(solutionData.parsedEntities).forEach(entityName => {
        if (!submissionData.parsedEntities[entityName]) {
            errors.push(`❌ Fehlende Entity oder Relationship: ${entityName}`);
            solutionData.parsedEntities[entityName].error = true;
        } else {
            let expectedEntity = solutionData.parsedEntities[entityName];
            let submittedEntity = submissionData.parsedEntities[entityName];

            // Position überprüfen
            if (expectedEntity.x !== submittedEntity.x || expectedEntity.y !== submittedEntity.y) {
                errors.push(`⚠️ Position von '${entityName}' ist falsch. Erwartet: (${expectedEntity.x}, ${expectedEntity.y})`);
            }

            // Attribute vergleichen
            let missingAttributes = expectedEntity.attributes.filter(attr => !submittedEntity.attributes.includes(attr));
            missingAttributes.forEach(attr => {
                errors.push(`❌ Fehlendes Attribut in '${entityName}': ${attr}`);
            });

            let extraAttributes = submittedEntity.attributes.filter(attr => !expectedEntity.attributes.includes(attr));
            extraAttributes.forEach(attr => {
                errors.push(`⚠️ Zusätzliche Attribut in '${entityName}': ${attr}`);
            });
        }
    });

    // Vergleich der Assoziationen
    solutionData.parsedAssociations.forEach(assoc => {
        if (!submissionData.parsedAssociations.some(sassoc =>
            sassoc.start.name === assoc.start.name &&
            sassoc.end.name === assoc.end.name &&
            sassoc.multiplicityStart === assoc.multiplicityStart &&
            sassoc.multiplicityEnd === assoc.multiplicityEnd
        )) {
            errors.push(`❌ Fehlende oder falsche Verbindung: ${assoc.start.name} "${assoc.multiplicityStart}" -- "${assoc.multiplicityEnd}" ${assoc.end.name}`);
        }
    });

    // **Ergebnis im Canvas anzeigen**
    entityes = Object.values(solutionData.parsedEntities);
    lines = [...solutionData.parsedAssociations];

    drawCanvas();

    // **Fehlermeldungen anzeigen**
    if (errors.length === 0) {
        showAchievement('success', '✅ Alle Elemente sind korrekt!');
    } else {
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

    entityes.forEach(cls => {
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



function downloadCanvasAsPNG() {
    const canvas = document.getElementById("umlCanvas");
    const ctx = canvas.getContext("2d");

    // Berechne den sichtbaren Bereich
    let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;

    entityes.forEach(cls => {
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
    entityes.forEach(cls => {
        let offsetY = cls.y + 30; // Start für Attribute & Methoden

        // 🔲 **Klassen-Container**
        svgContent += `<rect x="${cls.x}" y="${cls.y}" width="${cls.width}" height="${cls.height}" fill="white" stroke="black"/>`;

        // 🏷️ **Klassenname (mit Abstract-Kennzeichnung)**
        let entityNameText = cls.isAbstract ? `<tspan font-style="italic">${cls.name}</tspan>` : cls.name;
        svgContent += `<text x="${cls.x + 10}" y="${cls.y + 20}" font-size="14" font-family="Arial">${entityNameText}</text>`;

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
    achievement.entityName = "achievement";
    achievement.style.background = type === 'success' ? 'green' : 'red';
    achievement.innerHTML = type === 'success' ? `✅ ${message}` : `❌ ${message}`;

    container.appendChild(achievement);

    setTimeout(() => {
        achievement.style.opacity = "0";
        setTimeout(() => achievement.remove(), 1000);
    }, 4000);
}


function addRelationship() {
    const newRelationship = {
        id: entityes.length,
        name: "Beziehung" + (entityes.length + 1),
        x: 100 + (entityes.length * 30) % 700,
        y: 100 + (entityes.length * 30) % 400,
        width: 120, // Raute-Größe
        height: 60, // Raute-Größe
        isRelationship: true // Markiert als Raute
    };
    entityes.push(newRelationship);
    drawCanvas();
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

function editAttribute(event) {
    if (!selectedAttribute) return;

    const editor = document.getElementById("attributeEditor");
    document.getElementById("attributeName").value = selectedAttribute.name;

    editor.style.left = `${event.clientX}px`;
    editor.style.top = `${event.clientY}px`;
    editor.style.display = "block";

    // Kontextmenü ausblenden
    document.getElementById("attributeContextMenu").style.display = "none";
}


