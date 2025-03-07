# Grundlagen
<div class="alert alert-success" role="alert">
<p>⚡ Diese Seite ist <strong>interaktiv</strong>! 🔧 Klicke auf die <strong>Einbettungen</strong> in den Simulationen, um die verschiedenen Logikgatter auszuprobieren. 🚀</p>
</div>

Logikgatter sind die grundlegenden Bausteine digitaler Schaltungen. Sie führen logische Operationen auf binären Eingangsvariablen aus und geben einen binären Ausgangswert zurück. Die wichtigsten Logikgatter sind:

## NOT-Gatter (Inverter)

Ein NOT-Gatter kehrt den Eingangswert um.

<iframe onload="resizeIframe(this)" src="/ITLernen/canvas/logikgatter/gatter.html?gate=NOT" id="not"></iframe>

**Boolesche Funktion:**
$$ Y = \overline{A} $$

## AND-Gatter

Ein AND-Gatter gibt nur dann eine 1 aus, wenn alle Eingänge 1 sind.

<iframe onload="resizeIframe(this)" src="/ITLernen/canvas/logikgatter/gatter.html?gate=AND" id="and"></iframe>

**Boolesche Funktion:**
$$ Y = A \cdot B $$

## OR-Gatter

Ein OR-Gatter gibt eine 1 aus, wenn mindestens ein Eingang 1 ist.

<iframe onload="resizeIframe(this)" src="/ITLernen/canvas/logikgatter/gatter.html?gate=OR" id="or"></iframe>

**Boolesche Funktion:**
$$ Y = A + B $$

## NOR-Gatter

Ein NOR-Gatter ist die Negation eines OR-Gatters. Es gibt nur dann eine 1 aus, wenn beide Eingänge 0 sind.

<iframe onload="resizeIframe(this)" src="/ITLernen/canvas/logikgatter/gatter.html?gate=NOR" id="nor"></iframe>

**Boolesche Funktion:**
$$ Y = \overline{A + B} $$

## NAND-Gatter

Ein NAND-Gatter ist die Negation eines AND-Gatters. Es gibt nur dann eine 0 aus, wenn beide Eingänge 1 sind.

<iframe onload="resizeIframe(this)" src="/ITLernen/canvas/logikgatter/gatter.html?gate=NAND" id="nand"></iframe>

**Boolesche Funktion:**
$$ Y = \overline{A \cdot B} $$

## XOR-Gatter (Exklusiv-Oder)

Ein XOR-Gatter gibt eine 1 aus, wenn genau einer der beiden Eingänge 1 ist.

<iframe onload="resizeIframe(this)" src="/ITLernen/canvas/logikgatter/gatter.html?gate=XOR" id="xor"></iframe>

**Boolesche Funktion:**
$$ Y = A \oplus B $$

## XNOR-Gatter (Exklusiv-Nicht-Oder)

Ein XNOR-Gatter ist die Negation eines XOR-Gatters. Es gibt eine 1 aus, wenn beide Eingänge gleich sind.

<iframe onload="resizeIframe(this)" src="/ITLernen/canvas/logikgatter/gatter.html?gate=XNOR" id="xnor"></iframe>

**Boolesche Funktion:**
$$ Y = \overline{A \oplus B} $$

---
Das Verständnis dieser Grundgatter ist essenziell für den Aufbau digitaler Schaltungen und komplexer logischer Systeme.