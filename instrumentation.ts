export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { migrateDatabase } = await import('./lib/db/migrate');

    migrateDatabase();
  }
}
