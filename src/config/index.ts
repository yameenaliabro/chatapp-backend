import dotenv from "dotenv"
dotenv.config();

export const PORT = process.env.PORT;
export const host = process.env.PGHOST;
export const database = process.env.PGDATABASE;
export const port = process.env.PG_PORT;
export const user = process.env.PGUSER;
export const password = process.env.PGPASSWORD
export const jwt_key = process.env.JWT_KEY;
export const cloud_name = process.env.CLOUD_NAME;
export const api_key = process.env.CLOUD_API_KEY;
export const api_secret = process.env.CLOUD_SECRET_KEY;