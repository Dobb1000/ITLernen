

# 📌 KNN Algorithmus (K-Nearest Neighbors)

## Was ist der KNN-Algorithmus?

- **KNN = K-Nearest Neighbors (K-nächste Nachbarn)**
- **Unüberwachtes oder überwacht lernendes Verfahren** → Meist genutzt für **Klassifikation**, manchmal auch für **Regression**.
- Gehört zu den **Lazy-Learnern** → Kein explizites Trainingsmodell wird erstellt, alle Berechnungen finden bei der Vorhersage statt.
- Idee: **Ein Datenpunkt wird klassifiziert basierend auf den Klassen der K nächsten Nachbarn** (nach Distanz gemessen).

---

## Bedeutung von **K**

- **K = Anzahl der nächsten Nachbarn**, die bei der Klassifikation berücksichtigt werden.
- Beispiel:
  - **K = 3** → Die 3 nächsten Punkte werden angeschaut.
  - Die Klasse, die am häufigsten unter diesen Nachbarn vorkommt → wird als Vorhersage genommen.

### **Einfluss der K-Wahl:**

| K-Wert | Bedeutung | Auswirkungen |
|-------|----------|--------------|
| **K = 1** | Nur der nächste Nachbar zählt. | Sehr empfindlich gegenüber Ausreißern. Kann zu Overfitting führen. |
| **Niedriges K (klein)** | Wenige Nachbarn berücksichtigt. | Sehr flexibel, kann aber stark auf Rauschen reagieren. |
| **Hohes K (groß)** | Viele Nachbarn berücksichtigt. | Glättet Entscheidungen, aber kann wichtige Details verlieren → Risiko von Underfitting. |
| **Optimal: Häufig ungerade Zahl** (bei Klassifikation) | Verhindert Gleichstand. |  |

→ **Tipp:** K oft per **Cross-Validation** wählen!

---

## Distanzverfahren (Distance Metrics)

Die Distanz zwischen Punkten ist entscheidend für KNN! Typische Verfahren:

<img src="/ITLernen/tutorial/KI/img/distanzberechnung.svg" style="width: 70%">

Distanzfunktionen für $\mathbf{P} = (p_1 \mid \dots \mid p_n)$ und $\mathbf{Q} = (q_1 \mid \dots \mid q_n)$}
### Euklidische Distanz
$d(p, q) = \sqrt{ (p_1 - q_1)^2 +  (p_2 - q_2)^2 }$

### Manhattan Distanz
$d(P, Q) = \sum_{i=1}^{n} \left| p_i - q_i \right|
$

### Maximum-Distanz (Chebyshev-Distanz)
$d(P, Q) = \max \left( \left| p_i - q_i \right| \right)$


## Weitere wichtige Punkte

### ✅ **Vorteile:**

- Einfach & intuitiv.
- Keine Annahmen über Datenverteilung.
- Gut für **kleine bis mittlere Datensätze**.

### ❌ **Nachteile:**

- **Rechenintensiv** bei großen Datensätzen → Alle Distanzen müssen berechnet werden.
- **Speicherintensiv**, da alle Datenpunkte gespeichert werden.
- Sensibel gegenüber irrelevanten Features → **Feature Scaling** oft notwendig (z.B. Standardisierung).
- Schlechter bei **hoher Dimensionalität** (Curse of Dimensionality).

---

## Typische Anwendungen:

- **Mustererkennung** (Bilder, Handschriften).
- **Empfehlungssysteme**.
- **Medizinische Diagnosen**.
- **Textklassifikation**.

# Beipsiel KNN-Visualisierung

<iframe style="height: 150vh" onload="resizeIframe(this)" src="/ITLernen/canvas/KI/KNN/knnvis.html" id="not"></iframe>
