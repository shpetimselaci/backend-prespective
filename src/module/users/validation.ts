import { z } from 'zod';

export const CreateUserBodySchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
});

export const GetUsersQuerySchema = z.object({
    limit: z.coerce.number().multipleOf(5).max(100).default(10),
    page: z.coerce.number().min(0).default(0),
    created: z.enum(['asc', 'desc']).default('asc')
});
export type CreateUser = z.infer<typeof CreateUserBodySchema>;
