import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
//import styles from './SelectCell.less'
import { Select } from 'antd'

const Option=Select.Option;

class SelectCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
    selectOptions:this.props.selectOptions || [],
    keyAlias:this.props.keyAlias || 'dicValue',
    labelAlias:this.props.labelAlias || 'dicName'
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
  handleChange(value) {
    //console.log('SelectCell:',value)
    this.setState({ value });
  }

  render() {
    const { style } =this.props;
    const { value,editable,selectOptions,keyAlias,labelAlias } = this.state;
    //console.log('selectOptions:',selectOptions)
    const children=selectOptions.map(item=><Option key={item[keyAlias]}>{item[labelAlias]}</Option> )
    const getLabel=(value)=>{
      let n=selectOptions.filter(item=>String(item[keyAlias])===String(value));
      //console.log(orgList,...n,value);
      if(n && n[0]){
        return n[0][labelAlias];
      }
      return '';
    }
    return (
      <div>
        {
          editable ?
            <div>
              <Select
                defaultValue={value}
                style={style}
                onChange={e=>this.handleChange(e)}
              >
              {children}
              </Select>
            </div>
            :
            <div className="editable-row-text">
              {getLabel(value.toString()) || ' '}
            </div>
        }
      </div>
    );
  }
}


SelectCell.propTypes = {
  value: PropTypes.string,
  editable: PropTypes.bool,
  selectOptions:PropTypes.array,
  keyAlias:PropTypes.string,
  labelAlias:PropTypes.string,
  style: PropTypes.object,
}

export default SelectCell
