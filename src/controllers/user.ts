import { Request, Response } from 'express';

class UserController {
  constructor() {}

  public create(req: Request, res: Response) {
    // validate body
    // create in redis and postgres
    res.status(200).json({ success: true, data: '' });
  }

  public read(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    // find in redis, then postgres

    res.status(200).json({ success: true, name: 'dan', id: id });
  }

  public update(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    // validate body
    // find and update in postgres

    res.status(200).json({ success: true, data: '' });
  }

  public delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    // find and delete in postgres

    res.status(200).json({ success: true, data: '' });
  }
}

export default UserController;
