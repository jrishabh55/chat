import { Provider } from './Provider';
import router, { Request, Response, Next } from '../../router';
import * as path from 'path';
import api from '../../routes/api';
import web from '../../routes/web';

export class RouteServiceProvider extends Provider {

  public static instance: RouteServiceProvider = new RouteServiceProvider;

  public static getInstance(): RouteServiceProvider {
    return RouteServiceProvider.instance;
  }

  public boot(): void {
    router.use(this.extend.bind(this));
  }

  public register(): void {
    router.use("/api/v1/", api);
    router.use("/", web);
  }

  private extend(req: Request, res: Response, next: Next) {
    res.api = this.api(res);
    res.error = this.error(res);
    res.view = this.view(res);
    next();
  };

  private api(res: Response) {
    return ((data: object | string = {}, code: number = 200) => {
      res.json({ status: 'ok', data, code });
    });
  }

  private error(res: Response) {
    return ((err: string, code: number = 500, data: object | string) => {
      res.status(code).json({ status: 'error', err, code, data });
    });
  }

  private view(res: Response) {
    return (name: string = 'index') => {
      const file = path.join(__dirname, '..', '..', 'resources', 'view', `${name}.html`);
      res.sendFile(file);
    }
  }

}

export default RouteServiceProvider.getInstance();
