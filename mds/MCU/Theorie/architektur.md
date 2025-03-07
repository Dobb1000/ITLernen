
# Architektur

## Program Status Register (PSR)

<img style="float: right;width: 60%" src="/ITLernen/tutorial/MCU/Theorie/img/PSR.svg">

Das PSR enthält mehrere Flags, die den Zustand einer Rechenoperation widerspiegeln:
- **N (Negative)**: Setzt sich, wenn das Ergebnis negativ ist.
- **Z (Zero)**: Setzt sich, wenn das Ergebnis 0 ist.
- **C (Carry)**: Setzt sich, wenn ein Übertrag in ein neues Bit erfolgt.
- **V (Overflow)**: Setzt sich, wenn das Ergebnis den darstellbaren Wertebereich überschreitet.

## Program Counter (PC)

Der Program Counter (PC) ist ein Register in der CPU, das die Adresse der nächsten auszuführenden Instruktion speichert. Er spielt eine zentrale Rolle bei der sequentiellen Befehlsverarbeitung in einem Computer.
## Bus-System
<img style="float: right;width: 60%" src="/ITLernen/tutorial/MCU/Theorie/img/bussystem.png">

- **Datenbus**: Überträgt Daten zwischen Komponenten.
- **Steuerbus**: Überträgt Steuersignale (z. B. Lese-/Schreibbefehle).
- **Adressbus**: Überträgt Speicheradressen zur Festlegung von Lese-/Schreibvorgängen.

<a target="_blank" href="https://dev.inf-schule.de/content/12_rechner/4_johnny/johnny3/">Beispiel zum Bus-System im Johnny Simulator</a>

<br>
<br>
<br>
<br>
<br>

## Von-Neumann- vs. Harvard-Architektur
### **Von-Neumann-Architektur**
Die **Von-Neumann-Architektur** basiert auf einem gemeinsamen Speicher für Daten und Programme. Das bedeutet:
- Ein einziger Speicher hält sowohl Befehle als auch Daten.
- Befehle und Daten werden über denselben Bus übertragen (Von-Neumann-Flaschenhals).
- Der Prozessor verarbeitet Befehle sequenziell.

### **Harvard-Architektur**
Die **Harvard-Architektur** trennt Speicher und Busse für Daten und Programme:
- Es gibt separate Speicher für Befehle und Daten.
- Der Prozessor kann parallel auf beide Speicher zugreifen.

### **Vor-/Nachteile**

<img style="float: right;width: 60%" src="/ITLernen/tutorial/MCU/Theorie/img/Neumannvsharvard.svg">

**Von-Neumann-Architektur**:
- (+) Einfacherer Aufbau.
- (-) *Von-Neumann-Flaschenhals*: Gemeinsame Busleitung für Code und Daten begrenzt die Geschwindigkeit.

**Harvard-Architektur**:
- (+) Paralleler Zugriff auf Code und Daten.
- (-) Erhöhter Hardwareaufwand durch separate Speicher und Busse.

## RISC vs. CISC

Prozessoren können grundsätzlich in zwei Architekturtypen unterteilt werden:

- **RISC (Reduced Instruction Set Computing)**  
  → Prozessor mit reduziertem Befehlssatz, einfache und schnelle Befehle.

- **CISC (Complex Instruction Set Computing)**  
  → Prozessor mit komplexem Befehlssatz, der direkt mehr Funktionen in einem Befehl erledigen kann.


Hier ist dein Lernzettel zu **RISC & CISC – Architekturtypen von Prozessoren** mit einer Tabelle für Vor- und Nachteile:


### **Vergleich RISC vs. CISC**

| **Merkmal**      | **RISC** | **CISC** |
|-----------------|---------|---------|
| **Befehlssatz** | Wenige, einfache Befehle | Viele, komplexe Befehle |
| **Befehlslänge** | Meist gleich lang | Unterschiedlich |
| **Taktzyklen pro Befehl** | 1 | Mehrere |
| **Speicherzugriffe** | Load/Store-Prinzip | Direkter Speicherzugriff |
| **Codegröße** | Größer | Kleiner |
| **Hardware** | Einfacher, weniger Transistoren | Komplexer, mehr Transistoren |
| **Energieverbrauch** | Gering | Hoch |
| **Anwendungen** | Mobile Geräte (ARM, MIPS) | Desktop, Server (x86) |



### **Vor- und Nachteile**

| **Architektur** | **Vorteile** | **Nachteile** |
|----------------|-------------|--------------|
| **RISC** | Schnell, energieeffizient, einfache Hardware | Größere Programme, komplexe Compiler-Optimierung |
| **CISC** | Kürzere Programme, weniger Speicherverbrauch | Höherer Energieverbrauch, komplexe Hardware |


### **Fazit**
- **RISC** wird heute vor allem in energieeffizienten und mobilen Geräten (Smartphones, Tablets) eingesetzt, z. B. **ARM-Prozessoren**.
- **CISC** ist in klassischen Desktop-PCs und Servern verbreitet, insbesondere durch die **x86-Architektur (Intel, AMD)**.
- Moderne Prozessoren kombinieren oft beide Prinzipien, z. B. durch **Mikrocode** in CISC-Prozessoren, der Befehle in einfachere interne Operationen zerlegt.



Möchtest du noch Ergänzungen oder Anpassungen? 😊


## Maschienenzyklus

Ein **Maschinenzyklus** bezeichnet die grundlegenden Schritte, die eine CPU bei der Verarbeitung eines Befehls durchführt. Er besteht aus vier Hauptphasen:
<br>
<br>
<img style="width: 60%; float: left; position: relative; left: 50%; transform: translateX(-50%);" src="/ITLernen/tutorial/MCU/Theorie/img/MaschienenZyklus.svg">
<br>
<br>
<br>
1. **Fetch (Holen)** – Die CPU ruft den nächsten Befehl aus dem Speicher (RAM) ab.

2. **Decode (Dekodieren)** – Der Befehl wird entschlüsselt, um festzustellen, welche Operation ausgeführt werden soll.

3. **Execute (Ausführen)** – Die CPU führt die Anweisung aus (z. B. eine Berechnung oder einen Speicherzugriff).


### **Pipelining**
Ermöglicht parallele Verarbeitung durch simultanes Laden, Dekodieren und Ausführen von Befehlen.
<br>
<br>
<img style="width: 60%; float: left; position: relative; left: 50%; transform: translateX(-50%);" src="/ITLernen/tutorial/MCU/Theorie/img/Pipelining.svg">
<br>
<br>
<br>
