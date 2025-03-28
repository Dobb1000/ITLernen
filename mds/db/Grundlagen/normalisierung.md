# **Normalisierung**

## 🔍 **Was ist Normalisierung?**

- Ziel: **Vermeidung von Redundanz & Anomalien** (Einfüge-, Änderungs-, Löschanomalien)
- Methode: Tabellen werden in sogenannte **Normalformen** gebracht.

---

## 1️⃣ **1. Normalform (1NF)**
**Bedingung:**
- Nur **atomare Werte** (also keine Listen, Mengen etc.)
- Jede Zelle enthält **genau EINEN Wert**

**Beispiel (NICHT 1NF):**

| <ins>Kundennr</ins> | Kundenname | Telefonnummern       |
|--------|------------|--------------------|
| 1      | Meier      | 12345, 67890        |
| 2      | Schulz     | 54321               |

➡️ Problem: **Telefonnummern** enthält mehrere Werte in einer Zelle.

**In 1NF umgewandelt:**

| <ins>Kundennr</ins> | Kundenname | Telefonnummer |
|--------|------------|-------------|
| 1      | Meier      | 12345       |
| 1      | Meier      | 67890       |
| 2      | Schulz     | 54321       |

---

## 2️⃣ **2. Normalform (2NF)**
**Bedingung:**
- **1NF ist erfüllt**
- **Kein Nicht-Schlüsselattribut hängt nur von einem Teil des Primärschlüssels ab (bei zusammengesetzten Schlüsseln)**

**Beispiel (NICHT 2NF):**

| <ins>Kundennr</ins> | <ins>Produktnr</ins> | Kundenname | Produktname |
|--------|--------|------------|------------|
| 1      | 101    | Meier      | Kugelschreiber |
| 1      | 102    | Meier      | Heft          |
| 2      | 101    | Schulz     | Kugelschreiber |

➡️ **Primärschlüssel:** (<ins>Kundennr</ins>, <ins>Produktnr</ins>)  
➡️ **Problem:** Kundenname hängt nur von <ins>Kundennr</ins> ab, nicht von beiden zusammen.

**In 2NF umgewandelt:**

**Tabelle: Kunden**

| <ins>Kundennr</ins> | Kundenname |
|--------|------------|
| 1      | Meier      |
| 2      | Schulz     |

**Tabelle: Produkte**

| <ins>Produktnr</ins> | Produktname    |
|--------|------------|
| 101    | Kugelschreiber |
| 102    | Heft          |

**Tabelle: Bestellungen**

| <ins>Kundennr</ins> | <ins>Produktnr</ins> |
|--------|--------|
| 1      | 101    |
| 1      | 102    |
| 2      | 101    |

---

## 3️⃣ **3. Normalform (3NF)**
**Bedingung:**
- **2NF ist erfüllt**
- **Keine transitiven Abhängigkeiten**

---

### 📌 Was sind **transitive Abhängigkeiten**?

#### Definition:
In einer **relationalen Datenbank** liegt eine **transitive Abhängigkeit** vor, wenn:

**Ein Attribut indirekt vom Primärschlüssel abhängt, über ein anderes Attribut.**

Formell gesagt:

> **A → B → C**, wobei:
> - **A** ist der Primärschlüssel.
> - **B** ist ein Nicht-Schlüsselattribut.
> - **C** ist ebenfalls ein Nicht-Schlüsselattribut.
> - **A → C** erfolgt *nur* über **B**, nicht direkt.

<br>

**Beispiel (NICHT 3NF):**

| <ins>Kundennr</ins> | Kundenname | Postleitzahl | Ort        |
|---------------------|-----------------------|-------------|-----------|
| 1                   | Meier                 | 12345       | Berlin    |
| 2                   | Schulz                | 54321       | Hamburg   |

➡️ Problem:  
**Postleitzahl → Ort** (Postleitzahl bestimmt den Ort)
Das ist eine transitive Abhängigkeit, weil Stadt eigentlich von `Postleitzahl` abhängt, nicht direkt vom `Kundennr`.

**In 3NF umgewandelt:**

**Tabelle: Kunden**

| <ins>Kundennr</ins> | Kundenname | <ins style="text-decoration: underline dashed;">Postleitzahl</ins> |
|--------|------------|-------------|
| 1      | Meier      | 12345       |
| 2      | Schulz     | 54321       |

**Tabelle: Orte**

| <ins>Postleitzahl</ins> | Ort      |
|-------------|---------|
| 12345       | Berlin  |
| 54321       | Hamburg |

---

## 🚦 **Zusammenfassung:**

| Normalform | Bedingung | Beispielproblem |
|------------|-------------------|--------------------------|
| 1NF        | Atomare Werte     | Mehrere Telefonnummern in einer Zelle |
| 2NF        | Keine partielle Abhängigkeit | Kundenname hängt nur von Kundennr ab |
| 3NF        | Keine transitive Abhängigkeit | Ort hängt indirekt von Kundennr ab |

---

## 📝 **Warum Normalisieren?**

✅ Redundanzen vermeiden  
✅ Anomalien verhindern  
✅ Datenkonsistenz  
✅ Flexiblere Erweiterung