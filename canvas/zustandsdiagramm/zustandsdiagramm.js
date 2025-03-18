let isContextMenuOpen = false;
const canvas = document.getElementById("umlCanvas");
const ctx = canvas.getContext("2d");
let states = [];
let transitions = [];
let selectedState = null;
let startTransitionState = null;
let isDragging = false;
let offsetX, offsetY;
const contextMenu = document.getElementById("contextMenu");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawCanvas();
}
resizeCanvas();

function addState() {
    const newState = {
        id: states.length,
        name: "State" + (states.length + 1),
        x: 50 + (states.length * 20) % 700,
        y: 50 + (states.length * 20) % 400,
        width: 120,
        height: 60
    };
    states.push(newState);
    drawCanvas();
}

function addStartState() {
    const startState = {
        id: "start",
        type: "start",
        x: 100,
        y: 100,
        width: 30,
        height: 30
    };
    states.push(startState);
    drawCanvas();
}

function addEndState() {
    const endState = {
        id: "end",
        type: "end",
        x: 300,
        y: 100,
        width: 30,
        height: 30
    };
    states.push(endState);
    drawCanvas();
}


function clearCanvas() {
    states = [];
    transitions = [];
    drawCanvas();
}


function drawArrow(ctx, startX, startY, endX, endY, label) {
    const headSize = 10;
    const angle = Math.atan2(endY - startY, endX - startX);

    // Zeichne die Linie
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    // Zeichne Pfeilspitze
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - headSize * Math.cos(angle - Math.PI / 6), endY - headSize * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(endX - headSize * Math.cos(angle + Math.PI / 6), endY - headSize * Math.sin(angle + Math.PI / 6));
    ctx.lineTo(endX, endY);
    ctx.fill();

    // Berechnung der Textposition (Mitte der Linie)
    const textX = (startX + endX) / 2;
    const textY = (startY + endY) / 2;

    // Setzt den Text parallel zur Linie
    ctx.save();
    ctx.translate(textX, textY);
    ctx.rotate(angle);
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, 0, -5);
    ctx.restore();
}


function getEdgePoints(start, end) {
    const startCenterX = start.x + start.width / 2;
    const startCenterY = start.y + start.height / 2;
    const endCenterX = end.x + end.width / 2;
    const endCenterY = end.y + end.height / 2;

    const deltaX = endCenterX - startCenterX;
    const deltaY = endCenterY - startCenterY;
    const angle = Math.atan2(deltaY, deltaX);

    // Berechne den Abstand zur Kante basierend auf der Richtung des Pfeils
    const startPadding = Math.max(start.width, start.height) / 2;
    const endPadding = Math.max(end.width, end.height) / 2;

    // Start- und Endpunkte mit Abstand zur Kante berechnen
    const startX = startCenterX + startPadding * Math.cos(angle);
    const startY = startCenterY + startPadding * Math.sin(angle);
    const endX = endCenterX - endPadding * Math.cos(angle);
    const endY = endCenterY - endPadding * Math.sin(angle);

    return { startX, startY, endX, endY };
}



canvas.addEventListener("mousedown", (event) => {
    if (isContextMenuOpen) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    selectedState = states.find(s => {
        if (s.type === "start" || s.type === "end") {
            // **Hitbox als Kreis um die Mitte**
            const dx = x - s.x; // Abstand zur Mitte X
            const dy = y - s.y; // Abstand zur Mitte Y
            return Math.sqrt(dx * dx + dy * dy) <= s.width / 2; // Prüft, ob innerhalb des Kreises
        } else {
            // Normale rechteckige Hitbox für andere Zustände
            return x >= s.x && x <= s.x + s.width && y >= s.y && y <= s.y + s.height;
        }
    });

    if (selectedState) {
        isDragging = true;

        // **Mitte als Referenzpunkt für Start- und Endzustände**
        offsetX = x - selectedState.x;
        offsetY = y - selectedState.y;
    }
});




canvas.addEventListener("mousemove", (event) => {
    if (isDragging && selectedState) {
        const rect = canvas.getBoundingClientRect();
        selectedState.x = event.clientX - rect.left - offsetX;
        selectedState.y = event.clientY - rect.top - offsetY;
        drawCanvas();
    }
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
});


canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    selectedState = states.find(s => x >= s.x && x <= s.x + s.width && y >= s.y && y <= s.y + s.height);
    selectedTransition = getTransitionAtPosition(x, y);

    if (selectedState) {
        showContextMenu(event, "contextMenu");
    } else if (selectedTransition) {
        showContextMenu(event, "transitionContextMenu");
    } else {
        closeContextMenus();
    }
});

// 🏷 **Funktion zum Öffnen eines Menüs an der Mausposition**
function showContextMenu(event, menuId) {
    let menu = document.getElementById(menuId);
    menu.style.left = `${event.clientX}px`;
    menu.style.top = `${event.clientY}px`;
    menu.style.display = "block";
    isContextMenuOpen = true;
}

// 🚀 **Funktion zum Schließen aller Menüs**
function closeContextMenus() {
    document.getElementById("contextMenu").style.display = "none";
    document.getElementById("transitionContextMenu").style.display = "none";
    isContextMenuOpen = false;
}

document.addEventListener("click", closeContextMenus);

function getTransitionAtPosition(x, y) {
    return transitions.find(transition => {
        const { startX, startY, endX, endY } = getEdgePoints(transition.start, transition.end);

        const distance = Math.abs((endY - startY) * x - (endX - startX) * y + endX * startY - endY * startX) /
            Math.sqrt((endY - startY) ** 2 + (endX - startX) ** 2);

        return distance < 10; // Toleranz für Klicktreffer auf der Linie
    });
}


function startTransition() {
    if (!selectedState) return;
    startTransitionState = selectedState;
    document.getElementById("contextMenu").style.display = "none";
    canvas.addEventListener("mousedown", handleTransitionClick, { once: true });
}

function handleTransitionClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const targetState = states.find(s => {
        if (s.type === "start" || s.type === "end") {
            const dx = x - s.x;
            const dy = y - s.y;
            return Math.sqrt(dx * dx + dy * dy) <= s.width / 2;
        } else {
            return x >= s.x && x <= s.x + s.width && y >= s.y && y <= s.y + s.height;
        }
    });

    if (targetState && targetState !== startTransitionState) {
        transitions.push({ start: startTransitionState, end: targetState, label: "" });
    }

    startTransitionState = null;
    drawCanvas();
}




function editTransition(event) {
    if (!selectedTransition) return;

    const newLabel = prompt("Neues Label für die Transition eingeben:", selectedTransition.label);
    if (newLabel !== null) {
        selectedTransition.label = newLabel;
        drawCanvas();
    }
    closeContextMenus();
}
function deleteTransition() {
    if (!selectedTransition) return;

    transitions = transitions.filter(transition => transition !== selectedTransition);
    selectedTransition = null;
    drawCanvas();
    closeContextMenus();
}


function openStateEditorFromMenu() {
    if (!selectedState) return;

    // Setzt die Felder basierend auf dem aktuellen Zustand
    document.getElementById("stateName").value = selectedState.name;
    document.getElementById("entryAction").value = selectedState.entry || "";
    document.getElementById("doAction").value = selectedState.do || "";
    document.getElementById("exitAction").value = selectedState.exit || "";

    // Positioniert den Editor an der Mausposition
    stateEditor.style.left = `${contextMenu.style.left}`;
    stateEditor.style.top = `${contextMenu.style.top}`;
    stateEditor.style.display = "block";

    // Versteckt das Kontextmenü
    contextMenu.style.display = "none";
    isContextMenuOpen = false;
}

// Speichern der Zustandsänderungen
function saveStateDetails() {
    if (!selectedState) return;

    selectedState.name = document.getElementById("stateName").value;
    selectedState.entry = document.getElementById("entryAction").value.trim();
    selectedState.do = document.getElementById("doAction").value.trim();
    selectedState.exit = document.getElementById("exitAction").value.trim();

    closeStateEditor();
    drawCanvas();
}

// Schließt den Editor
function closeStateEditor() {
    stateEditor.style.display = "none";
    selectedState = null;
}

// Kontextmenü für Zustände anpassen
document.getElementById("contextMenu").innerHTML = `
    <ul>
        <li onclick="startTransition()">Assoziation hinzufügen</li>
        <li onclick="openStateEditorFromMenu()">Bearbeiten</li>
        <li onclick="deleteState()">Löschen</li>
    </ul>
`;

// Zeichenfunktion aktualisieren, um die Aktionen anzuzeigen
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Zeichne alle Transitionen mit korrektem Abstand
    transitions.forEach(transition => {
        let { startX, startY, endX, endY } = getEdgePoints(transition.start, transition.end);
        drawArrow(ctx, startX, startY, endX, endY, transition.label);
    });

    // Zeichne alle Zustände
    states.forEach(state => {
        if (state.type === "start") {
            drawStartState(ctx, state.x, state.y, state.width);
        } else if (state.type === "end") {
            drawEndState(ctx, state.x, state.y, state.width);
        } else {
            adjustStateSize(state);
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(state.x, state.y, state.width, state.height, 20);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = "14px Arial";
            ctx.fillText(state.name, state.x + state.width / 2, state.y + 20);
        }
    });
}

// 🛠 **Hilfsfunktion zur dynamischen Größenanpassung eines Zustands**
function adjustStateSize(state) {
    ctx.font = "14px Arial";
    let maxWidth = ctx.measureText(state.name).width + 20;
    let totalHeight = 50; // Mindestens Platz für den Titel

    ["entry", "do", "exit"].forEach(key => {
        if (state[key] && state[key].trim()) {
            let lines = state[key].split("\n");
            lines.forEach(line => {
                maxWidth = Math.max(maxWidth, ctx.measureText(line).width + 70); // Platz für Einrückung
                totalHeight += 15; // Platz für jede Zeile
            });
        }
    });

    state.width = Math.max(maxWidth, 120); // Mindestbreite 120px
    state.height = Math.max(totalHeight, 60); // Mindesthöhe 60px
}


function drawStartState(ctx, x, y, size) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawEndState(ctx, x, y, size) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, size / 2 + 5, 0, Math.PI * 2);
    ctx.stroke();
}



// 🏷 **Hilfsfunktion für korrektes Zeichnen mit farbigem Label**
function renderMultiLabelText(ctx, label, content, labelX, textX, y) {
    let lines = content.split("\n").filter(line => line.trim());
    if (lines.length > 0) {
        for (let i = 0; i < lines.length; i++) {
            ctx.fillStyle = i === 0 ? "black" : "white"; // Erstes Label schwarz, danach weiß
            ctx.textAlign = "left"; // Links ausgerichtet
            ctx.fillText(label, labelX, y);

            ctx.fillStyle = "black"; // Text bleibt schwarz
            ctx.fillText(lines[i], textX, y);
            y += 15;
        }
    }
    return y;
}


