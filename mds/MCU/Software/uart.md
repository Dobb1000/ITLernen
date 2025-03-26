# UART (Universal Asynchronous Receiver Transmitter)

## Grundlagen

<img style="width: 60%; float: right" src="/tutorial/MCU/Software/img/uart_simple.png">

Das UART-Protokoll ist ein einfaches, asynchrones serielles Kommunikationsprotokoll, das ohne separate Taktleitung arbeitet. Es verwendet lediglich zwei Leitungen:

- **TX (Transmitter)**: Sendet die Daten.
- **RX (Receiver)**: Empfängt die Daten.

## Datenübertragung
Jede Datenübertragung erfolgt in Form eines Datenrahmens. Dieser besteht typischerweise aus:

<img src="/tutorial/MCU/Software/img/uart_data.png">

<br>
<br>

- **Startbit (0)**: Kennzeichnet den Beginn der Übertragung.
- **5 bis 9 Datenbits**: Enthalten die eigentlichen Informationen.
- **Optionales Paritätsbit**: Dient zur Fehlererkennung.
- **Ein oder mehrere Stopbits (1)**: Signalisieren das Ende des Datenrahmens.

### Paritätsbit
Das **Paritätsbit** ist optional und dient zur Fehlererkennung bei der Übertragung. Es kann auf zwei Arten genutzt werden:

- **Gerade Parität (Even Parity)**: Das Paritätsbit wird so gesetzt, dass die Anzahl der gesetzten Bits (1er) im gesamten Datenpaket **gerade** ist.
- **Ungerade Parität (Odd Parity)**: Das Paritätsbit wird so gesetzt, dass die Anzahl der gesetzten Bits **ungerade** ist.

Beispiel:
- Daten: `1010001` (drei gesetzte Bits)
    - **Even Parity**: Das Paritätsbit wird auf `1` gesetzt (damit die Gesamtanzahl 4 beträgt, eine gerade Zahl).
    - **Odd Parity**: Das Paritätsbit bleibt `0` (damit die Gesamtanzahl 3 bleibt, eine ungerade Zahl).

Falls bei der Übertragung ein einzelner Bitfehler auftritt, kann das Paritätsbit eine Ungereimtheit erkennen und die fehlerhafte Übertragung anzeigen. Es ist jedoch nicht in der Lage, den Fehler zu korrigieren oder mehrere Fehler pro Datenpaket zu erkennen.

Da UART asynchron arbeitet, müssen Sender und Empfänger dieselbe **Baudrate** (Übertragungsgeschwindigkeit) verwenden, beispielsweise **9600 Baud**.

## Pinbelegung bei Mikrocontrollern
UART wird häufig über zwei dedizierte Pins realisiert.
## Beispielcode: UART-Kommunikation zwischen zwei Mikrocontrollern (Arduino)
```cpp
void setup() {
    Serial.begin(9600); // Setzt die Baudrate auf 9600
}

void loop() {
    Serial.println("Hallo, UART!"); // Sendet eine Nachricht
    delay(1000);
}
```

## SoftwareSerial – UART über beliebige GPIO-Pins
Falls die Hardware-UART-Pins bereits belegt sind, kann mit der **SoftwareSerial**-Bibliothek eine serielle Kommunikation über beliebige digitale Pins realisiert werden. Dies ist besonders nützlich für Mikrocontroller mit nur einer Hardware-UART-Schnittstelle.

### Beispielcode für SoftwareSerial
```cpp
#include <SoftwareSerial.h>

SoftwareSerial mySerial(10, 11); // RX an Pin 10, TX an Pin 11

void setup() {
    Serial.begin(9600); // Hardware-Serial zur Debug-Ausgabe
    mySerial.begin(9600); // SoftwareSerial mit Baudrate 9600
}

void loop() {
    mySerial.println("Hallo, SoftwareSerial!"); // Nachricht über SoftwareSerial senden
    delay(1000);
}
```

In diesem Beispiel werden die **Pins 10 und 11** als **RX und TX** für die SoftwareSerial-Kommunikation genutzt. Dies ermöglicht den Anschluss eines weiteren seriellen Geräts, ohne die Haupt-UART-Schnittstelle zu blockieren.

## Codebeispiel PWM


<div id="iframecontainer" style="position: relative; width: 100%; height: 50vh;">
  <iframe src="https://wokwi.com/projects/425153334321174529" id="not" style="filter: blur(5px); width: 100%; height: 100%; border: none;pointer-events: none"></iframe>

<button class="button" style="
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 10;
padding: 10px 20px;
font-size: 16px;
background: rgba(0, 0, 0, 0.7);
color: white;
border: none;
cursor: pointer;
border-radius: 5px;">
Drück mich für das Codebeispiel!
</button>


  <div class="error" style="position: absolute; bottom: 10px; left: 10px; color: red;"></div>
</div>