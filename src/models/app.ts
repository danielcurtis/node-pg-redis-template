import express, { Application } from 'express';

interface IApp {
  port: number;
  middleware: any[];
  routes: any[];
}

class App {
  app: Application;
  port: number;

  constructor(app: IApp) {
    this.app = express();
    this.port = app.port;
    this.middleware(app.middleware);
    this.routes(app.routes);
  }

  private middleware(middleware: any[]) {
    for (const m of middleware) {
      this.app.use(m);
    }
  }

  private routes(routes: any[]) {
    for (const r of routes) {
      this.app.use(r.path, r.router);
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`[server]: Server is running at localhost:${this.port}`);
    });
  }

  public close() {
    console.log(`[server]: Server is shutting down forcefully`);
    process.exit(0);
  }
}

export default App;
