# Externe Interrupts

## Was ist ein Interrupt?
<img style="float: right;width: 60%" src="/tutorial/MCU/Software/img/interrupt.png">

- Ein Interrupt ermöglicht es, während das Hauptprogramm läuft, durch einen Auslöser direkt in eine Funktion zu springen.
- Das Hauptprogramm wird dabei unterbrochen, und die spezifizierte Funktion wird ausgeführt.
- Beispiel: Not-Aus-Knopf.

<br>

## Polling vs. Interrupt

| Polling | Interrupt |
|---------|----------|
| Ständiges Abfragen eines Signals | Reagiert nur, wenn ein Ereignis eintritt |
| Ressourcenintensiv | Effizient |
| Verzögerungen möglich | Sofortige Reaktion |

## Verwendung von Interrupts in Arduino
### Hinweis: Variable(n) in der ISR sollten als `volatile` deklariert werden


### Interrupt setzen:

<p style="color: red;">Hinweis: Vor dem hinzufügen des Interrupts setze den PinMode!!!<p>

```cpp
attachInterrupt(digitalPinToInterrupt(pinA), funktionB, TRIGGER);
```
- `pinA` = Pin, der auf das Signal reagiert
- `funktionB` = Funktion, die beim Interrupt aufgerufen wird
- `FALLING` = Flanke, die den Interrupt auslöst

### Mögliche Trigger-Bedingungen:

<img style="float: right;width: 50%" src="/tutorial/MCU/Software/img/falling_rising_change.jpg">

- `FALLING` – fallende Flanke
- `RISING` – steigende Flanke
- `CHANGE` – jede Zustandsänderung

  <br>
  <br>
  <br>
  <br>

### Interrupt wieder entfernen:
```cpp
detachInterrupt(digitalPinToInterrupt(pinA));
```

## Interrupt-Prioritäten und NVIC


### Interrupt-Prioritäten
- Bei Mikrocontrollern mit mehreren Interrupts kann es notwendig sein, Prioritäten festzulegen.
- Die Priorität bestimmt, welcher Interrupt zuerst behandelt wird, wenn mehrere gleichzeitig auftreten.
- Eine niedrigere Zahl bedeutet eine höhere Priorität (z. B. Priorität 0 ist die höchste).

<img style="" src="/tutorial/MCU/Software/img/interrupt_prio.svg">


### NVIC (Nested Vectored Interrupt Controller)

<img style="float: right;width: 50%" src="/tutorial/MCU/Software/img/NVIC.png">


- Der NVIC ist eine Hardwarekomponente in ARM-basierten Mikrocontrollern, die Interrupts verwaltet.
- Er erlaubt:
  - Priorisierung von Interrupts
  - Verschachtelte Interrupts (Nested Interrupts)
  - Aktivierung und Deaktivierung einzelner Interrupts


## Codebeispiel für einen externen Interrupt

<div id="iframecontainer" style="position: relative; width: 100%; height: 50vh;">
  <iframe src="https://wokwi.com/projects/424714447051988993" id="not" style="filter: blur(5px); width: 100%; height: 100%; border: none;pointer-events: none"></iframe>

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