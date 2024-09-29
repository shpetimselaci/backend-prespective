import { z } from 'zod';

export const CreateUserBodySchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
});

export const GetUsersQuerySchema = z.object({
    limit: z.number().multipleOf(5).max(100).default(10),
    page: z.number().min(0).default(0),
});
export type CreateUser = z.infer<typeof CreateUserBodySchema>;
