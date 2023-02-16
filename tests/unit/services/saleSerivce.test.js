const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const { allSales,
  saleById,
  wrongZeroQuantityBody,
  wrongNegativeQuantityBody,
  saleCreateResponse
} = require('../mocks/sale.mock');


describe('Testes de unidade da camada Service de vendas', function () {
  describe('Listagem de vendas', function () {
    it('retorna a lista de todas vendas', async function () {
      // arrange
      sinon.stub(saleModel, 'getAll').resolves(allSales);
      // act
      const result = await saleService.getAll();
      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales);
    });
  });

  describe('Busca de uma venda específica', function () {
    it('retorna um erro caso receba um id inválido', async function () {
      // arrange: Especificamente nesse it não temos um arranjo.
      // act
      const result = await saleService.getById('a');
      
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });

    it('retorna um erro caso a venda (id) não exista', async function () {
      // arrange
      sinon.stub(saleModel, 'getById').resolves([]);
     
      // act
      const result = await saleService.getById(99);
      
      // assert
      expect(result.type).to.equal('NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });
    
    it('retorna uma venda caso id existente', async function () {
      // arrange
      sinon.stub(saleModel, 'getById').resolves(allSales[0]);
      
      // act
      const result = await saleService.getById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allSales[0]);
    });
  });

  describe('Cadastrando uma venda', function () {
    it('retorna um erro caso quantity seja zero', async function () {
      // arrange: ESTÁ PASSANDO ESSE ERRO, DO CATCH DA MODEL
      // const error = `Erro ao inserir na tabela sales_products: Cannot add or update a child row: a foreign key constraint fails ("StoreManager"."sales_products", CONSTRAINT "sales_products_ibfk_1" FOREIGN KEY ("sale_id") REFERENCES "sales" ("id") ON DELETE CASCADE)`;
      // sinon.stub(connection, 'execute').resolves(error)
      // act
      const result = await saleService.createSale(wrongZeroQuantityBody);
      
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
    });
    it('retorna um erro caso quantity seja negativo', async function () {
      // arrange: ESTÁ PASSANDO ESSE ERRO, DO CATCH DA MODEL.
      // const error = `Erro ao inserir na tabela sales_products: Cannot add or update a child row: a foreign key constraint fails ("StoreManager"."sales_products", CONSTRAINT "sales_products_ibfk_1" FOREIGN KEY ("sale_id") REFERENCES "sales" ("id") ON DELETE CASCADE)`;
      // sinon.stub(connection, 'execute').resolves(error)
      // act
      const result = await saleService.createSale(wrongNegativeQuantityBody);
      
      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
    });
    it('retorna dados da venda cadastrada com sucesso', async function () {
      // arrange
      sinon.stub(saleModel, 'insertSale').resolves(saleCreateResponse.id);
      sinon.stub(saleModel, 'getById').resolves(saleById);
      // act
      const result = await saleService.createSale(saleCreateResponse.itemsSold);
      
      // assert
      expect(result.type).to.equal(null);
      // expect compara objetos: usar o deep!!
      expect(result.message).to.be.deep.equal(saleCreateResponse);
    });
  });
  afterEach(function () {
   sinon.restore();
  });
});