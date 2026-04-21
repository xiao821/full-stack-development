import { createRequire } from 'module'
import { join } from 'path'

const require = createRequire(import.meta.url)
const Database = require('better-sqlite3')

const db = new Database(join(process.cwd(), 'data.db'))

export default db
