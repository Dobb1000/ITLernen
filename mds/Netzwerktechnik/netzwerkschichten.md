# **Netzwerkschichten (OSI-Modell)**

Das **OSI-Modell (Open Systems Interconnection Model)** unterteilt die Kommunikation in Netzwerken in **7 Schichten**, um Komplexität zu reduzieren und Interoperabilität zu gewährleisten.

---

## **Übersicht der 7 Schichten**

| Schicht | Name                   | Funktion                                                                 | Protokolle/Beispiele           |
|--------:|:----------------------|:------------------------------------------------------------------------|:-------------------------------|
| 7       | Anwendungsschicht      | Stellt Dienste für Anwendungen bereit (z. B. E-Mail, Webbrowser)         | HTTP, FTP, SMTP, DNS           |
| 6       | Darstellungsschicht    | Datenformatierung, Verschlüsselung, Kompression                          | JPEG, SSL/TLS, ASCII, MPEG     |
| 5       | Sitzungsschicht        | Steuerung von Verbindungen/Sitzungen zwischen Anwendungen                | NetBIOS, RPC                   |
| 4       | Transportschicht       | Zuverlässiger Datenfluss, Fehlererkennung, Flusskontrolle                | TCP, UDP                       |
| 3       | Vermittlungsschicht    | Wegfindung (Routing), logische Adressierung                              | IP, ICMP, IPsec                |
| 2       | Sicherungsschicht      | Fehlererkennung auf Übertragungsstrecke, MAC-Adressen, Frames            | Ethernet, PPP, Switch          |
| 1       | Bitübertragungsschicht | Übertragung von Bits über physikalische Medien (Kabel, Funk)             | WLAN, Bluetooth, DSL, Hub      |

---

## **Schichten im Detail**
<img src="/ITLernen/tutorial/Netzwerktechnik/img/bitpumpgun.svg" style="width: 15%; float: right" />

### **1. Bitübertragungsschicht (Physical Layer)**


- Überträgt rohe Bits (0 & 1) über physikalisches Medium.
- Definiert Stecker, Spannungen, Kabeltypen.
- Beispiele: RJ45, Lichtwellenleiter, Funkfrequenzen.

---

### **2. Sicherungsschicht (Data Link Layer)**
- Sichert fehlerfreie Übertragung direkt zwischen zwei Geräten.
- Teilt Daten in Frames auf, fügt MAC-Adressen hinzu.
- Unterteilt in:
    - Media Access Control (MAC)
    - Logical Link Control (LLC)
- Beispiele: Ethernet, WLAN (802.11), Switch.

---

### **3. Vermittlungsschicht (Network Layer)**
- Bestimmt den besten Weg für Datenpakete (Routing).
- Verwendet IP-Adressen.
- Zerlegt große Pakete in kleinere.
- Beispiele: IPv4, IPv6, ICMP, Router.

---

### **4. Transportschicht (Transport Layer)**
- End-to-End-Kommunikation.
- Sichert vollständige, fehlerfreie Übertragung.
- Wichtige Protokolle:
    - **TCP**: Verbindungsorientiert, zuverlässig.
    - **UDP**: Verbindungslos, schneller, aber unzuverlässig.

---

### **5. Sitzungsschicht (Session Layer)**
- Aufbau, Steuerung und Beendigung von Sitzungen zwischen Anwendungen.
- Synchronisation von Datenflüssen.
- Beispiel: Remote Procedure Call (RPC).

---

### **6. Darstellungsschicht (Presentation Layer)**
- Übersetzt Daten in ein standardisiertes Format.
- Verschlüsselung & Kompression.
- Beispiele: SSL/TLS, JPEG, ASCII, MPEG.

---

### **7. Anwendungsschicht (Application Layer)**
- Nächste Schicht zur Benutzeranwendung.
- Stellt Netzwerkdienste bereit (z. B. Web, E-Mail).
- Beispiele: HTTP, FTP, SMTP, DNS.

---


## **Zusatz: TCP/IP-Modell (vereinfachte Praxisversion)**

| TCP/IP-Schicht      | Entsprechung im OSI-Modell                 |
|--------------------|--------------------------------------------|
| Anwendung          | Anwendung, Darstellung, Sitzung (Schicht 5-7) |
| Transport          | Transportschicht (Schicht 4)               |
| Internet           | Vermittlungsschicht (Schicht 3)            |
| Netzwerkzugriff    | Sicherung + Bitübertragung (Schicht 1-2)   |
