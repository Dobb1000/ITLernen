# IPv4 Routing-Tabelle

## 🌐 **Wozu braucht man eine IPv4 Routing-Tabelle?**

Die Routing-Tabelle ist das **Herzstück eines Routers**.  
Ihr Zweck:
- Sie entscheidet, **wohin ein IP-Paket geschickt wird**, abhängig von dessen Ziel-IP-Adresse.
- Ohne Routing-Tabelle wüsste der Router **nicht, welchen Weg** ein Paket nehmen soll!
- Auch PCs/Endgeräte haben eine Routing-Tabelle, meist nur mit dem **Standardgateway** (→ für Internet-Zugriffe).

**Zusammengefasst:**  
Die IPv4 Routing-Tabelle sorgt dafür, dass Datenpakete **immer den richtigen Weg** durch Netzwerke finden, egal ob im lokalen Netzwerk oder ins Internet.

---

## 🔑 Aufbau einer Routing-Tabelle:

| **Feld**               | **Beschreibung**                                                                 |
|------------------------|---------------------------------------------------------------------------------|
| **Zielnetzwerk**        | Das Netzwerk, für das die Route gilt (z.B. **192.168.0.0**)                       |
| **Subnetzmaske**        | Bestimmt die Größe des Netzwerks (z.B. **255.255.255.0** oder **/24**)            |
| **Nächster Router / Gateway** | IP-Adresse des nächsten Routers, an den das Paket weitergeleitet wird |

---

## 📄 **Beispiel:**

<img src="/tutorial/Netzwerktechnik/img/beispielnetzwerk.svg" />

<br>
<br>
<br>

Die Routingtabelle am **Router 2** sieht folgendermaßen aus:

| **Zielnetzwerk** | **Subnetzmaske**   | **Gateway (Router)** |
|------------------|-------------------|----------------------|
| 192.168.0.0      | 255.255.255.0      | 192.168.1.1          | 
| 192.168.1.0      | 255.255.255.0      | *                    | 
| 192.168.2.0      | 255.255.255.0      | *                    | 
| 0.0.0.0          | 0.0.0.0            | 192.168.1.1          |

---

## 🚀 **Erklärung:**

1. **192.168.1.0/24** → Direkt verbunden, **kein Gateway nötig**.
2. **192.168.0.0/24** → Erreicht über Router **192.168.1.1**.
3. **192.168.2.0/24** → Direkt an Interface **192.168.2.1** angeschlossen.
4. **0.0.0.0/0 (Default Route)** → Alles andere wird an **192.168.1.1** geschickt.

---

## 🌟 **Gateway of Last Resort:**

Der Eintrag  

| **Zielnetzwerk** | **Subnetzmaske**   | **Gateway (Router)** |
|------------------|-------------------|----------------------|
| 0.0.0.0          | 0.0.0.0            | 192.168.1.1          |

ist der sogenannte **Gateway of Last Resort**.

👉 **Bedeutung:**
- Wird verwendet, **wenn keine andere Route in der Tabelle passt**.
- Dient als **"Auffangroute"** für alle unbekannten Ziele (oft ins Internet).
- Auch bekannt als **Default Route**.
- In unserem Beispiel ist **192.168.1.1** das Gateway of Last Resort.

**Merke:**  
Wenn das Zielnetzwerk nicht explizit eingetragen ist, wird immer der **Gateway of Last Resort** benutzt!

---

## 📌 **Funktionsweise:**

**Beispiel:**
- Ziel-IP: **192.168.0.5**
    - Passt zu **192.168.0.0/24**.
    - Wird an **Router 192.168.1.1** weitergeleitet.
- Ziel-IP: **8.8.8.8 (Google DNS)**
    - Passt zu keiner spezifischen Route.
    - **Gateway of Last Resort** (Default Route) wird genutzt → Weiterleitung an **192.168.1.1**.
