export const environment = {
  production: true,
  options: {
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    synchronize: false,
    logging: true,
  },
};
