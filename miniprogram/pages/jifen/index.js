//index.js
//获取应用实例
var app_var= getApp()
Page({
  data: {
    datadb: [0,],
    islogin: false,
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this; // 保存页面上下文
    wx.request({
      url: 'https://xiaoleidianzi.xyz/xiaochengxu/getjifen.php',
      method: 'GET',
      data:{ 
          mode:0,//读数据库
          openid:app_var.globalData.openid
      },

      success: function (res) {
          console.log(res.data)
          // logger.info('onLoad-success', res.data)
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
  },

  buttonClick1: function () {
    console.log('onLoad')
    var that = this; // 保存页面上下文
    wx.request({
      url: 'https://xiaoleidianzi.xyz/xiaochengxu/getjifen.php',
      method: 'GET',
      data:{ 
          mode:0,//读数据库
          openid:app_var.globalData.openid
      },

      success: function (res) {
          console.log(res.data.qiandao)
          if(res.data.qiandao == 1)
          {
              console.log("已签过到")
              wx.showLoading({
                title: '今天已签过到啦',
                mask: 1000,
                duration: 1000
              });
          }
          else
          {

              console.log("未签到")

              wx.request({
                url: 'https://xiaoleidianzi.xyz/xiaochengxu/getjifen.php',
                method: 'GET',
                data:{ 
                    mode:1,//读数据库
                    openid:app_var.globalData.openid
                },
                success: function (res) {
                  wx.showLoading({
                    title: '签到成功',
                    mask: 1000,
                    duration: 1000
                  });
                }
          }
          // logger.info('onLoad-success', res.data)
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
