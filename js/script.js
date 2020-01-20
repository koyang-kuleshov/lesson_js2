// Переделайте makeGETRequest() так, чтобы она использовала промисы.
// Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.

'use strict';

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
      this.goods = JSON.parse(goods);
      cb();
    })
  }

  render() {
    let listHtml = '';
    this.goods.forEach( good => {
      const goodItem = new GoodsItem(good.product_name, good.price, good.img);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').insertAdjacentHTML('afterBegin', listHtml);
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
  var xhr;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();
});
list.sumGoods();



