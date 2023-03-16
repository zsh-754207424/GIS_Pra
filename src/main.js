import Vue from 'vue'
import App from './App.vue'
import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "ol/ol.css"
/*import '@/assets/css/global.css'*/
import HighchartsVue from 'highcharts-vue'
import axios from 'axios'
import router from './router'
import mapconfig from './config/mapConfig'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'

exportingInit(Highcharts)
Vue.prototype.mapconfig = mapconfig

import Contextmenu from "vue-contextmenujs"
Vue.use(Contextmenu);



Vue.prototype.$axios = axios
Vue.use(HighchartsVue)
Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
