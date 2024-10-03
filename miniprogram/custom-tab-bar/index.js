
Component({
  
    data: {
      selected: 0,
      color: "#7A7E83",
      selectedColor: "#3cc51f",
      "list": [
        {
            "pagePath": "/pages/index/index",
            "iconPath": "/images/yaoshi.png",
            "selectedIconPath": "/images/yaoshi.png",
            "text": "密码"
        },
        {
          "pagePath": "/pages/usedata/index",
          "iconPath": "/images/home.png",
          "selectedIconPath": "/images/home.png",
          "text": "记录"
       },
       {
          "pagePath": "/pages/jifen/index",
          "iconPath": "/images/jinbi.png",
          "selectedIconPath": "/images/jinbi.png",
          "text": "积分"
        }
    ]
    },
    attached() {
    },
    methods: {
      switchTab(e) {
        const data = e.currentTarget.dataset
        const url = data.path
        
        this.setData({
          selected: data.index,
        })
        wx.switchTab({url})
        
      }
    },

    show(){
      console.log("2222data.index")
    }
  })