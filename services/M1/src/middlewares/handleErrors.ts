import { Request, Response, NextFunction, RequestHandler } from 'express';


export function wrapAsyncEndpoint(callback: Function): RequestHandler {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            await callback(req, res, next);
        } catch(error: any) {
            next(error);
        }
    };
};


export default function handleErrors(error: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({
        message: 'Some error just happened!',
    });
    console.log(
        `##############Error at: ${new Date().toUTCString()} ##############\n`,
        error, '\n######################################################',
    );
};