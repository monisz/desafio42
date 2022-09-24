const { expect } = require('chai');
const supertest = require('supertest');
const { describe, it } = require('mocha');
const { app } = require('../server');
/* o ('http://localhost:8080') */


const request = supertest(app);

describe('API Rest Test métodos HTTP de Productos', () => {
    describe('Listar todos los productos', () => {
        it ('Debería responder 200 cuando se consulta a api/productos', async () => {
            const response = await request.get('/api/productos');
            expect(response.status).to.eql(200);
        });
        it ('Debería retornar un array no vacío cuando se consulta a api/productos', async () => {
            const response = await request.get('/api/productos');
            expect(response.body.length).greaterThan(0);
        });
    });
    describe('Encontrar productos por id', () => {
        it ('Debería retornar el título microscopio cuando se pide el producto con id 1', async () => {
            const response = await request.get('/api/productos/1');
            expect(response.body.title).to.eq('Microscopio');
        });
        it ('Debería retornar 404 (el producto no existe) cuando se pide el producto con id 20', async () => {
            const response = await request.get('/api/productos/20');
            expect(response.status).to.eql(404);
        });
    });  
    describe('Agregar producto', () => {
        it ('Debería guardar el producto enviado', async () => {
            const newProduct = {
                    title: "Microscopio6",
                    description: "6x",
                    code: "MI600",
                    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/microscope-lab-science-school-128.png",
                    price: 1000,
                    stock: 5
            }
            const response = await request.post('/api/productos').send(newProduct);
            expect(response.body.title).to.eq('Microscopio6');
            expect(response.body).to.include.keys('id');
            expect(response.body).to.include.keys('timestamp');
        });
    });  
    describe('Modificar producto', () => {
        it ('Debería guardar el producto con id 4, modificado con los datos enviados', async () => {
            const newData = { price: 16000 };
            const response = await request.put('/api/productos/4').send(newData);
            expect(response.body[0].title).to.eq('Microscopio4');
            expect(response.body[0].id).to.eq(4);
        });
        it ('Debería retornar 404 (el producto no existe) cuando se pide modificar el producto con id 20', async () => {
            const newData = { price: 10000 };
            const response = await request.put('/api/productos/20').send(newData);
            expect(response.status).to.eql(404);
        });

    });  
    describe('Eliminar productos por id', () => {
        it ('Debería retornar 200 cuando el producto con id 9 es eliminado', async () => {
            const response = await request.delete('/api/productos/9');
            expect(response.status).to.eql(200);
        });
        it ('Debería retornar 404 (el producto no existe) cuando se pide eliminar el producto con id 20', async () => {
            const response = await request.delete('/api/productos/20');
            expect(response.status).to.eql(404);
        });
    });  
});