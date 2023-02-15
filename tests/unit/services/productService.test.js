const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { allProducts } = require('../mocks/product.mock');


describe('Testes de unidade da camada Service de produtos', function () {
  describe('Listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      // arrange
      sinon.stub(productModel, 'getAll').resolves(allProducts);
      // act
      const result = await productService.getAll();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  });
   describe('Busca de um produto específico', function () {
    it('retorna um erro caso receba um ID inválido', async function () {
      // arrange: Especificamente nesse it não temos um arranjo.
      // act
      const result = await productService.getById('a');
      
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso o produto não exista', async function () {
      // arrange
      sinon.stub(productModel, 'getById').resolves(undefined);
     
      // act
      const result = await productService.getById(99);
      
      // assert
      expect(result.type).to.equal('NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    
    it('retorna um produto caso id existente', async function () {
      // arrange
      sinon.stub(productModel, 'getById').resolves(allProducts[0]);
      
      // act
      const result = await productService.getById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
    afterEach(function () {
     sinon.restore();
    });
   });
  
});