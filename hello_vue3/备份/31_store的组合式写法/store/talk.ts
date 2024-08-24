import {defineStore} from 'pinia'
import {nanoid} from 'nanoid'
import axios from 'axios'
import {reactive, ref} from 'vue'

// export const useTalkStore = defineStore('talk', {
//     actions: {
//         async getATalk() {
//             const {data: {content}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
//             this.talkList.unshift({
//                 id: nanoid(),
//                 title: content
//             })
//         }
//     },
//     state() {
//         return {
//             // talkList: [
//             //     {id: '001', title: '你好'},
//             //     {id: '002', title: '我好'},
//             //     {id: '003', title: '大家好'}
//             // ]
//             talkList: JSON.parse(localStorage.getItem('talkList') as string) || [],
//         }
//     }
// })

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

