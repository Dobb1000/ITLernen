# **IPv6-Adressen kürzen**

## Aufbau einer IPv6-Adresse:
- **8 Blöcke** mit je **4 hexadezimalen Ziffern (0-9, a-f)**  
- Getrennt durch **Doppelpunkt `:`**  
- Beispiel:  
  `2001:0db8:0000:0000:0000:ff00:0042:8329`

---

## **Regeln zum Kürzen:**

1. **Führende Nullen in jedem Block weglassen:**
   - `0db8` → `db8`
   - `0042` → `42`
   
2. **Längste Folge von Blöcken mit nur Nullen durch `::` ersetzen:**
   - Mehrere zusammenhängende `0000`-Blöcke → **einmalig `::`**
   - **Nur einmal pro Adresse erlaubt!**

---

## **Beispiel:**

**Original:**  
`2001:0db8:0000:0000:0000:ff00:0042:8329`

**Schritt 1 – Führende Nullen entfernen:**  
`2001:db8:0:0:0:ff00:42:8329`

**Schritt 2 – Längste Null-Sequenz kürzen:**  
`2001:db8::ff00:42:8329`

---

## **Wichtig:**
- **Nie am Anfang oder Ende einen einzelnen Block mit nur einer Null kürzen!** (z. B. `0:...` bleibt `0`, nicht leer!)
- **`::` darf nur einmal verwendet werden, sonst Mehrdeutigkeit!**

---

## **Noch ein Beispiel:**

**Original:**  
`fe80:0000:0000:0000:0202:b3ff:fe1e:8329`  
**Gekürzt:**  
`fe80::202:b3ff:fe1e:8329`

---

**Merksatz:**  
*Führende Nullen weg, längste Null-Blöcke durch Doppelpunkt-Doppelpunkt!*
