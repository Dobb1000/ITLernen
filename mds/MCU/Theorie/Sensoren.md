# Sensoren
<div class="alert alert-success" role="alert">
<p>⚡ Diese Seite ist <strong>interaktiv</strong>! 🔧 Klicke auf die <strong>Einbettungen</strong> in den Simulationen, um die verschiedenen Pull-Up- / Pull-Down-Widersätnde auszuprobieren. 🚀</p>
</div>

### Pull-up- und Pull-down-Widerstände für Sensoren

Diese Widerstände sorgen für einen definierten Spannungspegel, um Sensoren zuverlässig auszulesen.

- **Pull-up-Widerstand**: Verbindet die Signalleitung mit Vcc → Signal auf **High (1)**.
- **Pull-down-Widerstand**: Verbindet die Signalleitung mit GND → Signal auf **Low (0)**.

### Warum werden sie bei Sensoren verwendet?

- **Floating-Zustand vermeiden**: Ohne Widerstände kann das Sensorsignal undefiniert bleiben → Störungen.
- **Stabilisierung**: Halten das Signal konstant, wenn der Sensor keinen aktiven Pegel liefert.

### Anwendungen

- **Digitale Sensoren**: Stellen sicher, dass der Sensorwert eindeutig interpretiert wird.
- **Tasten & Schalter**: Verhindern ungewollte Pegelschwankungen.
- **I²C-Bus**: Benötigt Pull-up-Widerstände für stabile Kommunikation.

### Beispiel einer Schaltung für einen Pull-up- & Pull-down-Widerstand

<iframe onload="resizeIframe(this)" src="/ITLernen/canvas/logikgatter/pullupdown.html"></iframe>
