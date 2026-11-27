import { resolve } from 'node:path';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from './index';

export function migrateDatabase(): void {
  migrate(db, {
    migrationsFolder: resolve(/* turbopackIgnore: true */ process.cwd(), 'drizzle'),
  });
}
