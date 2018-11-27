// pages/my/myassets/addresslis/addresslis.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:0,
    addlis:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    that.setData({
      userid:wx.getStorageSync("user").id,
    });
    that.getaddresslis();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //我的收货地址列表
  getaddresslis:function(){

    var that=this;
    var url='/mall/getAddressList';
    var data={pageNumber:'1',
                pageSize:'10',
                userId:that.data.userid,
              };
    app.post(url,data,function(resData){
                console.log(resData);
                that.setData({
                  addlis:resData.rows,
                });

          });
  },
 //修改默认地址
  changeaddress:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    var url='/mall/defaultPath';
    var data={userId:that.data.userid,
                id:id,
              };
    app.post(url,data,function(resData){
                console.log(resData);
                /*
                that.setData({
                  addlis:resData.rows,
                });
                */

          });
  },

  //添加收货地址
  addaddress:function(){
    wx.navigateTo({
      url: '/pages/my/myaddress/addaddress/addaddress'
    })
  },

  //修改收货地址
  editaddress:function(){
    wx.navigateTo({
      url: '/pages/my/myaddress/editaddress/editaddress'
    })
  },

  //删除收货地址
  deladdress:function(e){
    var id=e.currentTarget.dataset.id;
    var that=this;

    var url='/mall/delAddress';
    var data={id:id,
                userId:that.data.userid,
              };
    app.post(url,data,function(resData){
                console.log(resData);
                wx.showToast({
                     title: resData.message,
                     icon: 'succes',
                     duration: 1000,
                     mask:true
                 });
                 that.onShow();
          });


  },
})
