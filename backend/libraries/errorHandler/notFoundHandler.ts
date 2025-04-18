import { Request, Response } from "express";
import { NotFoundError } from "../../core/responses/ErrorResponse";
import { DomainCode } from "../../core/responses/DomainCode";

function notFoundHandler(req: Request, _res: Response) {
  throw new NotFoundError(DomainCode.NOT_FOUND, `Resource not found: ${req.method} ${req.originalUrl}`);
}

export default notFoundHandler;