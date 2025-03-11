**Lernzettel: Analog-Digital-Wandlung & Digital-Analog-Wandlung**

---

## **1. Analog-Digital-Wandlung (AD-Wandler)**
Ein AD-Wandler (Analog-Digital-Wandler) wandelt analoge Signale in digitale Werte um. Dabei wird eine kontinuierliche Eingangsspannung \( U_e \) in einen diskreten Zahlenwert \( x \) umgerechnet.

### **Wichtige Befehle:**
- **Deklaration:** `#define A0 Pin A0`
- **Bitauflösung einstellen:** `analogReadResolution(10, 12, 16);`
- **Messwert erfassen:** `sensorValue = analogRead(A0_Pin);`

### **Berechnungsformeln:**

<img src="/ITLernen/tutorial/MCU/Software/img/adc.png">


1. **Anzahl der Stufen:**
   $ S = 2^n $
   mit \( n \) als Anzahl der Bit.
2. **Wertebereich:**
   $ 0 \leq x \leq (2^n - 1) $
3. **Kleinste Spannungsstufe (ULSB):**
   $ U_{LSB} = \frac{U_{VCC}}{2^n} $
4. **Berechnung des Rohwerts (digitaler Ausgangswert, der nach der Umwandlung eines analogen Signals erzeugt wird):**
   $ x = \frac{U_e}{U_{VCC}} \times (2^n - 1) $
   wobei $ U_e $ die analoge Eingangsspannung und $ U_{VCC} $ die Betriebsspannung ist.

### **Verwendung von DA-Wandlern:**
```cpp
analogReadResolution(Bitauflösung);
typ var = analogRead(Pin)
```
### **Hinweise:**
- Mögliche Werte für Portpin: `A0-A5`
- Die Bitauflösung kann 10, 12 oder 16 Bit betragen.

---

## **2. Digital-Analog-Wandlung (DA-Wandler)**
Ein DA-Wandler (Digital-Analog-Wandler) erzeugt aus digitalen Eingangswerten analoge Ausgangsspannungen.

### **Wichtige Befehle:**
- **Deklaration:** `AnalogOut meinAnalogOut(Portpin);`
- **DAC-Wert setzen:** `analogWrite(ledPin, outputValue);`

### **Berechnungsformeln:**

<img src="/ITLernen/tutorial/MCU/Software/img/dac.png">


1. **Anzahl der Stufen:**
   $ S = 2^n $
2. **Wertebereich:**
   $ 0 \leq x \leq (2^n - 1) $
3. **Kleinste Spannungsstufe (ULSB):**
   $ U_{LSB} = \frac{U_{VCC}}{2^n} $
4. **Berechnung des Ausgangswerts:**
   $ U_a = \frac{x}{2^n} \times U_{VCC} $

### **Verwendung von DA-Wandlern:**
```cpp
AnalogOut meinAnalogOut(Portpin);  // Deklaration
analogWrite(Pin, Wert);  // DAC-Wert setzen
```
Mögliche Werte für `Portpin`: z. B. PA5.