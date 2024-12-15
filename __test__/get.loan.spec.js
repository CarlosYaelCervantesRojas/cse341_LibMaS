require('dotenv').config();
const app = require("../apptest")
const supertest = require("supertest")
const request = supertest(app)


describe('Test Handlers', () => {
    test('responds to /loans/', async () => {
        const res = await request.get('/loans/')
        expect(res.header['content-type']).toBe('application/json; charset=utf-8')
        expect(res.statusCode).toBe(200)
    })

    test('responds to /loans/:loan_id', async () => {
        const res = await request.get('/loans/675e24a0ff8a08822afcdb6d');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
})