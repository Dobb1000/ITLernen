# (Einfach) Verkettete Liste

<img src="/tutorial/binaerbaum/img/liste.png">

Eine Liste ist entweder **leer** oder sie besteht aus einem **Knoten**.

Ein Knoten:
- enthält ein Objekt vom Datentyp **A**
- enthält einen Verweis auf eine Liste **desselben Typs**

➡️ **Zeiger im letzten Element zeigt auf die leere Liste (Nullzeiger)**

<img src="/tutorial/binaerbaum/img/liste-fs.png">

## Element Löschen

<img src="/tutorial/binaerbaum/img/liste-element-loeschen.png">

## Element eifügen

<img src="/tutorial/binaerbaum/img/liste-element-einfuegen.png">

## Element suchen

```text
OPERATION enthaelt(pInhalt:Typ):Boolean
  Lokale Variablen: gefunden:Boolean, knoten:Knoten<Typ>

  gefunden ← falsch
  knoten ← erster

  SOLANGE knoten ≠ NICHTS UND gefunden = falsch
    WENN knoten.gibInhalt() = pInhalt
      gefunden ← wahr
    SONST
      knoten ← knoten.gibNaechsten()
    ENDE WENN
  ENDE SOLANGE

  RÜCKGABE gefunden
ENDE OPERATION
```
