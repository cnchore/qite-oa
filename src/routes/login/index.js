import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input,Icon } from 'antd'
import { config } from '../../utils'
import styles from './index.less'

const FormItem = Form.Item

const Login = ({
  login, 
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldValue,
    setFieldsValue,
  },
}) => {
  const { loginLoading,banner } = login

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }
  let lg={
    userName:'',
    pwd:process.env.NODE_ENV==='production'?'':'000000'
  }
  const emitEmpty = () => {
    setFieldsValue({'userName':''});
  }
  const pwdEmitEmpty = () => {
    setFieldsValue({'pwd':''});
  }
  const suffix = getFieldValue('userName') ? <Icon type="close-circle" onClick={e=>emitEmpty()} /> : null;
  const pwdSuffix = getFieldValue('pwd')? <Icon type="close-circle" onClick={e=>pwdEmitEmpty()} /> :null;
  const selBanner=(id)=>{
    dispatch({ type: 'login/selBanner', payload: id })
  }
  return (
    <div className={banner===1?styles.container1:styles.container2}>
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt={'logo'} src={config.logo} />
          <span>{config.name}</span>
        </div>
        <form>
          <FormItem >
            {getFieldDecorator('userName', {
              initialValue:lg.userName,
              rules: [
                {
                  required: true,message:'不能为空',
                },
              ],
            })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} size="large" 
            suffix={suffix} onPressEnter={handleOk} placeholder="用户名" />)}
          </FormItem>
          <FormItem >
            {getFieldDecorator('pwd', {
              initialValue:lg.pwd,
              rules: [
                {
                  required: true,message:'不能为空',
                },
              ],
            })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} size="large" 
            suffix={pwdSuffix} type="password" onPressEnter={handleOk} placeholder="密码" />)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={handleOk} loading={loginLoading}>
              登&nbsp;&nbsp;&nbsp;&nbsp;录
            </Button>
            <p>
              <span>忘记密码，请联系管理员</span>
            </p>
          </Row>

        </form>
      </div>
      <div className={styles.ctrl}>
        <span className={banner===1?styles.active:''} onClick={e=>selBanner(1)}></span>
        <span className={banner===2?styles.active:''} onClick={e=>selBanner(2)}></span>
      </div>
      <footer className={styles.footer}>
        {config.footerText}
      </footer>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
