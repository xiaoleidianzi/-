// app.js
App({
  onLaunch: function () {
    var thet = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        //env: 'cloud1-2g65peozbcd3f296',
        traceUser: true,
      });
      wx.login({
        success: function(res) {
          if (res.code) {
            // 发送 res.code 到后端
            //console.log('CODE' + res.code);
            wx.request({
              url: 'https://xiaoleidianzi.xyz/xiaochengxu/getUserInfo.php', // 这里替换成你的后端API地址
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
              data: {
                code:res.code
              },
              success: function(res) {
                thet.globalData.openid=res.data
                console.log('获取 openid 成功',thet.globalData.openid);
              },
              fail: function(err) {
                console.error('获取 openid 失败', err);
              }
            });
          } else {
            console.log('登录失败！' + res.errMsg);
          }
        }
      });
    }

    this.globalData = {
      openid: null
    };
  }
});
