// Build de producao: copia o site estatico inteiro para dist/.
// Sem bundler, sem hash de nome de arquivo -> o clone fica identico ao original.
import { cpSync, rmSync, mkdirSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const dist = resolve(root, 'dist')

const SKIP_DIRS = new Set(['node_modules', 'dist', '__pycache__', '.git', 'full', 'wav', 'previews'])
const SKIP_FILES = new Set(['emb.html', 'package-lock.json'])

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

let copied = 0
for (const entry of readdirSync(root, { withFileTypes: true })) {
  const name = entry.name
  if (entry.isDirectory()) {
    if (SKIP_DIRS.has(name)) continue
  } else {
    if (SKIP_FILES.has(name)) continue
    if (name.endsWith('.py')) continue
    if (name.startsWith('live_')) continue
  }
  cpSync(resolve(root, name), resolve(dist, name), { recursive: true })
  copied++
}

console.log(`build ok -> dist/ (${copied} entradas copiadas)`)
