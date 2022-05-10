import { Router, Request, Response, NextFunction}  from "express";

const status = Router()

status.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
})

export default status;