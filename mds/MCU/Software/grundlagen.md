# Grundlagen

## Grundlegende Funktionen

- `setup()`: Initialisiert das Programm und wird einmal ausgeführt.
- `loop()`: Enthält die Hauptlogik und wird kontinuierlich ausgeführt.

## Pin-Modus und I/O

- `pinMode(pin, mode)`: Setzt den Modus eines Pins (`INPUT`, `OUTPUT`, `INPUT_PULLUP` bzw. `INPUT_PULLDOWN`).  
  **Beispiel:**
  ```cpp
  pinMode(13, OUTPUT);
  ```

- `digitalWrite(pin, value)`: Setzt einen digitalen Pin auf `HIGH` oder `LOW`.
  **Beispiel:**
  ```cpp
  digitalWrite(13, HIGH);
  ```

- `digitalRead(pin)`: Liest den Zustand eines digitalen Pins.
  **Beispiel:**
  ```cpp
  int buttonState = digitalRead(7);
  ```

- `analogWrite(pin, value)`: Gibt ein PWM-Signal oder einen „echten“ analogen Wert aus.
  **Beispiel:**
  ```cpp
  analogWrite(9, 128);
  ```

- `analogRead(pin)`: Liest einen analogen Wert.
  **Beispiel:**
  ```cpp
  int sensorValue = analogRead(A0);
  ```

## Zeitsteuerung

- `delay(ms)`: Wartet eine bestimmte Zeit in Millisekunden.
  **Beispiel:**
  ```cpp
  delay(1000);
  ```

- `millis()`: Gibt die Zeit seit Programmstart in Millisekunden zurück.
  **Beispiel:**
  ```cpp
  unsigned long currentMillis = millis();
  ```

## Schleifen

### **For-Schleife**:
Wird verwendet, wenn die Anzahl der Wiederholungen bekannt ist.
  **Syntax:**
  ```cpp
  for (initialisierung; bedingung; aktualisierung) {
      // Codeblock
  }
  ```
  **Beispiel:**
  ```cpp
  for (int i = 0; i < 10; i++) {
      Serial.println(i);
  }
  ```

### **While-Schleife**: 
Führt den Codeblock aus, solange die Bedingung wahr ist.
  **Syntax:**
  ```cpp
  while (bedingung) {
      // Codeblock
  }
  ```
  **Beispiel:**
  ```cpp
  int buttonState = digitalRead(7);
  while (buttonState == LOW) {
      Serial.println("Warten auf Tastendruck...");
      buttonState = digitalRead(7);
  }
  ```

### **Do-While-Schleife**: 
Führt den Codeblock mindestens einmal aus, auch wenn die Bedingung beim ersten Mal falsch ist.
  **Syntax:**
  ```cpp
  do {
      // Codeblock
  } while (bedingung);
  ```
  **Beispiel:**
  ```cpp
  int counter = 0;
  do {
      Serial.println(counter);
      counter++;
  } while (counter < 5);
  ```

## Switch

Die `switch`-Anweisung ermöglicht eine Auswahl aus mehreren Alternativen, abhängig vom Wert einer Variablen. Jeder `case`-Block beschreibt eine mögliche Aktion. Der `default`-Block wird ausgeführt, wenn kein `case` zutrifft. **Wichtig:** Immer `break` verwenden, um das Durchlaufen weiterer Blöcke zu vermeiden.

**Syntax:**
```cpp
switch (variable) {
    case wert1: anweisung1; break;
    case wert2: anweisung2; break;
    default: standardanweisung; break;
}
```

**Beispiel:**
```cpp
switch (richtung) {
    case RECHTS: motor = RECHTSKURVE; break;
    case LINKS: motor = LINKSKURVE; break;
    default: motor = vorwaerts; break;
}
```

## Unterprogramme, Funktionen

**Ohne Rückgabewert, ohne Parameter:**
  ```cpp
  int a, result; // globale Variablen
  void addieren(void) {
      result = a + a; // Anweisung(en)
  }
  ```

**Ohne Rückgabewert, mit Parameter:**
  ```cpp
  void zeitms(int msec) {
      int t1; // lokale Variable
      for (t1 = msec; t1 != 0; t1--)
          wait_us(1000); // Zeitschleife
  }
  ```

**Mit Rückgabewert, mit Parameter:**
  ```cpp
  float berechneQuadrat(float pQ = 10) { // Parameter mit Standardwert
      return pQ * pQ;
  }
  ```

## Enums

Ein `enum` definiert eine Liste von benannten Werten, die automatisch mit Ganzzahlen verknüpft sind. Es wird verwendet, um Werte übersichtlicher und lesbarer zu machen.

**Syntax:**

```cpp
enum Name { Wert1, Wert2, Wert3 };
```

**Beispiel:**

```cpp
enum Richtung { RECHTS, LINKS, VORWAERTS };

Richtung motorRichtung = RECHTS;

switch (motorRichtung) {
    case RECHTS: motor = RECHTSKURVE; break;
    case LINKS: motor = LINKSKURVE; break;
    case VORWAERTS: motor = vorwaerts; break;
}
```

**Hinweis:** Standardmäßig beginnen die Werte bei `0` und erhöhen sich um `1`. Diese Werte können auch explizit definiert werden:

```cpp
enum Richtung {
    RECHTS = 10,
    LINKS = 20
};
```

## Serielle Kommunikation
`Serial.begin(speed)`: Startet die serielle Kommunikation.
  **Beispiel:**
  ```cpp
  Serial.begin(9600);
  ```

`Serial.println(value)`: Gibt Daten mit Zeilenumbruch aus.
  **Beispiel:**
  ```cpp
  Serial.println(analogRead(A0));
  ```

`Serial.read()`: Liest einen Wert von der seriellen Schnittstelle.
  **Beispiel:**
  ```cpp
  int incomingByte = Serial.read();
  ```


