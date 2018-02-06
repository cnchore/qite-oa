import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input,InputNumber,Select, Modal,TreeSelect,Switch } from 'antd'

const FormItem = Form.Item
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;
const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
}

const modal = ({
  dicList=[{id:1,dicName:'菜单'},{id:2,dicName:'操作'},{id:3,dicName:'导航'}],
  item = {},
  onOk,
  list,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFieldsAndScroll((errors,values) => {
      if (errors) {
        return
      }
      const data = {...values}
      if(item.parentId===undefined){
        data.parentId=0;
      } 
      if(item.id){
        data.id=item.id
      }
      onOk(data)
    })
  }
 

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  const dicOptions = dicList && dicList[0] && dicList.map(dic => <Option key={dic.id}>{dic.dicName}</Option>);
 
  const loop = data => data.map((t) => {
    if (t.children && t.children[0]) {
      return <TreeNode title={t.menuName} key={t.id} value={String(t.id)}>{loop(t.children)}</TreeNode>;
    }
    return <TreeNode title={t.menuName} key={t.id} value={String(t.id)}/>;
  });
  //console.log(orgTree);
  const treeNodes = loop(list);
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="排序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('seq', {
            initialValue: item.seq,
           
          })(<InputNumber step={1} />)}
        </FormItem>
        <FormItem label="上级菜单" hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('parentId',{
              initialValue: item.parentId?String(item.parentId):undefined,
              
            })(<TreeSelect
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="默认机构"
              treeDefaultExpandAll
            >
            {treeNodes}
            </TreeSelect>)
          }
        </FormItem>
        <FormItem label="菜单名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('menuName', {
            initialValue: item.menuName,
            rules: [
              {
                required: true,message:'不能为空',
              },
            ],
          })(<Input />)}
        </FormItem>
       
        <FormItem label="菜单类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: String(item.type || 1),
            rules: [
              {
                required: true,message:'不能为空',
               
              },
            ],
          })(<Select >{dicOptions}</Select>)}
        </FormItem>
        <FormItem label="菜单图标" hasFeedback {...formItemLayout}>
          {getFieldDecorator('iconUrl', {
            initialValue: item.iconUrl,
            
          })(<Input />)}
        </FormItem>
        <FormItem label="菜单地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('src', {
            initialValue: item.src,
            
          })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </FormItem>
        <FormItem label="快捷方式?" {...formItemLayout}>
          {getFieldDecorator('isShortcut', {
            initialValue: Boolean(item.isShortcut),
          })(<Switch defaultChecked={item.isShortcut} checkedChildren={'是'} unCheckedChildren={'否'} />)}
        </FormItem>
        
        <FormItem label="订单代码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('codePrefix', {
            initialValue: item.codePrefix,
          })(<Input />)}
        </FormItem>
        <FormItem label="备注说明" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            
          })(<Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />)}
        </FormItem>
        
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
