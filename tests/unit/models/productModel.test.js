const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allProducts } = require('../mocks/product.mock');

describe('Testes de unidade da camada Model de produtos', function () {
  describe('Listagem de produtos', function () {  
    it('retorna a lista completa de produtos', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([allProducts]);
      // Act
      const result = await productModel.getAll();
      // Assert
      expect(result).to.be.deep.equal(allProducts);
    });
  });
  describe('Busca de um produto específico', function () {
    it('Recuperando um produto a partir do seu id', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
      // Act
      const result = await productModel.getById(1);
      // Assert
      expect(result).to.be.deep.equal(allProducts[0]);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});