import * as express from 'express';

export type Next = Function;

export interface Response extends express.Response {
  api(data?: string | object, code?: number): void;
  error(error: string, code?: number, data?: string | object): void;
  view(file?: string): void;
}

export interface Request extends express.Request {}

export const router = express.Router();

export default router;
