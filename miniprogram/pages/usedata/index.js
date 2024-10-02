var app_var= getApp()
const logManager = wx.getRealtimeLogManager()
const logger = logManager.tag('plugin-onUserTapSth')

Page({
  data:{
      list:[ ],
      contentId: 0,//验证码开关，0：不显示、1：显示
  },
  adLoad() {
    var that = this; // 保存页面上下文
    console.log('原生模板广告加载成功')
    logger.info('adLoad', '原生模板广告加载成功')
    that.setData({
      contentId: 1,
      //datadb:res.data
    });
  },
  adError(err) {
    var that = this; // 保存页面上下文
    console.error('原生模板广告加载失败', err)
    logger.error('adError', err)
    that.setData({
      contentId: 1,
      //datadb:res.data
    });
  },
  adClose() {
    var that = this; // 保存页面上下文
    console.log('原生模板广告关闭')
    logger.info('adClose', '原生模板广告关闭')
    that.setData({
      contentId: 1,
      //datadb:res.data
    });
  },
  
  onLoad(){
    logger.info('onLoad-openid', app_var.globalData.openid)
    console.log(app_var.globalData.openid);
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
          logger.info('onLoad-success', res.data)
        // 将获取的数据存储到页面数据中
          that.setData({
            //contentId: 1,
            datadb:res.data
          });
        
      },
      fail: function (error) {
        console.error('请求失败', error);
        logger.error('onLoad-fail', error)
        that.setData({
          //contentId: 1,
          datadb:'"date":"获取失败","code":"获取失败"'
        });
      }
    });

    

}
})
