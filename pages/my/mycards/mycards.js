// pages/my/mycards/mycards.js
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
        this.getFunc();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        console.log(2);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    //获取用户次卡信息
    getFunc: function() {
        var self = this;
        getApp().post('/appUser/MySecondaryCard', {
            userId: wx.getStorageSync('user').id,
            pageNumber: self.data.pageNumber,
            pageSize: self.data.pageSize
        }, function(r) {
                var pageNumber = self.data.pageNumber;
                if (r.rows.length < self.data.pageSize) {
                    self.setData({
                        finesh: false
                    })
                } else {
                    pageNumber = pageNumber + 1;
                }
                self.setData({
                    lists: r.rows,
                    pageNumber: pageNumber
                })
        })
    },

    //滚动到底部事件
    scrollBottomFunc: function() {
        var self = this;
        if (self.data.finesh) {
            var arr = self.data.lists;
            getApp().post('/appUser/MySecondaryCard', {
                userId: wx.getStorageSync('user').id,
                pageNumber: self.data.pageNumber,
                pageSize: self.data.pageSize
            }, function(r) {
                    var pageNumber = self.data.pageNumber;
                    if (r.rows.length < self.data.pageSize) {
                        self.setData({
                            finesh: false
                        })
                    } else {
                        pageNumber = pageNumber + 1;
                    }
                    for (let i = 0; i < r.rows.length; i++) {
                        arr.push(r.rows[i]);
                    }
                    self.setData({
                        lists: arr,
                        pageNumber: pageNumber
                    })
            })
        }
    }
})