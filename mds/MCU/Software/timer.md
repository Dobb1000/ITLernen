# Timer und Interrupts

## Prinzip
Ein Timer ist ein Zähler, der auf Basis eines Taktsignals arbeitet. Mithilfe eines Timers können zeitgesteuerte Aufgaben wie Signalverarbeitung oder periodische Ereignisse realisiert werden. Die Hauptkomponenten eines Timers sind der **Prescaler**, der **Counter** und das **Autoreloadregister (ARR)**.

## Funktionen der Komponenten

### 1. Prescaler
Der Prescaler teilt die Taktfrequenz, um die Zählgeschwindigkeit des Timers zu verringern. Dadurch können auch bei hohen Taktfrequenzen des Mikrocontrollers längere Zeiträume erfasst werden. Beispielsweise reduziert ein Prescaler von 32 eine Taktfrequenz von 32 MHz auf 1 MHz.

### 2. Counter
Der Zähler zählt die Takte, die nach der Prescaler-Division übrig bleiben. Sobald der Zähler den im ARR festgelegten Maximalwert erreicht, wird er zurückgesetzt (**Überlauf**) und kann ein Ereignis wie einen Interrupt auslösen.

### 3. Autoreloadregister (ARR)
Das ARR legt den Maximalwert des Zählers fest. Der Timer zählt von 0 bis zum ARR-Wert. Nach einem **Überlauf** wird der Zähler automatisch zurückgesetzt. Damit lässt sich die Dauer eines Timer-Zyklus bestimmen.

## Ablauf eines Timers
1. Der Systemtakt wird durch den Prescaler geteilt.
2. Der reduzierte Takt wird vom Counter gezählt.
3. Beim Erreichen des ARR-Wertes wird ein **Überlauf** ausgelöst.
4. Bei aktiviertem Interrupt wird die zugehörige ISR (Interrupt Service Routine) ausgeführt.

## Erstellen eines Timer-Objekts
Ein Timer-Objekt kann folgendermaßen erstellt werden:

```cpp
static HardwareTimer meintimer = HardwareTimer(TIM3);
meintimer.setOverflow(1000);// Das Standardformat ist TICK_FORMAT. 
// Der Rollover findet statt, wenn der Zeitzähler 10000 Ticks zählt (er erreicht den Wert von 0 bis 9999).

meintimer.setOverflow(1000, MICROSEC_FORMAT); // 0,001 Sekunden

meintimer.setOverflow(1000, HERTZ_FORMAT); // 1000 Hz

meintimer.attachInterrupt(timerFunktion);
meintimer.resume();
```

Das `MICROSEC_FORMAT` ermöglicht es, ohne Einstellen von Prescaler und Overflow direkt die Zeit einzustellen, nach der der Interrupt passieren soll.

Falls in der Aufgabenstellung explizit Overflow und Prescaler-Faktor gefragt sind, können diese wie folgt eingestellt werden:

```cpp
Mytimer.setOverflow(x);
mytimer.setPrescaleFactor(x);
```

**Hinweise:**
- Der Overflow kann maximal **32 Bit** lang sein.
- Der Prescaler-Faktor kann maximal **16 Bit** lang sein.
- Es sollte der Prescaler so gering wie möglich gehalten werden und der 32-Bit-Overflow voll durchgezählt werden (Empfehlung von Straub).

