'use strict';

const goods = [
  { title: 'Shirt', price: 150},
  { title: 'Socks', price: 50},
  { title: 'Jacket', price: 350},
  { title: 'Shoes', price: 250},
];

const renderGoodsItem = (item, img = 'img/default-item.jpg') => {
  // Возвращает разметку для конкретного товара
  return `<div class="goods-item"><h3>${item.title}</h3>
		<img src=${img}></img>
		<p>${item.price} <span class="rub">&#8399;</span></p>
		<button class="cart-button" type="button">Купить</button>
		</div>`;
};

const renderGoodsList = (list) => {
  // Собирает все товары в один список и записывает его в контейнер good-list
  let goodsList = list.map(item => renderGoodsItem(item)).join('');
  document.querySelector('.goods-list').insertAdjacentHTML("afterBegin", goodsList);
}

renderGoodsList(goods);

