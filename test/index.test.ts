import { describe, it, beforeAll } from '@jest/globals';
import { setupTestApp } from './setup';
import request from 'supertest';

let setup: Awaited<ReturnType<typeof setupTestApp>>;

beforeAll(async () => {
    setup = await setupTestApp();
});

describe('app', () => {
    it('responds with a not found', (done) => {
        request(setup.app)
            .get('/some-unknown-route')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});
