# Aufgabe

Schreiben Sie ein SQL-Statement, das die Namen der Kunden zusammen mit den von ihnen bestellten Produkten anzeigt.

## Datenbankbeschreibung

In dieser Datenbank gibt es zwei Tabellen: `customers` und `orders`.

### Tabellenstruktur:

#### Tabelle: customers

| Spalte | Datentyp  | Beschreibung                            |
|-------|---------|-----------------------------------------|
| id    | INTEGER | Primärschlüssel, eindeutige ID für jeden Kunden |
| name  | TEXT    | Name des Kunden                          |

#### Tabelle: orders

| Spalte      | Datentyp  | Beschreibung                                     |
|------------|---------|--------------------------------------------------|
| id         | INTEGER | Primärschlüssel, eindeutige ID für jede Bestellung |
| customer_id| INTEGER | Fremdschlüssel, verweist auf `customers(id)`       |
| product    | TEXT    | Name des bestellten Produkts                       |

### Beispiel-Datensätze:

#### customers:

| id | name    |
|----|--------|
| 1  | Alice  |
| 2  | Bob    |
| 3  | Charlie|

#### orders:

| id | customer_id | product |
|----|------------|--------|
| 1  | 1          | Laptop |
| 2  | 1          | Mouse  |
| 3  | 2          | Desk   |
| 4  | 3          | Chair  |
| 5  | 2          | Monitor|

<br>