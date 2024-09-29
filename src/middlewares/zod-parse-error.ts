import { ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
export const zodParseErrorMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => {
            return {
                path: issue.path,
                message: issue.message,
            };
        });

        res.status(400).json({
            error: 'Validation Error',
            messages: errorMessages,
        });
    } else {
        next(error);
    }
};
