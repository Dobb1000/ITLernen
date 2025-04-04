# Smart Home SQL Aufgaben

Die folgende Übungsdatenbank bildet ein fiktives **Smart Home System** ab. Sie umfasst mehrere miteinander verknüpfte Tabellen, die verschiedene Aspekte eines intelligent vernetzten Haushalts modellieren. Ziel ist es, durch gezielte SQL-Abfragen ein besseres Verständnis für Datenbankstrukturen, Abfragen und Verknüpfungen zu entwickeln.

## 🏠 Datenbankübersicht

Die Datenbank besteht aus folgenden zentralen Entitäten:

- **Users** – Informationen über die Benutzer des Systems
- **Rooms** – Die einzelnen Räume, die Benutzern zugeordnet sind
- **Devices** – Geräte, die sich in bestimmten Räumen befinden
- **EnergyUsage** – Protokollierter Energieverbrauch einzelner Geräte
- **Activities** – Aktionen, die von Benutzern im System ausgeführt wurden

---

## 🗺️ Datenbankstruktur

<img src="./diagram.png" style="width:100%">