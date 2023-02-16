const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allSales, saleCreateResponse, rightSaleBody } = require('../mocks/sale.mock');

describe('Testes de unidade da camada Model de vendas', function () {
  describe('Listagem de vendas', function () {  
    it('retorna a lista de todas as vendas', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([allSales]);
      // Act
      const result = await saleModel.getAll();
      // Assert
      expect(result).to.be.deep.equal(allSales);
    });
  });
  describe('Busca de uma venda específica', function () {
    it('Recuperando uma venda a partir do seu id', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([allSales[0]]);
      // Act
      const result = await saleModel.getById(1);
      // Assert
      expect(result).to.be.deep.equal(allSales[0]);
    });
  });
  describe('Cadastrando uma venda', function () {
    it('Cadastrando uma venda na tabela sales', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      // Act
      const id = await saleModel.insertSale();
      // Assert
      expect(id).to.be.deep.equal(saleCreateResponse.id);
    });
    it('Cadastrando uma venda na tabela sales com erro', async function () {
      // Arrange // caso de erro: problema no banco de dados -> ql é a melhor maneira de testar isso?
      const error = 'Erro ao inserir na tabela sales: Cannot read properties of undefined(reading "insertId")';
      sinon.stub(connection, 'execute').resolves(error);
      // Act //
      const result = await saleModel.insertSale();
      // Assert
      // expect error -> consultar!
      expect(result).to.be.deep.equal(undefined);
    });
    it('Cadastrando uma venda na tabela sales_products com erro', async function () {
      // Arrange
      const error = 'Erro ao inserir na tabela sales_products: Cannot convert undefined or null to object';
      sinon.stub(connection, 'execute').resolves(error);
      // Act // caso de erro: faltando 1 parâmetro -> faz sentido testar isso nessa camada?
      const wrongId = null;
      const result = await saleModel.insertSaleProducts(wrongId, rightSaleBody);
      // Assert
      // expect error -> consultar!
      expect(result).to.be.deep.equal('E');
    });
    it('Cadastrando uma venda na tabela sales_products com sucesso', async function () {
      // Arrange
      sinon.stub(connection, 'execute').resolves([saleCreateResponse]);
      // Act
      const result = await saleModel.insertSaleProducts(saleCreateResponse.id, rightSaleBody);
      // Assert
      expect(result).to.be.deep.equal(saleCreateResponse);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});