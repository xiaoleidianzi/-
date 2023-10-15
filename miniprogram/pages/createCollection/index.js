Page({
  data:{
      list:[ ]
  },
  onLoad(){

wx.cloud.database().collection('ziyuan').get()
.then(res =>{
  console.log('第二种方法请求成功',res.data)
  this.setData({
      list:res.data
  })
  })
.catch(err =>{
  console.log('第二种方法请求失败',err)    
})
}
})
