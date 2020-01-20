'use strict';

class GoodsItem {
  constructor( title, price, img = 'img/default-item.jpg') {
    this.title = title;
    this.price = price;
    this.img = img;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3>
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
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150},
      { title: 'Socks', price: 50},
      { title: 'Jacket', price: 350},
      { title: 'Shoes', price: 250},
    ];
  }
  render() {
    let listHtml = '';
    this.goods.forEach( good => {
      const goodItem = new GoodsItem(good.title, good.price, good.img);
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

// Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
class BasketList {
  sumBasket() {
    // Сумма товаров в корзине
  }
  delItem() {
    // Удалить товар из корзины
  }
  quantityItem() {
    // Изменение количества товара в заказе
  }
}

class BasketItem {
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.sumGoods();



