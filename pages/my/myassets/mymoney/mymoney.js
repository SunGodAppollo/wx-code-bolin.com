// pages/my/myassets/mymoney/mymoney.js
import {returnFloat} from '../../../../utils/common.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        money: 0
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

    //获取用户零钱金额
    getFunc() {
		var self = this;
        getApp().post('/appUser/getCapitalInfo', {
            userId: wx.getStorageSync('user').id
        }, function(r) {
            if (r.code === 0) {
                self.setData({
					money: returnFloat(r.data.money)
                })
            }
        })
    }
})