import {createApp} from 'vue'
import App from './App.vue'
import Hello from './Hello.vue'
import {valueOf} from "node";

// 创建应用
const app = createApp(App)

app.component('Hello', Hello)
app.config.globalProperties.x = 99

app.directive('beauty', (element,{value}) => {
    element.innerText += value
    element.style.color = 'green'
    element.style.backgroundColor = 'yellow'
})
// 挂载应用
app.mount('#app')
