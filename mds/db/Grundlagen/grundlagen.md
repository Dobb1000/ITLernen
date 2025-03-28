
# Grundlagen von Datenbanken

## Was ist eine Datenbank?
Eine **Datenbank** ist eine strukturierte Sammlung von Daten, die elektronisch gespeichert und verwaltet werden.

- **DBMS (Datenbankmanagementsystem)**: Software zur Verwaltung von Datenbanken (z. B. MySQL, PostgreSQL, Oracle, SQLite).



## Vorteile von Datenbanken
- **Datenintegrität**: Konsistente und korrekte Daten.
- **Redundanzvermeidung**: Keine doppelten Daten.
- **Datenunabhängigkeit**: Änderungen der Struktur ohne Auswirkungen auf Anwendungen.
- **Mehrbenutzerbetrieb**: Gleichzeitiger Zugriff durch mehrere Nutzer.
- **Sicherheit**: Rechte- und Benutzerverwaltung.



## Vorteil von Datenbanken gegenüber Excel

| Aspekt               | Datenbank                                       | Excel                                         |
|---------------------|-------------------------------------------------|-----------------------------------------------|
| **Datenmenge**       | Verarbeitung großer Datenmengen effizient       | Bei großen Datenmengen schnell unübersichtlich und langsam |
| **Mehrbenutzer**     | Mehrere Nutzer gleichzeitig mit Berechtigungskonzept | Schwierig, gleichzeitiges Bearbeiten problematisch |
| **Datenintegrität**  | Durch Regeln (Primär-/Fremdschlüssel) garantiert | Keine automatische Sicherstellung der Konsistenz |
| **Abfragen & Analysen** | Mächtige Abfragesprache (SQL) möglich           | Eingeschränkte Filter- und Analysefunktionen  |
| **Automatisierung**  | Transaktionen, Trigger, Stored Procedures       | Eingeschränkte Automatisierung via Makros     |
| **Skalierbarkeit**   | Leicht erweiterbar und anpassbar                | Limitierte Zeilenanzahl und Speichergrenze    |

## Grundbegriffe

| Begriff                | Erklärung                                                          |
|-----------------------|--------------------------------------------------------------------|
| **Tabelle**            | Sammlung von Datensätzen (Zeilen) mit gleich strukturierten Feldern |
| **Attribut**           | Spalte einer Tabelle, definiert eine Eigenschaft                   |
| **Datensatz (Row)**    | Eine Zeile, enthält konkrete Werte                                 |
| **Primärschlüssel**    | Eindeutige Identifikation eines Datensatzes                        |
| **Fremdschlüssel**     | Verweis auf Primärschlüssel einer anderen Tabelle                  |
| **Relation**           | Tabelle, die eine Beziehung beschreibt                             |





**Fazit**: Datenbanken sind ideal für strukturierte, große und mehrbenutzerfähige Datenmengen mit komplexen Beziehungen. Excel eignet sich besser für kleinere, weniger komplexe Datenanalysen oder schnelle Berechnungen.

