# Referentielle Datenintegrität

## 🔑 Definition
**Referentielle Datenintegrität** stellt sicher, dass Beziehungen zwischen Tabellen in einer relationalen Datenbank konsistent bleiben. Sie bedeutet:
> **Ein Fremdschlüsselwert in einer Tabelle muss entweder auf einen existierenden Primärschlüsselwert in einer anderen (oder derselben) Tabelle verweisen oder NULL sein.**

---

## 🗂️ Wichtige Begriffe:

| Begriff               | Erklärung                                                                 |
|----------------------|--------------------------------------------------------------------------|
| **Primärschlüssel (PK)** | Eindeutiges Attribut, das jede Zeile eindeutig identifiziert.            |
| **Fremdschlüssel (FK)**  | Attribut, das auf den Primärschlüssel einer anderen Tabelle verweist.     |
| **Parent-Tabelle**      | Tabelle mit dem Primärschlüssel, auf den verwiesen wird.                  |
| **Child-Tabelle**       | Tabelle mit dem Fremdschlüssel, die auf den Primärschlüssel verweist.     |

---

## 📚 Beispiel:

**Tabellen:**

<img src="/tutorial/db/Grundlagen/img/kundentabelle!.svg" style="width: 50%">

➡️ **Referentielle Integrität verletzt:** KundenID 3 existiert nicht in der Kundentabelle!

---

## ⚙️ Maßnahmen zur Sicherstellung:

### 1. **Constraints:**
- **FOREIGN KEY Constraint**  
  Beispiel:
  ```sql
  ALTER TABLE Bestellung
  ADD CONSTRAINT fk_kunde
  FOREIGN KEY (KundenID)
  REFERENCES Kunde(KundenID);
  ```

### 2. **ON DELETE / ON UPDATE Aktionen:**
- **CASCADE:** Automatisches Löschen/Ändern der Kind-Datensätze.
- **SET NULL:** Setzt FK auf NULL bei Löschung/Änderung im Parent.
- **NO ACTION / RESTRICT:** Verhindert Löschung/Änderung, solange FK existiert.

---

## 🚩 Typische Fehlerquellen:
- Fehlende Fremdschlüsseldefinitionen
- FK-Werte ohne entsprechenden PK in der Parent-Tabelle
- Ungewollte Löschung in der Parent-Tabelle ohne passende ON DELETE-Regel

---

## 🧠 Merksatz:
> **"Ein Fremdschlüssel darf nicht ins Leere zeigen!"**