# Vue3学习笔记

## 第一天

### 基于vite创建Vue3项目

![Vite脚手架选项](./assets/Vite脚手架选项.png)

##### 项目虽然使用TypeScript，但是任然可以使用JavaScript

##### Vue Router（路由）和ESLint等选项根据自身需求选择

##### 下载项目对应的module文件

##### 默认运行项目指令`npm run dev`或`yarn dev`(前提是安装yarn包)

### src文件夹介绍

##### src文件夹默认包含`main.ts`,`App.vue`和`components`三部分，其中main.ts包括以下代码

```typescript
// 引入createApp用于创建应用
import {createApp} from "vue";
// 引入app组件
import App from "./App.vue";

createApp(App).mount("#app");
```

##### `App.vue`是根组件，主要包括以下代码

```vue
<template>
    !-- html结构 -->
</template>

<script lang = "ts">
	// TS或JS
</script>

<style>
	// CSS样式，可写SASS和LESS
</style>
```

##### `components`是存放枝组件的文件夹

### 实现一个简单的效果

```vue
// person.vue
<script lang="ts">
export default {
    name: 'Person',
    data(){
        return {
            name: "Person",
  			age: 18,
  			tel: '13812345678'
        }
    },
    methods: {
        changeName() {
            this.name = 'zhangsan'
        },
        changeAge() {
    		this.age++
		},
    	showTel() {
            alert(this.tel)
        }
    }
  
}
</script>

<template>
  <div class="person">
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改姓名</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>

<style scoped>
.person {
  background-color: skyblue;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
}
</style>
```

##### 调用person组件

```vue
<script lang="ts">
import Person from "./components/person.vue" // 引入person.vue

export default {
  name: 'App', // 组件名
  components: {
    Person
  }
}
</script>

<template>
  <div class="app">你好啊！
    <Person></Person>
  </div>

</template>

<style scoped>
.app {
  background-color: #f5f5f5;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: 20px;
}
</style>
```

##### 呈现效果

![实现一个简单效果](./assets/实现一个简单效果.png)

### OptionsAPI与CompositionAPI

##### Vue2是标准的选项式API，将数据（data），方法（methods），计算（computed），观察（watch）等分开写；优点在于，组件逻辑清晰，在组件功能较少时区分明显；缺点在于，当组件数据、功能较多时想新增过修改需求，需要分别修改data,methods,computed等，不便于维护和复用。可以说，写Vue2，就是学会写配置项。

##### Vue3是组合式API，优点在于可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。也是Vue官方首推使用的方式。

### 拉开序幕的setup

##### setup是Vue3新增的配置项，值是一个函数，组件中所有的数据、方法、计算属性等都配置在setup中

##### 其特点如下

- `setup`函数返回的对象中的内容可直接在模版中使用
- `setup`中访问的`this`是`undefined`，也就是不能在`setup`中使用this指代数据
- `setup`函数会在`beforeCreate`之前使用，它是“领先”所有钩子执行的

```vue
<script lang="ts">
export default {
  name: "Person",
  setup() {
    console.log(this) // setup中的this是undefined
    // 数据：原来是写在data中的
    // 这样写不是响应式数据
    let name = '张三'
    let age = 18;
    let tel = '13812345678'

    // 方法
    function changeName() {
      name = 'zhangsan' // 注意：这样修改name，页面是没有变化的
        				// name确实修改了，但页面上的name不会更改
        				// this.name这种写法是错误的
    }

    function changeAge() {
      age++
    }

    function showTel() {
      alert(tel)
    }

    return {name, age, tel, changeName, changeAge, showTel} // 可以使用键值对，如{a : name, 	b : age}；也可以直接写变量名和函数名
  },
}
</script>

<template>
  <div class="person">
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>
  </div>
</template>

<style scoped>
.person {
  background-color: skyblue;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
}

button {
  margin: 0 5px;
}
</style>

```

##### 此时，我们顺利使用Vue3重构本项目，但是你可以发现，名字和年龄并没有修改，而查看联系方式这个函数能正常执行

### `setup`与`optionAPI`

##### 在这个组件中，我同时使用了Vue2和Vue3的语法，由于`setup`的生命周期先于beforeCreate，此时setup中的数据成为了全局变量，所以在`data`中依然能访问到`setup`里面的数据。不过我们不推荐在一个项目中Vue2和Vue3的语法混写，这不利于项目的维护

```vue
<script lang="ts">
export default {
  name: "Person",
  data() {
    return {
      a: '测试'
    }
  },
  methods: {
    b() {
      console.log(this.a)
    }
  },
  setup() {
    console.log(this) // setup中的this是undefined
    // 数据：原来是写在data中的
    // 这样写不是响应式数据
    let name = '张三'
    let age = 18
    let tel = '13812345678'

    // 方法
    function changeName() {
      name = 'zhangsan' // 注意：这样修改name，页面是没有变化的
    }

    function changeAge() {
      age++
    }

    function showTel() {
      alert(tel)
    }

    return {name, age, tel, changeName, changeAge, showTel}
  },
}
</script>

<template>
  <div class="person">
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改姓名</button>
    <button @click="showTel">查看联系方式</button>
    <hr>
    <h2>测试：{{ a }}</h2>
    <button @click="b">查看</button>
  </div>
</template>

<style scoped>
.person {
  background-color: skyblue;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
}
</style>
```



## 第二天

### `setup`语法糖

##### 在之前的代码中，我们在`export default`里面单独写了`setup`配置项，其实我们可以把`setup`独立出去

##### 下面的代码中我单独写了两个script，一个专门用于写组件的名字，另一个专门用于写组合式API

##### 并且在单独的setup标签中，我们不需要写return返回值

```vue
// 这个标签的lang="ts"不能少
<script lang="ts">
export default {
  name: "Person",
}
</script>

<script lang="ts" setup>
// console.log(this) // setup中的this是undefined
// 数据：原来是写在data中的
// 这样写不是响应式数据
let name = '张三'
let age = 18
let tel = '13812345678'

// 方法
function changeName() {
  name = 'zhang_san' // 注意：这样修改name，页面是没有变化的
}

function changeAge() {
  age++
}

function showTel() {
  alert(tel)
}
</script>
```

### `ref`创建基本类型的响应式数据

##### 对基础数据类型要实现相应式，只需用`ref()`包裹数据

##### 注意：`JS`中操作数据需要`xxx.value`，但在模版中不需要`.value`

##### 对于`let name = '张三'`,`name`不是响应式的，`name.value`是

```vue
<script lang="ts" setup name="Person">
import {ref} from "vue";	// 引入ref
    
// 数据
let name = ref('张三')	// 此时name已经成为响应式数据
let age = ref(18)
let tel = '138111111111'

// 方法
function changeName() {	// 要访问到真正的name，需要使用name.value
    name.value = 'zhang_san'
}
    
function changeAge() {
    age.value ++
}
</script>
```

### `reactive`创建_对象类型的响应式数据

##### `reactive`只能作用于对象，并且在`js`中操作数据不需要`.value`

```vue
<script lang="ts" setup name="Person">
import {reactive} from "vue";

// 数据
let car = reactive({brand: '奔驰', price: 100})	// 使用reactive包裹对象的数据，从而变成响应式数据
let games = reactive([	// 也可以包裹数组对象
  {id: 'wzry', name: '王者荣耀'},
  {id: 'ys', name: '原神'},
  {id: 'xqtd', name: '星穹铁道'}
])

let obj = reactive({
  a: {
    b: {
      c: 666
    }
  }
})

// 方法
const changePrice = () => {
  car.price += 10
}

const changeFirstName = () => {
  games[0].name = '绝区零'
}

const changeObj = () => {
  obj.a.b.c = 999
}
</script>
```

### `ref`创建_对象类型的响应式数据

```vue
 ref -> 可以定义：基本类型、对象类型的响应式数据

 reactive -> 只能定义：对象类型的响应式数据
```

##### 使用`ref`包裹对象本质上是他的`.value`变成`Proxy`,其实底层是用`reactive`实现的

```vue
<script lang="ts" setup name="Person">
import {ref} from "vue";

let car = ref({brand: '奔驰', price: 100})
let games = ref([
  {id: 'wzry', name: '王者荣耀'},
  {id: 'ys', name: '原神'},
  {id: 'xqtd', name: '星穹铁道'}
])

let obj = ref({
  a: {
    b: {
      c: 666
    }
  }
})

const changePrice = () => {
  car.value.price += 10	// 注意.value的位置，是操作car.value的数据
}

const changeFirstName = () => {
  games.value[0].name = '绝区零'
}

</script>
```

### `ref`对比`reactive`

##### 宏观角度

- 1.`ref`用来定义：基本数据类型，对象数据类型
- 2.`reactive`用来定义：对象类型数据

##### 区别

- 1.`ref`创建的变量必须使用`.value`（可以使用`volar`插件自动添加`.value`）
- 2.`reactive`重新分配一个新对象，会**失去**响应式（可以使用`Object.assign`去整体替换）

##### 使用原则

- 1.若需要一个基本类型的响应式数据，必须使用`ref`
- 2.若需要一个响应式对象，层级不变，`ref`,`reactive`都可以
- 3.若需要一个响应式对象，且层级较深，推荐使用`reactive`

```vue
<script lang="ts" setup name="Person">
import {ref, reactive} from "vue";

let car = ref({brand: '奔驰', price: 100})
let sum = ref(0)

const changePrice = () => {
  car.value.price += 10
}

const changeSum = () => {
  sum.value += 10
}

const changeBrand = () => {
  car.value.brand = '奥迪'
}

const changeCar = () => {
  // car = {brand: '宝马', price: 100}	// 这样的car就不再是响应式对象了
  // car = reactive({brand: '宝马', price: 200})	// reactive({brand: '宝马', price: 200})是新的对象了，不是原来的car对象
  // 下面这个写法页面可以更新
  // Object.assign(car, {brand: '宝马', price: 200})
  car.value = {brand: '宝马', price: 200}
}

</script>
```

### `toRef`和`toRefs`

##### 使用解构的时候，例如`let {name, age} = person`，此时`name`和`age`不是响应式数据，即使`let person = reactive({name: '张三', age: 18})`，这就相当于`let name = person.name`,修改的是`name`,而不是`person.name`,可以使用`toRefs`将对象变成多个`ref`定义的响应式对象

##### 注意使用`toRefs`定义的对象需要使用`.value`获取数据

##### `let nl = toRef(person, 'age')`是解构单个对象变成响应式数据，`let 变量 = toRef(对象, 'key')`

```vue
<script lang="ts" setup name="Person">
import {reactive, toRefs, toRef} from 'vue';

let person = reactive({
  name: '张三',
  age: 18
})

let {name, age} = toRefs(person)
let nl = toRef(person, 'age')
console.log(nl.value)
// console.log(name)
// console.log(age)

function changeName(){
  name.value += '~'
}

function changeAge(){
  age.value += 1
}

</script>
```

