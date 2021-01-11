/*
 * @Author: roadloser
 * @Date: 2020-11-25 15:23:19
 * @LastEditors: roadloser
 * @LastEditTime: 2021-01-11 09:49:56
 */
export default {
  pages: [
    'pages/index/index',  // 首页（兼活动list）
    'pages/my/index',  // 我的
  ],
  subPackages: [
    {
      root: 'pages/my/_my',
      name: '我的二级页面',
      pages: [
        'vote_list/index'
      ]
    },
    {
      root: 'pages/activity',
      name: '投票列表页',
      pages: [
        'entry_form/index',  // 报名页
        'vote_detail/index',  // 投票详情页
        'index'  // 投票列表页
      ]
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    backgroundColor: '#fff',
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
