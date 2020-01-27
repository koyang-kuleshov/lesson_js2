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

