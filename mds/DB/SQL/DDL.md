# Data Definition Language
## CREATE TABLE

**Funktion:**  
Neue Tabelle erstellen.

**Syntax:**

```sql
CREATE TABLE tabellenname (
  spalte1 datentyp PRIMARY KEY,
  spalte2 datentyp NOT NULL,
  spalte3 datentyp
);
```

**Beispiel:**

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  age INT
);
```



## ALTER TABLE

<img src="https://cdn.7tv.app/emote/01JK13HTGS8R8KCEQ49BDH569E/4x.avif" style="width: 30%;">

**Funktion:**  
Tabelle ändern (z.B. Spalten hinzufügen/löschen).

**Syntax:**

```sql
ALTER TABLE tabellenname ADD spaltenname datentyp;
ALTER TABLE tabellenname DROP COLUMN spaltenname;
```

**Beispiel:**

```sql
ALTER TABLE users ADD email VARCHAR(100);
```



## DROP TABLE

**Funktion:**  
Tabelle komplett löschen.

**Syntax:**

```sql
DROP TABLE tabellenname;
```