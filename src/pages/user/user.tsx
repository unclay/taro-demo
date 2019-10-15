import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './user.less'

export default class User extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '用户'
  }
  state: {
    userInfo: {
      nickName: '',
    },
    phone: ''
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onGetUserInfo = (res) => {
    // 通过接口授权登录拿token
    this.setState({
      userInfo: res.detail.userInfo
    })
  }

  onGetPhoneNumber = (res) => {
    if (res.detail.encryptedData) {
      // 通过接口解密手机号出来
      this.setState({
        phone: true
      })
    }
  }

  render () {
    const hasPhone = (<Text>获得手机号，请前往后台解密手机号</Text>)
    return (
      <View className='user'>
        <Button openType="getUserInfo" onGetUserInfo={this.onGetUserInfo} type="primary">获取用户信息</Button>
        <Button openType="getPhoneNumber" onGetPhoneNumber={this.onGetPhoneNumber} type="primary">获取用户手机号</Button>
        <Text>Hello {this.state.userInfo.nickName}!</Text>
        {this.state.phone && hasPhone}
      </View>
    )
  }
}
