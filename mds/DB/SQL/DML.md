# Data Manipulation Lanugage

## SELECT

**Funktion:**  
Daten aus einer Tabelle abfragen.

**Syntax:**

```sql
SELECT spaltenname1, spaltenname2 FROM tabellenname;
```

**Beispiel:**

```sql
SELECT name, age FROM users;
```
[Beispielaufgabe](/tutorial/db/SQL/tutorials/SELECT/tutorial.html?solution=./solution.txt)




## WHERE

**Funktion:**  
Bedingung für die Datenauswahl.

**Syntax:**

```sql
SELECT * FROM tabellenname WHERE bedingung;
```

**Beispiel:**

```sql
SELECT * FROM users WHERE age > 18;
```

[Beispielaufgabe](/tutorial/db/SQL/tutorials/WHERE/tutorial.html?solution=./solution.txt)




## ORDER BY

**Funktion:**  
Ergebnisse sortieren (aufsteigend oder absteigend).

**Syntax:**

```sql
SELECT * FROM tabellenname ORDER BY spaltenname ASC|DESC;
```

**Beispiel:**

```sql
SELECT * FROM users ORDER BY age DESC;
```

[Beispielaufgabe](/tutorial/db/SQL/tutorials/ORDERBY/tutorial.html?solution=./solution.txt)




## GROUP BY

**Funktion:**  
Daten gruppieren, oft in Verbindung mit Aggregatfunktionen (COUNT, SUM, AVG, etc.).

**Syntax:**

```sql
SELECT spaltenname, COUNT(*) FROM tabellenname GROUP BY spaltenname;
```

**Beispiel:**

```sql
SELECT city, COUNT(*) FROM users GROUP BY city;
```
### Aggregatfunktionen
| Funktion | Beschreibung                      | Beispiel                          |
|---------|-----------------------------------|-----------------------------------|
| COUNT() | Anzahl der Datensätze zählen      | `SELECT COUNT(*) FROM users;`     |
| SUM()   | Summe berechnen                   | `SELECT SUM(age) FROM users;`     |
| AVG()   | Durchschnitt berechnen            | `SELECT AVG(age) FROM users;`     |
| MAX()   | Höchsten Wert finden              | `SELECT MAX(age) FROM users;`     |
| MIN()   | Kleinsten Wert finden             | `SELECT MIN(age) FROM users;`     |

[Beispielaufgabe](/tutorial/db/SQL/tutorials/GROUPBY/tutorial.html?solution=./solution.txt)




## INSERT INTO

**Funktion:**  
Daten in eine Tabelle einfügen.

**Syntax:**

```sql
INSERT INTO tabellenname (spalte1, spalte2) VALUES (wert1, wert2);
```

**Beispiel:**

```sql
INSERT INTO users (name, age) VALUES ('Alice', 25);
```



## UPDATE

**Funktion:**  
Vorhandene Datensätze ändern.

**Syntax:**

```sql
UPDATE tabellenname SET spalte = neuer_wert WHERE bedingung;
```

**Beispiel:**

```sql
UPDATE users SET age = 26 WHERE name = 'Alice';
```



## DELETE

**Funktion:**  
Datensätze löschen.

**Syntax:**

```sql
DELETE FROM tabellenname WHERE bedingung;
```

**Beispiel:**

```sql
DELETE FROM users WHERE age < 18;
```



Natürlich! Hier ist dein kompletter Lernzettel mit der zusätzlichen Erklärung zur klassischen JOIN-Schreibweise:



## JOINs

**Funktion:**  
Daten aus mehreren Tabellen kombinieren.



### INNER JOIN

Nur Datensätze, die in beiden Tabellen übereinstimmende Werte haben.

**Syntax:**

```sql
SELECT t1.spalte, t2.spalte 
FROM tabelle1 t1
INNER JOIN tabelle2 t2 ON t1.id = t2.fremd_id;
```

**Beispiel:**

```sql
SELECT users.name, orders.order_date 
FROM users 
INNER JOIN orders ON users.id = orders.user_id;
```



### JOIN ohne `JOIN`-Befehl (klassische Schreibweise)



Statt `INNER JOIN` kann man Tabellen auch über die `FROM`- und `WHERE`-Klausel verknüpfen.

**Syntax:**

```sql
SELECT t1.spalte, t2.spalte
FROM tabelle1 t1, tabelle2 t2
WHERE t1.id = t2.fremd_id;
```

**Beispiel:**

```sql
SELECT users.name, orders.order_date
FROM users, orders
WHERE users.id = orders.user_id;
```

<img src="https://cdn.7tv.app/emote/01F01APK500007E4VV006YKSMR/4x.avif">


**Hinweis:**  
Diese Schreibweise ist funktional identisch zu `INNER JOIN`, jedoch oft unübersichtlicher. Man nennt sie auch **impliziten Join**. Besonders bei mehreren Tabellen ist die Verwendung von expliziten `JOIN`s lesbarer und klarer.



