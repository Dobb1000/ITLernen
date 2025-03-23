# Aufgabe

Schreiben Sie ein SQL-Statement, das alle Produkte aus der Tabelle `products` abruft, die der Kategorie **Electronics** angehören.

## Datenbankbeschreibung

In dieser Datenbank gibt es eine Tabelle namens `products`. Sie enthält Informationen über verschiedene Produkte.

### Tabellenstruktur:

| Spalte   | Datentyp  | Beschreibung                        |
|---------|---------|-------------------------------------|
| id      | INTEGER | Primärschlüssel, eindeutige ID für jedes Produkt |
| name    | TEXT    | Name des Produkts                    |
| category| TEXT    | Kategorie des Produkts               |
| price   | INTEGER | Preis des Produkts in Euro           |

### Beispiel-Datensätze:

| id | name       | category     | price |
|----|-----------|-------------|-------|
| 1  | Laptop    | Electronics | 1000  |
| 2  | Smartphone| Electronics | 800   |
| 3  | Desk      | Furniture   | 150   |
| 4  | Chair     | Furniture   | 85    |
| 5  | Headphones| Electronics | 200   |

<br>