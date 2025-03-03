# **Klassen- & Objektdiagramme**

Objektorientierte Programmierung (OOP) basiert auf dem Konzept von **Klassen** und **Objekten**. Dinge, die inhaltlich zusammengehören, werden in **Klassen** gebündelt. Eine Klasse beschreibt alle **Attribute** (Eigenschaften) und **Methoden** (Fähigkeiten).

Eine Klasse ist sozusagen eine **Bauanleitung**, anhand der ein sog. Objekt erzeugt werden kann. Für alle Attribute ist der Typ angegeben. Konkrete Werte werden den Attributen in den Objekten zugewiesen. Die Methoden sind fest vorgegeben.

## **Klassen und Objekte**

- **Klasse** = Bauplan für Objekte
- **Objekt** = Instanz einer Klasse mit konkreten Werten für die Attribute

###  Beispiel: Klasse "Hund"

<img style="width: 70%" src="./imgs/Klasse.png">

###  Klassenattribute & Klassenmethoden
<blockquote>

**Klassenattribute** sind Variablen, die direkt in der Klasse definiert sind und von allen Instanzen der Klasse geteilt werden. Sie gehören zur Klasse und nicht zu einem einzelnen Objekt.<br>
Sie werden unterstrichen dargestellt: <ins>`+ klassenattribut: Typ` </ins>
</blockquote>
<blockquote>

**Klassenmethoden** sind Methoden, die mit der Klasse selbst arbeiten, anstatt mit einzelnen Objekten. Sie können auf Klassenattribute zugreifen oder sie zu verändern.<br>
Sie werden unterstrichen dargestellt: <ins>`+ klasseMethode()` </ins>


</blockquote>
	
---
## **Objekte und ihre Instanzen**

### **Sichtbarkeiten**
- `public`: Überall sichtbar.
- `private`: Nur innerhalb der Klasse sichtbar.

Jedes Objekt besitzt konkrete Werte für die Attribute einer Klasse.

### **Beispiel: Instanz eines Hundes**
<img style="width: 90%" src="./imgs/objektdiagramm.png">

---
## **Vererbung (Superklassen & Subklassen)**

Mehrere Klassen können gemeinsame Attribute & Methoden haben. Diese werden in einer **Superklasse** zusammengefasst.

### **Beispiel: Vererbung in einer Tierhierarchie**
- **Hund und Katze erben von Tier** (`public class Katze extends Tier`).
- **"Tier"** enthält allgemeine Attribute & Methoden.
- **"Hund" und "Katze"** haben zusätzliche, spezialisierte Methoden.
<img style="width: 80%" src="./imgs/vererbungen.png">



#### **Sichtbarkeit `protected`**
- `protected`: Sichtbar in der Klasse und allen Unterklassen (auch in anderen Paketen bei Vererbung).


---

## **Assoziationen zwischen Klassen**

<img style="float: right;width: 60%" src="./imgs/assoziationen.png">

Assoziationen beschreiben Beziehungen zwischen Objekten, und wie diese miteinander kommunizieren können. Diese können **uni- oder bidirektional** sein.

### **Beispiel: Simulation mit Tieren**

- Eine Simulation verwaltet mehrere Tiere (`1..*` zeigt an, dass mind. 1 Tier existiert).
- Die Methode `spielStarten()` kann auf die Tiere zugreifen.
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

---


## **Abstrakte Klassen**

Eine abstrakte Klasse ist eine Klasse, die nicht direkt als Objekt erstellt werden kann.&#x20;



#### **Merkmale abstrakter Klassen:**

- Können nicht instanziiert werden
- Können normale und abstrakte Methoden enthalten.
- Können Attribute (Variablen) enthalten.
- Dienen als Basis für Unterklassen.
- Wenn eine abstrakte Methode vorhanden ist, müssen Unterklassen diese umsetzen (es sei denn, sie sind selbst abstrakt).

### **Abstrakte Methoden**

Eine abstrakte Methode hat nur eine Definition, aber keine Umsetzung. Unterklassen müssen diese Methode selbst ausfüllen.

### **Vererbung abstrakter Klassen**

#### **Regeln:**

- Eine Klasse, die von einer abstrakten Klasse erbt, **muss** alle abstrakten Methoden umsetzen – außer sie ist selbst abstrakt.
- Eine abstrakte Klasse kann auch fertige Methoden enthalten, die in Unterklassen direkt verwendet werden können.

#### **Beispiel UML-Klassendiagramm:**



#### **Erklärung:**

<img style="float: right;width: 70%" src="./imgs/abstrakteKlassen.png">

- Die **abstrakte Klasse** **`Person`** gibt vor, dass jede Unterklasse eine `gibKlasse()`-Methode haben muss.
- Die **konkrete Klasse** **`Schüler`** gibt den Namen der Klasse des Schülers zurück (z. B. "TG12").
- Die **konkrete Klasse** **`Lehrer`** gibt alle Klassen zurück, in denen der Lehrer unterrichtet.

<br>
<br>

---

## **Methodenüberladung (Method Overloading)**

### **Definition:**

<img style="width: 30%;float: right;" src="./imgs/ueberladen.png">

- Eine Klasse kann mehrere Methoden mit demselben Namen haben, solange sich die Parameterliste unterscheidet.
- Die Methoden können sich in der Anzahl oder im Typ der Parameter unterscheiden.
- Die Rückgabetypen können variieren, spielen aber für die Überladung keine Rolle.



---

## **Dynamische Polymorphie (Method Overriding)**

### **Definition:**

<img style="width: 30%;float: right;" src="./imgs/dyn_pol.png">

- Eine Methode in einer Unterklasse überschreibt eine Methode der Oberklasse mit demselben Namen und denselben Parametern.
- Die Entscheidung, welche Methode ausgeführt wird, erfolgt **zur Laufzeit**.
- Wird oft mit **abstrakten Klassen** und **Schnittstellen** verwendet.
- Die Methode der Oberklasse kann weiterhin mit `super.methode()` aufgerufen werden.







