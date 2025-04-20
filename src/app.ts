import 'express-async-errors';
// enables aysnc await errors so you dont have to wrap your async sttements in try and catch block
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import helmet from 'helmet';
// prevents from XSS attacks.
import http from 'http';
import { StatusCodes } from 'http-status-codes';
// Provides named constants for status codes (e.g., StatusCodes.OK = 200).
import morgan from 'morgan';
// morgan logs http requests
import { ErrorHandler } from '~/lib/error-handler';
import { v1 } from './api/v1';
import { Logger } from './lib/logger';

class App {
  private readonly _app: Express;
  public readonly server: http.Server;

  constructor() {
    this._app = express();
    this.server = http.createServer(this._app);

    this._initializeSecurity(this._app);
    this._initializeMiddleware(this._app);
    this._initializeRoutes(this._app);
    this._setupErrorHandler(this._app);
  }

  public start(port: number): void {
    this.server.listen(port, () => {
      Logger.info(`server listening on http://localhost:${port}`);
    });
  }

  private _initializeMiddleware(app: Express): void {
    app.use(morgan('dev'));
    app.use(compression());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  private _initializeSecurity(app: Express): void {
    app.use(cors());
    app.use(helmet());
  }

  private _initializeRoutes(app: Express): void {
    // health check route
    app.route('/healthcheck').get((_req, res) => {
      return res.status(StatusCodes.OK).send('RUNNING');
    });
    app.use('/api/v1', v1);
    // go check v1.ts to look at routes
  }

  private _setupErrorHandler(app: Express): void {
    app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
      ErrorHandler.handleError(error, res);
    });
  }
  // using express async errors to define global error handling.
  // function params is (err, req, res, next)
}

export default new App();
