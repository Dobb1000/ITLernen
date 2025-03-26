## I²C (Inter-Integrated Circuit)

Das **I²C-Protokoll** ist ein synchrones serielles Kommunikationsprotokoll, das
mit nur zwei Leitungen auskommt:

- **SCL (Serial Clock):** Überträgt das Taktsignal.
- **SDA (Serial Data):** Überträgt die Daten.

<img src="/tutorial/MCU/Software/img/i2c_general.png">


I²C unterstützt mehrere Master- und Slave-Geräte, wobei jedes Gerät
eine eindeutige 7- oder 10-Bit-Adresse besitzt. Die Kommunikation erfolgt
über einen Master, der den Takt bereitstellt und Daten an die Slaves sendet.

### Datenübertragung und Bits

<img src="/tutorial/MCU/Software/img/bitstruktur_i2c.png">

Die Kommunikation über I2C folgt einem bestimmten Muster:
1. **Startbedingung:** Der Master erzeugt eine Startbedingung, indem er die SDA-Leitung auf LOW zieht, während SCL HIGH ist.
2. **Adressierung:** Der Master sendet die 7- oder 10-Bit-Adresse des Ziel-Slave-Geräts, gefolgt von einem Read/Write-Bit (0 = Schreiben, 1 = Lesen).
3. **Bestätigung (ACK/NACK):** Der Slave bestätigt den Empfang der Adresse mit einem Acknowledge-Signal (ACK), indem er die SDA-Leitung auf LOW zieht.
4. **Datenübertragung:** Die Daten werden byteweise (8 Bit) gesendet, gefolgt von einer ACK/NACK-Bestätigung des Empfängers.
5. **Stopbedingung:** Der Master beendet die Kommunikation, indem er die SDA-Leitung auf HIGH setzt, während SCL HIGH ist.

<img src="/tutorial/MCU/Software/img/bitstruktur_i2c_2.png">

## **Codebeispiele**

### **Codebeispiel: I²C-Master sendet Daten an einen Slave (Hex-Adresse 0x08)**

```cpp
#include <Wire.h>

void setup() {
    Wire.begin(); // Initialisiert I²C als Master
    Serial.begin(9600);
}

void loop() {
    Wire.beginTransmission(0x08); // Startet Übertragung zu Slave mit Adresse 0x08
    Wire.write("Hallo, I²C!");    // Daten senden
    Wire.endTransmission();       // Übertragung beenden
    Serial.println("Daten gesendet an 0x08");
    delay(1000);
}
```



### **Codebeispiel: I²C-Master empfängt Daten vom Slave (Hex-Adresse 0x08)**

```cpp
#include <Wire.h>

void setup() {
    Wire.begin(); // Initialisiert I²C als Master
    Serial.begin(9600);
}

void loop() {
    Wire.requestFrom(0x08, 6); // Anforderung von 6 Bytes vom Slave mit Adresse 0x08
    Serial.print("Empfangene Daten: ");
    while (Wire.available()) {
        char c = Wire.read();
        Serial.print(c);
    }
    Serial.println();
    delay(1000);
}
```


Dieser Code sendet jede Sekunde den String "Hallo, I²C!" an ein Gerät mit der Adresse `8` über das I²C-Protokoll.
