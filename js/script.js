'use strict';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    catalogUrl: '/catalogData.json',
    productImg: 'img/default-item.jpg',
    searchLine: '',
    basket: [],
    isVisibleCart: false,
    productSum: 0,
    },
  methods: {
    fetchGoods(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(`Ошибка: ${error}`);
        });
    },
    addProduct(good) {
      this.basket.push(good);
    },
    FilterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter(good =>
        regexp.test(good.product_name));
    },
    ShowCart() {
      if (!this.isVisibleCart) {
        this.basket.forEach(product => {
        this.productSum += parseInt(product.price)});
        this.isVisibleCart = true;
        console.log(this.basket);
      } else {
        this.isVisibleCart = false;
      }
    },
    delProduct(good) {
      this.basket.pop(good);
      this.productSum = this.productSum - good.price;
    },
    },
  computed: {
  },
  mounted() {
    this.fetchGoods(`${API_URL + this.catalogUrl}`)
      .then( data => {
        for (let good of data) {
          this.goods.push(good);
        }
        this.filteredGoods = this.goods;
      })
  },
});

Vue.component('goods-list', {
  props: ['goods'],
  template: `
          <div class="goods-list" v-show="!isVisibleCart">
            <div class="nothing-found" v-if="filteredGoods.length == 0">Ничего не найдено</div>
            <goods-item v-for="good in goods" :good="good"></goods-item>
          </div>
        `
});

Vue.component('goods-item', {
  props: ['good'],
  template: `<div class="goods-item">
              <h3>{{ good.product_name }}</h3>
              <img :src="productImg">
              <p>{{ good.price }}<span class="rub">&#8399;</span></p>
              <button @click="addProduct(good)" type="button" class="cart-button">Купить</button>
            </div>`,
});

Vue.component('basket-app', {
  props: ['basket-goods'],
  template: `<div class="cart" v-show="isVisibleCart">
            <basket-row v-for="good in basket-goods" :good="good"></basket-row>
            <p class="product_sum">Итого: {{ productSum }}</p>
            </div>`
    });

Vue.component('basket-row', {
  props: ['good'],
  template: `<div class="cart-item" v-for="good in basket">
              <img :src="productImg" class="cart-img">
              <h3>{{ good.product_name }}</h3>
              <p>{{ good.price }}<span class="rub">&#8399;</span></p>
              <button @click="delProduct(good)" type="button" class="delete-item">Удалить</button>
            </div>`,
});
