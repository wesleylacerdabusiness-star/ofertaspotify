import { defineConfig } from 'vite'

// O site e 100% estatico (HTML/CSS/JS puro, multi-page).
// O dev server do Vite serve os arquivos como estao, sem bundlar nada.
// O build de producao e um simples "copia tudo para dist/" (scripts/build.mjs),
// o que garante fidelidade total ao clone.
export default defineConfig({
  appType: 'mpa',
  publicDir: false,
  server: { port: 5173, host: true },
  preview: { port: 4173, host: true },
  build: { outDir: 'dist', emptyOutDir: true },
})
