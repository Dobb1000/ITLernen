# Aufgabe

Schreiben Sie ein SQL-Statement, das den Gesamtumsatz (`amount`) als `total_amount` für jede Kategorie in der Tabelle `sales` berechnet.

## Datenbankbeschreibung

In dieser Datenbank gibt es eine Tabelle namens `sales`. Sie enthält Verkaufsinformationen.

### Tabellenstruktur:

| Spalte   | Datentyp  | Beschreibung                     |
|---------|---------|----------------------------------|
| id      | INTEGER | Primärschlüssel, eindeutige ID für jeden Verkauf |
| product | TEXT    | Name des Produkts                 |
| category| TEXT    | Kategorie des Produkts            |
| amount  | INTEGER | Verkaufsbetrag in Euro            |

### Beispiel-Datensätze:

| id | product     | category     | amount |
|----|------------|-------------|--------|
| 1  | Laptop     | Electronics | 1000   |
| 2  | Smartphone | Electronics | 800    |
| 3  | Desk       | Furniture   | 150    |
| 4  | Chair      | Furniture   | 85     |
| 5  | Headphones | Electronics | 200    |
| 6  | Lamp       | Furniture   | 60     |
| 7  | Monitor    | Electronics | 300    |

<br>