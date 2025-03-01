### Prompt für eine AI zur -Generierung

Erstelle ein **-Klassendiagramm**, das **exakt** den folgenden Regeln entspricht. **Es gibt keine weiteren möglichen Varianten oder Abweichungen!** Die Diagramme müssen sich **strikt an die Vorgaben** halten.

---

### **1. Grundstruktur:**

- Der Code beginnt mit `@startuml` und endet mit `@enduml`.
- Alle UML-Elemente (Klassen, Beziehungen, Vererbung) **müssen genau wie hier definiert werden**.

---

### **2. Klassendefinition:**

- Jede Klasse wird mit `class` definiert. Der start der Attribute wird mit `≤attributes≥` & der start der Methoden mit `≤method≥` deklariert
  ```
  class Klassenname {
    ≤attributes≥
    ≤methods≥
  }
  ```
- Abstrakte Klassen werden mit `abstract class` definiert:
  ```
  abstract class Klassenname {
    ≤attributes≥
    ≤methods≥
  }
  ```

**Es gibt keine anderen Klassentypen oder alternative Notationen.**

---

### **3. Attribute und Methoden:**

- **Attribute haben ausschließlich die folgende Syntax:**
  ```
  + Attributenname: Typ
  - privatesAttribut: Typ
  # geschütztesAttribut: Typ
  ```
  Beispiel:
  ```
  + Räder: GZ
  + LECK: TEXT
  ```
- **Methoden müssen genau dieser Struktur folgen:**
  ```
  + methodenName(): Rückgabetyp
  ```
  Beispiel:
  ```
  + test()
  ```
- **Klassenattribute (statische Attribute) werden mit ****`{static}`**** dargestellt und unterstrichen:**
  ```
  + test: GZ {static}
  ```
- **Klassenmethoden (statische Methoden) werden ebenfalls mit ****`{static}`**** markiert:**
  ```
  + test(): pTest {static}
  ```
- **Abstrakte Attribute und Methoden werden ebenfalls mit ****`{abstract}`**** markiert:**
  ```
  + abstraktesAttribut: Typ {abstract}
  + abstrakteMethode(): Typ {abstract}
  ```
- **Attribute mit Zusicherungen werden mit ****`{Zusicherung}`**** dargestellt:**
  ```
  - attributMitZusicherung: Typ {wert>0}
  ```
- **Read-only Attribute werden mit ****`{read only}`**** markiert:**
  ```
  # geschütztesAttribut: Typ {read only}
  ```
- **Attribute mit Anfangswerten werden mit ****`= Wert`**** dargestellt:**
  ```
  - attributMitAnfangswert: Typ = Anfangswert
  ```
- **Kollektionsattribute werden mit ****`[anzElemente]`**** dargestellt:**
  ```
  - attributKollektion: Typ[anzElemente]
  ```
- **Konstruktoren werden mit ****`<<constructor>>`**** dargestellt:**
  ```
  + konstruktorMethode(): Typ <<constructor>
  ```

**Es sind keine weiteren Formatierungen oder Alternativen erlaubt.**

---

### **4. Vererbung:**

- **Vererbung wird ausschließlich mit ****`--|>`**** dargestellt.**

- **Der Pfeil muss immer von der Subklasse zur Oberklasse zeigen.**

  ```
  Subklasse --|> Oberklasse
  ```

  **Exakte Beispiele, an denen sich jede Generierung orientieren muss:**

  ```
  Motorrad --|> Fahrzeug
  Auto --|> Fahrzeug
  Fahrer --|> Fahrzeug
  ```

- **Jede andere Darstellung von Vererbung ist verboten.**

---

### **5. Assoziationen (Beziehungen zwischen Klassen):**

- **Assoziationen werden nur mit ****`<-->`**** oder ****`<--`**** dargestellt** und müssen genau wie im Beispiel bleiben.
- **Die Pfeilrichtung darf nicht verändert werden.**
  ```
  Klasse1 "Rolle1¿Multiplizität1" <<-- "Rolle2¿Multiplizität2" Klasse2
  ```
  **Exakte Beispiele:**
  ```
  Werkstatt "dieWerkstatt¿3" <--> "das Fahrzeug¿1" Fahrzeug
  Person "diePerson¿1" <-- "dasFahrzeug¿123" Fahrzeug
  ```
- **Es sind keine anderen Pfeilarten oder Darstellungen erlaubt!**

---

### **6. Positionierung:**

- Falls nötig, werden **Positionen nur als Kommentar** angegeben:
  ```
  class Auto // Position: (502, 439)
  ```
- **Diese Positionierung ist optional**
- **Es gibt keine andere Möglichkeit zur Positionierung.**

---
### **7. weitere Infos:**

- uses werden als einfache assoziationen behandelt
- interface werden ignoriert und als normale klasse behandelt
- es gibt nur die pfeil <-- & <--> für Assoziationen und --|> für Vererbung es gibt keine anderen pfeilarten (dabei ist das format wichtig einzuhalten!)

---

### **Zusammenfassung der Regeln:**

✅ **Nur die vorgegebenen Pfeilrichtungen dürfen verwendet werden:**

- **`--|>`**** für Vererbung:** Der Pfeil zeigt **immer** von der Unterklasse zur Oberklasse.
- **`<-->`**** oder ****`<--`**** für Assoziationen:** Die Pfeile müssen **immer exakt in der vorgegebenen Richtung sein.**\
  ✅ **Kein anderer Syntax oder alternative Schreibweisen sind erlaubt.**\
  ✅ **Attribute und Methoden haben nur die hier definierte Struktur.**\
  ✅ **Klassenattribute und Methoden müssen mit ****`{static}`**** markiert sein.**\
  ✅ **Abstrakte Attribute und Methoden müssen mit ****`{abstract}`**** markiert sein.**\
  ✅ **Zusicherungen und Bedingungen müssen mit ****`{Zusicherung}`**** gekennzeichnet werden.**\
  ✅ **Read-only Attribute müssen mit ****`{read only}`**** markiert sein.**\
  ✅ **Attribute mit Anfangswerten müssen ****`= Wert`**** enthalten.**\
  ✅ **Kollektionsattribute müssen ****`[anzElemente]`**** enthalten.**\
  ✅ **Keine zusätzlichen Beziehungen, Klassentypen oder UML-Elemente!**\
  ✅ **Positionen dürfen nur als Kommentare erscheinen.**
  ✅ **Der start der Attribute wird mit `≤attributes≥` & der start der Methoden mit `≤method≥` deklariert**


Jede Generierung **muss exakt** diesen Regeln folgen. **Es gibt keine Abweichungen, keine Alternativen und keine weiteren Gestaltungsmöglichkeiten!** **Jede Regel ist verbindlich.**

**Erzeuge das UML-Diagramm strikt nach diesen Vorgaben!** 🚨

