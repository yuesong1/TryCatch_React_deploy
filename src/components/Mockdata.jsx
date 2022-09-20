export const mockItem =
{
  item_id: 1,
  seller_id: 1,
  name: "apple",
  category: "fruit",
  brand: "none",
  origin: "California",
  manufacture_date: "2020.2.1",
  stock: 20,
  buy_now_price: 5,
  desciption: "fresh apple from california!",

  listing_type: true,
  start_date: null,
  end_date: null,
  start_price: null,
  end_price: null,
  temp_price: null,
};

export const mockAuction =
{
  item_id: 1,
  seller_id: 1,
  name: "apple",
  category: "fruit",
  brand: "none",
  origin: "California",
  manufacture_date: "2020.2.1",
  stock: 20,
  buy_now_price: 50,
  desciption: "fresh apple from california!",

  listing_type: false,
  start_date: "2020.2.2",
  end_date: "2020.3.2",
  start_price: 10,
  end_price: null,
  temp_price: 15,
}
export const mockItems = [
  {
    item_id: '1',
    item_name: 'Apple',
    price: '12',
    seller: "Ann",
    quantity: "10"
  },
  {
    item_id: '2',
    item_name: 'Cup',
    price: '122',
    seller: 'Glen',
    quantity: "1"
  }
]
export const mockAuctions = [
  {
    item_id: '3',
    item_name: 'Pearls',
    price: '120',
    seller: "Benne",
    quantity: "10"
  },
  {
    item_id: '4',
    item_name: 'Cup',
    price: '1220',
    seller: 'Roy',
    quantity: "15"
  }
]
export const mockOrderInfo =
{
  order_id: '1',
  item_id: '3',
  seller_id: '1',
  seller_name: "Seller",
  buyer_name: "Buyer",
  quantity: "18",
  createTime: "2020.5.6",
  item:mockItem
}
export const mockBuyers = [
  {
    customer_id: '1',
    username: "Ann"
  },
  {
    customer_id: '2',
    username: "Bruce"
  },
  {
    customer_id: '3',
    username: "Cain"
  }
]
export const mockBuyer = 
  {
    customer_id: '1',
    username: "Ann"
  }


export const mockSeller={
  seller_id: 1,
  username:"Green.co"

}

export const sample = [
  {
      id: '1',
      name: 'apple',
      buyer: 'a',
      seller: 'b',
      createAt: 8.3,
      quantity: 20,
      price: 5,
      type: 'auction'
  },
  {
      id: '2',
      name: 'cup',
      buyer: 'Ann',
      seller: 'Glen',
      createAt: 8.24,
      quantity: 24,
      price: 34,
      type: 'auction'
  }
]

export const MockOrderWithFixedPrice={
  "order_id": 0,
  "customer_id": 0,
  "seller_id": 0,
  "item_id": 0,
  "quantity": 0,
  "create_time": "00",
  "status": "completed",
  "item": {
      "item_id": 1,
      "seller_id": 1,
      "name": "00",
      "category": "00",
      "brand": "00",
      "origin": "00",
      "manufacture": "00",
      "stock": 0,
      "buy_now_price": 0,
      "listing_type": true,
      "description": "00"
  }
}