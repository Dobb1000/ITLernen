
## **Relationenschreibweise (Primär- & Fremdschlüssel)**

### 🔑 **Grundaufbau der Relationenschreibweise:**

<br>
Entitätstyp(<ins>Primärschlüssel</ins>, Attribut1, Attribut2, …, <ins style="text-decoration: underline dashed;">Fremdschlüssel1</ins>, …)
<br>
---

### 🟢 **Beispiel:**


Ort(<ins>OrtsNr</ins>, PLZ, Name)
Schule(<ins>SchulNr</ins>, Schulname, Straße, <ins style="text-decoration: underline dashed;">OrtsNr</ins>)
Schülerin(<ins>SchuelerinNr</ins>, Vorname, Name, Straße, <ins style="text-decoration: underline dashed;">OrtsNr</ins>, <ins style="text-decoration: underline dashed;">SchulNr</ins>)


---

### 🗂️ **Erklärung:**
| **Element**                        | **Bedeutung**                                                   |
|------------------------------------|-----------------------------------------------------------------|
| <ins>`Primärschlüssel`</ins>         | Unterstrichen = eindeutig identifizierendes Attribut            |
| `Attribut`                         | Normales Merkmal der Entität                                    |
| <ins style="text-decoration: underline dashed;">`Fremdschlüssel`</ins> | Fremdschlüssel = verweist auf Primärschlüssel einer anderen Tabelle |

<img src="https://cdn.7tv.app/emote/01FCT4AYVG000AWRKKCP5JM2PN/4x.avif">