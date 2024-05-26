import { Pool } from "pg";
import { database, host, password, user } from "../config";

const pool = new Pool({
    user,
    host,
    database,
    password,
    port: 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack)
    }
    console.log('Connected to PostgreSQL database');
    release();
})


const createTable = async (tableName: string, columns: string): Promise<void> => {
    await pool.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`);
};

createTable(
    "messages",
    "message_id SERIAL PRIMARY KEY, sender_id TEXT NOT NULL, recipient_id Text NOT NULL, text TEXT NULL, image TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,uploadimage TEXT NULL"
);

createTable(
    "users",
    "user_id SERIAL PRIMARY KEY, username TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL, retypepassword TEXT NOT NULL,description TEXT NOT NULL,skill TEXT NOT NULL,contactNumber TEXT NOT NULL,image TEXT NOT NULL,friend TEXT NOT NULL"
);

export default pool