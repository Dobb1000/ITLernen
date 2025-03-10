# Timer und Interrupts

## Prinzip

Ein Timer ist ein Zähler, der auf Basis eines Taktsignals arbeitet. Mithilfe eines Timers können zeitgesteuerte Aufgaben wie Signalverarbeitung oder periodische Ereignisse realisiert werden. Die Hauptkomponenten eines Timers sind der **Prescaler**, der **Counter** und das **Autoreloadregister (ARR)**.

<img style="" src="/ITLernen/tutorial/MCU/Software/img/Timer.svg">


## Funktionen der Komponenten

### 1. Prescaler

Der Prescaler teilt die Taktfrequenz, um die Zählgeschwindigkeit des Timers zu verringern. Dadurch können auch bei hohen Taktfrequenzen des Mikrocontrollers längere Zeiträume erfasst werden. Beispielsweise reduziert ein Prescaler von 32 eine Taktfrequenz von 32 MHz auf 1 MHz.

### 2. Counter

Der Zähler zählt die Takte, die nach der Prescaler-Division übrig bleiben. Sobald der Zähler den im ARR festgelegten Maximalwert erreicht, wird er zurückgesetzt (**Überlauf**) und kann ein Ereignis wie einen Interrupt auslösen.

### 3. Autoreloadregister (ARR)

Das ARR legt den Maximalwert des Zählers fest. Der Timer zählt von 0 bis zum ARR-Wert. Nach einem **Überlauf** wird der Zähler automatisch zurückgesetzt. Damit lässt sich die Dauer eines Timer-Zyklus bestimmen.

<img style="" src="/ITLernen/tutorial/MCU/Software/img/timer_aufbau.png">


## Wichtige Formeln

Die Dauer eines Timer-Zyklus lässt sich berechnen als:

$$D = T \times O$$

wobei:

- $D$ die Gesamtdauer ist,
- $T$ die Periode eines einzelnen Takts,
- $O$ die Anzahl der Overflows.

Die Periode $T$ des Timers ergibt sich aus:

$$T = \frac{1}{f}$$

Die Frequenz $f$ des Timers berechnet sich durch:

$$f = \frac{32 \ MHz}{\text{Prescaler}}$$

## Ablauf eines Timers

1. Der Systemtakt wird durch den Prescaler geteilt.
2. Der reduzierte Takt wird vom Counter gezählt.
3. Beim Erreichen des ARR-Wertes wird ein **Überlauf** ausgelöst.
4. Bei aktiviertem Interrupt wird die zugehörige ISR (Interrupt Service Routine) ausgeführt.

## Erstellen eines Timer-Objekts

Ein Timer-Objekt kann folgendermaßen erstellt werden:

Hier ist eine ausführlichere Erklärung im Markdown-Format mit detaillierterem Hintergrundwissen:

---
### **Erstellen eines Harwaretimer Objekts**

```cpp
static HardwareTimer meintimer = HardwareTimer(TIM3);
```
Ein **HardwareTimer**-Objekt namens `meintimer` wird erstellt. Dies repräsentiert **Timer 3 (TIM3)**.

---

### **Overflow & Prescaler Setzten**
```cpp
meintimer.setOverflow(50000);
```
Hier wird ein Overflow nach **50.000 Ticks** eingestellt.

<br>

```cpp
meintimer.setPrescaleFactor(32);
```
Der **Prescaler** teilt die 32-MHz-Taktfrequenz durch 32.  
Das bedeutet, dass der **effektive Timer-Takt** nun:
$$\frac{32.000.000 \text{ Hz}}{32} = 1.000.000 \text{ Hz} \quad (1 \text{ MHz})$$

beträgt.

Da der Timer jetzt mit **1 MHz** läuft, dauert **jeder Tick 1 µs**.

→ Ein Overflow bei `setOverflow(50000)` bedeutet also eine Dauer von: $50.000 \times 1 \text{ µs} = 50 \text{ ms}$


---

### **Overflow in Mikrosekunden-Format setzten**
```cpp
meintimer.setOverflow(1000, MICROSEC_FORMAT);
```
Hier wird der Overflow direkt auf **1000 Mikrosekunden (1 ms)** gesetzt.

Da der Mikrocontroller 32 MHz hat, wird der Prescaler automatisch so gewählt, dass **1 ms erreicht wird**.

Falls der Prescaler zuvor nicht gesetzt wäre, würde die Bibliothek einen geeigneten Wert automatisch berechnen.

---

### **Overflow in Hertz-Format setzten**
```cpp
meintimer.setOverflow(1000, HERTZ_FORMAT);
```
Diese Zeile setzt den Timer so, dass er mit einer **Frequenz von 1000 Hz (1 kHz)** überläuft.

Das bedeutet, dass der Timer **genau jede Millisekunde einen Overflow erzeugt**.  
Da der Timer nach `1 / 1000 = 0.001` Sekunden überläuft, ist dies äquivalent zu der vorherigen Einstellung mit `MICROSEC_FORMAT`.

Falls notwendig, wird der Prescaler hier ebenfalls automatisch eingestellt.

---

### **Interrupt-Funktion für den Timer**
```cpp
meintimer.attachInterrupt(timerFunktion);
```
Diese Zeile sorgt dafür, dass bei jedem Overflow ein Interrupt ausgelöst wird, der die Funktion `timerFunktion()` ausführt.

Das bedeutet, dass alle **1 Millisekunde** (bei den aktuellen Einstellungen) eine bestimmte Aktion im Interrupt-Handler `timerFunktion()` ausgeführt wird.

---

### **Starten des Timers**
```cpp
meintimer.resume();
```
Der Timer wird aktiviert und beginnt zu laufen.

### **Pausieren des Timers**
```cpp
meintimer.pause();
```
Der Timer wird pausiert.

---

## **Zusammenfassung der Timer-Einstellungen**
| Einstellung                          | Bedeutung |
|--------------------------------------|------------|
| `setPrescaleFactor(32)`              | Teilt die 32 MHz durch 32 → **1 MHz Timer-Takt** |
| `setOverflow(50000)`                 | Overflow nach **50.000 µs (50 ms)** |
| `setOverflow(1000, MICROSEC_FORMAT)` | Overflow nach **1000 µs (1 ms)** (Prescaler automatisch angepasst) |
| `setOverflow(1000, HERTZ_FORMAT)`    | Overflow bei **1000 Hz** (**1 ms Intervalle**) |
| `attachInterrupt(timerFunktion)`     | Interrupt wird bei jedem Overflow ausgelöst |
| `resume()`                           | Startet den Timer |
| `pause()`                            | Startet den Timer |

Mit dieser Konfiguration kann der Timer dazu verwendet werden, **exakt jede Millisekunde** einen Interrupt auszulösen.

---

Das sollte dir eine genauere Vorstellung davon geben, was die einzelnen Timer-Einstellungen bewirken und wie sie mit der **32-MHz-Taktfrequenz** des Mikrocontrollers zusammenhängen. 🚀

Das `MICROSEC_FORMAT` ermöglicht es, ohne Einstellen von Prescaler und Overflow direkt die Zeit einzustellen, nach der der Interrupt passieren soll.

Falls in der Aufgabenstellung explizit Overflow und Prescaler-Faktor gefragt sind, können diese wie folgt eingestellt werden:



## **Hinweise:**
- Variable(n) in der ISR sollten als `volatile` deklariert werden
- Der Overflow kann maximal **32 Bit** lang sein.
- Der Prescaler-Faktor kann maximal **16 Bit** lang sein.
- Es sollte der Prescaler so gering wie möglich gehalten werden und der 32-Bit-Overflow voll durchgezählt werden (Empfehlung von Straub).

