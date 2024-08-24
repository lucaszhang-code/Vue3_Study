import {defineStore} from 'pinia'
import {computed, ref} from 'vue'

// export const useCountStore = defineStore('count', {
//     getters: {
//         bigSum(){
//             return this.sum * 10
//         }
//     },
//     // actions里面放置着一个一个的方法用于响应组件中的动作
//     actions: {
//         increment(value : number) {
//             // console.log('increment被调用了', value)
//             this.sum += value
//         }
//     },
//     // 真正存储数据的地方
//     state() {
//         return {
//             sum: 6,
//             school: {
//                 name: '桂电',
//                 location: '桂林'
//             }
//         }
//     }
// })

export const useCountStore = defineStore('count', () => {
    let sum = ref(6)
    const school = {
        name: '桂电',
        location: '桂林'
    }

    function increment(value : number) {
        sum.value += value
    }

    let bigSum = computed(() => sum.value * 10)

    return {sum, school, increment, bigSum}
})