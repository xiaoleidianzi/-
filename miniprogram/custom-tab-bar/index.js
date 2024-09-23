
Component({
    data: {
      selected: 0,
      color: "#7A7E83",
      selectedColor: "#3cc51f",
      "list": [
        {
            "pagePath": "/pages/index/index",
            "iconPath": "/images/camera.png",
            "selectedIconPath": "/images/camera.png",
            "text": "密码"
        },
        // {
        //     "pagePath": "/pages/addqun/index",
        //     "iconPath": "/images/QUN.png",
        //     "selectedIconPath": "/images/QUN.png",
        //     "text": "进群"
        // },
        {
          "pagePath": "/pages/usedata/index",
          "iconPath": "/images/home.png",
          "selectedIconPath": "/images/home.png",
          "text": "记录"
      }
    ]
    },
    attached() {
    },
    methods: {
      switchTab(e) {
        const data = e.currentTarget.dataset
        const url = data.path
        wx.switchTab({url})
        this.setData({
          selected: data.index
        })
      }
    }
  })