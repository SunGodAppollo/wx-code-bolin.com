// pages/xiangqing/xiangqing.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData:0,
    goodsid:0,
    userid:0,
    imglis:[],
    pinglunlis:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this



      that.setData({
        goodsid:options.goodsid,
        userid:wx.getStorageSync("user").id,
      })
     console.log(options.goodsid);
     console.log(options);
     that.setGoods();
     that.setPingjia();
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
  //获取当前滑块的index
  bindchange:function(e){
    const that  = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent:function(e){
    const that = this;

    if (that.data.currentData === e.target.dataset.current){
        return false;
    }else{

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  //设置商品
  setGoods:function(){
    var that=this;
    var url='/mall/getProductDetails';
      var data={productId:that.data.goodsid};
      app.post(url,data,function(resData){
        console.log(resData);
        that.setData({
          goods:resData.data,
        })

      });
  },
  //设置评价
  setPingjia:function(){
    var that=this;
    var url='/mall/getCommentList';
      var data={pageNumber:'1',pageSize:'10'};
      app.post(url,data,function(resData){
        console.log(resData);
        that.setData({
          pingjia:resData.rows,
        })

      });
  },
  //添加购物车
  addcar:function(){
    var that=this;
    var url='/mall/addShoppingCart';
      var data={userId:that.data.userid,
                productId:that.data.goodsid,
                number:'1'};
      app.post(url,data,function(resData){
        console.log(resData);
        wx.showToast({
             title: resData.message,
             icon: 'succes',
             duration: 1000,
             mask:true
         })
      });
  },
  //立即购买-确认订单
  querenoreder:function(){
    var that=this;
  
    wx.navigateTo({
      url: '/pages/my/myorders/querenorder/querenorder?shopid='+that.data.goods.shopId+"&goodsid="+that.data.goods.id
    })
  }


})
