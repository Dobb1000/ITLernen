let canvas = document.getElementById("umlCanvas");
let ctx = canvas.getContext("2d");
let lifelines = [];
let messages = [];
let messagePairs = []; // Speichert Nachricht-Antwort-Zuordnungen
let selectedLifeline = null;
let tempMessage = null;
let isDragging = false;
let offsetX, offsetY;
let selfDelegations = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function addLifeline() {
    const newLifeline = {
        id: lifelines.length,
        name: "Objekt" + (lifelines.length + 1),
        x: 100 + (lifelines.length * 150),
        y: 50,
        width: 100,
        height: canvas.height - 100
    };
    lifelines.push(newLifeline);
    drawCanvas();
}

function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Lifelines zeichnen
    lifelines.forEach(l => {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(l.x, l.y, l.width, 30);
        ctx.strokeStyle = "black";
        ctx.strokeRect(l.x, l.y, l.width, 30);

        ctx.fillStyle = "black";
        ctx.fillText(l.name, l.x + 10, l.y + 20);

        let maxY = l.y + l.height;
        messages.forEach(msg => {
            if (msg.start === l || msg.end === l) {
                maxY = Math.max(maxY, msg.y + 20);
            }
        });

        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(l.x + l.width / 2, l.y + 30);
        ctx.lineTo(l.x + l.width / 2, maxY);
        ctx.stroke();
        ctx.setLineDash([]);
    });

    selfDelegations.forEach(drawSelfDelegation);

    // Nachrichten + Antworten mit Shift zeichnen
    messagePairs.forEach(pair => {
        let shift = drawActivationBar(ctx, pair.message.end, pair.message.y, pair.response.y, pair, false);

        // Nachricht zeichnen (Hauptnachricht)
        drawMessageWithShift(pair.message, shift, false);

        // Antwort zeichnen (gestrichelt)
        drawMessageWithShift(pair.response, shift, true);
    });

    ctx.setLineDash([]);

    if (tempMessage) {
        drawArrow(ctx, tempMessage.startX, tempMessage.startY, tempMessage.endX, tempMessage.endY);
    }
}

function drawArrowhead(fromX, fromY, toX, toY) {
    const headLength = 10; // Länge der Pfeilspitze
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.lineTo(toX, toY);
    ctx.fillStyle = "black";
    ctx.fill();
}

function drawSelfDelegation(msg) {
    const x = msg.lifeline.x + msg.lifeline.width / 2;
    const y = msg.y;
    const barWidth = 12;  // Aktivierungsbalken-Breite
    const loopOffset = 25; // Breite der Selbstaufruf-Schleife
    let loopHeight = 25; // Höhe der Schleife

    // 🟢 Aktivierungsbalken richtig verschieben
    let shift = drawActivationBar(ctx, msg.lifeline, y, y + loopHeight * 2 + 10, msg, true);

    const arrowSize = 5; // Pfeilspitzengröße

    // 🔹 Selbstaufruf-Schleife zeichnen ("/ / / <---")

    ctx.beginPath();
    ctx.moveTo(x + shift, y - 10);
    ctx.lineTo(x + loopOffset + shift, y - 10); // Nach rechts
    ctx.lineTo(x + loopOffset + shift, y); // Nach unten
    ctx.lineTo(x + shift + 7.5, y ); // Zurück zur Aktivierungsleiste
    ctx.stroke();

    // 🔹 Pfeilspitze für den Selbstaufruf
    ctx.beginPath();
    ctx.moveTo(x + 7.5, y);
    ctx.lineTo(x + 7.5 + shift + arrowSize, y - arrowSize);
    ctx.lineTo(x + 7.5 +  shift + arrowSize, y + arrowSize);
    ctx.closePath();
    ctx.stroke();

    // 🔹 Antwort-Schleife (gestrichelte Linie)
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(x + shift, y + loopHeight * 2 + 10);
    ctx.lineTo(x + loopOffset + shift, y + loopHeight * 2 + 10); // Nach rechts
    ctx.lineTo(x + loopOffset + shift, y + loopHeight * 2 + 20); // Nach unten
    ctx.lineTo(x + shift, y + loopHeight * 2 + 20); // Zurück zur Aktivierungsleiste
    ctx.stroke();

    // 🔹 Pfeilspitze für die Antwort
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x + shift, y + loopHeight * 2 + 20);
    ctx.lineTo(x + shift + arrowSize, y + loopHeight * 2 + 20 - arrowSize);
    ctx.lineTo(x + shift + arrowSize, y + loopHeight * 2 + 20 + arrowSize);
    ctx.closePath();
    ctx.stroke();



}


// 🔹 Hilfsfunktion: Zeichnet eine Nachricht oder Antwort mit Shift
function drawMessageWithShift(msg, shift, isResponse) {
    let startX = 0;
    let endX = 0;
    if (isResponse) {
        startX = msg.start.x + msg.start.width / 2 + shift;
        endX = msg.end.x + msg.end.width / 2;
    }
    else {
        startX = msg.start.x + msg.start.width / 2;
        endX = msg.end.x + msg.end.width / 2 + shift;

    }
    let messageY = msg.y;

    if (isResponse) {
        ctx.setLineDash([5, 5]); // Antwort als gestrichelte Linie
    } else {
        ctx.setLineDash([]); // Normale Linie
        if (startX < endX) endX -= 5;
        else endX += 5;
    }

    drawArrow(ctx, startX, messageY, endX, messageY);
    ctx.fillText(msg.text, (startX + endX) / 2, messageY - 5);
}




function drawArrow(ctx, fromX, fromY, toX, toY) {
    const headLength = 10; // Größe der Pfeilspitze
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    // Pfeilspitze zeichnen
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    ctx.lineTo(toX, toY);
    ctx.fillStyle = "black";
    ctx.fill();
}




function getLifelineAtPosition(x, y) {
    return lifelines.find(l =>
        // Klick auf den Kopfbereich der Lifeline (Rechteck)
        (x >= l.x && x <= l.x + l.width && y >= l.y && y <= l.y + 30) ||
        // Klick auf die gestrichelte Linie
        (x >= l.x + l.width / 2 - 5 && x <= l.x + l.width / 2 + 5 && y >= l.y + 30 && y <= l.y + l.height)
    );
}

function exportToPlantUML() {
    let plantUML = "@startuml\n";

    // Definiere Teilnehmer (Lifelines)
    lifelines.forEach(l => {
        plantUML += `participant \"${l.name}\"\n`;
    });

    // Sortiere Nachrichten nach ihrer Y-Position (zeitliche Reihenfolge)
    let sortedMessages = [...messages].sort((a, b) => a.y - b.y);

    // Nachrichten im korrekten zeitlichen Ablauf exportieren
    sortedMessages.forEach(msg => {
        let arrow = msg.type === "response" ? "-->" : "->"; // Gestrichelt für Antwort
        plantUML += `"${msg.start.name}" ${arrow} "${msg.end.name}" : ${msg.text}\n`;
    });

    plantUML += "@enduml";
    return plantUML;
}

function saveToFile() {
    const plantUML = exportToPlantUML();
    const blob = new Blob([plantUML], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "sequenzdiagramm.puml";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}






canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const minMessageY = 80; // Mindesthöhe für Nachrichten

    if (isSelfDelegationDragging && selectedSelfDelegation) {
        let newY = y - selfDelegationOffsetY;
        if (newY < minMessageY) newY = minMessageY;
        selectedSelfDelegation.y = newY;
        drawCanvas();
    }

    if (isMessageDragging && selectedMessage?.type === "message") {
        let newY = y - messageOffsetY;
        if (newY < minMessageY) newY = minMessageY;

        const relatedResponse = messagePairs.find(pair => pair.message === selectedMessage)?.response;
        if (relatedResponse && newY + 20 >= relatedResponse.y) {
            relatedResponse.y = newY + 20;
        }

        selectedMessage.y = newY;
        drawCanvas();
    }

    if (isMessageDragging && selectedMessage?.type === "response") {
        let newY = y - messageOffsetY;
        const relatedMessage = messagePairs.find(pair => pair.response === selectedMessage)?.message;
        if (relatedMessage) {
            if (newY <= relatedMessage.y + 10) newY = relatedMessage.y + 10;
        }

        selectedMessage.y = newY;
        drawCanvas();
    }

    if (isDragging && selectedLifeline) {
        selectedLifeline.x = x - offsetX;
        drawCanvas();
    }
});
canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    selectedLifeline = getLifelineAtPosition(x, y);

    if (selectedLifeline) {
        const contextMenu = document.getElementById("contextMenu");
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.top = `${event.clientY}px`;
        contextMenu.style.display = "block";
    }
});

document.addEventListener("click", (event) => {
    const contextMenu = document.getElementById("contextMenu");
    if (contextMenu.style.display === "block") {
        contextMenu.style.display = "none";
    }
});

let awaitingSecondClick = false;
let firstLifeline = null;



function updateTempMessage(event) {
    if (!awaitingSecondClick || !firstLifeline) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    tempMessage = {
        startX: firstLifeline.x + firstLifeline.width / 2,
        startY: mouseY,
        endX: mouseX,
        endY: mouseY
    };

    drawCanvas();
}


canvas.addEventListener("mouseup", () => {
    isDragging = false;
    isMessageDragging = false;
    isSelfDelegationDragging = false;
    selectedMessage = null;
    selectedSelfDelegation = null;
    drawCanvas();
});
let selectedMessage = null; // Die aktuell ausgewählte Nachricht/Antwort zum Verschieben
let messageOffsetY = 0; // Abstand zum Klickpunkt
let isMessageDragging = false; // Ob eine Nachricht oder Antwort verschoben wird


function getMessageAtPosition(x, y) {
    return messages.find(msg =>
        y >= msg.y - 10 && y <= msg.y + 10 && // Bereich um die Nachricht
        x >= Math.min(msg.start.x + msg.start.width / 2, msg.end.x + msg.end.width / 2) &&
        x <= Math.max(msg.start.x + msg.start.width / 2, msg.end.x + msg.end.width / 2)
    );
}

function getSelfDelegationAtPosition(x, y) {
    return selfDelegations.find(selfMsg => {
        let shift = drawActivationBar(ctx, selfMsg.lifeline, selfMsg.y, selfMsg.y + 50, selfMsg, true);
        let adjustedX = selfMsg.lifeline.x + selfMsg.lifeline.width / 2 + shift;

        return (
            x >= adjustedX - 15 &&
            x <= adjustedX + 15 &&
            y >= selfMsg.y - 15 &&
            y <= selfMsg.y + 40
        );
    });
}


function drawActivationBar(ctx, lifeline, startY, endY, msg, isSelfDelegation = false) {
    const barWidth = 12;
    const shiftAmount = 10; // Etwas größerer Schritt für bessere Sichtbarkeit
    let shift = 0;

    // 🔹 Prüfe, ob es eine Kollision mit einer bestehenden Aktivierungsleiste gibt
    const overlappingBars = messagePairs.filter(pair =>
        pair.message.end === lifeline &&
        !(pair.response.y < startY || pair.message.y > endY) // Prüfe Y-Überlappung
    );

    if (overlappingBars.length > 0) {
        // Bestimme die kleinste Differenz zwischen Nachrichten
        let minDiff = Infinity;
        let minDiffBar = null;
        overlappingBars.forEach(bar => {
            let diff = Math.abs(bar.message.y - bar.response.y);
            if (diff < minDiff) {
                minDiff = diff;
                minDiffBar = bar;
            }
        });

        if (minDiffBar === msg) {
            let fromX = minDiffBar.message.start.x;
            let toX = minDiffBar.message.end.x;

            // 🔹 Entscheide, ob der Balken nach links oder rechts verschoben wird
            shift = (fromX < toX) ? -shiftAmount : shiftAmount;
        }
    }

    // 🔹 Falls eine Selbstdelegation, prüfe Kollision mit anderen Selbstdelegationen ODER normalen Nachrichten
    if (isSelfDelegation) {
        const overlappingSelfDelegations = selfDelegations.filter(selfMsg =>
            selfMsg.lifeline === lifeline &&
            !(selfMsg.y + 50 < startY || selfMsg.y > endY) // Prüfe Y-Überlappung
        );

        const overlappingMessages = messagePairs.filter(pair =>
            pair.message.end === lifeline &&
            !(pair.response.y < startY || pair.message.y > endY) // Prüfe Y-Überlappung mit normalen Nachrichten
        );

        // 🔹 Berücksichtige sowohl Selbstdelegationen als auch normale Nachrichten für die Verschiebung
        shift += shiftAmount * (overlappingSelfDelegations.length + overlappingMessages.length);
    }

    // 🔹 Aktivierungsbalken zeichnen
    ctx.fillStyle = "white";
    ctx.fillRect(lifeline.x + lifeline.width / 2 - barWidth / 2 + shift, startY, barWidth, endY - startY);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(lifeline.x + lifeline.width / 2 - barWidth / 2 + shift, startY, barWidth, endY - startY);

    return shift;
}



function sendMessage() {
    if (!selectedLifeline) return;

    isDragging = false;
    firstLifeline = selectedLifeline;
    awaitingSecondClick = true;
    tempMessage = null;
    isResponse = false;

    canvas.addEventListener("mousemove", updateTempMessage);
}

function sendResponse() {
    if (!selectedLifeline) return;

    isDragging = false;
    firstLifeline = selectedLifeline;
    awaitingSecondClick = true;
    tempMessage = null;
    isResponse = true;

    canvas.addEventListener("mousemove", updateTempMessage);
}

let selectedSelfDelegation = null;
let selfDelegationOffsetY = 0;
let isSelfDelegationDragging = false;

canvas.addEventListener("mousedown", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const clickedLifeline = getLifelineAtPosition(x, y);
    const clickedMessage = getMessageAtPosition(x, y);
    const clickedSelfDelegation = getSelfDelegationAtPosition(x, y);

    if (clickedSelfDelegation) {
        selectedSelfDelegation = clickedSelfDelegation;
        isSelfDelegationDragging = true;
        selfDelegationOffsetY = y - selectedSelfDelegation.y;
        return; // Andere Interaktionen verhindern
    }

    if (clickedMessage) {
        selectedMessage = clickedMessage;
        isMessageDragging = true;
        messageOffsetY = y - clickedMessage.y;
        return;
    }

    if (awaitingSecondClick) {
        if (clickedLifeline) {
            const messageText = prompt("Gib den Nachrichtentext ein:");

            if (messageText) {
                const messageY = Math.max(y, 50);

                if (clickedLifeline === firstLifeline) {
                    // Selbstdelegation erstellen
                    const selfMessage = {
                        lifeline: clickedLifeline,
                        text: messageText,
                        y: messageY
                    };
                    selfDelegations.push(selfMessage);
                } else {
                    // Normale Nachricht
                    const message = {
                        start: firstLifeline,
                        end: clickedLifeline,
                        text: messageText,
                        y: messageY,
                        type: "message"
                    };

                    const response = {
                        start: clickedLifeline,
                        end: firstLifeline,
                        text: "Antwort zu: " + messageText,
                        y: messageY + 20,
                        type: "response"
                    };

                    messages.push(message, response);
                    messagePairs.push({ message, response });
                }

                drawCanvas();
            }

            awaitingSecondClick = false;
            firstLifeline = null;
            tempMessage = null;
            canvas.removeEventListener("mousemove", updateTempMessage);
            drawCanvas();
            return;
        }
    }

    if (clickedLifeline) {
        selectedLifeline = clickedLifeline;
        isDragging = true;
        offsetX = x - selectedLifeline.x;
    }
});