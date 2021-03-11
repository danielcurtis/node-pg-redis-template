import { Request, Response } from 'express';
import { Pool } from 'pg';
import pgConfig from '../config/postgres';

class StatusController {
  public async getStatus(_req: Request, res: Response) {
    const s: any = await this.getServerStatus;
    const p: any = await this.getPostgresStatus;
    const r: any = await this.getRedisStatus;

    if (s?.status === 200 && p?.status === 200 && r?.status === 200) {
      res.status(200).json({ success: true, message: 'Systems OK' });
    } else {
      res.status(500).json({ success: false, message: 'Systems ERROR' });
    }
  }

  public async getServerStatus(_req: Request, res: Response) {
    res.status(200).json({ success: true, message: 'Server OK' });
  }

  public async getPostgresStatus(_req: Request, res: Response) {
    const pool = new Pool(pgConfig);

    try {
      const result: any = await pool.query('SELECT NOW()');
      console.log(result);
      await pool.end();
      res.status(200).json({ success: true, message: 'Postgres OK' });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: error?.message, error: error });
    }
  }

  public async getRedisStatus(_req: Request, res: Response) {
    res.status(200).json({ success: true, message: 'Redis OK' });
  }
}

export default StatusController;
