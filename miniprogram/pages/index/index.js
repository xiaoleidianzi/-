// index.js
var app_var= getApp()//引入全局变量
const { envList } = require('../../envList.js');

let g_id=0;         //H5页面传参，初始为0
let videoAdstatus=0;//0：视频播放失败 1:视频播放成功
var videoAd = null;
Page({
  data: {
    contentId: 0,//验证码开关，0：不显示、1：显示
    datadb:[],   //验证码值（4位） 
  },
  buttonClick1: function() {
    console.log('按钮被点击了');
    console.log(g_id);
    var that = this; // 保存页面上下文

    //请求数据库
    wx.request({
      url: 'https://xiaoleidianzi.xyz/xiaochengxu/mysql.php',
      method: 'GET',
      data:{ 
          id:g_id,                         //H5携带参数
          openid:app_var.globalData.openid //用户openid
      },

      success: function (res) {
          console.log(res.data)
        // 将获取的数据存储到页面数据中
        that.setData({
            datadb:res.data,
        });
      },
      fail: function (error) {
        console.error('请求失败', error);
        that.setData({
          datadb:"连接数据库服务器失败",
        });
      }
    });

    wx.showLoading({
      title: '广告加载中',
      mask: 1000,
      duration: 1000
    });

    console.log('打开激励视频');
    // 在合适的位置打开广告
    if (videoAd) {
      videoAd.show().catch(err => {
      // 失败重试
      videoAd.load()
      .then(() => videoAd.show())
      })
    }
    else{
      that.setData({
        contentId:1
      });
    }
    
    

  },

  onLoad: function(options) {
    // options中包含了H5传递的ID参数
      g_id=options.id  
      var that = this; // 保存页面上下文
      if (wx.createRewardedVideoAd) {
        // 加载激励视频广告
        videoAd = wx.createRewardedVideoAd({
         adUnitId: 'adunit-227ea51ebcff58d5'
        })
        //捕捉错误
        videoAd.onError(err => {
        // 进行适当的提示
        })
        // 监听关闭
        videoAd.onClose((status) => {
         if (status && status.isEnded || status === undefined) {
         // 正常播放结束，下发奖励
            that.setData({
              contentId:1
            });

         } else {
          that.setData({
            //"请观看完整广告",
            contentId:3
          });
         }
        })
        }
  },
});




