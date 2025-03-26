# **Protokollanalyse IP/TCP – TCP-Handshake**

## 1️⃣ **Grundlagen IP & TCP**

### 🔹 **IP (Internet Protocol)**
- Verantwortlich für **Adressierung** & **Routing** der Datenpakete.
- Arbeitet **verbindungslos** & **unzuverlässig**.
- Daten werden in **IP-Paketen** übertragen.
- Wichtige Felder im IP-Header:
    - **Source IP Address**
    - **Destination IP Address**
    - **TTL (Time To Live)**
    - **Protocol (zeigt an, ob TCP, UDP, etc.)**

### 🔹 **TCP (Transmission Control Protocol)**
- Verbindung orientiert (verbindungsaufbauend).
- Zuverlässige, geordnete Datenübertragung.
- Fehlererkennung durch **Checksummen** & **Bestätigungen (ACKs)**.
- Arbeitet oberhalb von IP.

---

## 2️⃣ **TCP 3-Way-Handshake**

### 📌 **Zweck:**
- Aufbau einer **zuverlässigen Verbindung** zwischen Client & Server.

### 🟢 **Ablauf:**

| Schritt | Sender | Aktion | Flags | Beschreibung |
|--------|--------|------|-------|--------------|
| **1** | Client | Sendet Verbindungsanfrage | **SYN** | Client möchte Verbindung aufbauen, sendet Start-Sequence-Nummer. |
| **2** | Server | Antwortet | **SYN + ACK** | Server bestätigt Anfrage (ACK) + sendet eigene SYN-Anfrage zurück. |
| **3** | Client | Bestätigt | **ACK** | Client bestätigt die Anfrage des Servers. |

**Danach:** Verbindung ist **etabliert** → Datenübertragung beginnt!

### Beispiel Wireshark:

<img src="/tutorial/Netzwerktechnik/img/wireshark_tcp_handshake.png" />



## 5️⃣ **Verbindung beenden: TCP Teardown**

| Schritt | Aktion | Flags |
|--------|------|-------|
| **1** | Eine Seite sendet FIN | FIN |
| **2** | Andere Seite bestätigt mit ACK | ACK |
| **3** | Andere Seite sendet ebenfalls FIN | FIN |
| **4** | Erste Seite bestätigt | ACK |

---

## 6️⃣ **Zusammenfassung:**

- **Handshake = SYN → SYN+ACK → ACK**
- Verbindung ist nach 3 Schritten stabil.
- Analyse mit Wireshark möglich → Fokus auf Flags & Sequence Numbers.
- TCP sorgt für Zuverlässigkeit, IP nur für Zustellung.
