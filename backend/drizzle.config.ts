// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/schema/**/*.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://postgres:postgres@localhost:6679/weird_salads_javascript_development',
  },
});
