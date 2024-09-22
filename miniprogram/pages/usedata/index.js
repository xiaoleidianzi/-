var app_var= getApp()
Page({
  data:{
      list:[ ]
  },
  onLoad(){
    console.log('按钮被点击了');
    console.log('333'+app_var.globalData.openid);
    var that = this; // 保存页面上下文
    wx.request({
      url: 'https://xiaoleidianzi.xyz/xiaochengxu/getlog.php',
      method: 'GET',
      data:{ 
          //id:g_id,
          openid:app_var.globalData.openid
          // name:'数据库账号',
          // password:'数据库密码',
          // database:'数据库名',
          //code:this.data.code,
          //date:this.data.date,
      },

      success: function (res) {
          console.log(res.data)
          
        // 将获取的数据存储到页面数据中
        that.setData({
            contentId: 1,
            datadb:res.data
        });
      },
      fail: function (error) {
        console.error('请求失败', error);
      }
    });

    console.log('页面跳转了');

}
})
