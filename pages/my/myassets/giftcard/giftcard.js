// pages/my/myassets/giftcard/giftcard.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lists: [],
        pageNumber: 1,
        pageSize: 10,
		finesh: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getFunc();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    //跳转到礼品卡详情
    toDetailsFunc: function() {
        wx.navigateTo({
            url: 'giftcarddetails/giftcarddetails'
        })
    },
    //绑定新卡
    bangdingnewcard: function() {
        wx.navigateTo({
            url: '/pages/my/bangdingnewcard/bangdingnewcard'
        });
    },


    //获取列表数据
    getFunc: function() {
        var self = this;
        var pageNumber = self.data.pageNumber;
        var pageSize = self.data.pageSize;
		var finesh = self.data.finesh;
        getApp().post('/appUser/MyGiftCard', {
            userId: wx.getStorageSync('user').id,
            pageNumber: pageNumber,
            pageSize: pageSize
        }, function(r) {
			if (r.rows.length < pageSize) {
				finesh = false;
			}else{
				pageNumber = pageNumber+1;
			}
            self.setData({
                lists: r.rows,
				finesh: finesh,
				pageNumber: pageNumber
            })
        })
    },

	//滚动到底部获取数据
	scrollBottomFunc: function() {
		var self = this;
		if(self.data.finesh) {
			var pageNumber = self.data.pageNumber;
			var pageSize = self.data.pageSize;
			var finesh = self.data.finesh;
			var arr = self.data.lists;
			getApp().post('/appUser/MyGiftCard', {
				userId: wx.getStorageSync('user').id,
				pageNumber: pageNumber,
				pageSize: pageSize
			}, function (r) {
				if (r.rows.length < pageSize) {
					finesh = false;
				} else {
					pageNumber = pageNumber + 1;
				}
				for(let i=0;i<r.rows.length;i++) {
					arr.push(r.rows[i]);
				}
				self.setData({
					lists: arr,
					finesh: finesh,
					pageNumber: pageNumber
				})
			})
		}
	},

    //跳转到商城页面
    goMallFunc: function() {
        wx.switchTab({
            url: 'pages/mall/mall?current=1',
        })
    }
})