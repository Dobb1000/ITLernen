# **Entscheidungsbaum & Gini-Koeffizient**



## 🌳 **Entscheidungsbaum:**

Ein Entscheidungsbaum besteht aus Knoten:
- **Frage?**
    - **Ja** → neuer Knoten/Blatt
    - **Nein** → neuer Knoten/Blatt

### **Beispiel:**

<img style="width: 50%; float: left" src="/ITLernen/tutorial/KI/img/affen.svg">
<img style="width: 45%; float: right" src="/ITLernen/tutorial/KI/img/affen2.svg">

<br>
<br><br><br><br><br><br><br><br>

Aufgabe: Erstelle ein Baumdiagramm, das zeigt, ob der Affe beißt oder nicht.

<details>
  <summary>Lösung des Baumdiagramm </summary>

<img style="width: 50%; " src="/ITLernen/tutorial/KI/img/diagram.png">
</details>


## 📊 **Beispiel: Konfusionsmatrix**


| Weekend | Weather | Parents | Money | Decision  |
|--------|--------|--------|--------|--------|
| W1     | Sunny  | Yes    | Rich   | Cinema   |
| W2     | Sunny  | No     | Rich   | Tennis   |
| W3     | Windy  | Yes    | Rich   | Cinema   |
| W4     | Rainy  | Yes    | Poor   | Cinema   |
| W5     | Rainy  | No     | Rich   | Stay In  |
| W6     | Rainy  | Yes    | Poor   | Cinema   |
| W7     | Windy  | No     | Poor   | Cinema   |
| W8     | Windy  | No     | Rich   | Shopping |
| W9     | Windy  | Yes    | Rich   | Cinema   |
| W10    | Sunny  | No     | Rich   | Tennis   |

**Ein Attribut sollte möglichst weit oben im Baum stehen, wenn seine verschiedenen Attributwerte zu möglichst klaren Entscheidungen führen.**
 - Bsp.: Wenn Money=Poor, dann ist die Entscheidung immer Cinema
 - Bsp.: Wenn Parents=Yes, dann ist die Entscheidung immer Cinema


## 📏 **Metriken:**

### **1. Genauigkeit (Accuracy):**

→ Die Genauigkeit sagt dir:

Wie viele Datenpunkte wurden insgesamt korrekt klassifiziert?

<br>

$$
\frac{\text{richtig klassifiziert}}{\text{alle Testdaten}}
$$


### **2. Sensitivität (Recall für positive Klasse):**

→ Die Sensitivität zeigt:

Wie gut erkennt der Baum die positiven Daten (hier: giftig)?

Sie misst also den Anteil der wirklich positiven Daten, die auch korrekt als positiv erkannt wurden.

<br>

$$
\frac{\text{Anzahl richtig positiv klassifizierte Daten}}{\text{alle positiven Daten}}
$$

### **3. Spezifität (Recall für negative Klasse):**

Was bedeutet das?

→ Die Spezifität zeigt:

Wie gut erkennt der Baum die negativen Daten (hier: essbar)?

Sie misst den Anteil der wirklich negativen Daten, die auch korrekt als negativ erkannt wurden.

<br>

$$
\frac{\text{Anzahl richtig negativ klassifizierte Daten}}{\text{alle negativen Daten}}
$$


## 💡 **Gini-Koeffizient**
- Der Gini-Koeffizient misst, wie „unordentlich“ Daten sind, d.h. wie ungleichmäßig die Werte eines Ziel-Features verteilt sind

  - Bsp. `Weather=Windy` → <br>
    **[Cinema, Cinema, Shopping, Cinema]** <br>
    → recht ordentlich → niedriger Gini-Koeffizient<br>

  - Bsp. `Parents=No` → <br>
    **[Tennis, Stay-In, Cinema, Shopping, Tennis]** <br>
    → eher unordentlich → hoher Gini-Koeffizient <br>


- Gini = 0: Alle Daten haben beim Ziel-Feature denselben Wert → perfekte Ordnung
- Maximalwert 1, aber in der Regel deutlich niedriger
  - Bei 2 möglichen Werten: Maximalwert Gini = 0,5
  - Bei n möglichen Werten: Maximalwert Gini = 1- $\frac{1}{n}$ (nähert sich 1)

### Gini-Berechnung für ausgewählte Datensätze

Gegeben:
- **D**: (Ausgewählte) Datensätze
- **K**: Anzahl möglicher Werte für das Ziel-Feature  
  Hier: $K = 4$ (4 Entscheidungen möglich)
- $p_i$: relative Häufigkeit des $i$-ten Werts in $D$

**Beispiel:**  
In der Gesamtliste ist $p_\text{cinema} = \frac{6}{10}$  
(An 6 von 10 Wochenenden gehe ich ins Kino)

**Berechnung der Gini-Unreinheit:**

$$
\text{Gini}(D) = 1 - \sum_{i=1}^{K} (p_i)^2
$$

Für das Beispiel:

$$
\text{Gini}(\text{Gesamt}) = 1 - \left( \left( \frac{6}{10} \right)^2 + \left( \frac{2}{10} \right)^2 + \left( \frac{1}{10} \right)^2 + \left( \frac{1}{10} \right)^2 \right) = 0.58
$$


## 💡 **Gewichteter Gini-Koeffizient (für Features):**

$$
\text{Gini}(F) = \sum_{v \in V_F} p_v \times \text{Gini}(F = v)
$$

<img style="width: 70;" src="/ITLernen/tutorial/KI/img/gini_bed.png">


- **F**: Ein Feature  
  Beispiel: *Parents*

- $V_F$: Mögliche Werte dieses Features  
  Beispiel: $\{ \text{yes}, \text{no} \}$

- $v$: Ein bestimmter Wert des Features  
  Beispiel: $\text{no}$

- $p_v$: Relative Häufigkeit von $F = v$ in den Daten  
  Beispiel: $p_\text{no} = \frac{5}{10}$



Die Berechnung der Gini-Unreinheit für den Fall **Parents = Yes**:

$$
\text{Gini}(\text{Parents} = \text{Yes}) = 1 - \left( \left( \frac{5}{5} \right)^2 + \left( \frac{0}{5} \right)^2 + \left( \frac{0}{5} \right)^2 + \left( \frac{0}{5} \right)^2 \right) = 0
$$


Die Berechnung der Gini-Unreinheit für den Fall **Parents = No**:

$$
\text{Gini}(\text{Parents} = \text{No}) = 1 - \left( \left( \frac{2}{5} \right)^2 + \left( \frac{1}{5} \right)^2 + \left( \frac{1}{5} \right)^2 + \left( \frac{1}{5} \right)^2 \right) = 0.72
$$

### Gesamte Gini-Berechnung für das Feature Parents

Die gewichtete Gini-Unreinheit für das Feature **Parents** ergibt sich durch:

$$
\text{Gini}(\text{Parents}) = \frac{5}{10} \times 0 + \frac{5}{10} \times 0.72 = 0.36
$$

# Übung

| Weekend | Weather | Parents | Money | Decision  |
|--------|--------|--------|--------|--------|
| W1     | Sunny  | Yes    | Rich   | Cinema   |
| W2     | Sunny  | No     | Rich   | Tennis   |
| W3     | Windy  | Yes    | Rich   | Cinema   |
| W4     | Rainy  | Yes    | Poor   | Cinema   |
| W5     | Rainy  | No     | Rich   | Stay In  |
| W6     | Rainy  | Yes    | Poor   | Cinema   |
| W7     | Windy  | No     | Poor   | Cinema   |
| W8     | Windy  | No     | Rich   | Shopping |
| W9     | Windy  | Yes    | Rich   | Cinema   |
| W10    | Sunny  | No     | Rich   | Tennis   |

Berechne die gewichteten Gini-Koeffizienten für die Features
- Money und
- Weather

<details>
  <summary>Lösung</summary>

$
\text{Gini}(\text{Money}) = \frac{3}{10} \times 0 + \frac{7}{10} \times 0{,}694 = 0{,}486
$

$
\text{Gini}(\text{Weather}) = \frac{3}{10} \times 0{,}444 + \frac{3}{10} \times 0{,}444 + \frac{4}{10} \times 0{,}375 = 0{,}416
$

$
\text{Gini}(\text{Parents}) = \frac{5}{10} \times 0 + \frac{5}{10} \times 0{,}72 = 0{,}36
$

<img src="/ITLernen/tutorial/KI/img/entscheidungsbaum_uebung.png">

</details>


