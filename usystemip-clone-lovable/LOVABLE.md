# Como subir este site na Lovable

Este projeto já está preparado para importar na Lovable: tem `package.json`, `vite.config.js`
e um build de produção (`npm run build`) que gera a pasta `dist/`.

---

## Caminho A — Importar o ZIP (mais rápido, funciona em qualquer plano)

1. Crie a conta em **https://lovable.dev** e faça login.
2. No dashboard, clique no **`+`** (canto superior) → **Import project to Lovable**.
3. Escolha **Upload code** e selecione o arquivo **`usystemip-clone-lovable.zip`**.
   - Limite da Lovable: **250 MB** por ZIP. Este pacote tem ~28 MB.
   - O import está disponível em **todos os planos**.
   - O **primeiro build do primeiro import é grátis**.
4. Aguarde o import + o primeiro build. A Lovable vai abrir o projeto no editor com o preview.
5. Confira o preview: a rota `/` mostra o gate "Security Verification" e, ao responder
   `1 + 1 = 2`, redireciona para `/inicio/`.
6. Clique em **Publish** (canto superior direito). Você recebe uma URL pública
   `https://<nome-do-projeto>.lovable.app`.
7. **Domínio próprio** (opcional, exige plano pago): `Project settings → Domains → Connect domain`,
   informe o domínio e aponte o DNS conforme as instruções que a Lovable mostrar
   (registro `A`/`CNAME` no seu provedor).

## Caminho B — Via GitHub (se preferir versionar)

1. Crie um repositório vazio no GitHub e suba o conteúdo desta pasta
   (sem `node_modules/`, `dist/`, `full/`, `wav/`, `previews/` — já estão no `.gitignore`).
2. Na Lovable: **New project** → conecte o GitHub → escolha o repositório.
3. A Lovable importa o código e passa a sincronizar com o repo.
4. Publish igual ao passo 6 acima.

---

## O que a Lovable vai fazer com o código

- A Lovable **reconstrói o projeto no stack dela (TanStack Start)**. Como aqui é HTML/CSS/JS puro,
  ela mantém os arquivos e roda o build.
- Se ela perguntar se quer "converter para React", pode aceitar — mas o mais seguro é pedir
  **"mantenha o HTML/CSS/JS como está, só faça o build funcionar"**.
- Se o build falhar, mande este prompt no chat da Lovable:

  > O projeto é um site estático multi-page. O build é `node scripts/build.mjs`, que copia
  > os arquivos para `dist/`. Não use bundler nem renomeie os arquivos de `/assets`.
  > O dev server é `vite` com `appType: 'mpa'`. Corrija o build mantendo isso.

---

## Estrutura (o que importa)

```
index.html              gate "Security Verification" (redireciona para /inicio/)
pressel.js / pressel.css  script + estilo do gate
inicio/ review/ tasks-app/ wallet/ faq/ historico/ profile/ up1/
upsell-1..5/ back-redirect/ back-redirect-2/ confirmar-saque/ resgatar/
                        cada pasta tem seu index.html (18 páginas no total)
app.js style.css music.js theme.js payments.js i18n.js model.js effects.js front-checkout.js
assets/                 logos, depoimentos, favicon, som do caixa
scripts/build.mjs       build de produção (copia para dist/)
vite.config.js          dev server (multi-page)
404.html robots.txt .htaccess _redirects vercel.json
```

## Observações importantes

- **Sem backend.** Todo o estado fica em `localStorage` (`spotify_feedback_mobile_prototype_v3`).
- **Pixels removidos** (TikTok) e **script da Utmify removido**. O repasse de
  `email`, `name`, `utm_*` e click ids (`ttclid`, `fbclid`) até o checkout continua funcionando
  via `spotify_utm_passthrough_v1`.
- **Checkouts originais mantidos**: `pay.pag3b.com/ae3402` (front),
  `pay.pag3b.com/058795` e `pay.pag3b.com/e8f6e1` (back-redirect).
- As pastas `full/`, `wav/` e `previews/` **não são usadas** pelo site (o player usa o iframe
  do Spotify) e ficaram fora do ZIP da Lovable para economizar espaço.
- Rodar localmente: `npm install` e depois `npm run dev` (http://localhost:5173).
  Build de produção: `npm run build` → pasta `dist/`.
