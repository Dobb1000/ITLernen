# 🟢 **Spanning Tree Protocol (STP)**

---

## 🔹 **Redundanz im Netzwerk – kurz erklärt:**

- **Redundanz** bedeutet:  
  Es gibt **mehrere Verbindungen** zwischen den Switches.

- **Warum gut?**  
  → Wenn eine Verbindung ausfällt, gibt es noch eine zweite → das Netzwerk bleibt **stabil**!

- **Aber:**  
  Mehrere Verbindungen können **Schleifen** (Loops) verursachen → Pakete kreisen endlos → **Netzwerk wird überlastet!**

💡 **STP löst dieses Problem.**

---

## 🔹 **Was macht STP?**
- STP (Spanning Tree Protocol) sorgt dafür, dass das Netzwerk **loopfrei** bleibt.
- Es **blockiert bestimmte Verbindungen**, sodass ein stabiler, sicherer Weg ohne Schleifen entsteht.
- Das Netzwerk wird dadurch wie ein **Baum aufgebaut** (ohne Kreise).

---

## 🔹 **Wie funktioniert STP?**

Am Anfang sind **alle Ports blockiert**, um sicherzustellen, dass es **keine Schleifen** im Netzwerk gibt. Dann geht STP Schritt für Schritt vor und entscheidet, **welche Ports wieder freigegeben werden**:

1. **Root Bridge wählen:**
    - Alle Switches tauschen Steuerinformationen aus (BPDUs).
    - Der Switch mit der **niedrigsten Bridge-ID** wird zur **Root Bridge** (also zum Chef des Netzwerks).

2. **Beste Verbindungen bestimmen:**
    - Jeder Switch berechnet:  
      **Welcher Weg zur Root Bridge ist der kürzeste und beste?**
    - Dafür schaut STP auf die **Kosten der Verbindungen** (je schneller die Verbindung, desto niedriger die Kosten).

3. **Wichtige Ports freigeben:**

| **Port-Rolle**           | **Was passiert?**                                                                              |
|-------------------------|-----------------------------------------------------------------------------------------------|
| **Root Port (RP)**       | Der Port mit dem kürzesten Weg zur Root Bridge → wird freigegeben.                              |
| **Designated Port (DP)** | Der beste Port auf jedem Netzwerksegment → wird freigegeben.                                    |
| **Blocked Port**         | Alle anderen Ports bleiben blockiert → sie werden **nicht genutzt**, um Loops zu verhindern.    |

4. **Wenn sich etwas ändert (z. B. ein Kabel fällt aus):**
    - STP rechnet neu.
    - Ports, die vorher blockiert waren, können freigegeben werden, um den Verkehr umzuleiten.

### **Zusammengefasst:**
→ **STP blockiert zuerst alle Ports → dann schaltet es die besten Verbindungen frei → der Rest bleibt blockiert, um Loops zu verhindern!**

---

## 🔹 **Port-Zustände bei STP:**

| **Zustand**    | **Funktion**                                                        |
|---------------|---------------------------------------------------------------------|
| **Blocking**  | Port ist deaktiviert (nur zuhören, keine Daten weiterleiten).        |
| **Listening** | STP-Infos werden ausgetauscht.                                       |
| **Learning**  | MAC-Adressen werden gelernt.                                        |
| **Forwarding**| Port leitet Datenverkehr weiter.                                    |
| **Disabled**  | Port ist abgeschaltet.                                              |

---

## 🔹 **Wichtig: Warum Redundanz + STP zusammen gut sind:**

| **Redundanz bringt:**         | **Problem ohne STP:**          | **STP sorgt dafür, dass:**                       |
|------------------------------|-------------------------------|-------------------------------------------------|
| Mehr Verbindungen → Ausfallsicherheit | Schleifen & Netzwerk-Chaos | Nur die besten Verbindungen aktiv bleiben       |
| Ersatzwege bei Ausfall        | Broadcast Storms               | Redundante Verbindungen sicher genutzt werden    |

---

## 🔹 **Zusammenfassung:**
- **STP schützt das Netzwerk vor gefährlichen Schleifen.**
- Redundanz (mehrere Verbindungen) ist gut für Sicherheit & Ausfallschutz.
- STP entscheidet automatisch, welche Verbindungen aktiv sind und welche blockiert werden.
- Bei Ausfällen aktiviert STP blockierte Verbindungen → Netzwerk bleibt stabil.

---

**Kurzer Merksatz:**  
_"Redundanz hält dein Netzwerk stabil – STP sorgt, dass es nicht durchdreht."_ 🌳✅

