# **Subnetting**

## 🔹 Was ist Subnetting?
Subnetting ist das Aufteilen eines großen IP-Netzwerks (z.B. Klasse A, B, C) in kleinere, logisch getrennte Teilnetze (Subnets). Es verbessert die Netzwerkeffizienz, Sicherheit & Organisation.

---

## 🔹 IPv4 Grundlagen

| Begriff         | Bedeutung                                    |
|-----------------|----------------------------------------------|
| IPv4-Adresse    | 32 Bit, dargestellt als 4 Dezimalzahlen      |
| Beispiel        | 192.168.1.0                                  |
| Subnetzmaske    | Bestimmt den Netz- & Hostanteil der Adresse  |
| Beispiel Maske  | 255.255.255.0 → /24                          |

---

## 🔹 Subnetzmaske und CIDR-Notation

| CIDR | Dezimal Maske          | Anzahl Hosts  |
|------|-----------------------|--------------|
| /8   | 255.0.0.0              | 16.777.214   |
| /16  | 255.255.0.0            | 65.534       |
| /24  | 255.255.255.0          | 254          |
| /30  | 255.255.255.252        | 2            |

**Formel für Hosts:**  
`2^(Anzahl Hostbits) - 2`  
(2 Adressen für Netzwerk- & Broadcast-Adresse abziehen)

---

## 🔹 Subnetting Schritte (klassisch)

1. **Netzwerkadresse & Maske notieren**
2. **Subnetzmaske anpassen (mehr Bits für Subnetze)**
3. **Anzahl benötigter Subnetze/Hosts berechnen**
4. **Neue Subnetzadressen berechnen**
5. **Broadcast- & Hostbereich ermitteln**

---

## 🔹 Beispiel: Subnetting

**Gegeben:**  
Netz: 192.168.1.0/24  
Ziel: Mindestens 4 Subnetze

**Berechnung:**
- 2ⁿ ≥ Anzahl Subnetze → 2² = 4 → 2 zusätzliche Bits für Subnetze
- Neue Maske: /26 → 255.255.255.192
- Hosts: 2⁶ - 2 = 62 pro Subnetz

| Subnetz | Netzwerkadresse  | Hostbereich          | Broadcast        |
|--------|------------------|---------------------|------------------|
| 1      | 192.168.1.0/26   | 192.168.1.1 - .62   | 192.168.1.63     |
| 2      | 192.168.1.64/26  | 192.168.1.65 - .126 | 192.168.1.127    |
| 3      | 192.168.1.128/26 | 192.168.1.129 - .190| 192.168.1.191    |
| 4      | 192.168.1.192/26 | 192.168.1.193 - .254| 192.168.1.255    |

---

## 🔹 Wichtige Formeln

- **Anzahl Subnetze:** `2^(Anzahl Subnetzbits)`
- **Hosts pro Subnetz:** `2^(Anzahl Hostbits) - 2`
- **Neue Subnetzmaske:** Ursprüngliche Maske + Anzahl Subnetzbits

---

## 🔹 Warum Subnetting?

✅ Bessere Netzwerknutzung  
✅ Höhere Sicherheit (Trennung)  
✅ Weniger Broadcast-Traffic  
✅ Flexible Netzarchitektur

---

## 🔹 Tipps & Tricks

- Immer in **Binär** denken!
- Netz-, Subnetz- & Hostanteil klar trennen.
- Erst Subnetzbedarf prüfen: **Subnetze ODER Hosts priorisieren?**
- Visualisiere mit Tabellen oder Adressbereichen.