# Vue3学习笔记

## 第一天

### 基于Vite创建Vue3项目

![Vite脚手架选项](./assets/Vite脚手架选项.png)
 项目虽然使用TypeScript，但是任然可以使用JavaScript

 Vue Router（路由）和ESLint等选项根据自身需求选择

 下载项目对应的module文件

 默认运行项目指令`npm run dev`或`yarn dev`(前提是安装yarn包)

### src文件夹介绍

 src文件夹默认包含`main.ts`,`App.vue`和`components`三部分，其中main.ts包括以下代码

```typescript
// 引入createApp用于创建应用
import {createApp} from "vue";
// 引入app组件
import App from "./App.vue";

createApp(App).mount("#app");
```

 `App.vue`是根组件，主要包括以下代码

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

 `components`是存放枝组件的文件夹

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

 调用person组件

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

 呈现效果

![实现一个简单效果](./assets/实现一个简单效果.png)

### OptionsAPI与CompositionAPI

 Vue2是标准的选项式API，将数据（data），方法（methods），计算（computed），观察（watch）等分开写；优点在于，组件逻辑清晰，在组件功能较少时区分明显；缺点在于，当组件数据、功能较多时想新增过修改需求，需要分别修改data,methods,computed等，不便于维护和复用。可以说，写Vue2，就是学会写配置项。

 Vue3是组合式API，优点在于可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。也是Vue官方首推使用的方式。

### 拉开序幕的setup

 setup是Vue3新增的配置项，值是一个函数，组件中所有的数据、方法、计算属性等都配置在setup中

 其特点如下

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

 此时，我们顺利使用Vue3重构本项目，但是你可以发现，名字和年龄并没有修改，而查看联系方式这个函数能正常执行

### `setup`与`optionAPI`

 在这个组件中，我同时使用了Vue2和Vue3的语法，由于`setup`的生命周期先于beforeCreate，此时setup中的数据成为了全局变量，所以在`data`中依然能访问到`setup`里面的数据。不过我们不推荐在一个项目中Vue2和Vue3的语法混写，这不利于项目的维护

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

 在之前的代码中，我们在`export default`里面单独写了`setup`配置项，其实我们可以把`setup`独立出去

 下面的代码中我单独写了两个script，一个专门用于写组件的名字，另一个专门用于写组合式API

 并且在单独的setup标签中，我们不需要写return返回值

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

 对基础数据类型要实现相应式，只需用`ref()`包裹数据

 注意：`JS`中操作数据需要`xxx.value`，但在模版中不需要`.value`

 对于`let name = '张三'`,`name`不是响应式的，`name.value`是

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

 `reactive`只能作用于对象，并且在`js`中操作数据不需要`.value`

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

 使用`ref`包裹对象本质上是他的`.value`变成`Proxy`,其实底层是用`reactive`实现的

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

 宏观角度

- 1.`ref`用来定义：基本数据类型，对象数据类型
- 2.`reactive`用来定义：对象类型数据

 区别

- 1.`ref`创建的变量必须使用`.value`（可以使用`volar`插件自动添加`.value`）
- 2.`reactive`重新分配一个新对象，会**失去**响应式（可以使用`Object.assign`去整体替换）

 使用原则

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

 使用解构的时候，例如`let {name, age} = person`，此时`name`和`age`不是响应式数据，即使`let person = reactive({name: '张三', age: 18})`，这就相当于`let name = person.name`,修改的是`name`,而不是`person.name`,可以使用`toRefs`将对象变成多个`ref`定义的响应式对象

 注意使用`toRefs`定义的对象需要使用`.value`获取数据

 `let nl = toRef(person, 'age')`是解构单个对象变成响应式数据，`let 变量 = toRef(对象, 'key')`

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

## 第三天

### `computed`计算属性

在很多时候，我们需要使用已知的数据去获取新的数据，虽然可以直接在模版上面进行计算，但是这样不利于后期的维护，也会使模版变得更加臃肿，因此我们引入`computed`的概念，将所有需要计算的值统一放在里面

```vue
<template>
  <div class="person">
    姓: <input type="text" v-model="firstName"/>
    <br>
    名: <input type="text" v-model="lastName"/>
    <br>
    全名: <span>{{ fullName }}</span>
    <button @click="changeFullName">将全名改为li-si</button>
  </div>
</template>
```

这个案例的作用是分别输入姓和名，在最下方的全名标签会计算出名称

![computed计算属性](./assets/computed计算属性.png)

我们使用`fullName`变量去接收`computed`计算出来的数值

```vue
<script lang="ts" setup name="Person">
import {ref, computed} from 'vue';

let firstName = ref('张')
let lastName = ref('三')

// 这样定义fullName是一个计算属性，可读可写
let fullName = computed({
  // 计算后传递出去的值
  get() {
    return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + "-" + lastName.value
  },
  // val是计算出来的数值
  set(val) {
    const [str1, str2] = val.split('-')
    firstName.value = str1
    lastName.value = str2
  }
})
```

### `watch`监视

作用：监视数据的变化

特点：Vue3中的`watch`只能监视以下四种情况

- 1.`ref`定义的数据
- 2.`reactive`定义的数据
- 3.函数返回一个值
- 4.一个包含上述内容的数组

使用方法

- 1.引入`watch`,`import {watch} from 'vue'`
- 2.格式`watch(监视的基本类型数据, (newValue, oldValue), {deep、immediate、可选})

#### 监视`ref`定义的基本类型数据

`newValue` 是更新后的数据,`oldValue`是更新前的数据

```vue
<script lang="ts" setup name="Person">
import {ref, watch} from 'vue';

let sum = ref(0)

function changeSum() {
  sum.value++
}

// 监视
 watch(sum, (newValue, oldValue) => {
  console.log('sum变化了', newValue, oldValue)
  if(newValue >=10) {
    stopWatch()
  }
})

</script>

<template>
  <div class="person">
    <h1>监视ref定义的基本类型数据</h1>
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="changeSum">点我加1</button>
  </div>
</template>
```

#### 监视`ref`定义的对象类型数据

```vue
<script lang="ts" setup name="Person">
import {ref, watch} from 'vue';

let person = ref({
  name: '张三',
  age: 18
})

function changeName() {
  person.value.name = 'zhang-san'
}

function changeAge() {
  person.value.age++
}

function changePerson() {
  person.value = {
    name: '李四',
    age: 100
  }
}

// 监视的是对象的地址值，若想监视对象内部属性的变化，需要手动深度监视
watch(person, (newValue, oldValue) => {
  console.log(newValue, oldValue)
}, {deep: true})

/*
watch的第一个参数是：被监视的数据
watch的第二个参数是：监视的回调
watch的第三个参数是：配置对象（deep, immediate等等……） 
*/

</script>

<template>
  <div class="person">
    <h1>监视ref定义的对象类型数据</h1>
    <h2>姓名:{{ person.name }}</h2>
    <h2>年龄:{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
  </div>
</template>
```

如果你细心可以发现，点击修改姓名和年龄按钮时，`newValue`和`oldValue`的值是一样的，但是点击修改整个人，`newValue`和`oldValue`又不一样。这是因为修改姓名和年龄的操作是只修改它的值，却并没有它的地址（你可以类比于C++的指针），而我们`newValue`和`oldValue`其实是监视它地址的变化；反之修改整个人，其实是单独开辟新的地址，并将这块地址命名为person，person的地址发生改变，因此`newValue`和`oldValue`不一样

#### 监视`reactive`定义的对象类型数据

监视`reactive`相比于`ref`最大的区别是`reactive`会自动完成深度监视，并且不能取消

```vue
<script lang="ts" setup name="Person">
import {reactive, watch} from 'vue';

let person = reactive({
  name: '张三',
  age: 18
})

function changeName() {
  person.name = 'zhang-san'
}

function changeAge() {
  person.age++
}

function changePerson() {
  // person = {
  //   name: '李四',
  //   age: 100
  // }
  Object.assign(person, {
    name: '李四',
    age: 100
  })
}

let obj = reactive({
  a: {
    b: {
      c: 100
    }
  }
})

function test() {
  obj.a.b.c = 888
}

// 监视reactive定义的对象类型数据，且默认开启深度监视
watch(person, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})

watch(obj, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})

/*
watch的第一个参数是：被监视的数据
watch的第二个参数是：监视的回调
watch的第三个参数是：配置对象（deep, immediate等等……）
*/

</script>

<template>
  <div class="person">
    <h1>监视ref定义的对象类型数据</h1>
    <h2>姓名:{{ person.name }}</h2>
    <h2>年龄:{{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">修改整个人</button>
    <hr>
    <h2>测试:{{ obj.a.b.c }}</h2>
    <button @click="test">点我修改</button>
  </div>
</template>

```

这个例子你又可以发现，点击修改整个人，`newValue`和`oldValue`却是一样，原因在于这行代码

`Object.assign(person, {name: '李四', age: 100})`

`assign`操作是将新的对象直接赋值给原来旧的对象，并没有单独开辟新的地址，因此`newValue`和`oldValue`一样

#### 监视`ref`或`reactive`定义的对象类型数据中的某个属性

- 1.若该属性值不是**对象类型**，需写成函数形式
- 2.若该属性值依然是**对象类型**，可以直接写，也可以写成函数，推荐写成函数

```vue
<script lang="ts" setup name="Person">
import {ref, reactive, watch} from 'vue';

let person = reactive({
  name: '张三',
  age: 18,
  car: {
    c1: '奔驰',
    c2: '宝马'
  }
})

function changeName() {
  person.name += '~'
}

function changeAge() {
  person.age += 1
}

function changeFirstCar() {
  person.car.c1 = '奥迪'
}

function changeSecondCar() {
  person.car.c2 = '大众'
}

function changeCar() {
  person.car = {
    c1: '雅迪',
    c2: '艾玛'
  }
}

// 监视响应式对象中的某个属性，且该属性是基本类型时，要写成函数
watch(() => person.name, (newValue, oldValue) => {
  console.log(newValue, oldValue)
},)

watch(() => person.car, (newValue, oldValue) => {
  console.log(newValue, oldValue)
}, {deep: true})

</script>

<template>
  <div class="person">
    <h2>姓名:{{ person.name }}</h2>
    <h2>年龄:{{ person.age }}</h2>
    <h2>汽车:{{ person.car.c1 }}、 {{ person.car.c2 }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeFirstCar">修改第一台车</button>
    <button @click="changeSecondCar">修改第二台车</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>
```

结论：监视的要是对象里面的属性，那么最好写函数式，注意点：若是对象监视的是地址值，需要关注对象内部，需要手动开启深度监视

#### 监视上述多个数据

```vue
<script lang="ts" setup name="Person">
import {ref, reactive, watch} from 'vue';

let person = reactive({
  name: '张三',
  age: 18,
  car: {
    c1: '奔驰',
    c2: '宝马'
  }
})

function changeName() {
  person.name += '~'
}

function changeAge() {
  person.age += 1
}

function changeFirstCar() {
  person.car.c1 = '奥迪'
}

function changeSecondCar() {
  person.car.c2 = '大众'
}

function changeCar() {
  person.car = {
    c1: '雅迪',
    c2: '艾玛'
  }
}

// 数组包函数
watch([() => person.name, () => person.car.c1], (newValue, oldValue) => {
  console.log(newValue, oldValue)
})

</script>

<template>
  <div class="person">
    <h2>姓名:{{ person.name }}</h2>
    <h2>年龄:{{ person.age }}</h2>
    <h2>汽车:{{ person.car.c1 }}、 {{ person.car.c2 }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeFirstCar">修改第一台车</button>
    <button @click="changeSecondCar">修改第二台车</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>
```

#### 总结

- **基本类型的 `ref`**：`newValue` 和 `oldValue` 在值变化时不同。
- **对象类型的 `ref`**：修改对象属性不会改变引用，`newValue` 和 `oldValue` 相同；重新赋值对象时不同。
- **`reactive`**：修改对象属性不会改变引用，`newValue` 和 `oldValue` 相同；重新赋值对象时不同。值得说明的一点是在`reactive`的情况下对象赋值只能通过`assign`的方式，因此`newValue` 和 `oldValue`一定相同

## 第四天

### `watchEffect`

在很多时候我们需要同时监视多个数据，因此可以使用`watch`配合数组进行监视

在下面的代码中，我们定义了`tmp`和`height`两个变量，有两个函数可以更新他的值，如果`tmp >= 60`或`height >= 80`时会返回字符串

```ts
// 数据
let tmp = ref(10)
let height = ref(0)

// 方法
function changeSum() {
  tmp.value += 10
}

function changeHeight() {
  height.value += 10
}

// watch实现
watch([tmp, height], (value) => {
  // console.log(value)
  let [newTmp, newHeight] = value // 从value中获取最新的水温水位
  if (newTmp >= 60 || newHeight >= 80) {
    console.log('给服务器发请求')
  } else console.log(newTmp, newHeight)
})
```

但是如果此时我们无需监视`height`，我们需要分别将与`height`有关的代码全部删除，这不利于维护，因此我们可以使用`watchEffect`代替`watch`

`watchEffect`会监控需要监控的全部数据，无需程序员手动维护监控

```ts
// 监视 --watchEffect实现
watchEffect(()=>{
  if(tmp.value >= 60 || height.value >= 80) {
    console.log('给服务发送请求')
  }
})
```

### 标签`ref`

如果此时有多个组件，我们需要获取某一个组件里面的`div`标签，以往我们会使用`class`或`id`获取，但是在Vue中，如果多个组件都存在id相同的标签那么会将他们一并获取，这不利于我们准确获取标签

例如我们要获取`h2`标签，只需为他添加`ref`

```html
<h2 ref="beijing">北京</h2>
```
并且设置变量接收

```ts
let beijing = ref()
```

使用`.value`就可以精确获取标签

```ts
console.log(beijing.value)
```

### TS中的接口、泛型、自定义类型

此时有一个对象`person`，里面包含一些数据,假如此时我的`name`写错了，或者`id`传入了`number`，编译器是不会有报错提示的（个别）

```ts
let person = {
    id: '12321',
    name: '张三',
    age: 60
  }
```

为了进一步规范和约束数据，我们在src文件夹中新建types文件夹，并且创建一个`index.ts`文件，专门用于编写接口文件

```ts
// 定义一个接口用于限制person对象的具体属性
export interface PersonInter {
    id: string,
    name: string,
    age: number
}
```

使用时需要先引入文件

```ts
import {type PersonInter} from '@/types'

let person : PersonInter = {
    id: '12321',
    name: '张三',
    age: 60
}

```

但是如果我们是数组包对象

```ts
// 第一种写法
let person : Array<PersonInter> =[
  {
    id: '12321',
    name: '张三',
    age: 60
  },
  {
    id: '12321',
    name: '张三',
    age: 60
  }
]

// 第二种写法
let person : PersonInter[] = [
  {
    id: '12321',
    name: '张三',
    age: 60
  },
  {
    id: '12321',
    name: '张三',
    age: 60
  }
]

// 第三种写法
let person = <PersonInter[]> [
  {
    id: '12321',
    name: '张三',
    age: 60
  },
  {
    id: '12321',
    name: '张三',
    age: 60
  }
]

// 第四种写法
let person = <Array<PersonInter>> [
  {
    id: '12321',
    name: '张三',
    age: 60
  },
  {
    id: '12321',
    name: '张三',
    age: 60
  }
]
```

当然我们也可以定义数组包对象的接口

```ts
// 第一种
export type PersonList = Array<PersonInter>
// 第二种
export type PersonList = PersonInter[]
```

使用方法

```ts
import {type PersonList} from '@/types'

let person = <PersonList> reactive([
  {
    id: '12321',
    name: '张三',
    age: 60
  },
  {
    id: '12321',
    name: '张三',
    age: 60
  }
])
```

### `props`的使用

很多时候我们需要进行组件间的数据沟通，比如父组件的数据给子组件

`a = "哈哈"`是将字符串传递给`Person`组件，`:list = "personList"`是将数组传递给子组件；注意，`:list`其实是`v-bind-list`的简写,主要用于传递表达式，而`list`是传递数据的名字

```vue
<script lang="ts" setup name=App>
import Person from "./components/Person.vue";
import {type PersonList} from "./types";
import {reactive} from "vue";

let personList = reactive<PersonList>([
  {
    id: '0',
    name: '张三',
    age: 18
  },
  {
    id: '1',
    name: '李四',
    age: 20
  }]
)

</script>

<template>
  <div class="app">
    <Person a="哈哈" :list = "personList"></Person>
  </div>

</template>
```

子组件接收

```ts
// 只接收
defineProps(['a', 'list'])
```

在模版中可以正常使用

```vue
<template>
  <div class="person">
    <ul>
      <li v-for="person in list" :key="person.id">
        姓名:{{ person.name }}
        年龄:{{ person.age }}
      </li>
    </ul>
  </div>
</template>
```

但是如果只看模版，你无法知道`list`是自定义的数据还是父组件传递的数据

```ts
// 接收a,同时将props保存起来
let x = defineProps(['a', 'list'])
```

我们也可以限制传入的数据类型，防止父组件失误将错误的数据传给我们

```ts
// 接收list+限制类型
defineProps<{ list: PersonList }>()
```

但是如果父组件传递错误数据，模版根本不会渲染，会导致相应部分空白，这也是不好的，因此我们可以自定义默认数据

注意：指定的`list`应为函数对象

```ts
// 接收list+限制类型+限制必要性+指定默认值
withDefaults(defineProps<{ list?: PersonList }>(), {
  list: () => [{
    id: '001',
    name: '康师傅',
    age: 100
  }]
})
```

## 第五天

### 对生命周期的理解

一个人在世界上大致可以分为四个阶段：“被创造”，“出生”，“经历”，“死亡”；而我们的组件也可以分为四个阶段：“被创建”，“挂载”，“更新”，“销毁”

| 时刻 | 调用特定的函数 |
| ---- | -------------- |
| 创建 | created        |
| 挂载 | mounted        |
| 更新 | updated        |
| 销毁 | destroyed      |

### Vue2的生命周期

```vue
<template>
	<div>
        <h2>当前求和为：{{sum}}</h2>
        <button @click="add">点我+1</button>
    </div>
</template>

<script>
	export default {
        name:'Person',
        data(){
            return {
                sum : 1
            }
        },
        methods:{
            add(){
                this.sum++
            }
        },
        beforeCreated(){
            console.log('创建前')
        },
        created(){
            console.log('创建完毕')
        },
        beforeMounted(){
            console.log('挂载之前')
        },
        mounted(){
            console.log('挂载完毕')
        },
        beforeUpdate(){
            console.log('更新前')
        },
        updated(){
            console.log('更新完毕')
        }，
        beforeDestroyed(){
            console.log('销毁前')
        },
        destroyed(){
            console.log('销毁完毕')
        }
    }
</script>

<style>

</style>
```

`beforeCreate`、`created`、`beforeMounte`、`mounted`在一个组件的生命周期只会调用一次，当组件的数据发生变化时，才会调用`beforeUpdate`、`updated`函数

### Vue3的生命周期

对于Vue3而言，由于`setup`的存在，无需使用`beforeCreate`和`created`，其余的生命周期均以函数的形式存在，并且需要`import`引入，所有生命周期前面加上`on`关键字

注意`beforeDestroy`和`destroyed`在Vue3里面是`onBeforeUnmount`和`onUnmounted`

```vue
<script lang="ts" setup name="Person">
import {ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from 'vue';

let sum = ref(0)

function add() {
  sum.value++
}

// 创建
console.log('创建')

// 挂载
onBeforeMount(() => {
  console.log('挂载前')
})

onMounted(() => {
  console.log('挂载完毕')
})

onBeforeUpdate(() => {
  console.log('更新前')
})

onUpdated(() => {
  console.log('更新完毕')
})

onBeforeUnmount(() => {
  console.log('卸载前')
})

onUnmounted(() => {
  console.log('卸载后')
})

</script>

<template>
  <div class="person">
    <h2>当前求和为：{{ sum }}</h2>
    <button @click="add">点我+1</button>
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

### 父子组件的创建顺序

在Vue项目中通常只会存在一个`.html`文件，通过

```ts
<script type="module" src="/src/main.ts"></script>
```

将`main.ts`文件引入，而`main.ts`文件内又是通过

```ts
import App from "./App.vue";
```

所以此时`App.vue`是根组件，代码从上往下执行，当执行到组件时，他会将组件一一解析完毕后才会渲染`App.vue`

因此Vue优先创建子组件，再创建父组件;所以`App.vue`是最后挂载的

### 自定义`hook`

在Vue3中，如果我们将所有的数据、函数、计算属性、钩子函数全部写一起，也很混乱，我们可以分别将一些内容进行封装，比如下面是点击加号`sum`加一，点击切换图片按钮，增加狗狗图片的案例

```ts
<script lang="ts" setup name="Person">
import <ref, reactive, computed> from 'vue'
let sum = ref(0)
let bigSum = computed(() => {
     return sum.value * 10;
 })
 
  let dogList = reactive([
     'https://images.dog.ceo/breeds/pembroke/n02113023_4373.jpg'
 ])

 function add() {
     sum.value++
 }

 async function getDog() {
     try {
         let result = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
         console.log(result.data.message)
         dogList.push(result.data.message)
     } catch (error) {
         alert(error)
     }
 }
</script>

<template>
  <div class="person">
    <h2>当前求和为：{{ sum }}, 放大十倍后{{bigSum}}</h2>
    <button @click="add">点我+1</button>
    <hr>
    <img v-for="(dog, index) in dogList" :src="dog" :key="index" alt="">
    <hr>
    <button @click="getDog">再来一只小狗</button>
  </div>
</template>
```

我们可以创建`hooks`文件夹，并且将sum++和狗狗图片切换的数据和方法封装到一起

<img src="./assets/hooks文件夹.png" style="zoom:50%;" />

将封装的内容用函数包裹起来

export部分暴露函数需要写名称，export default完全暴露不需要

需要将数据和方法返回出去

```ts
// useDogs.ts
import {computed, ref} from "vue";

export function useSum() {
    let sum = ref(0)
    let bigSum = computed(() => {
        return sum.value * 10;
    })

    function add() {
        sum.value++
    }

    return {sum, add, bigSum}
}
```

```ts
// useDogs.ts
import {reactive, onMounted} from "vue";
import axios from "axios";

export function useDogs() {

    let dogList = reactive([
        'https://images.dog.ceo/breeds/pembroke/n02113023_4373.jpg'
    ])

    async function getDog() {
        try {
            let result = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
            console.log(result.data.message)
            dogList.push(result.data.message)
        } catch (error) {
            alert(error)
        }
    }

    onMounted(() => {
        getDog()
    })

    // 向外提供数据
    return {dogList, getDog}
}

```

在`App.vue`仅需调用就可以了

```vue
<script lang="ts" setup name="Person">
import {useDogs} from "../hooks/useDogs";
import {useSum} from "../hooks/useSum";

const {sum, add, bigSum} = useSum()
const {dogList, getDog} = useDogs()

</script>
```

## 第六天

### 配置路由

- 1.导航区、展示区
- 2.请来路由器
- 3.制定路由的具体规则（什么路径，对应着什么组件）
- 4.形成一个一个的？？？.vue

`App.vue`准备代码

```vue
<script lang="ts" setup name=App>

</script>

<template>
  <div class="app">
    <h2 class="title">Vue路由测试</h2>
    <!--    导航区-->
    <div class="navigate">
      <a href="#" class="active">首页</a>
      <a href="#">新闻</a>
      <a href="#">关于</a>
    </div>
    <div class="main-content">
      此处用于展示各种组件
    </div>
  </div>

</template>

<style scoped>
/* App */
.title {
  text-align: center;
  word-spacing: 5px;
  margin: 30px 0;
  height: 70px;
  line-height: 70px;
  background-image: linear-gradient(45deg, gray, white);
  border-radius: 10px;
  box-shadow: 0 0 2px;
  font-size: 30px;
}

.navigate {
  display: flex;
  justify-content: space-around;
  margin: 0 100px;
}

.navigate a {
  display: block;
  text-align: center;
  width: 90px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  background-color: gray;
  text-decoration: none;
  color: white;
  font-size: 18px;
  letter-spacing: 5px;
}

.navigate a.active {
  background-color: #64967E;
  color: #ffc268;
  font-weight: 900;
  text-shadow: 0 0 1px black;
  font-family: 微软雅黑;
}

.main-content {
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 10px;
  width: 90%;
  height: 400px;
  border: 1px solid;
}
</style>
```

- 1.安装路由`npm i vue-router`或`yarn add vue-router`
- 2.创建router文件夹，新建index.ts文件

```ts
// 创建一个路由器并暴露出去

// 引入：createRouter
import {createRouter, createWebHistory} from 'vue-router'
// 引入一个一个可能要呈现的组件
import Home from "../pages/Home.vue";
import News from "../pages/News.vue";
import About from "../pages/About.vue";

// 创建路由器
const router = createRouter({
    history: createWebHistory(),    // 路由器的工作模式（稍后讲解）
    routes: [	// 这是我们定义的路由
        {
            name: 'zhuye',
            path: '/home',
            component: Home
        },
        {
            name: 'guanyu',
            path: '/about',
            component: About
        },
        {
            name: 'xinwen',
            path: '/news',
            component: News
        }
    ]
})

// 暴露出去router
export default router;
```

- 3.在`main.ts`文件引入刚创建的router

```ts
// 引入createApp用于创建应用
import {createApp} from "vue";
// 引入app组件
import App from "./App.vue";
import router from "./router";

// 创建一个应用
const app = createApp(App)
// 使用路由器
app.use(router)
// 挂载整个应用到app容器中
app.mount("#app")
```

- 4.在合适位置展示路由出口

```vue
// App.vue

<script lang="ts" setup name=App>
import {RouterView, RouterLink} from 'vue-router'	// 引入RouterView和RouterLink
</script>

<template>
  <div class="app">
    <h2 class="title">Vue路由测试</h2>
    <!--    导航区-->
    <div class="navigate">	// 使用RouterLink标签便于切换路由，active-class可以快速切换样式
      <RouterLink to="/home" active-class="active">首页</RouterLink>
      <RouterLink to="/news" active-class="active">新闻</RouterLink>
      <RouterLink to="/about" active-class="active">关于</RouterLink>
    </div>
    <div class="main-content">
      <RouterView></RouterView>	// 用于展示路由的位置
    </div>
  </div>

</template>

<style scoped>
/* App */
.title {
  text-align: center;
  word-spacing: 5px;
  margin: 30px 0;
  height: 70px;
  line-height: 70px;
  background-image: linear-gradient(45deg, gray, white);
  border-radius: 10px;
  box-shadow: 0 0 2px;
  font-size: 30px;
}

.navigate {
  display: flex;
  justify-content: space-around;
  margin: 0 100px;
}

.navigate a {
  display: block;
  text-align: center;
  width: 90px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  background-color: gray;
  text-decoration: none;
  color: white;
  font-size: 18px;
  letter-spacing: 5px;
}

.navigate a.active {
  background-color: #64967E;
  color: #ffc268;
  font-weight: 900;
  text-shadow: 0 0 1px black;
  font-family: 微软雅黑;
}

.main-content {
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 10px;
  width: 90%;
  height: 400px;
  border: 1px solid;
}
</style>
```

### 两个注意点

对于`Demo.vue`

- 路由组件：靠路由的规则渲染出来的

  routes:[

  ​	{path:'/demo', component:Demo}

  ]

- 一般组件：亲手写标签<Demo/>

因此一般会将路由组件统一写到`pages`文件夹中

<img src="./assets/pages文件夹.png" style="zoom:50%;" />

### 路由器工作模式

- `history`模式：

  - Vue2:`mode:history`
  - Vue3:`history:createWebHistory()`
  - React:`<BrowserRouter>`

  优点：`URL`更加美观，不带有'#'，更接近传统网站`URL`

  缺点：后期项目上线，需要服务端配合处理路径问题，否则刷新会有404错误

`hash`模式

​	优点：兼容性更好，因为不需要服务器端处理路径

​	缺点：`URL`带有#不太美观，且在`SEO`优化方面相对较差

### `to`的两种写法

在之前，我们关于切换路由采取以下写法

```vue
<!--    导航区-->
    <div class="navigate">	// 使用RouterLink标签便于切换路由，active-class可以快速切换样式
      <RouterLink to="/home" active-class="active">首页</RouterLink>
      <RouterLink to="/news" active-class="active">新闻</RouterLink>
      <RouterLink to="/about" active-class="active">关于</RouterLink>
    </div>
```

我们也可以按照路径配置

```vue
<!--    导航区-->
    <div class="navigate">	// 使用RouterLink标签便于切换路由，active-class可以快速切换样式
      <RouterLink to="/home" active-class="active">首页</RouterLink>
      <RouterLink to="/news" active-class="active">新闻</RouterLink>
      <RouterLink :to="{path:'/about'}" active-class="active">关于</RouterLink>
    </div>
```

同时，我们也可以按照名称name配置

```vue
 <!--    导航区-->
    <div class="navigate">
      <RouterLink to="/home" active-class="active">首页</RouterLink>	// 标准to写法
      <RouterLink :to="{name:'xinwen'}" active-class="active">新闻</RouterLink>	// 按照名称
      <RouterLink :to="{path:'/about'}" active-class="active">关于</RouterLink>	// 按照路径
    </div>
```

你可能觉得标准的to写法最简单，但是在后面我会详细介绍后两种写法的优点

## 第七天

### 嵌套路由

之前我们做了导航栏和展示框，现在我们想在新闻界面通过点击不同新闻标题显示不同页面，我们可以使用嵌套路由完成这点

![嵌套路由](./assets/嵌套路由.png)

- 1.创建`Detail.vue`

```vue
<script setup lang="ts">

</script>

<template>
  <ul class="news-list">
    <li>编号：xxx</li>
    <li>标题：xxx</li>
    <li>内容：xxx</li>
  </ul>
</template>

<style scoped>
.news-list {
  list-style: none;
  padding-left: 20px;
}

.news-list > li {
  line-height: 30px;
}
</style>
```

- 2.配置嵌套路由

```vue
// src/router/index.ts

// 创建一个路由器并暴露出去

// 引入：createRouter
import {createRouter, createWebHistory} from 'vue-router'
// 引入一个一个可能要呈现的组件
import Home from "../pages/Home.vue";
import News from "../pages/News.vue";
import About from "../pages/About.vue";
import Detail from "../pages/Detail.vue";

// 创建路由器
const router = createRouter({
    history: createWebHistory(),    // 路由器的工作模式（稍后讲解）
    routes: [
        {
            name: 'zhuye',
            path: '/home',
            component: Home
        },
        {
            name: 'guanyu',
            path: '/about',
            component: About
        },
        {
            name: 'xinwen',
            path: '/news',
            component: News,
            children: [		// 	使用children配置嵌套路由
                {
                    name:'xiangqing',
                    path:'detail',
                    component:Detail
                }
            ]
        }
    ]
})

// 暴露出去router
export default router;
```

- 3.展示路由

注意：路径是`/news/detail`

```vue
<template>
  <div class="news">
    <!--    导航区-->
    <ul>
      <li v-for="news in newsList" :key="news.id">
	<RouterLink to="/news/detail">{{news.title}}</RouterLink>
      </li>
    </ul>
    <!--    展示区-->
    <div class="news-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts" name="News">
import {reactive} from "vue";
import {RouterView, RouterLink} from 'vue-router'

let newsList = reactive([
  {id: '001', title: '十种抗癌实物', content: '西蓝花'},
  {id: '002', title: '如何一夜暴富', content: '学IT'},
  {id: '003', title: '震惊', content: '明天是周四'},
  {id: '004', title: '好消息！', content: '快开学了'},
])

</script>

<style scoped>
/* 新闻 */
.news {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: 100%;
}

.news ul {
  margin-top: 30px;
  list-style: none;
  padding-left: 10px;
}

.news li > a {
  font-size: 18px;
  line-height: 40px;
  text-decoration: none;
  color: #64967E;
  text-shadow: 0 0 1px rgb(0, 84, 0);
}

.news-content {
  width: 70%;
  height: 90%;
  border: 1px solid;
  margin-top: 20px;
  border-radius: 10px;
}
</style>
```

### `query`路由传参

虽然我们成功将嵌套路由配置完了，但是我们还想动态展示不同的信息，比如Detail组件想展示News组件的信息

- 1.配置`Detail.vue`组件，接收传参

```vue
// Detail.vue组件

<script setup lang="ts">
import {useRoute} from 'vue-router'	// 导入useRoute包
import {toRefs} from "vue";	
const route = useRoute()	// 调用useRoute函数，并接收返回值
const {query} = toRefs(route)	// 解构
</script>

<template>
  <ul class="news-list">
    <li>编号：{{query.id}}</li>
    <li>标题：{{query.title}}</li>
    <li>内容：{{query.content}}</li>
  </ul>
</template>

<style scoped>
.news-list {
  list-style: none;
  padding-left: 20px;
}

.news-list > li {
  line-height: 30px;
}
</style>
```

- 2.`RouterLink`传递参数

由于`to`后面写的是字符串，内容是写死的，但是我们又想动态的拼接字符串，我们就可以使用ES6的模版字符串，注意：路径后面接“?”然后写传递的参数，不用写双引号

```vue
<RouterLink :to="`/news/detail?id=${news.id}&title=${news.title}&content=${news.content}`">{{news.title}}</RouterLink>
```

你可能觉得这种方法太麻烦，并且不直观，这时昨天学习的两种`to`写法就有用了

```vue
        <RouterLink :to="{
         path:'/news/detail',
          query:{
            id:news.id,
            title:news.title,
            content:news.content
          }
        }">{{ news.title }}
        </RouterLink>
```

同时如果配置路由的时候给组件配置了名字，我们也可以通过name跳转

```vue
        <RouterLink :to="{
         name:'xiangqing',
          query:{
            id:news.id,
            title:news.title,
            content:news.content
          }
        }">{{ news.title }}
        </RouterLink>
```

### `params`传参

之前我们使用的都是`query`传参，如果使用第一种传参方法，我们需要使用键值对，也就是`id=${??}&name=${??}`这种方式，如果使用params传参就不需要，我们可以直接写

```vue
<RouterLink to="/news/detail/news.id/news.title/news.contnet">{{ news.title }}</RouterLink>
```

如果我们不做任何修改，这样编译器只会把`news.id`这些参数当成路由地址，因此我们需要在路由的配置文件配一些东西

在这行代码中，我们在detail路径后面跟上了`:变量名`，如果写了`?`代表当前参数可传可不传

注意：由于在`RouterLink`中我们只需要写参数，因此你在配置文件中定义的参数名，在路由组件中访问也必须是相同的名字

```ts
path: 'detail/:id/:title/:content?'
```

当然我们也可以使用这种方法传递参数，注意：使用`params`传参不能通过`path`获取路径，只能通过`name`

```vue
 <RouterLink :to="{
                  name:'xiangqing',
                  params:{
                    id:news.id,
                    title:news.title,
                    content:news.content
                  }
                }">{{ news.title }}
        </RouterLink>
```

### `props`配置

在之前的`Detail.vue`组件中，我们都需要引入`useRoute`函数，然后通过`route.query.??`的形式访问参数，可能这样会有点麻烦（也不算很麻烦~），我们能不能不写前面的一长串，只写参数名呢？

配置`index.ts`文件

注意：第一种`props`写法只能通过`params`方法传递参数

第二种写法都可以，最好一个项目中决定一种写法，不要混用

本质上使用`props`配置其实就相当于`<RouterLink id='?'><RouterLink/>`

```ts
// src/router/index.ts

children: [
                {
                    name: 'xiangqing',
                    path: 'detail/:id/:title/:content?',
                    component: Detail,
                    // 第一种写法，将路由写的所有params参数作为props传给组件
                    // props: true

                    // 第二种写法：函数写法，可以自己决定将什么作为props给路由组件
                    props(route) {
                        return route.query
                    }
                    // 对象写法，可以自己决定将什么作为props给路由组件，不推荐，因为数据固定
                    // props:{
                    //     a:100,
                    //     b:200,
                    //     c:300
                    // }

                }
            ]
```

`Detail`配置

就像组件通信`props`一样获取数据

```vue
<script setup lang="ts">
defineProps(['id', 'title', 'content'])
</script>
```

### `replace`属性

在一般的页面中，我们可以通过浏览器的前进返回键切换访问过的页面，如果给路由`RouterLink`添加`replace`就无法返回之前访问过的页面，比如

```vue
<RouterLink replace></RouterLink>
```

## 第八天

### 路由——编程式路由导航

在以往的实践中，我们都是采用`<RouterLink><RouterLink/>`标签实现路由跳转，但是在很多时候，我们是需要在函数中让组件进行路由跳转，我们当然不能在TS代码中使用模版，因此我们采用编程式路由导航完成这个需求

```vue
<script setup lang="ts" name="Home">
import {onMounted} from "vue";
import {useRouter} from 'vue-router'	// 引入useRouter
const router = useRouter()	// 接收返回的值

onMounted(() => {
  setTimeout(() => {
    // 在此处编写一段代码，让路由实现跳转
    router.push('/news')	// 调用函数，转到某个路由
    // 	注意：你可以使用push，也可以使用replace
  }, 3000)
})
</script>
```

### 路由重定向

有些时候我们需要确定初始网站入口，或者有多个组件，当用户权限不够时，程序能主动跳转到其他组件页面，这就是路由重定向

我们只需要修改`src/router/index.ts`其中的路由配置就能完成

```ts
// 创建路由器
const router = createRouter({
    history: createWebHistory(),    // 路由器的工作模式（稍后讲解）
    routes: [
        {
            name: 'zhuye',
            path: '/home',
            component: Home
        },
        {
            name: 'guanyu',
            path: '/about',
            component: About
        },
        {
            name: 'xinwen',
            path: '/news',
            component: News,
            children: [
                {
                    name: 'xiangqing',
                    path: 'detail/:id/:title/:content?',
                    component: Detail,
                    props: true
                }
            ]
        },
        // 让指定的路由跳转到另个路由,你可以理解成当遇到/结尾的网址，自动跳转到/home页面
        {
            path:'/',
            redirect: '/home'
        }
    ]
})
```

### 对`Pinia`的理解

在`Vue2`时，我们一般使用`Vuex`进行其中的组件状态管理，而在`Vue3`我们更倾向于使用`Pinia`

`Pinia`是`Vue` 的专属状态管理库，它允许你跨组件或页面共享状态

#### 1.准备一个效果

```vue
// GetLove.vue

<script setup lang="ts" name="getLove">
import {reactive} from "vue";
import axios from 'axios'
import {nanoid} from "nanoid";

let talkList = reactive([
  {id: '001', title: '你好'},
  {id: '002', title: '我好'},
  {id: '003', title: '大家好'}
])

async function getLoveTalk(){
  const {data : {content}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
  talkList.unshift({
    id: nanoid(),
    title : content
  })
}
</script>

<template>
  <div class="talk">
    <button @click="getLoveTalk">获取一句土味情话</button>
    <ul>
      <li v-for="talk in talkList" :key="talk.id">{{talk.title}}</li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.talk {
  background-color: orange;
  border-radius: 10px;
  padding: 10px;
  width: 250px;
  //height: 100px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  margin: auto;
}
</style>
```

```vue
// GetSum.vue

<script setup lang="ts">
import { ref } from "vue";

let sum = ref(0);
let getSelectedValue = ref(1);

function addSum() {
  sum.value += Number(getSelectedValue.value)
}

function subSum() {
  sum.value -= Number(getSelectedValue.value)
}
</script>

<template>
  <div class="getSum" name="getSum">
    <h3>当前求和为: {{ sum }}</h3>
    <select v-model.number="getSelectedValue" name="" id="selectNum">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="addSum">加</button>
    <button @click="subSum">减</button>
  </div>
</template>

<style scoped lang="less">
.getSum {
  background-color: skyblue;
  border-radius: 10px;
  padding: 10px;
  width: 250px;
  height: 100px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.15);
  margin: auto;

  #selectNum,button {
    height: 25px;
    //width: 50px;
    margin-right: 10px;
  }
}
</style>

```

效果

![准备一个效果](./assets/准备一个效果.png)

#### 2.搭建`Pinia`环境

下载`Pinia`

```
npm i pinia 或 yarn add pinia
```

并在`main.ts`中配置

```ts
import {createApp} from "vue";
import App from "./App.vue";

// 引入pinia
import {createPinia} from 'pinia'

// 创建一个应用
const app = createApp(App)

// 创建pinia
const pinia = createPinia()

app.mount("#app")
// 安装pinia
app.use(pinia)
```

## 第九天

#### 3.`pinia`存储+修改数据

成功配置好`pinia`后在`src`目录下，新建`store`文件夹，根据需求创建`ts`文件，用于存储数据

```ts
// count.ts

import {defineStore} from 'pinia'	// 引入对应的包

export const useCountStore = defineStore('count', {	// 记得将函数暴露出去
    // 真正存储数据的地方
    state(){
        return {
            sum : 6
        }
    }
})
```

```ts
// talk.ts

import {defineStore} from 'pinia'

export const useTalkStore = defineStore('talk', {
    state() {
        return {
            talkList: [
                {id: '001', title: '你好'},
                {id: '002', title: '我好'},
                {id: '003', title: '大家好'}
            ]
        }
    }
})
```

使用数据

```vue
<script setup lang="ts" name = "getSum">
import { ref } from "vue";
import {useCountStore} from "../store/count";	// 引入刚刚的store里面的存储文件

const countStore = useCountStore()	// 调用函数，自定义一个变量去接收

// 以下两种写法都可以，个人推荐第一种
console.log(countStore.sum)
console.log(countStore.$state.sum)

let getSelectedValue = ref(1);

function addSum() {

}

function subSum() {

}
</script>

<template>
  <div class="getSum" name="getSum">
    <h3>当前求和为: {{ countStore.sum }}</h3>	// 直接调用即可，无需写.value
    <select v-model.number="getSelectedValue" name="" id="selectNum">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="addSum">加</button>
    <button @click="subSum">减</button>
  </div>
</template>
```

#### 4.`pinia`修改数据的三种方式

假设这是我的store数据,里面增加了一个school对象

```ts
export const useCountStore = defineStore('count', {
    // actions里面放置着一个一个的方法用于响应组件中的动作
    actions: {
        increment(value) {
            // console.log('increment被调用了', value)
            this.sum += value
        }
    },
    // 真正存储数据的地方
    state() {
        return {
            sum: 6,
            school: {
                name: '桂电',
                location: '桂林'
            }
        }
    }
})
```

调用函数`addSum`会触发数据的修改

##### 第一种

既然采用`countStore.sum`获取数据，在`pinia`中同样可以直接修改数据，并且数据是响应式的

```ts
 countStore.sum++	
```

##### 第二种

如果我们要修改大量数据，也可以直接修改对象,使用`$patch`关键字

```ts
countStore.$patch({
    sum:666,
    school:{
      name:'桂林电子科技大学',
      location:'桂林市'
    }
  })
```

##### 第三种

这种方式一般用于处理复杂的逻辑，使用`increment`关键字

```ts
countStore.increment(getSelectedValue.value)	// getSelectedValue.value是下拉菜单的值
```

```ts
export const useCountStore = defineStore('count', {
    // actions里面放置着一个一个的方法用于响应组件中的动作
    actions: {
        increment(value) {
            if(value < 10)	// 可以在actions中写一些逻辑
            	this.sum += value	// 这个地方可以使用this关键字
        }
    },
    // 真正存储数据的地方
    state() {
        return {
            sum: 6,
            school: {
                name: '桂电',
                location: '桂林'
            }
        }
    }
})
```

当然三种方法都可以使用，按照个人喜好使用

#### 5.`storeToRefs`

在我们的模版中，我们很多数据的使用都是`什么.什么`，因此我们可以选择解构，简化代码

```vue
<template>
  <div class="getSum" name="getSum">
    <h3>当前求和为: {{ countStore.sum }}</h3>
    <h3>欢迎来到{{countStore.school.name}},坐落于{{countStore.school.location}}</h3>
    <select v-model.number="getSelectedValue" name="" id="selectNum">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="addSum">加</button>
    <button @click="subSum">减</button>
  </div>
</template>
```

我们当然可以采用`toRefs`关键字将解构后的变量转化成响应式，但是这样做会导致`countStore`里面所有的数据成为`Object`响应式，没有必要

```ts
const {sum, school} = toTefs(useCountStore())
```

因此，我们可以使用`pinia`自带的关键字`storeToRefs`进行解构转换

```ts
const {sum, school} = storeToRefs(useCountStore())
```

#### 6.`getters`的使用

你可以把`getters`简单理解成`computed`，因为他主要用于处理计算属性

```ts
export const useCountStore = defineStore('count', {
    getters: {
        bigSum(){
            return this.sum * 10	// 将sum的值放大10倍并用于显示
        }
    },
    // actions里面放置着一个一个的方法用于响应组件中的动作
    actions: {
        increment(value : number) {
            // console.log('increment被调用了', value)
            this.sum += value
        }
    },
    // 真正存储数据的地方
    state() {
        return {
            sum: 6,
            school: {
                name: '桂电',
                location: '桂林'
            }
        }
    }
})
```

在模版中直接调用函数即可

注意！下面的变量已经经过了解构

```vue
    <h3>当前求和为: {{ sum }}</h3>
    <h3>放大十倍后:{{ bigSum }}</h3>
```

#### 7.`$subscribe`的使用

你也可以将`$subscribe`理解为`watch`，他的作用是监视store数据的变化,一旦store里面的数据发生变化，它就会响应

下面的代码是当`talkList`（数组）的数据发生变化时，就会将数组的内容存入本地，从而形成持久化存储

```ts
const talkStore = useTalkStore();
talkStore.$subscribe(() => {
  console.log('talkStore里面的数据发生变化')
  localStorage.setItem('talkList', JSON.stringify(talkStore.talkList));
})
```

## 第十天

### `store`的组合式写法

我们知道Vue3是组合式API，在`store`里面我们写的却都是选项式API，因此我们也可以用组合式API去写仓库

```ts
import {defineStore} from 'pinia'
import {nanoid} from 'nanoid'
import axios from 'axios'
import {reactive, ref} from 'vue'

export const useTalkStore = defineStore('talk', () => {
    const talkList = reactive(JSON.parse(localStorage.getItem('talkList') as string) || [])

    // action相当于getATalk函数
    async function getATalk() {
        const {data: {content}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
        talkList.unshift({
            id: nanoid(),
            title: content
        })
    }

    return {talkList, getATalk}
})
```

从代码中我们可以看见，没有`state`，`action`，`getters`这些选项，只需要最后将这些变量传递出去就可以

在Vue3中`getters`可以用`computed`代替

### 组件通信

#### 1.`props`

主要用于父子组件通信

父组件如果想获取子组件的信息可以通过函数传参的方式，父组件设定了一个方法`getToy`，并将这个方法传给子组件，子组件当然也可以接收到这个方法`defineProps(['car', 'sendToy'])`,然后通过`click`去调用这个方法`  <button @click="sendToy(toy)">把玩具给父亲</button>`，同时将自身`toy`的变量传进函数，进而将数据传递给父元素

其实本质就是子组件去调用父组件的函数，同时参数是子组件给的而已

```vue
// Father.vue

<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>汽车:{{ car }}</h4>
    <h4 v-if="toy">儿子给的玩具：{{toy}}</h4>
    <Child :car="car" :sendToy="getToy"/>
  </div>
</template>

<script setup lang="ts" name="Father">
import Child from './Child.vue'
import {ref} from 'vue'

let car = ref('奔驰')
let toy = ref()

// 方法
function getToy(value: string) {
  toy.value = value
}


</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}
</style>
```

```vue
// Child.vue

<template>
  <div class="child">
    <h3>子组件</h3>
    <h4>玩具:{{ toy }}</h4>
    <h4>父亲给的汽车:{{car}}</h4>
    <button @click="sendToy(toy)">把玩具给父亲</button>
  </div>
</template>

<script setup lang="ts" name="Child">
import {ref} from 'vue'
import {send} from "vite";

let toy = ref('奥特曼')
// 声明接收props
defineProps(['car', 'sendToy'])

</script>

<style scoped>
.child {
  background-color: skyblue;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>

```

#### 2.自定义事件

很多时候，我们不一定是点击（click）或者键盘输入（input）等方式触发函数，也就是子组件不一定是上述方式调用父组件的函数，这时我们就可以采用自定义事件

对于父组件，我们采用`<Child @send-toy="saveToy"></Child>`，也就是说当子组件采取`send-toy`的方式，就可以调用`saveToy`这个函数

对于子组件，我们可以使用`defineEmits`去接收这个指令，`const emit = defineEmits(['send-toy'])`,当子组件采用`click`的形式就可以触发调用`saveToy`函数，`<button @click="emit('send-toy', toy)">测试</button>`,同时也可以将`toy`变量传递过去

当然我们也可以不采用`click`方式去调用函数，比如

```vue
 onMounted(() => {
   setTimeout(() => {
     emit('send-toy', toy)
   }, 3000)
})
```

通过定时器去触发

```vue
// Father.vue

<template>
  <div class="father">
    <h3>父组件</h3>
    <!--    给子组件child绑定事件-->
    <Child @send-toy="saveToy"></Child>
  </div>
</template>

<script setup lang="ts" name="Father">
import Child from './Child.vue'
import {ref} from "vue";

let str = ref('你好')

function saveToy(value:string) {
  console.log('saveToy', value)
}

</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}

.father button {
  margin-right: 5px;
}
</style>
```

```vue
// Child.vue

<template>
  <div class="child">
    <h3>子组件</h3>
    <h4>玩具：{{ toy }}</h4>
    <button @click="emit('send-toy', toy)">测试</button>
  </div>
</template>

<script setup lang="ts" name="Child">
import {ref, onMounted} from "vue";

let toy = ref('奥特曼')

// 声明事件
const emit = defineEmits(['send-toy'])

// onMounted(() => {
//   setTimeout(() => {
//     emit('haha')
//   }, 3000)
// })

</script>

<style scoped>
.child {
  margin-top: 10px;
  background-color: rgb(76, 209, 76);
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
```

#### 3.`mitt`事件总线

`mitt`是一个库，它类似于`pubsub`和`$bus`，可以让任意组件完成通信

##### 配置

```ts
// src/utils/emitters.ts

import mitt from "mitt";    // 引入

const emitter = mitt()  // 调用mitt

export default emitter  // 暴露
```

##### 使用

现在有两个组件`Child1`和`Child2`需要他们传递数据

`Child1`组件通过下面代码就可以将`toy`这个变量推送到事件总线，只要通过`send-toy`这个自定义事件都可以获取

```vue
 <button @click="emitter.emit('send-toy', toy)">玩具给弟弟</button>
```

`Child2`可以通过以下方式拿到`toy`变量

```vue
let toy = ref('')

emitter.on('send-toy', (value) => {
  // 给emitter绑定send-toy事件
  // console.log('send-toy', value)
  toy.value = value
})
```

在合适时候我们也可以删除这条事件总线

```vue
// 在组建卸载时解绑事件
onUnmounted(() => {
  emitter.off('send-toy')
})
```

#### 4.搞清楚`v-model`

如果你使用过一些组件库，尤其是需要数据双向绑定的，你可以写`<Input v-model="name"><Input/>`这种代码，我们知道`v-model`只能作用于`HTML`标签，但是将它写在组件上却也能正常运行，我们就需要理解它背后的原理

对于传统的`v-model`标签，我们都知道他可以写成`<input type="text" :value="userName" @input="userName=(<HTMLInputElement>$event.target).value"/>`,也就是说输入框的`value`源自`userName`,当触发输入事件时，令它的`userName`等于`$event.target.value`，从而实现数据的双向绑定

那么我们能不能也仿照这种思想，去实现`Input`组件的双向绑定呢

假如我们想将`input`输入标签抽离出来，单独写成一个组件`<AtGuiGuInput>`，便于自定义样式等

`modelValue`指父组件将`userName`变量通过`modelValue`传递给子组件，同时，当子组件触发`update:modelValue`时，`userName=$event`

```vue
<AtguiguInput :modelValue="userName" @update:modelValue="userName=$event"></AtguiguInput>
```

对于子组件,我们接受`modelValue`,同时接受`'update:modelValue`自定义事件

```vue
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
```

对于`input`，他的`value`就是父组件传递过来的`userName`,当触发输入事件时，调用`emit('update:modelValue',$event.target.value)`，向父组件传递`$event.target.value`,而父组件`userName=$event`里面的`$event`就是组件传递的数据，从而实现数据的双向绑定

```vue
<input type="text" :value="modelValue"
         @input="emit('update:modelValue', $event.target.value)">
```

所以，其实父组件我们也可以简化写成

```vue
<AtguiguInput v-model="userName"></AtguiguInput>
```

这就是`v-model`的原理，用户只需要使用`v-model`就可以让数据双向绑定了，而组件库作者要考虑的事就多了，他们需要严格按照`modelValue`和`@update:modelValue`这种写法去写

##### `v-model`的细节

以上介绍了`v-model`的原理，其实在很多时候，`modelValue`这个参数不一定叫这个名称，我们也可以自定义命名，目的是如果有多个数据双向绑定，便于区分

假设在`AtguiguInput.vue`组件中有两个输入框

```vue
用户：<input type="text">
密码：<input type="password">
```

对于父组件，我们可以这么区分,在`v-model`后面加上：来区分

```vue
<AtguiguInput v-model:user="userName" v-model:password="password"></AtguiguInput>
```

当然子组件也要进行修改

```ts
defineProps(['user', 'password'])
const emit = defineEmits(['update:user', 'update:password'])
```

```vue
用户：<input type="text" :value="user" @input="emit('update:user', $event.target.value)">
密码：<input type="password" :value="password", @input="emit('update:password', $event.target.value)">
```

## 第十一天

#### 5.`attrs`

`attrs`主要用于祖孙组件通信，他的原理是祖父组件将数据传递给父组件，父组件充当中间件，再将组件传递给子组件

```vue
// 祖父组件

<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>a :{{ a }}</h4>
    <h4>b :{{ b }}</h4>
    <h4>c :{{ c }}</h4>
    <h4>d :{{ d }}</h4>

    <Child :a="a" :b="b" :c="c" :d="d" v-bind="{x:100, y:200}" :updateA="updateA"/>
  </div>
</template>

<script setup lang="ts" name="Father">
import Child from './Child.vue'
import {ref} from 'vue'

let a = ref(1)
let b = ref(2)
let c = ref(3)
let d = ref(4)

function updateA(value: number) {
  a.value += value
}

</script>
```
祖父组件将数据传递给父组件，但是父组件并未使用`defineProps`接收，而在`$attrs`中可以找到，父组件又将这些数据传给子组件，通过`v-bind`绑定
```vue
// 父组件

<template>
  <div class="child">
    <h3>子组件</h3>
    <GrandChild v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts" name="Child">
import GrandChild  from './GrandChild.vue'

</script>
```

```vue
// 子组件

<template>
	<div class="grand-child">
		<h3>孙组件</h3>
		<h4>a：{{ a }}</h4>
		<h4>b：{{ b }}</h4>
		<h4>c：{{ c }}</h4>
		<h4>d：{{ d }}</h4>
		<h4>x：{{ x }}</h4>
		<h4>y：{{ y }}</h4>
		<button @click="updateA(6)">点我将爷爷那的a更新</button>
	</div>
</template>

<script setup lang="ts" name="GrandChild">
	defineProps(['a','b','c','d','x','y','updateA'])
</script>
```

#### 6.`$refs和$parent`

`$refs`主要用于父传子，`$parent`用于子传父，他们和`props`最大的区别是`$refs`传递的是包含所有被`ref`属性标识的`DOM`元素组件实例；`$parent`是当前父组件实例对象

父组件中分别将两个子组件绑定`ref`，同时提供对应的函数

将`house`响应式数据暴露出去，让子组件可以使用

```vue
// 父组件

<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>房产：{{ house }}</h4>
    <button @click="changeToy">修改Child1的玩具</button>
    <button @click="changeComputer">修改Child2的电脑</button>
    <button @click="getAllChild($refs)">让所有孩子的书变多</button>
    <Child1 ref="c1"/>
    <Child2 ref="c2"/>
  </div>
</template>

<script setup lang="ts" name="Father">
import Child1 from './Child1.vue'
import Child2 from './Child2.vue'
import {ref, reactive} from "vue";

let house = ref(4)
let c1 = ref()
let c2 = ref()

function changeToy() {
  c1.value.toy = '小猪佩奇'
}

function changeComputer() {
  c2.value.computed = '华为'
}

function getAllChild(refs: any) {
  for (const refsKey in refs) {
    refs[refsKey].book += 1	// 获取所有的book实例
  }
}

defineExpose({house})

</script>
```

子组件1将内部的`toy`和`book`响应式数据暴露出去，让父元素可以使用

使用`minusHouse`函数，`parent`可以得到父组件的实例对象，也就是他暴露出来的数据

```vue
// 子组件1

<template>
  <div class="child1">
    <h3>子组件1</h3>
    <h4>玩具：{{ toy }}</h4>
    <h4>书籍：{{ book }} 本</h4>
    <button @click="minusHouse($parent)">干掉父亲的一套房产</button>
  </div>
</template>

<script setup lang="ts" name="Child1">
import {ref} from "vue";
// 数据
let toy = ref('奥特曼')
let book = ref(3)

function minusHouse(parent:any) {
 parent.house -= 1
}

// 把数据交给外部
defineExpose({toy, book})

</script>
```

定义`computer`和`book`响应式数据，并暴露出去

```vue
// 子组件2

<template>
  <div class="child2">
    <h3>子组件2</h3>
		<h4>电脑：{{ computer }}</h4>
		<h4>书籍：{{ book }} 本</h4>
  </div>
</template>

<script setup lang="ts" name="Child2">
		import { ref } from "vue";
		// 数据
		let computer = ref('联想')
		let book = ref(6)

    defineExpose({ computer, book })

</script>
```

#### 7.`provide`和`inject`

`provide`和`inject`主要用于爷孙组件的通信，有点类似于`$attrs`，但是他们最大的区别是`provide`不需要借助中间件就可以完成数据的传输

```vue
// 祖父组件

<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>银子：{{ money }}万元</h4>
    <h4>车子：一辆{{ car.brand }}车，价值{{ car.price }}万元</h4>
    <Child/>
  </div>
</template>

<script setup lang="ts" name="Father">
import Child from './Child.vue'
import {ref, reactive, provide} from 'vue'

let money = ref(100)
let car = reactive({
  brand: '玛莎拉蒂',
  price: 1000000
})

function updateMoney(num: number) {
  money.value -= num
}

// 向后代提供数据
provide('moneyContext', {money, updateMoney})	// 传对象，对象里面包括值和函数
provide('car', car)	// 传对象

</script>
```

```vue
// 孙子组件

<template>
  <div class="grand-child">
    <h3>我是孙组件</h3>
    <h4>银子：{{ money }}</h4>
    <h4>车子：一辆{{ car.brand }}车，价值{{ car.price }}万元</h4>
    <button @click="updateMoney(6)">花爷爷的钱</button>
  </div>
</template>

<script setup lang="ts" name="GrandChild">
import {inject} from "vue";

let {updateMoney, money} = inject("moneyContext");	// 使用inject接收并解构


let car = inject("car",{brand: "奥迪", price: 200});	// 接收对象，并给对象设置初始值，防止对象为空
```

注意，虽然`money`是`ref`的响应式数据，但在给孙组件传数据的时候不需要`.value`，因为`.value`是单纯的值，而不`.value`才是响应式数据本身（Proxy），在模版中使用也不需要`.value`

## 第十二天

#### 8.`slot`默认插槽

假设我们有一个组件，用于展示列表，如下图所示

![slots默认](./assets/slots默认.png)

"热门游戏列表"，“今日美食城市”，“今日影视推荐”其实是同一个组件`Category.vue`，只是里面显示的内容不一样，因此我们可以采取`slots`插槽

我们的组件`Category.vue`里面大部分内容都一样，只是`h2`和下面部分不一样，`h2`标签我们自然可以父传子，而剩下的部分我们可以使用`slot`标签占位，当然里面也可以写模版，作用是如果另一个组件没有传递东西过来，就可以默认显示`slot`里面的东西

```vue
<template>
  <div class="category">
    <h2>{{title}}</h2>
    <slot>默认内容</slot>
  </div>
</template>

<script setup lang="ts" name="Category">
  defineProps(['title'])
</script>

<style scoped>
  .category {
    background-color: skyblue;
    border-radius: 10px;
    box-shadow: 0 0 10px;
    padding: 10px;
    width: 200px;
    height: 300px;
  }
  h2 {
    background-color: orange;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
  }
</style>
```

对于`Father.vue`组件,以外我们的模版可以直接用`</Category>`表示，但是如果我们在中间写相应的HTML代码，这部分内容会作为插槽传递给相应的`slot`

```vue
<template>
  <div class="father">
    <h3>父组件</h3>
    <div class="content">
      <Category title="热门游戏列表">
        <ul>
          <li v-for="g in games" :key="g.id">{{ g.name }}</li>
        </ul>
      </Category>
      <Category title="今日美食城市">
        <img :src="imgUrl" alt="">
      </Category>
      <Category title="今日影视推荐">
        <video :src="videoUrl" controls></video>
      </Category>
    </div>
  </div>
</template>

<script setup lang="ts" name="Father">
  import Category from './Category.vue'
  import { ref,reactive } from "vue";

  let games = reactive([
    {id:'asgytdfats01',name:'英雄联盟'},
    {id:'asgytdfats02',name:'王者农药'},
    {id:'asgytdfats03',name:'红色警戒'},
    {id:'asgytdfats04',name:'斗罗大陆'}
  ])
  let imgUrl = ref('https://z1.ax1x.com/2023/11/19/piNxLo4.jpg')
  let videoUrl = ref('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4')

</script>

<style scoped>
  .father {
    background-color: rgb(165, 164, 164);
    padding: 20px;
    border-radius: 10px;
  }
  .content {
    display: flex;
    justify-content: space-evenly;
  }
  img,video {
    width: 100%;
  }
</style>
```

#### 9.`slot`具名插槽

顾名思义，就是插槽有了名字，因为我们在组件中`<Category></Category>`之间写的多个插槽如果不命名，就不知道具体作用于组件的哪个地方

`Categoty.vue`组件使用`slot name="名字"></slot>`命名

```vue
<template>
  <div class="category">
    <slot name="s1">默认内容1</slot>
    <slot name="s2">默认内容2</slot>
  </div>
</template>

<script setup lang="ts" name="Category">
  
</script>
```

`Father.vue`这边需要用`<template></template>`标签把插槽包裹起来，使用`v-slot:名字`或者`#名字`命名

```vue
<template>
  <div class="father">
    <h3>父组件</h3>
    <div class="content">
      <Category>
        <template v-slot:s2>
          <ul>
            <li v-for="g in games" :key="g.id">{{ g.name }}</li>
          </ul>
        </template>
        <template v-slot:s1>
          <h2>热门游戏列表</h2>
        </template>
      </Category>

      <Category>
        <template v-slot:s2>
          <img :src="imgUrl" alt="">
        </template>
        <template v-slot:s1>
          <h2>今日美食城市</h2>
        </template>
      </Category>

      <Category>
        <template #s2>
          <video video :src="videoUrl" controls></video>
        </template>
        <template #s1>
          <h2>今日影视推荐</h2>
        </template>
      </Category>
    </div>
  </div>
</template>

<script setup lang="ts" name="Father">
  import Category from './Category.vue'
  import { ref,reactive } from "vue";

  let games = reactive([
    {id:'asgytdfats01',name:'英雄联盟'},
    {id:'asgytdfats02',name:'王者农药'},
    {id:'asgytdfats03',name:'红色警戒'},
    {id:'asgytdfats04',name:'斗罗大陆'}
  ])
  let imgUrl = ref('https://z1.ax1x.com/2023/11/19/piNxLo4.jpg')
  let videoUrl = ref('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4')
</script>
```

#### 10.`slot`作用域插槽

简单来说，就是子组件的数据由自己管理，但是数据的展示却由父组件决定，因此需要将子组件的数据传递给父组件用于数据展示

如图所有的数据都在`Game.vue`组件内,子组件的插槽通过`<slot :名字="数据变量名">`将数据传递给父组件

```vue
<template>
  <div class="game">
    <h2>游戏列表</h2>
    <slot :youxi="games" x="哈哈" y="你好"></slot>
  </div>
</template>

<script setup lang="ts" name="Game">
  import {reactive} from 'vue'
  let games = reactive([
    {id:'asgytdfats01',name:'英雄联盟'},
    {id:'asgytdfats02',name:'王者农药'},
    {id:'asgytdfats03',name:'红色警戒'},
    {id:'asgytdfats04',name:'斗罗大陆'}
  ])
</script>
```

`Father.vue`父组件通过`v-slot="自己取名字"`可以获取所有的插槽数据对象，当然你也可以选择解构

倘若遇到具名插槽的情况，可以使用`v-slot:插槽的名字="给传递过来的数据取名字"`或者`#插槽的名字="传递过来的数据取名字"`

```vue
<template>
  <div class="father">
    <h3>父组件</h3>
    <div class="content">
      <Game>
        <template v-slot="params">
          <ul>
            <li v-for="y in params.youxi" :key="y.id">
              {{ y.name }}
            </li>
          </ul>
        </template>
      </Game>

      <Game>
        <template v-slot="params">
          <ol>
            <li v-for="item in params.youxi" :key="item.id">
              {{ item.name }}
            </li>
          </ol>
        </template>
      </Game>

      <Game>
        <template #default="{youxi}">
          <h3 v-for="g in youxi" :key="g.id">{{ g.name }}</h3>
        </template>
      </Game>

    </div>
  </div>
</template>

<script setup lang="ts" name="Father">
  import Game from './Game.vue'
</script>
```

### `shallowRef`和`shallowReactive`

相较于普通的`ref`和`reactive`，`shallowRef`和`shallowReactive`的数据只有浅层数据是响应式数据，比如如下代码，如果使用`shallowRef`和`shallowReactive`，只有`person`和`car.brand`是响应式数据，对于`shallowRef`而言`变量名.value`后面不跟.的变量是响应式对象，对于`shallowReactive`,只有最表层的数据是响应式，当然`car`本身在`reactive`和`shallowReactive`是无法重新赋值的

```ts
let person = shallowRef({
    name:'zhangsan',
    hobby:{
        sport:'pingpong'
    }
})

let car = shallowReactive({
    brand:'大众',
    options:{
        engine:'V8'
    }
})
```

### `readonly`

使用`readonly`包裹的变量是只读变量，无法通过外部直接修改,比如`num`是响应式数据，可以直接修改值，但是`num2`无法通过函数直接修改它的值，如果`num`本身发生变化，`num2`也会变化

```ts
let num = ref(0)
let num2 = readonly(sum)
```

## 第十三天

### `toRaw`和`markRaw`

`toRaw`是一个可以用于临时读取而不引起代理访问/跟踪开销，或是写入而不触发更改的特殊方法。不建议保存对原始对象的持久引用，请谨慎使用

```ts
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```

`markRaw`将一个对象标记为不可被转为代理。返回该对象本身

```ts
const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false

// 也适用于嵌套在其他响应性对象
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false
```

### `customRef`自定义响应式

一般的`ref`是实时更新数据，但是对于某些情况比如输入框，我们不想那么快去拿到输入框的最新内容，便于节约服务器的带宽，可以使用`customRef`自定义响应式

我们将文件放在`hooks`文件夹里，并且给文件命名为`useMsgRef.ts`

```ts
import {customRef, ref} from 'vue'

export default function (initValue : string, delay : number) {
    let timer
	// 使用vue提供的customRef定义响应式数据
    let message = customRef((track, trigger) => {
        return {
            // message被读取时调用
            get() {
                track() // 告诉vue，message很重要，要进行持续关注，一旦message变化，就去更新
                return initValue
            },
            // message被修改时调用
            set(value) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    initValue = value
                    trigger() // 通知vue一下数据message变化了
                }, delay)
            }
        }
    })

    return{message}
}

```

在别的组件调用

```ts
// 使用messageRef来定义响应式数据，且有延迟
let {message} = useMsgRef('你好', 1000)
```

### `teleport`

`<Teleport>` 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去

这是父组件，里面包了一个子组件

```vue
<template>
  <div class="outer">
    <h2>我是App资源</h2>
    <img src="http://www.atguigu.com/images/index_new/logo.png" alt="">
    <br>
    <Modal></Modal>
  </div>
</template>

<script setup lang="ts" name="App">
import Modal from "@/Modal.vue";
</script>
```

子组件里面包了一个弹窗，可以通过按钮控制开关

值得注意的是，弹窗使用了`fixed`定位，应该是以整个body视图作为定位

```vue
<script setup lang="ts">
import {ref} from 'vue'

let isShow = ref(false)
</script>

<template>
  <button @click="isShow = true">展示弹窗</button>
	<!-- 弹窗部分 -->
   <div v-show="isShow" class="modal">
     <h2>我是弹窗的标题</h2>
     <p>我是弹窗的内容</p>
     <button @click="isShow = false">关闭弹窗</button>
   </div>
</template>

<style scoped lang="less">
.modal {
  width: 200px;
  height: 150px;
  background-color: white;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 0 5px;
  text-align: center;
  position: fixed;
  //left: 50%;
  //margin-left: -100px;
  left: calc(50% - 100px);
  top: 20px;
}
</style>
```

但是一旦父组件使用了`filter: saturate(200%);`这个CSS属性，就会让弹窗以父组件为参照，不再按照视图居中

只需要添加`<teleport>`即可,这样Vue在解析模版时就会将`teleport`里面包裹的内容放到合适的位置，`to="选择器(标签/class类/id类)"`

```vue
<template>
  <button @click="isShow = true">展示弹窗</button>
 <teleport to="body">
   <div v-show="isShow" class="modal">
     <h2>我是弹窗的标题</h2>
     <p>我是弹窗的内容</p>
     <button @click="isShow = false">关闭弹窗</button>
   </div>
 </teleport>
</template>
```

### `Suspense`

`Suspense`用于解决异步情况

`Child.vue`子组件，需要通过`axios`获取请求，并将内容展示；由于`setup`语法糖，不需要写`async`

```vue
<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'

let sum = ref(0)
let {data : {content}} = await axios.get('https://api.uomg.com/api/rand.qinghua')
console.log(content)
</script>

<template>
  <div class="child">
    <h2>我是child组件</h2>
    <h3>当前求和为：{{ sum }}</h3>
  </div>
</template>
```

使用`Suspense`包裹相应的组件，可以让网络请求完成后再显示相应的组件，避免画面缺失

```vue
<template>
  <div class="app">
    <h2>我是App组件</h2>
    <Suspense>
      <template #default>
        <Child></Child>
      </template>
      <template #fallback>
        <h2>等待中……</h2>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts" name="App">
import Child from "@/Child.vue";
import {Suspense} from "vue";
</script>
```
-- 完 --



