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
    imageUrl: '',  // 图片地址
  },
  buttonClick1: function() {
    console.log('按钮被点击了001');
    this.setData({
      imageUrl:'https://xiaoleidianzi.xyz/xiaochengxu/img/wxq/wxq1.jpg' // 服务器接口地址
    });
  },
  buttonClick2: function() {
    console.log('按钮被点击了002');
    this.setData({
      imageUrl:'https://xiaoleidianzi.xyz/xiaochengxu/img/wxq/wxq2.jpg' // 服务器接口地址
    });
  },
  buttonClick3: function() {
    console.log('按钮被点击了003');
    this.setData({
      imageUrl:'https://xiaoleidianzi.xyz/xiaochengxu/img/wxq/wxq3.jpg' // 服务器接口地址
    });
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



