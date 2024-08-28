import {customRef, ref} from 'vue'

export default function (initValue : string, delay : number) {
    let timer
// 使用vue提供的customRef定义响应式数据
//     let initValue = '你好'
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


