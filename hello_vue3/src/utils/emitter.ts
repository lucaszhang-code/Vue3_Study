import mitt from "mitt";    // 引入

const emitter = mitt()  // 调用mitt

// // 绑定事件
// emitter.on('test1', () => {
//     console.log('test1');
// })
//
// // 触发事件
// setInterval(()=>{
//     emitter.emit('test1');
// },2000)


export default emitter  // 暴露