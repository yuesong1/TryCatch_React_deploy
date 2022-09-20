import { useNavigate } from "react-router-dom";
export function postRequest(targetUrl, payload) {
  // const history=new useNavigate();
  const result = fetch(targetUrl, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: payload,
  });
  result.then(data => {
    if (data.status === 200) {
      data.json().then(res => {
        alert('Request Success')
        // history('../')
      })
    } else if (data.status === 400) {
      alert('Invalid Request')
    }
  })
}

export function getRequest(targetUrl, setData) {
  // const history=new useNavigate();
  const result = fetch(targetUrl, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });
  result.then(data => {
    if (data.status == 200) {
      data.json().then(res => {
        setData(res)
      })
    }
    else{
     // alert('Request Failed')
    }

  })
}
export const backend = {
  //url: "http://localhost:8080/app/"
  url:"https://ancient-retreat-46698.herokuapp.com/"
}
export function AdminViewAllOrder() {
  return backend.url + 'AdminViewAllOrder'
}
export function AdminViewAllItems(type) {
  return backend.url + 'AdminViewAllItems?listing_type=' + type
}
export function AdminGetAllCustomers() {
  return backend.url + 'AdminGetAllCustomers'
}
export function SellerViewOrder(id, type) {
  return backend.url + 'SellerViewOrder?id=' + id + '&type=' + type
}
export function CustomerViewOrder(id) {
  return backend.url + 'CustomerViewOrder?id=' + id
}
export function SellerViewListing(id, type) {
  return backend.url + 'SellerViewListing?id=' + id + '&type=' + type
}
export function SellerViewAllListing(id, type) {
  return backend.url + 'SellerViewAllListing?id=' + id
}
export function SellerViewAllOrder(id, type) {
  return backend.url + 'SellerViewAllOrder?id=' + id
}
export function GetSeller(id) {
  return backend.url + 'AdminGetSeller?id=' + id
}
export function GetBuyer(id) {
  return backend.url + 'AdminGetCustomer?id=' + id
}
export function GetOrderById(id) {
  return backend.url + 'ServletGetOrderById' + '?order_id=' + id
}
export function GetItemById(id) {
  return backend.url + 'ServletGetItemById' + '?item_id=' + id
}
export function CustomerSearchItem(name) {
  return backend.url + 'CustomerSearchItem' + '?name=' + name
}
export function CustomerGetCartItem(id) {
  return backend.url + 'ServletGetCartItemByCustomer?buyer_id=' + id
}

export function CustomerBidOnItem() {
  return backend.url + 'ServletBidOnItem'
}
export function CustomerAddFixedPricetoCart() {
  return backend.url + 'ServletAddItemToCart'
}
export function CustomerChangeQuantityCart() {
  return backend.url + 'CustomerChangeQuantityCart'
}
export function CustomerGetSpecificCartItem(buyer_id, item_id) {
  return backend.url + 'ServletGetSpecificCartItem' + '?buyer_id=' + buyer_id + '&item_id=' + item_id
}

export function CustomerDeleteItemFromCart() {
  return backend.url + 'ServletDeleteItemFromCart'
}

export function CustomerCancelOrder(order_id) {
  return backend.url + 'CustomerCancelOrder' + '?order_id=' + order_id
}

export function CustomerChangeQuantity() {
  return backend.url + 'CustomerChangeQuantity'
}

export function CustomerPlaceItemOrder() {
  return backend.url + 'ServletPlaceItemOrder'
}

export function SellerCreateNewListing(seller_id) {
  return backend.url + 'SellerCreateListing' + '?id=' + seller_id
}

export function SellerCancelListing(item_id) {
  return backend.url + 'SellerCancelListing' + '?item_id=' + item_id
}


export function GetCustomerByItem(item_id) {
  return backend.url + 'ServletGetCustomerByItem?id=' + item_id
}
export function SellerChangeStock() {
  return backend.url + "SellerChangeStock"
}
export function SellerDeleteOrder(order_id) {
  return CustomerCancelOrder(order_id)
}
export function SellerChangeOrderQuantity() {
  return backend.url + "ServletSellerChangeOrderQuantity"
}
export function LoginController() {
  return backend.url + 'LoginController'
}