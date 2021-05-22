// utils.js
import wx from 'weixin-jsapi'
const wxApi = {
  wxRegister(data, option) {
    // data是微信配置信息，option是分享的配置内容
    // 这里的option内容会根据路由传的参数一样，分享的内容也比一样
    if (location.pathname !== '/home') {
      option = {
        title: '运联好啊', // 分享的标题
        desc: // 分享的内容
          '运联好啊运联好啊运联好啊运联好啊运联好啊运联好啊运联好啊,运联好啊运联好啊运联好啊运联好啊',
        link: 'http://frp.saqw.cn/', // 分享的路径
        imgUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F4c%2Fa6%2F31%2F4ca631a8841304be2351295d50cf801d.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624252194&t=b53bf86905a23369cb1d77bceb308318' // 分享的图片
      }
    }
    wx.config({
      debug: false, // 开启调试模式
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名，见附录1
      jsApiList: [
        'updateTimelineShareData', // 最新的分享朋友圈
        'updateAppMessageShareData', // 最新的分享好友
        'onMenuShareAppMessage', // 之前的方法分享朋友圈
        'onMenuShareTimeline'// 之前的方法分享好友
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(function() {
      // 微信分享的数据
      var shareData = {
        title: option.title, // 分享标题
        link: option.link, // 分享链接
        imgUrl: option.imgUrl, // 分享图标
        desc: option.desc, // 分享描述
        success: function() {
          console.log('chenghg ')
          // 用户成功分享后执行的回调函数
          option.success()
        },
        fail: function() {
          // 用户取消分享后执行的回调函数
          option.error()
        },
        complete: function() {
          // alert('调用结束')
        }
      }

      wx.updateTimelineShareData(shareData)
      wx.updateAppMessageShareData(shareData)
      wx.onMenuShareTimeline(shareData)
      wx.onMenuShareAppMessage(shareData)
      wx.error(function(_res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    })
  }
}
export default wxApi
