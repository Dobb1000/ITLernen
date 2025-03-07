# Schaltwerke
<div class="alert alert-success" role="alert">
<p>⚡ Diese Seite ist <strong>interaktiv</strong>! 🔧 Klicke auf die <strong>Einbettungen</strong> in den Simulationen, um die verschiedenen Schaltwerke auszuprobieren. 🚀</p>
</div>

## Definition
Ein **Schaltwerk** ist eine digitale Schaltung, bei der der Ausgang nicht nur von den aktuellen Eingängen, sondern auch von vorherigen Zuständen abhängt. Dies wird durch Speicherbausteine realisiert, wodurch das Schaltwerk eine Art "Gedächtnis" besitzt. Man unterscheidet zwischen **synchronen** und **asynchronen** Schaltwerken:
- **Synchrones Schaltwerk:** Zustandsänderungen erfolgen synchron zu einem Takt.
- **Asynchrones Schaltwerk:** Zustandsänderungen erfolgen unmittelbar bei Änderung der Eingänge.

## Flip-Flops
### RS-Flip-Flop (Set-Reset-Flip-Flop)
Set-Reset-Flip-Flop. Mit Set kann man auf den Ausgang eine 1 legen, welche auch bestehen bleibt wenn Set wieder auf 0 gesetzt wird. Wenn Reset auf 1 gesetzt wird, wird dann der Ausgang auch wieder auf 0 gesetzt. Problem: Man darf Set und Reset nicht gleichzeitig auf 1 setzen, da man sonst in einen undefinierten Status kommt

<iframe onload="resizeIframe(this)" src="/ITLernen/canvas/logikgatter/rs_flipflop.html" id="not"></iframe>

### D-Flip-Flop
Hat einen Data-Eingang, einen Clock-Eingang und einen
Ausgang. Wenn Clock auf 1 gesetzt ist, dann wird das Signal von D
auf den Ausgang übernommen, ansonsten passiert nichts. Ist Taktge-
steuert, aber nicht Taktflankengesteuert
<iframe onload="resizeIframe(this)" src="/ITLernen/canvas/logikgatter/d_flipflop.html" id="not"></iframe>

## Speicherarten

Je nach Anwendung und Technologie gibt es unterschiedliche Speicherarten:

<figure>
  <img src="/ITLernen/tutorial/MCU/Theorie/img/speicherarten.svg" alt="Speicherarten" style="width: 100%;">
</figure>