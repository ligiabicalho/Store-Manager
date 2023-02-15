const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');
const { allSales } = require('../mocks/sale.mock');

describe('Teste de unidade da camada Controller de vendas', function () {
  describe('Listagem de vendas', function () {
    it('retorna status 200 e a lista completa de vendas', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'getAll')
        .resolves({ type: null, message: allSales });

      // act
      await saleController.getAllSales(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });
  });
  describe('Busca de uma venda específica', function () {
    it('retorna status 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'getById')
        .resolves({ type: null, message: allSales[0] });

      // Act
      await saleController.getSale(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales[0]);
    });

    it('retorna um erro caso receba um ID inválido', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 'a' }, 
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'getById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      // Act
      await saleController.getSale(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });

    it('retorna um erro ao passar um id que não existe no bd', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 99 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'getById')
        .resolves({ type: 'NOT_FOUND', message: 'Product not found' });

      // Act
      await saleController.getSale(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(404); 
      expect(res.json).to.have.been.calledWith({message: 'Product not found' });
    });
    afterEach(function () {
    sinon.restore();
  });
  });
});