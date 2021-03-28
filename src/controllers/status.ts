import { Request, Response } from 'express';
import redisClient from '../config/redisClient';

interface IData {
  success: boolean;
  message?: string;
  error?: any;
}

interface IResponse {
  status: number;
  data: IData;
}

class StatusController {
  constructor() {
    this.errorRes = this.errorRes.bind(this);
    this.successRes = this.successRes.bind(this);
    this.getStatus = this.getStatus.bind(this);
    this.getServerStatus = this.getServerStatus.bind(this);
    this.getPostgresStatus = this.getPostgresStatus.bind(this);
    this.getRedisStatus = this.getRedisStatus.bind(this);
  }

  private errorRes(message: string, error: any) {
    return {
      status: 500,
      data: { success: false, message: message, error: error },
    };
  }

  private successRes(system: string) {
    return { status: 200, data: { success: true, message: `${system} OK` } };
  }

  public async getStatus(_req: Request, res: Response) {
    let response: IResponse = this.errorRes('Systems Error', undefined);
    const s: any = await this.getServerStatus;
    const p: any = await this.getPostgresStatus;
    const r: any = await this.getRedisStatus;

    if (s?.status === 200 && p?.status === 200 && r?.status === 200) {
      response = this.successRes('All Systems');
    }

    res.status(response.status).json({ ...response.data });
  }

  public async getServerStatus(_req: Request, res: Response) {
    let response: IResponse = this.successRes('Server');
    res.status(response.status).json({ ...response.data });
  }

  public async getPostgresStatus(_req: Request, res: Response) {
    let response: IResponse = this.errorRes('Error Postgres', undefined);
    // const pool = new Pool(pgConfig);

    // try {
    //   await pool.query('SELECT NOW()');
    //   await pool.end();
    //   response = this.successRes('Postgres');
    // } catch (error) {
    //   response = this.errorRes(error?.message, error);
    // }

    res.status(response.status).json({ ...response.data });
  }

  public async getRedisStatus(_req: Request, res: Response) {
    let response: IResponse = this.errorRes('Redis Error', undefined);

    try {
      await redisClient.setAsync('redisStatus', JSON.stringify('OK'));
      const data = await redisClient.getAsync('redisStatus');
      if (JSON.parse(data) === 'OK') {
        response = this.successRes('Redis');
      }
    } catch (error) {
      response = this.errorRes(error?.message, error);
    }

    res.status(response.status).json({ ...response.data });
  }
}

export default StatusController;
