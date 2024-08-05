export function appConfig() {
  return {
    environment: process.env.NODE_ENV || 'dev',
    database: {
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 5432,
    },
  };
}
