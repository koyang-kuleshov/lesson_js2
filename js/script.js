'use strict';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
  constructor( title, price, img = 'img/default-item.jpg') {
    this.product_name = title;
    this.price = price;
    this.img = img;
  }
  render() {
    return `<div class="goods-item"><h3>${this.product_name}</h3>
    <img src=${this.img}></img>
    <p>${this.price} <span class="rub">&#8399;</span></p>
    <button class="cart-button" type="button">Купить</button>
    </div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) =>{
      this.goods = [...goods];
      cb();
    })
  }

// Метод, который определяет суммарную стоимость всех товаров.
  sumGoods() {
    let summ = 0;
    this.goods.forEach( good => {
      summ += parseInt(good.price);
    });
    return summ;
  }
}

function makeGETRequest(url, callback) {
  fetch(url)
    .then(result => result.json())
    .then(data => {
      let listHtml = '';
      data.forEach( good => {
        const goodItem = new GoodsItem(good.product_name, good.price, good.img);
        listHtml += goodItem.render();
      });
      document.querySelector('.goods-list').insertAdjacentHTML('afterBegin', listHtml);
    })
    .catch(console.log( `Данные не получены` ))
}

let makePOSTRequest = (url) => {
// Сделать функцию для POST запроса
  return new Promise((resolve, reject) => {
    let xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === '200') {
          resolve(xhr.responseText);
        } else {
          reject('Error')
        }
      }
    }
  xhr.send();
  });
}

// Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.

class BasketList {

  getBasket() {
  // /getBasket.json - получить содержимое корзины
    makeGETRequest(`${API_URL}/getBasket.json`, (goods) =>{
      this.goods = JSON.parse(goods);
    })
  }

  addToBasket(good) {
    makePOSTRequest(`${API_URL}/addToBasket.json`, (good) =>{
      this.good = JSON.stringify(good);
    })
  }

  delItem() {
    // Удалить товар из корзины
    makePOSTRequest(`${API_URL}/deleteFromBasket.json`, (good) =>{
      this.good = JSON.stringify(good);
    })
  }
}

const list = new GoodsList();
list.fetchGoods();
list.sumGoods();

