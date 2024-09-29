import z from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

const envSchema = z
    .object({
        API_VERSION: z.string().min(2),
        PORT: z.coerce.number().default(3111),
        DB_URL: z.string().url(),
    })
    .required();

export default envSchema.parse(process.env);
