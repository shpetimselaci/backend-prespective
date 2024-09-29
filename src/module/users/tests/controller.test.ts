import request from 'supertest';
import { describe, expect, beforeAll, afterEach, it, jest, afterAll } from '@jest/globals';
import { User } from '../model';
import { setupTestApp } from '../../../../test/setup';
let setup: Awaited<ReturnType<typeof setupTestApp>>;

beforeAll(async () => {
    setup = await setupTestApp(300);
});

afterEach(async () => {
    await User.deleteMany({});
});

afterAll(async () => {
    setup.app.close();
    setup.mongod.stop();
});

describe('User Controller', () => {
    it('should fail because email is not valid', async () => {
        const response = await request(setup.app).post('/v1/users').send({
            name: 'John Doe',
            email: 'johnexample.com',
        });

        console.warn(response.body);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Validation Error');
        expect(response.body).toHaveProperty('messages[0].message', 'Invalid email');
    });

    it('should create a new user', async () => {
        const response = await request(setup.app).post('/v1/users').send({
            name: 'John Doe',
            email: 'john@example.com',
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'John Doe');
        expect(response.body).toHaveProperty('email', 'john@example.com');
    });

    it('should return 403 if user already exists', async () => {
        await User.create({
            name: 'John Doe',
            email: 'john@example.com',
        });

        const response = await request(setup.app).post('/v1/users').send({
            name: 'John Doe',
            email: 'john@example.com',
        });

        expect(response.status).toBe(403);
        expect(response.body).toEqual({ message: 'User already created' });
    });

    it('should return 500 if internal server error occurs', async () => {
        jest.spyOn(User.prototype, 'save').mockRejectedValue(new Error('Mocked error'));

        const response = await request(setup.app).post('/v1/users').send({
            name: 'John Doe',
            email: 'john@example.com',
        });

        expect(response.status).toBe(500);
        expect(response.body).toStrictEqual({ message: 'Internal Server Error' });
    });

    it('should get all users', async () => {
        await User.create({
            name: 'John Doe',
            email: 'john@example.com',
        });

        await User.create({
            name: 'Jane Doe',
            email: 'jane@example.com',
        });

        const response = await request(setup.app).get('/v1/users');

        console.warn(response.body);
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    });

    // it('should return 500 if internal server error occurs while getting users', async () => {
    //     jest.spyOn(User, 'find').mockRejectedValueOnce('error');

    //     const response = request(setup.app).get('/v1/users');

    //     console.warn(response);
    //     // expect(response).resolves.res.toBe(500);
    //     // expect(response.body).toStrictEqual({ message: 'Internal Server Error'});
    // });
});
