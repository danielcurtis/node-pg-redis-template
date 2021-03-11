import fs from 'fs';
import path from 'path';

const pgConfig: any = {
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
  ssl: {
    ca: fs
      .readFileSync(path.resolve(__dirname, './ca-certificate.crt'))
      .toString(),
  },
};

export default pgConfig;
