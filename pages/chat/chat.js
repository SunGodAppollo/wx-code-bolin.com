// pages/chat/chat.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputValue: "",
		lists: [
			{
				user: 0,
				cont: "您好,请问有什么可以帮助您的?",
				time: new Date().toLocaleTimeString()
			}
		]
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

    bindKeyInput: function(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },

	//发送数据
	sendFunc: function(e) {
		var time = new Date().toLocaleTimeString();
		var self = this;
		var value = e.detail.value;
		var arr = self.data.lists;
		arr.push({
			user: 1,
			cont: value,
			time: time
		});
		self.setData({
			lists: arr,
			inputValue: ""
		})
	}
})