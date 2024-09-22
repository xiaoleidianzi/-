// index.js
var app_var= getApp()//引入全局变量
const { envList } = require('../../envList.js');

let g_id=0;         //H5页面传参，初始为0
let videoAdstatus=0;//0：视频播放失败 1:视频播放成功
let videoAd = null; //视频广告

Page({
  data: {
    contentId: 0,//验证码开关，0：不显示、1：显示
    datadb:[],   //验证码值（4位） 
  },
  buttonClick1: function() {
    console.log('按钮被点击了');
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.error('激励视频 广告显示失败', err)
          })
      })
    }
    videoAd.onClose((res) => {
      if (res && res.isEnded || res === undefined) {
        // 正常播放结束，下发奖励
        console.info('正常播放结束，下发奖励')
        console.log(g_id);
        var that = this; // 保存页面上下文
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
                contentId:1
            });
          },
          fail: function (error) {
            console.error('请求失败', error);
          }
        });
        } else {
        // 播放中途退出，进行提示
        console.error('播放中途退出，进行提示')
        }
    })
  },

  onLoad: function(options) {
    // options中包含了H5传递的ID参数
      g_id=options.id  
    // 在页面onLoad回调事件中创建激励视频广告实例（若在开发者工具中无法预览广告，请切换开发者工具中的基础库版本）
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-227ea51ebcff58d5'
      })
      videoAd.onLoad(() => {})
      videoAd.onError((err) => {
        console.error('激励视频光告加载失败', err)
      })  
    }
  },
});




