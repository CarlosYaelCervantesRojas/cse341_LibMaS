require('dotenv').config();
const app = require("../apptest")
const supertest = require("supertest")
const request = supertest(app)


describe('Test Handlers', () => {
    test('responds to /books/', async () => {
        const res = await request.get('/books/')
        expect(res.header['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(200)
    })

    test('responds to /books/:book_id', async () => {
        const res = await request.get('/books/675765afb721278eaa85c99c');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})