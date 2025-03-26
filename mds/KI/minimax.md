# **Minimax-Algorithmus**

## 🎯 **Ziel des Minimax-Algorithmus**
- Für **2-Personen-Nullsummenspiele** (z.B. Tic-Tac-Toe, Schach).
- Annahme: Beide Spieler spielen **perfekt**.
- Ziel:
    - **Maximierer (Spieler 1)**: Maximiert eigenen Gewinn.
    - **Minimierer (Spieler 2)**: Minimiert Gewinn des Gegners → eigene Verluste minimieren.



## 🌳 **Ablauf**

1. **Spielbaum erzeugen**:
    - Jeder Knoten = ein möglicher Spielzustand.
    - Kanten = mögliche Züge beider Spieler.

2. **Bewertung der Endzustände (Blätter)**:
    - Jeder Endzustand erhält einen **numerischen Wert** (z.B. +1 Gewinn, 0 Unentschieden, -1 Verlust).

3. **Rückwärts bewerten (Bottom-Up)**:
    - Start an den Blättern → arbeite dich zur Wurzel zurück.
    - **Maximierer**: Wählt jeweils den **höchsten** möglichen Wert.
    - **Minimierer**: Wählt den **niedrigsten** möglichen Wert.

4. **Optimale Entscheidung**:
    - Der Wert der Wurzel gibt den bestmöglichen Startzug für den Maximierer an.


## 🧠 **Wichtige Eigenschaften**

| Begriff               | Erklärung                                                                 |
|----------------------|--------------------------------------------------------------------------|
| **Deterministisch**   | Keine Zufallszüge, der Algorithmus entscheidet eindeutig.                 |
| **Vollständig**       | Findet bei endlichem Spielbaum garantiert den besten Zug.                |
| **Optimal**           | Liefert perfektes Spielverhalten, solange Bewertungsfunktion korrekt ist. |
| **Komplexität**       | Exponentiell in der Tiefe des Baums → je mehr Züge möglich, desto rechenintensiver. |



## ⚙️ **Optimierungsmöglichkeit**
- **Alpha-Beta-Pruning**:
    - Schneidet Teilbäume ab, die das Ergebnis nicht mehr beeinflussen können.
    - Reduziert Rechenaufwand, ohne das Ergebnis zu verändern.

## 📌 **Zusammenfassung in einem Satz:**

> **Minimax** berechnet alle möglichen Spielverläufe, bewertet Endzustände und entscheidet so, dass der eigene Gewinn maximiert wird, während der Gegner den eigenen Verlust minimieren will.





## 📚 **Beispiel: Tic-Tac-Toe**

<iframe style="height: 150vh" onload="resizeIframe(this)" src="/canvas/KI/TTT/TTT.html" id="not"></iframe>

