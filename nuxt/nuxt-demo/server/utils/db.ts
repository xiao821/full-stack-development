import { createRequire } from 'module'
import { mkdirSync } from 'fs'
import { dirname, join } from 'path'

// Nitro may rewrite module URLs inside `.output`, so resolve native deps from
// the app root where Docker already installed `node_modules`.
const appRequire = createRequire(join(process.cwd(), 'package.json'))
const Database = appRequire('better-sqlite3')

const dbPath = process.env.DB_PATH || join(process.cwd(), 'data.db')

mkdirSync(dirname(dbPath), { recursive: true })

const db = new Database(dbPath)

export default db
