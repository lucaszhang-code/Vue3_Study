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