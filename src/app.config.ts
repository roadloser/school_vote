/*
 * @Author: roadloser
 * @Date: 2020-11-25 15:23:19
 * @LastEditors: roadloser
 * @LastEditTime: 2020-12-18 19:45:38
 */
export default {
  pages: [
    'pages/index/index',
    'pages/my/index',
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
  subPackages: [
    {
      root: 'pages/my/_my',
      name: '我的二级页面',
      pages: [
        'vote_list/index'
      ]
    },
  ]
}
