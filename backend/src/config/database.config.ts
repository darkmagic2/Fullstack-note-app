import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Registering configuration for the database using environment variables or defaults
export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres' as const, // Explicitly sets the database type as 'postgres'
    host: process.env.DB_HOST || 'localhost', // Sets the database host, defaults to localhost
    port: parseInt((process.env.DB_PORT as string) || '5432', 10), // Parses the port as a string with a default
    username: process.env.DB_USERNAME || 'postgres', // Sets the database username, defaults to postgres
    password: process.env.DB_PASSWORD || 'password', // Sets the database password, defaults to password
    database: process.env.DB_NAME || 'note_app', // Sets the database name, defaults to note_app
    synchronize: process.env.NODE_ENV !== 'production', // Enables schema synchronization, disabled in production
    entities: ['dist/**/*.entity.js'], // Specifies the location of entity files (compiled)
    autoLoadEntities: true, // Automatically loads entities (optional, helps with type safety)
  }),
);
