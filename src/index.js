// import './index.html'
import 'babel-polyfill'
import dva from 'dva'
import createLoading from 'dva-loading'
import { hashHistory } from 'dva/router'
import { message } from 'antd'
//hashHistory
//browserHistory
// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: hashHistory,
  //全局错误抛出
  onError (error) {
    message.error(error.message,5)
  },

})

// 2. Model
app.model(require('./models/app'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
