export const addMessageQuery = "INSERT INTO messages (sender_id, recipient_id, text, image,uploadimage) VALUES ($1, $2, $3, $4,$5) RETURNING *"
export const getMessagesQuery = "SELECT * FROM messages WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1) ORDER BY created_at ASC"
export const getAllMessagesQuery = "SELECT * FROM messages"