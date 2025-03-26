# K-Means Clustering

## 🌟 **Grundidee:**
K-Means ist ein **unüberwachter** Lernalgorithmus zur **Clusterbildung**:
- Ziel: Datenpunkte in **K Gruppen (Cluster)** einteilen.
- Jedes Cluster hat einen sogenannten **Cluster-Schwerpunkt (Centroid)**.
- Punkte werden dem Cluster mit dem **nächstgelegenen Schwerpunkt** zugeordnet.



## 🔢 **Ablauf des Algorithmus:**

<img style="width: 40%; float: right" src="/tutorial/KI/img/kmeans_pap.png">

1. **Anzahl der Cluster K festlegen**.
2. **Initialisierung**: Zufällige Auswahl von K Start-Zentroiden.
3. **Zuweisung**: Jedem Datenpunkt wird der nächstgelegene Zentroid zugewiesen (meistens mit **euklidischer Distanz**).
4. **Aktualisierung**: Zentroiden neu berechnen als Mittelwert aller zugewiesenen Punkte.
5. **Wiederholen**: Schritte 3 & 4, bis:
    - Zentroiden sich kaum noch ändern (Konvergenz),
    - oder eine maximale Anzahl von Iterationen erreicht ist.



## 🧠 **Wahl der richtigen K:**
- **Elbow-Methode**:  
  Plot von „Summe der quadratischen Abweichungen“ (SSE) gegen verschiedene K-Werte.
    - „Knick“ (Elbow) zeigt gutes K an.

- **Silhouette Score**:  
  Misst, wie ähnlich ein Punkt seinem eigenen Cluster ist, im Vergleich zu anderen Clustern.



## ✅ **Vorteile:**
- Einfach & schnell (vor allem bei großen Datenmengen)
- Leicht verständlich
- Gute Performance bei klar getrennten Clustern



## ❌ **Nachteile:**
- **K muss vorher bekannt sein**
- Sensitiv gegenüber:
    - Initialisierung der Zentroiden
    - Ausreißern
    - Nicht-kugelförmigen Clustern
- Findet nur **lokales Minimum** (nicht garantiert optimal)




## 📊 **Wichtige Begriffe:**

| Begriff         | Bedeutung                                                                                     |
|--|--|
| **Cluster**     | Gruppe ähnlicher Datenpunkte                                                                  |
| **Zentroid**    | Mittelpunkt eines Clusters (arithmetisches Mittel)                                            |
| **Distanzmaß**  | Meist **euklidische Distanz** (Abstand zwischen Punkten)                                      |
| **K**           | Anzahl der Cluster (muss vorher festgelegt werden)                                            |




## 🔥 **Varianten & Verbesserungen:**
- **K-Means++**: Bessere Initialisierung der Zentroiden, stabilere Ergebnisse.
- **Mini-Batch K-Means**: Für sehr große Datensätze, schneller durch zufällige Mini-Batches.


## 📂 **Typische Anwendungsgebiete:**
- Kundensegmentierung
- Bildkompression
- Dokument-Clustering
- Anomalie-Erkennung



## 💡 **Tipp für die Klausur:**
Immer erwähnen:
- Initialisierung, Konvergenz-Kriterium, Distanzmaß!
- Vor- und Nachteile sauber erklären.
- Optimalen K-Wert bestimmen (Elbow, Silhouette).



# Beipsiel KMC-Visualisierung

<iframe style="height: 150vh" onload="resizeIframe(this)" src="/canvas/KI/KMC/kmcvis.html" id="not"></iframe>
