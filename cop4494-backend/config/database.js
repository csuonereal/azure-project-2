const path = require('path');

// NOTE: Dont change these values, change the values in the .env file
module.exports = ({env}) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'cop4494s.postgres.database.azure.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'cop4494db'),
      user: env('DATABASE_USERNAME', 'ulas@cop4494s'),
      password: env('DATABASE_PASSWORD', 'Passw0rd!'),
      ssl: env('DATABASE_SSL', false)
    },
    debug: false,
  },
});
