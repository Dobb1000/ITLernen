# Serial Peripheral Interface (SPI)

## **Grundlagen des SPI-Protokolls**

<img style="width: 60%; float: right" src="/tutorial/MCU/Software/img/SPI_general.svg">


Das SPI-Protokoll ist ein synchrones, serielles Kommunikationsprotokoll, das eine **Master-Slave-Architektur** verwendet. Es wird häufig zur schnellen Datenübertragung zwischen Mikrocontrollern und Peripheriegeräten genutzt.

### **Wichtige Signalleitungen**

SPI benötigt vier grundlegende Signalleitungen:

- **MOSI (Master Out Slave In):** Datenleitung vom Master zum Slave.
- **MISO (Master In Slave Out):** Datenleitung vom Slave zum Master.
- **SCLK (Serial Clock):** Taktleitung, die vom Master bereitgestellt wird.
- **SS (Slave Select):** Wählt einen bestimmten Slave aus (aktiv **niedrig**).

### **SPI Clock Modi**

SPI kann in vier verschiedenen Modi betrieben werden, die durch die Werte von CPOL (Clock Polarity) und CPHA (Clock Phase) bestimmt werden:

<img style="width: 70%" src="/tutorial/MCU/Software/img/clock_spi.svg">


### **Master-Slave-Prinzip**

- Der **Master** generiert den Takt und steuert den Datenfluss.
- **Mehrere Slaves** können entweder mit **dedizierten SS-Leitungen** oder per **Daisy-Chaining** angesprochen werden.

## **Beispielcode für SPI-Kommunikation (Arduino)**

```cpp
#include <SPI.h>

void setup() {
  SPI.begin();  // Initialisiert SPI als Master
  pinMode(10, OUTPUT); // SS-Pin als Ausgang setzen
}

void loop() {
  digitalWrite(10, LOW);   // Slave auswählen
  SPI.transfer(0x42);      // Daten senden (Beispielwert 0x42)
  digitalWrite(10, HIGH);  // Slave abwählen
  delay(1000);
}
```

### **Zusätzliche Informationen**

- **Datenübertragung:** Vollduplex (gleichzeitiges Senden und Empfangen möglich)
- **Taktraten:** Abhängig von Master- und Slave-Fähigkeiten
- **Datenrahmen:** Üblicherweise 8 Bit, aber auch andere Längen möglich
- **Modi:** SPI hat vier Betriebsmodi, abhängig von der Taktpolarität (CPOL) und Taktphase (CPHA)
