# 📡 IoT - Internet of Things

## Verbindungstypen
- **M2M** (Machine to Machine): Dinge kommunizieren direkt miteinander
- **H2M** (Human to Machine): Menschen kommunizieren mit Dingen

---

# 📶 Protokoll - Schichten - Modell

## Schichtenmodelle
- **7-Schicht-Modell (ISO/OSI)**
- **5-Schicht-Modell (Protokoll-Stack)**

> Die Schichten werden je nach Anwendungsentwicklung festgelegt.

| OSI Layer | Name         | Funktion |
|-----------|--------------|----------|
| 7         | Application  | Schnittstelle für Anwendungen (HTTP, FTP, SMTP, etc.) |
| 6         | Presentation | Übersetzung, Verschlüsselung & Kompression |
| 5         | Session      | Verwaltung der Sitzung |
| 4         | Transport    | Ende-zu-Ende Verbindung & Datenflusskontrolle (TCP/UDP) |
| 3         | Network      | Routing & logische Adressierung (IP, ICMP) |
| 2         | Data Link    | Fehlerkontrolle & physikalische Adressierung (MAC) |
| 1         | Physical     | Übertragung physikalischer Rohdaten (Kabel, Antennen) |


<img src="/tutorial/iot/img/schichtendetail.png">

---

# 🔌 TCP vs. UDP

## TCP (Transmission Control Protocol)
- Zuverlässig, verbindungsorientiert
- Reihenfolge & Ankunft garantiert
- 3-Wege-Handshake: SYN → SYN-ACK → ACK
- Beispiel: Web, E-Mail, Downloads
- Nachricht wird segmentiert

## UDP (User Datagram Protocol)
- Keine Garantie für Reihenfolge oder Empfang
- Verbindungslos
- Beispiel: Streaming, Online-Gaming, VoIP

---

# 🔢 Ports & Sockets

## Ports
- Jede Anwendung/Prozess hat eine Portnummer
    - HTTP: 80
    - HTTPS: 443
    - Beispiel: `https://128.193.245.12:80/`

## Socket
- Schnittstelle zwischen Anwendung & Transport Layer
- Kommunikationseinheit zwischen Client & Server
- Identifikation über IP + Port + Protokoll
- Benötigt Vereinbarung über Datenformat (Protokoll)

---

# 📄 Protokolle

| Protokoll | Bedeutung                      |
|-----------|-------------------------------|
| HTTP      | HyperText Transfer Protocol    |
| SMTP      | Simple Mail Transfer Protocol  |
| DNS       | Domain Name System             |

### Definition
> Protokoll = Festlegung von Regeln & Konventionen für Kommunikation

- Teilprotokolle kümmern sich um Teilaufgaben
- Schnittstellen zu Nachbarprotokollen müssen definiert sein
- Protokoll-Suite = zusammenhängende Sammlung
- Idee: Austauschbarkeit & modulare Entwicklung

---

# 🔁 TCP - 3-Wege-Handshake

<img src="/tutorial/iot/img/3way.png">

1. **SYN** → Anfrage zum Verbindungsaufbau
2. **SYN-ACK** → Empfangsbestätigung
3. **ACK** → Sende-Bestätigung

- Vollduplex-Kommunikation
- Zuverlässig (z. B. HTTP-Dateiübertragung)

---

# 🌐 HTTP - Kommunikation

## HTTP Request
- Methode (GET, POST, PUT, DELETE)
- Ziel-URL & HTTP-Version
- Header (Host, User-Agent, Accept...)
- Optionaler Body

## HTTP Response
- Status Line: HTTP-Version, Statuscode, Beschreibung
- Wichtige Codes:
    - 200 OK
    - 304 Not Modified
    - 404 Not Found
    - 500 Internal Server Error

## Merkmale
- Anfrage-Antwort-Modell (Request-Response)
- Zustandslos (jede Anfrage wird separat behandelt)

---

# 🔎 Wireshark

- **Packet Sniffer**: Echtzeit-Analyse von Netzwerkverkehr
- **Packet Capture Library**: libpcap (Linux), npcap (Windows)
- **Packet Analyzer**: Analysiert Pakete (Adressen, Protokolle etc.)

---

# 📡 MQTT - Message Queuing Telemetry Transport

## Grundlagen
- Client-Server-Protokoll
- Kommunikation über einen **Broker**
- Clients senden/empfangen Nachrichten (Publish/Subscribe)

<img src="https://www.informatik-aktuell.de/fileadmin/_processed_/8/e/csm_mqtt_abb1_florian_raschbichler_7c71575e82.png">

## Topicstruktur & Wildcards

<img src="/tutorial/iot/img/topicstruktur.svg">

<br>
<br>

- `#` Multilevel: z. B. Wohnung/# -> gibt alle Topics was unter Wohnung ist aus
- `+` Single-Level: z. B. Wohnung/+/Temp -> gibt alle Temperaturen-Topics aus!

## QoS (Quality of Service)

| Stufe | Garantie              | Risiko                  |
|-------|------------------------|--------------------------|
| 0     | Fire & Forget         | Nachrichtenverlust       |
| 1     | Mind. einmal zustellen| Duplikate möglich        |
| 2     | Genau einmal          | Keine Duplikate/Verlust  |

## Weitere Features
- **Retained Messages**:
    - Time-Decoupling: pub & sub müssen nicht gleichzeitig aktiv sein
    - Space-Decoupling: pub & sub kennen sich nicht

- **Last Will & Testament (LWT)**:
    - Nachricht bei plötzlichem Verbindungsabbruch
    - Beispiel: "Wenn Gerät nicht mehr erreichbar, schalte Licht aus"

---

## Technisches zu MQTT

- Binär-basiertes Protokoll
- Kontrollfelder in Bytes
- Aufbau:

| Teil           | Beschreibung                     |
|----------------|----------------------------------|
| Control Header | 1 Byte                           |
| Packet Length  | 1-4 Bytes                        |
| Variable Header| 0-y Bytes (abh. von Nachricht)   |
| Payload        | 0-x Bytes                        |

> Min. MQTT-PDU: 2 Bytes (Control + Length)

- Authentifizierung mit UTF-8 (Username, PW, ClientId)
- QoS 2 Ablauf: Connect ⇄ Ack, Subscribe ⇄ Ack, Publish ⇄ Ack

---

# ⚔️ HTTP vs. MQTT

| Kriterium              | MQTT                                  | HTTP                          |
|------------------------|----------------------------------------|-------------------------------|
| Architektur            | Pub/Sub (1:N)                         | Request/Response (1:1)        |
| Format                 | Binär                                 | Textbasiert                   |
| Ressourcenverbrauch    | Gering                                 | Hoch                          |
| Sicherheit             | Muss ergänzt werden (TLS möglich)      | HTTPS                         |
| Push-Funktion          | Ja                                     | Nein                          |
| Verbreitung            | Weniger verbreitet                     | Sehr weit verbreitet          |
| Vorteile               | Ressourcenschonend, Zusatzfunktionen   | Einfach, bekannt, sicher      |
| Nachteile              | Broker-Abhängig, keine Verschlüsselung | Kein Pub/Sub, mehr Overhead   |