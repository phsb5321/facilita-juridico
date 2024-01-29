// pgmigrations-config.js

require('dotenv').config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL || 'postgres://user:password@host:5432/dbname',
  dir: 'migrations', // Specify the directory where the migration files will be located
  migrationsTable: 'pgmigrations', // Name of the table to keep track of executed migrations
  type: 'sql-file', // Use .sql files for migrations
  // Uncomment to create TypeScript migrations
  // language: 'ts',
};
