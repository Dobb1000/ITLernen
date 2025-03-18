# KI-Arten

## Supervised Learning (Überwachtes Lernen)

![Supervised Learning](https://computingeducation.de/static/181162c7315d5e80122e93594bf51a4f/a1a13/Supervised.png)

- **Definition**: Lernen mit **beschrifteten (gelabelten) Daten**
- **Ziel**: Zuordnung von Eingaben zu vorgegebenen Ausgaben (Labels)
- **Ablauf**:
    - Nutzung großer Menge **beschrifteter Trainingsdaten**
    - Modell lernt **Regeln zur Zuordnung Eingabe → Ausgabe**
    - **Feedback möglich** (korrekt/falsch)
    - **Testdaten** zur Evaluation (nicht im Training benutzt)

### Typische Aufgaben & Beispiele:
- **Klassifikation**:
    - Erkennung von E-Mails als **Spam/Nicht-Spam**
    - Bilderkennung: **Katze oder Hund**
    - Kreditvergabe: **Risikoklassifizierung von Kreditnehmern**
- **Regression**:
    - **Vorhersage von Hauspreisen**
    - **Schätzung von Aktienkursen**
    - Prognose: **Wann kündigt ein Kunde sein Abo?**

### Typische Algorithmen:
- **KNN (K-Nearest Neighbors)**: Klassifikation/Regression basierend auf den nächsten Nachbarn im Merkmalsraum.
- **Entscheidungsbäume**: Treffen Entscheidungen anhand von Merkmalen, als Baumstruktur dargestellt (if/else-Logik).
- **Neuronale Netze**

---

## Unsupervised Learning (Unüberwachtes Lernen)

![Unsupervised Learning](https://computingeducation.de/static/32b60afbddd529d044cf210592562f77/cfc2e/Unsupervised.png)

- **Definition**: Lernen mit **unbeschrifteten Daten**
- **Ziel**: **Muster und Strukturen erkennen**
- **Ablauf**:
    - Keine Labels vorhanden
    - Modell gruppiert ähnliche Daten → **Clustering**
    - Findet auch **Ausreißer (Anomalieerkennung)**

### Typische Aufgaben & Beispiele:
- **Clustering**:
    - **Kundensegmentierung** im Online-Shop (z.B. Kunden nach Kaufverhalten gruppieren)
    - **Thematische Gruppierung von Texten** (z.B. News-Artikel nach Themen)
- **Anomalieerkennung**:
    - **Kreditkartenbetrug erkennen**
    - **Ungewöhnlicher Netzwerkverkehr (Cybersecurity)**
- **Assoziationsanalyse**:
    - **Produktempfehlungen im Online-Shop** („Kunden, die X kauften, kauften auch Y“)

### Typische Algorithmen:
- **KMC (K-Means Clustering)**: Teilt Daten in **K Cluster**, basierend auf Ähnlichkeiten.
- **Hierarchisches Clustering**
- **Principal Component Analysis (PCA)**

---

## Reinforcement Learning (Verstärkendes Lernen)

![Reinforcement Learning](https://computingeducation.de/static/eefb5f6dfa97809284cac4719db3bd51/bdf8d/Reinforcement.png)

- **Definition**: Lernen durch **Belohnung & Bestrafung**
- **Ziel**: Entwicklung einer **optimalen Strategie**
- **Ablauf**:
    - **Agent interagiert** mit Umwelt
    - Führen von Aktionen → **Belohnung/Bestrafung**
    - **Zustand → Aktion → Feedback → Anpassung**
    - Kein Datensatz nötig, Lernen durch **Exploration & Erfahrung**

### Typische Aufgaben & Beispiele:
- **Spiele**:
    - **Schach & Go (AlphaZero)**
    - **Snake oder Pacman Bots**
- **Robotik & autonomes Fahren**:
    - **Selbstfahrende Autos**, lernen sich sicher zu bewegen
    - **Robotergreifarme**, lernen Objekte korrekt zu greifen
- **Optimierungsprobleme**:
    - **Intelligente Heizungssteuerung** (Sparen & Komfort)
    - **Fahrplanoptimierung bei Bahnlinien)

### Typische Methoden:
- **Q-Learning**
- **Deep Q-Networks (DQN)**
- **Policy Gradient Methods**

---

## 🔗 Quellen

- Inhalte & Bilder aus: [computingeducation.de - So lernen Maschinen](https://computingeducation.de/proj-ml-uebersicht-)

---

