import express from "express";

export const handleError = (err: any, res: express.Response) => {
    let errorMessage = "Failed to do something";
    if (err instanceof Error) {
        errorMessage = err.message;
    }
    res.status(500).send(errorMessage);
}
