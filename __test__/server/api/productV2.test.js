const Request = require('supertest');
const TestHelper = require('../../../server/helpers/TestHelper');
const product = require('../../../server/api/productV2');
const Prisma = require('../../../server/services/Prisma');

let server;
describe('Product', () => {
  beforeAll(() => {
    server = TestHelper.createTestServer('/api/v2/product', product);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('APi V2 ORM', () => {
    describe('GET /v2/product', () => {
      it('should return 200 and product list, when get list product', async () => {
        const mockproductList = [
          { id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 },
          { id: 3, name: 'Retrograde Low Triple Black', brand: 'Compass', price: 538000, stock: 10 },
          { id: 4, name: 'Velocity Blue/Yellow', brand: 'Compass', price: 798000, stock: 10 }
        ];
        jest.spyOn(Prisma, 'getProducts').mockResolvedValue(mockproductList);

        const response = await Request(server).get('/api/v2/product');
        expect(response.status).toBe(200);
      });

      it('should return 404 when product not found', async () => {
        jest.spyOn(Prisma, 'getProducts').mockResolvedValue([]);
        const response = await Request(server).get('/api/v2/product');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Prisma, 'getProducts').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).get('/api/v2/product');
        expect(response.status).toBe(500);
      });
    });

    describe('GET /v2/product', () => {
      it('should return 200 and product list, when get list product', async () => {
        const mockproductList = [
          { id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 },
          { id: 3, name: 'Retrograde Low Triple Black', brand: 'Compass', price: 538000, stock: 10 },
          { id: 4, name: 'Velocity Blue/Yellow', brand: 'Compass', price: 798000, stock: 10 }
        ];
        jest.spyOn(Prisma, 'getProduct').mockResolvedValue(mockproductList);

        const response = await Request(server).get('/api/v2/product/2');
        expect(response.status).toBe(200);
      });

      it('should return 404 when product not found', async () => {
        jest.spyOn(Prisma, 'getProduct').mockResolvedValue([]);
        const response = await Request(server).get('/api/v2/product/40');
        expect(response.status).toBe(404);
      });

      it('should return 400 when params is not number', async () => {
        jest.spyOn(Prisma, 'getProduct').mockResolvedValue([]);
        const response = await Request(server).get('/api/v2/product/abc');
        expect(response.status).toBe(400);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Prisma, 'getProduct').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).get('/api/v2/product/2');
        expect(response.status).toBe(500);
      });
    });

    describe('POST /v2/product', () => {
      it('should return 200 and success message, when add product', async () => {
        jest.spyOn(Prisma, 'addProduct').mockResolvedValue('success');
        const response = await Request(server).post('/api/v2/product').send({
          name: 'Velocity Black Gum',
          brand: 'Compass',
          price: 798000,
          stock: 10
        });
        expect(response.status).toBe(200);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Prisma, 'addProduct').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).post('/api/v2/product').send({
          name: 'Velocity Black Gum',
          brand: 'Compass',
          price: 798000,
          stock: 10
        });
        expect(response.status).toBe(500);
      });
    });

    describe('PUT /v2/product/:id', () => {
      it('should return 200 and success message, when edit product', async () => {
        jest
          .spyOn(Prisma, 'editProduct')
          .mockResolvedValue({ id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 });
        const response = await Request(server).put('/api/v2/product/2').send({
          name: 'Velocity Black Gum',
          brand: 'Compass',
          price: 798000,
          stock: 10
        });
        expect(response.status).toBe(200);
      });

      it('should return 400 and success message, incorrect body', async () => {
        const response = await Request(server).put('/api/v2/product/2').send({
          name: 'Velocity Black Gum',
          brands: 'Compass',
          price: 798000,
          stock: 10
        });
        expect(response.status).toBe(400);
      });

      it('should return 404 when product not found', async () => {
        jest.spyOn(Prisma, 'editProduct').mockResolvedValue(false);
        const response = await Request(server).put('/api/v2/product/19').send({
          name: 'Velocity Black Gum',
          brand: 'Compass',
          price: 798000,
          stock: 10
        });
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Prisma, 'editProduct').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).put('/api/v2/product/2').send({
          name: 'Velocity Black Gum',
          brand: 'Compass',
          price: 798000,
          stock: 10
        });
        expect(response.status).toBe(500);
      });
    });

    describe('DELETE /v2/product/:id', () => {
      it('should return 200 and success message, when delete product', async () => {
        jest
          .spyOn(Prisma, 'deleteProduct')
          .mockResolvedValue({ id: 2, name: 'Velocity Black Gum', brand: 'Compass', price: 798000, stock: 10 });
        const response = await Request(server).delete('/api/v2/product/2');
        expect(response.status).toBe(200);
      });

      it('should return 404 when product not found', async () => {
        jest.spyOn(Prisma, 'deleteProduct').mockResolvedValue(false);
        const response = await Request(server).delete('/api/v2/product/1');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Prisma, 'deleteProduct').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).delete('/api/v2/product/1');
        expect(response.status).toBe(500);
      });
    });
  });
});
