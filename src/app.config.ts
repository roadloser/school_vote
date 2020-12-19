/*
 * @Author: roadloser
 * @Date: 2020-11-25 15:23:19
 * @LastEditors: roadloser
 * @LastEditTime: 2020-12-19 22:06:20
 */
export default {
  pages: [
    'pages/index/index',  // 首页（兼活动list）
    'pages/my/index',  // 我的
    'pages/activity/index',  // 活动item页
  ],
  subPackages: [
    {
      root: 'pages/my/_my',
      name: '我的二级页面',
      pages: [
        'vote_list/index'
      ]
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    allowsBounceVertical:"NO",  // alipay阻止下拉刷新
  },
  tabBar: {
    color: '#BFBDBC',
    selectedColor: '#000',
    borderStyle: 'black',
    backgroundColor: '#F7F7F7',
    list: [
      {
        selectedIconPath: 'assets/img/bar/alipay-home-act.png',
        iconPath: 'assets/img/bar/alipay-home-normal.png',
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        selectedIconPath: 'assets/img/bar/alipay-my-act.png',
        iconPath: 'assets/img/bar/alipay-my-normal.png',
        pagePath: 'pages/my/index',
        text: '我的'
      }
    ]
  },
}
