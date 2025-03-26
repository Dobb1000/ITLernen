# **VLAN**


## 🔹 **Was ist ein VLAN?**
- **VLAN = Virtual Local Area Network (Virtuelles LAN)**
- Ein VLAN ist eine **logische Unterteilung eines Netzwerks**.
- Normalerweise sind alle Geräte in einem physischen Netzwerk in **einem großen Broadcast-Netz**.
- Mit VLANs kann man ein Netzwerk in **mehrere kleinere, voneinander getrennte Netzwerke aufteilen**, **ohne extra Hardware** (also ohne viele einzelne Switches).
- → Geräte in verschiedenen VLANs können **nicht direkt miteinander kommunizieren** – sie sind wie in „verschiedenen Räumen“ im selben Gebäude.




**Beispiel:**  
Eine Firma will, dass die PCs von Verwaltung und Produktion getrennt sind → Verwaltung = VLAN 10, Produktion = VLAN 20.

[VLAN (einfach erklärt) - Video](https://www.youtube.com/watch?v=AIOtRTGk2ao)


## 🔹 **Warum benutzt man VLANs?**
- **Sicherheit:** Geräte aus verschiedenen Abteilungen sind voneinander isoliert.
- **Ordnung & Übersicht:** Netzwerk bleibt besser strukturiert.
- **Performance:** Weniger unnötiger Datenverkehr (Broadcasts).
- **Flexibilität:** Ein Gerät kann z.B. im VLAN der Verwaltung sein, egal wo es physisch steht.

---

## 🔹 **Wichtige Begriffe & Konzepte**

<img src="/tutorial/Netzwerktechnik/img/VLANTRUNK.svg" />

### **Access Port**
- Wird für **Endgeräte** (PCs, Drucker) verwendet.
- Gehört zu **einem VLAN**.
- **Keine Tags** auf den Datenrahmen → Gerät merkt nichts von VLANs.

---

### **Trunk Port**
- Verbindet **Switches miteinander** oder Switch mit Router.
- **Transportiert mehrere VLANs gleichzeitig**.
- **VLAN-Tags** werden genutzt, damit der Switch weiß, zu welchem VLAN ein Frame gehört.

---

### **VLAN Tagging (IEEE 802.1Q Standard)**

<img src="/tutorial/Netzwerktechnik/img/vlantag.gif" />


- **VLAN-Tag = Zusatzinfo** im Datenrahmen.
- Enthält die **VLAN-ID** (Nummer des VLANs).
- Wird auf **Trunk-Ports** verwendet.
- **Access Ports entfernen den Tag** (Endgeräte sollen nichts merken).

**Technisch:** VLAN-Tag = kleines Zusatzfeld im Ethernet-Frame, sagt „Ich gehöre zu VLAN XY“.

---

### **Native VLAN**
- VLAN, für das auf einem **Trunk-Port kein Tag** gesetzt wird.
- Standardmäßig: **VLAN 1**.
- → Achtung: Kann ein **Sicherheitsrisiko** sein, wenn man es nicht bewusst ändert!

---

## 🔹 **Zusammenfassung**

| Begriff        | Bedeutung                                                                 |
|---------------|--------------------------------------------------------------------------|
| **VLAN**          | Virtuelles Netzwerk zur logischen Trennung innerhalb eines Switches     |
| **Access Port**   | Port für Endgeräte, gehört zu genau einem VLAN, keine Tags              |
| **Trunk Port**    | Switch-zu-Switch-Port, transportiert mehrere VLANs, setzt Tags          |
| **VLAN Tag**      | Zusatzinfo im Datenrahmen (IEEE 802.1Q), enthält VLAN-ID                |
| **Native VLAN**   | VLAN ohne Tag auf Trunk, standardmäßig VLAN 1                           |

