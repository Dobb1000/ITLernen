# Binärbaum 🌳

## Visualisierung

<img src="/tutorial/binaerbaum/img/binbaumdar.png">

<br>

<img src="/tutorial/binaerbaum/img/binbaum-fs.png" style="width: 50%; float: right">
<img src="/tutorial/binaerbaum/img/binbaumauf-fs.png" style="width: 50%; float: right">


### Begriffe
- **Root Node / Wurzel**: Der oberste Knoten im Baum.
- **Left Child / Right Child**: Linkes bzw. rechtes Kind eines Knotens.
- **NULL**: Kein weiteres Kind vorhanden.

### Struktur in UML
- Klassenstruktur für einen generischen Binärbaum und Knoten mit Methoden wie `ausgebenDatenInorder`, `ausgebenDatenPreorder`, `ausgebenDatenPostorder`.

### Ebenen eines Baums
- Ebene 0: Wurzel
- Ebene 1: Innere Knoten
- Ebene 2: Blätter und äußere Knoten

---

## Baumtypen


### Sortiert

<img src="/tutorial/binaerbaum/img/binbaum-type-sort.png" style="width: 50%">


- Linker Teilbaum enthält nur Werte kleiner als die Wurzel.
- Rechter Teilbaum enthält nur Werte größer als die Wurzel.

### Voll

<img src="/tutorial/binaerbaum/img/binbaum-type-voll.png" style="width: 50%">

- Jeder Knoten ist entweder ein Blatt oder hat zwei Kinder.

### Vollständig

<img src="/tutorial/binaerbaum/img/binbaum-type-vollstaendig.png    " style="width: 50%">


- Der Baum ist voll & alle Blätter sind auf gleicher Höhe.

---

## Traversierungen

<img src="/tutorial/binaerbaum/img/order.png">


# Löschen von Knoten
## 1. Fall: Blatt

<img src="/tutorial/binaerbaum/img/lvk-blatt.png">


- Einfach Knoten entfernen

## 2. Fall: Knoten hat 1 Kind

<img src="/tutorial/binaerbaum/img/lvk-km1b.png" style="width: 30%">


- Knoten durch das Kind ersetzen

## 3. Fall: Knoten hat 2 Kinder

<img src="/tutorial/binaerbaum/img/lvk-kmmb.png">


- Knoten durch das kleinste Element im rechten Teilbaum ersetzen & dieses löschen  
  → Funktioniert auch, wenn das zu löschende Element **ein Kind ist!**
