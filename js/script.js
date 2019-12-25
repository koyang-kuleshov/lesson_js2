const goods = [
  { title: 'Shirt', price: 150},
  { title: 'Socks', price: 50},
  { title: 'Jacket', price: 350},
  { title: 'Shoes', price: 250},
];

const renderGoodsItem = (title, price) => {
  // Возвращает разметку для конкретного товара
  return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (list) => {
  // Собирает все товары в один список и записывает его в контейнер good-list
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  // document.querySelector('.goods-list').innerHTML = goodsList;
  document.querySelector('.goods-list').insertAdjacentHTML("afterBegin", goodsList);
}

renderGoodsList(goods);

