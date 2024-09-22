// index.js
var app_var= getApp()
const { envList } = require('../../envList.js');
// const db = wx.cloud.database();
// console.log(db)
let g_id=0;
Page({
  
  data: {
    showUploadTip: false,
    contentId: 0,
    datadb:[],
    powerList: [{
      title: '云函数',
      tip: '安全、免鉴权运行业务代码',
      showItem: false,
      item: [{
        title: '获取OpenId',
        page: 'getOpenId'
      },
       {
        title: '微信支付'
      },
       {
        title: '生成小程序码',
        page: 'getMiniProgramCode'
      },
      // {
      //   title: '发送订阅消息',
      // }
    ]
    }, {
      title: '数据库',
      tip: '安全稳定的文档型数据库',
      showItem: false,
      item: [{
        title: '创建集合',
        page: 'createCollection'
      }, {
        title: '更新记录',
        page: 'updateRecord'
      }, {
        title: '查询记录',
        page: 'selectRecord'
      }, {
        title: '聚合操作',
        page: 'sumRecord'
      }]
    }, {
      title: '云存储',
      tip: '自带CDN加速文件存储',
      showItem: false,
      item: [{
        title: '上传文件',
        page: 'uploadFile'
      }]
    }, {
      title: '云托管',
      tip: '不限语言的全托管容器服务',
      showItem: false,
      item: [{
        title: '部署服务',
        page: 'deployService'
      }]
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },
  buttonClick1: function() {
    console.log('按钮被点击了');
    console.log(g_id);
    var that = this; // 保存页面上下文
    wx.request({
      url: 'https://xiaoleidianzi.xyz/xiaochengxu/mysql.php',
      method: 'GET',
      data:{ 
          id:g_id,
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
    // this.onLoad()
  },

  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].showItem = !powerList[index].showItem;
    if (powerList[index].title === '数据库' && !this.data.haveCreateCollection) {
      this.onClickDatabase(powerList);
    } else {
      this.setData({
        powerList
      });
    }
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.envList.map(i => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex);
      },
      fail (res) {
        console.log(res.errMsg);
      }
    });
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return;
    }
    const powerList = this.data.powerList;
    powerList.forEach(i => {
      i.showItem = false;
    });
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    });
  },

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      }
      this.setData({
        powerList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  },
  onLoad: function(options) {
    // options中包含了传递的query参数
    console.log(options.id); // 打印出query参数
    g_id=options.id
  },
});




