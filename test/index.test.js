const { expect } = require('chai');
const supertest = require('supertest');
const { describe, it } = require('mocha');
const { app } = require('../server');
/* o ('http://localhost:8080') */


const request = supertest(app)

describe('API Rest Test métodos HTTP de Productos', () => {
    describe('Listar todos los productos', () => {
        it ('Debería responder 200 cuando se consulta a api/productos', async () => {
            const response = await request.get('/api/productos')
            expect(response.status).to.eql(200)
        });
        it ('Debería retornar un array no vacío cuando se consulta a api/productos', async () => {
            const response = await request.get('/api/productos')
            expect(response.body.length).greaterThan(0)
        });
    });
    describe('Encontrar productos por id', () => {
        it ('Debería retornar el título microscopio cuando se pide el producto con id 1', async () => {
            const response = await request.get('/api/productos/1')
            expect(response.body.title).to.eq('Microscopio')
        });
        it ('Debería retornar que el producto no existe cuando se pide el producto con id 6', async () => {
            const response = await request.get('/api/productos/6')
            expect(response.status).to.eql(404)
        });
    });  
    describe('Agregar productos', () => {
        it ('Debería guardar el producto enviado', async () => {
            const newProduct = {
                    title: "Microscopio4",
                    description: "4x",
                    code: "MI400",
                    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/microscope-lab-science-school-128.png",
                    price: 1000,
                    stock: 5
            }
            const response = await request.post('/api/productos').send(newProduct)
            expect(response.body.title).to.eq('Microscopio4')
            expect(response.body).to.include.keys('id')
            expect(response.body).to.include.keys('timestamp')
        });
    });  


});