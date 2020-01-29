Vue.component('goods-list', {
  props: ['goods', 'isVisibleCart', 'prodImg'],
  template: `
          <div class="goods-list" v-show="!isVisibleCart">
            <div class="nothing-found" v-if="goods.length == 0">Ничего не найдено</div>
            <goods-item v-for="good in goods" :good="good" :prodImg="prodImg" :key="good.id_product"></goods-item>
          </div>
        `
});

Vue.component('goods-item', {
  props: ['good', 'prodImg'],
  template: `<div class="goods-item" :key="good.id_product">
              <h3>{{ good.product_name }}</h3>
              <img :src="prodImg">
              <p>{{ good.price }}<span class="rub">&#8399;</span></p>
              <button @click="$root.addProduct(good)" type="button" class="cart-button">Купить</button>
            </div>`,
});

Vue.component('basket-list', {
  props: ['basket-goods', 'isVisibleCart', 'prodImg', 'summ'],
  template: `<div class="cart" v-show="isVisibleCart">
              <div class="nothing-found" v-if="basket-goods.length == 0">Корзина пуста</div>
              <basket-row v-for="good in basket-goods" :good="good" :key="good.id_product"></basket-row>
              <p class="product_sum">Итого: {{ summ }}</p>
            </div>`
    });

Vue.component('basket-row', {
  props: ['good', 'prodImg'],
  template: `<div class="cart-item">
              <img :src="prodImg" class="cart-img">
              <h3>{{ good.product_name }}</h3>
              <p>{{ good.price }}<span class="rub">&#8399;</span></p>
              <button @click="delProduct(good)" type="button" class="delete-item">Удалить</button>
            </div>`,
});
