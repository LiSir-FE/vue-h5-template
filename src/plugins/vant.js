// 按需全局引入 vant组件
import Vue from 'vue'
import { Button, List, Cell, Tabbar, TabbarItem, Icon, Image as VanImage, Swipe, SwipeItem } from 'vant'
Vue.use(Button)
Vue.use(Cell)
Vue.use(List)
Vue.use(Icon)
Vue.use(VanImage)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Tabbar).use(TabbarItem)
