// index.js
var app_var= getApp()//引入全局变量
const { envList } = require('../../envList.js');
const logManager = wx.getRealtimeLogManager()
const logger = logManager.tag('plugin-onUserTapSth')
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
    logger.info('buttonClick1', '按钮被点击了')
    console.log(g_id);
    logger.info('buttonClick1-g_id', g_id)
    var that = this; // 保存页面上下文

    wx.showLoading({
      title: '广告加载中',
      mask: 1000,
      duration: 1000
    });

    console.log('打开激励视频');
    // 在合适的位置打开广告
    if (videoAd) {
      console.log('已创建视频对象');
      logger.info('buttonClick1-videoAd', "已创建视频对象")
      videoAd.load()
          .then(() => {
            videoAd.show()
          })
          .catch(err => {
            console.log('视频加载失败');
            console.log(err);
            logger.error('buttonClick1-视频加载失败', err)
          });
    }
    else{
      logger.error('buttonClick1-videoAd', "创建视频对象失败")
      that.setData({
        contentId:1
      });
    }
    
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
              logger.info('buttonClick1-code', res.data)
            // 将获取的数据存储到页面数据中
            that.setData({
                datadb:res.data,
            });
          },
          fail: function (error) {
            console.error('请求失败', error);
            logger.error('buttonClick1-数据库请求失败', error);
            that.setData({
              datadb:"连接数据库服务器失败",
            });
          }
        });
    

  },

  onLoad: function(options) {
    // options中包含了H5传递的ID参数
      g_id=options.id  
      var that = this; // 保存页面上下文
      if (wx.createRewardedVideoAd) {
        logger.info('createRewardedVideoAd', "创建广告成功")
        // 加载激励视频广告
        videoAd = wx.createRewardedVideoAd({
         adUnitId: 'adunit-227ea51ebcff58d5'
        })
        //捕捉错误
        videoAd.onError(err => {
        // 进行适当的提示
        logger.error('onLoad-videoAderr', err)
        console.log(err)
        })
        // 监听关闭
        videoAd.onClose((status) => {
         logger.info('onLoad-videoAdstatus', status)
         if (status && status.isEnded || status === undefined) {
         // 正常播放结束，下发奖励
            logger.info('onLoad-videoAdstatus', "正常播放结束，下发奖励")
            that.setData({
              contentId:1
            });

         } else {
          logger.info('onLoad-videoAdstatus', "请观看完整广告")
          that.setData({
            //"请观看完整广告",
            contentId:3
          });
         }
        })
        }
      else{
        logger.error('createRewardedVideoAd', "创建广告失败")
        that.setData({
          //"直接给予验证码",
          contentId:1
        });
      }

  },
});




