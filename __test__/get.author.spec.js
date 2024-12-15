require('dotenv').config();
const app = require("../apptest")
const supertest = require("supertest")
const request = supertest(app)


describe('Test Handlers', () => {
    test('responds to /authors/', async () => {
        const res = await request.get('/authors/')
        expect(res.header['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(200)
    })

    test('responds to /authors/:author_id', async () => {
        const res = await request.get('/authors/675cc9f1f909217dd86243f6');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})