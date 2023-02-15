const allSales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 2,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 1
  }
]

const saleById = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 1
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 5
  }
];

const wrongSaleNotProductIdBody = [{quantity: 1}];
const wrongSaleNotQuantityBody = [{productId: 1}];
const nonexistentProductIdBody = [
  {productId: 1, quantity: 1},
  {productId: 99999, quantity: 5},
];
const wrongZeroQuantityBody = [{productId: 1, quantity: 0}];
const wrongNegativeQuantityBody = [{ productId: 1, quantity: -1 }];

const rightSaleBody = [
  {productId: 1, quantity: 1},
  {productId: 2, quantity: 5},
];

const saleCreateResponse = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ]
};

module.exports = {
  allSales,
  saleById,
  wrongSaleNotProductIdBody,
  wrongSaleNotQuantityBody,
  nonexistentProductIdBody,
  wrongZeroQuantityBody,
  wrongNegativeQuantityBody,
  rightSaleBody,
  saleCreateResponse
};