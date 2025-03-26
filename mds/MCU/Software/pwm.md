# Pulsweitenmodulation (PWM)

## Was ist Pulsweitenmodulation?

Anders als bei einem DAC (*Digital-Analog Converter*), bei dem ein kontinuierliches Analogsignal erzeugt wird, wird bei der **Pulsweitenmodulation (engl. *****Pulse Width Modulation*****, kurz ******PWM******)** eine Technik verwendet, bei der Leistung, Spannung oder Strom durch schnelles Ein- und Ausschalten eines Signals gesteuert wird. Sie wird häufig in der Elektronik und Steuerungstechnik eingesetzt, um Motoren, LEDs oder andere elektrische Lasten effizient zu regeln.

<img src="/tutorial/MCU/Software/img/PWM_darstellung.png">

## Funktionsweise

<img style="float: right; width: 40%" src="/tutorial/MCU/Software/img/duty_cycle.svg">

- **Ein PWM-Signal** besteht aus einer periodischen Rechteckwelle mit variabler Ein-Zeit (*duty cycle*).
- Die Frequenz bleibt konstant, während die Pulsweite (Dauer des „Ein“-Zustands) verändert wird.
- Durch die Variation der Ein-Zeit kann die mittlere Leistung am Verbraucher angepasst werden.

<br>
<br>


## Wichtige Begriffe

| Begriff             | Bedeutung                                                                                 |
| ------------------- |-------------------------------------------------------------------------------------------|
| **Taktperiode (T)** | Dauer eines vollständigen PWM-Zyklus                                                      |
| **Frequenz (f)**    | Anzahl der PWM-Zyklen pro Sekunde $f = \frac{1}{T}$                                       |
| **Pulsweite**       | Dauer des Ein-Zustands innerhalb eines Zyklus                                             |
| **Duty Cycle (D)**  | Verhältnis der Ein-Zeit zur Gesamtperiode $D = \frac{T_{on}}{T}$ <br/> oft in % angegeben |

## Codebeispiel PWM


<div id="iframecontainer" style="position: relative; width: 100%; height: 50vh;">
  <iframe src="https://wokwi.com/projects/425070486808130561" id="not" style="filter: blur(5px); width: 100%; height: 100%; border: none;pointer-events: none"></iframe>

<button class="button" style="
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 10;
padding: 10px 20px;
font-size: 16px;
background: rgba(0, 0, 0, 0.7);
color: white;
border: none;
cursor: pointer;
border-radius: 5px;">
Drück mich für das Codebeispiel!
</button>


  <div class="error" style="position: absolute; bottom: 10px; left: 10px; color: red;"></div>
</div>