import {defineStore} from 'pinia'
import {nanoid} from 'nanoid'
import axios from 'axios'

export const useTalkStore = defineStore('talk', {
    actions: {
        async getATalk() {
            const {data: {content}} = await axios.get('https://api.uomg.com/api/rand.qinghua?format=json')
            this.talkList.unshift({
                id: nanoid(),
                title: content
            })
        }
    },
    state() {
        return {
            // talkList: [
            //     {id: '001', title: '你好'},
            //     {id: '002', title: '我好'},
            //     {id: '003', title: '大家好'}
            // ]
            talkList: JSON.parse(localStorage.getItem('talkList') as string) || [],
        }
    }
})