# Entity-Relationship-Modell (ER-Modell)

## **Definition**
Das **ER-Modell** dient zur **grafischen Darstellung der Datenstruktur** eines Informationssystems. Entwickelt von **Peter Chen (1976)**.

---

## **Grundelemente**

| Symbol                                                                              | Name                         | Bedeutung                                                              |
|-------------------------------------------------------------------------------------|------------------------------|----------------------------------------------------------------------|
| 🟦 Rechteck                                                                         | **Entitätstyp**              | Reale/abstrakte Objekte (z.B. „Student“)                             |
| 🟡 Ellipse                                                                          | **Attribut**                 | Eigenschaften einer Entität (z.B. „Name“, „Matrikelnummer“)          |
| 🔵 Raute                                                                            | **Beziehungstyp**            | Verknüpfung zwischen Entitäten (z.B. „belegt“)                       |
| 📌 <ins>Unterstrichen</ins>                                                         | **Primärschlüssel**          | Eindeutiges Attribut zur Identifikation                              |
| 📌  <ins style="text-decoration: underline dashed;">Gestrichelt Unterstrichen</ins> | **Fremd-/Sekundärschlüssel** | Attribut zur Identifikation, verweist auf Primärschlüssel einer anderen Entität                             |

---


## **Beziehungstypen (Cardinalities)**

| Beziehung             | Beschreibung                                     | Beispiel                      |
|----------------------|-------------------------------------------------|-------------------------------|
| 1:1 (eins-zu-eins)    | Jede Entität A max. 1x mit B verknüpft            | Person ↔ Personalausweis      |
| 1:N (eins-zu-viele)   | Eine Entität A mit mehreren B, B max. 1x mit A    | Dozent ↔ Vorlesung            |
| M:N (viele-zu-viele)  | Beide Entitäten mehrfach verknüpft                | Student ↔ Kurs                |

---

## **Beispiel: Mini-ER-Modell**

<img src="/ITLernen/tutorial/DB/ERModell/img/ERModellBuecherrei.png" style="width: 100%">

---


## Auflösung von M:N-Beziehungen
- M:N-Beziehungen werden **immer in eine eigene Tabelle aufgelöst**.
- Die Tabelle enthält die **Primärschlüssel** der beteiligten Entitäten.
- Die Tabelle enthält **ggf. weitere Attribute**.
- Die Primärschlüssel der beteiligten Entitäten werden zu **Fremdschlüsseln**.

<img src="/ITLernen/tutorial/DB/ERModell/img/ermodellsplit.png" style="width: 100%">


## 💡 **Merksätze:**

- **Jede Entität = Tabelle**
- **Primärschlüssel immer unterstrichen!**
- **M:N → Immer eigene Tabelle!**

---

## Editor
[ER-Modell Editor](/ITLernen/canvas/ER-diagramm/ER-diagramm.html)