# ¡Hola, sfigata!

Minigioco di beach volley per il compleanno di Paula: intro, un set a sei con quattro tempi morti sui nostri ricordi, auguri e scelta della data per la cena, con conferma via WhatsApp.

È una PWA statica, senza build: `index.html` contiene tutto il gioco (foto incluse), le librerie stanno in `vendor/`, e `sw.js` mette tutto in cache così funziona anche offline.

## Pubblicare su Vercel

1. Su vercel.com: **Add New → Project**, importa questo repo.
2. Framework preset: **Other**. Nessun build command, output directory: la radice.
3. **Deploy**. Ogni push su `main` ripubblica da solo.

## Installare

- **Android (Chrome)**: apri il link, poi menu ⋮ → **Installa app** (o "Aggiungi a schermata Home").
- **iPhone (Safari)**: apri il link, poi Condividi → **Aggiungi alla schermata Home**.

## Aggiornare il gioco

Dopo una modifica, cambia `VERSION` in `sw.js` (es. `feliz-v2`), così chi ha già installato l'app riceve la versione nuova alla prossima apertura.

## Provare in locale

```
npx serve .
```
(Il service worker funziona solo via http://localhost o https, non aprendo il file direttamente.)
