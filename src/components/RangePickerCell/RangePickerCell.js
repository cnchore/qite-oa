import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
//import styles from './RangePickerCell.less'
import { DatePicker } from 'antd'
import moment from 'moment';
const RangePicker=DatePicker.RangePicker;
const compareArray=(a,b)=>{
  if(typeof a !==typeof b){
    return false;
  }
  if(!(a instanceof Array) || !(b  instanceof Array)){
    return false;
  }
  if(a[0]!==b[0] || a[1]!==b[1]){
    return false;
  }
  return true;
}
class RangePickerCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
    showTime: this.props.showTime!==undefined?this.props.showTime:true,
    dateFormat:this.props.dateFormat || 'YYYY-MM-DD HH:mm:ss',
    showFormat:this.props.showFormat || 'YYYY-MM-DD HH:mm:ss'
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
           !compareArray(nextState.value,this.state.value);
           
  }
  handleChange(dates,dateStrings) {
    const {dateFormat} =this.state;
    //console.log('RangePickerCell:',dateString.format(this.state.dateFormat))
    this.setState({ value:dateStrings && dateStrings[0]?dateStrings:null});
  }
  showValue=(text,showTime,showFormat)=>{
    if(!text){
      return '';
    }else{
      if(showFormat){
        let l=showFormat.split(',');
        return l&&l.length===2?text.substr(l[0],l[1]):text;
      }else if(!showTime){
        return text.substr(0,10);
      }else{
        return text;
      }
    }
  }
  render() {
    const { value, editable,dateFormat,showTime,showFormat } = this.state;
    let defaultValue=[];
    if(value && value instanceof Array && value.length===2){
      defaultValue=[moment(value[0],dateFormat),moment(value[1],dateFormat)];
    }
    return (editable ?
              <RangePicker style={{width:'100%'}}
                showTime={showTime}
                format={dateFormat}
                defaultValue={defaultValue}
                onChange={e=>this.handleChange(e)}
              />
            :
            <div className="editable-row-text">
              {this.showValue(value[0],showTime,showFormat)}-{this.showValue(value[1],showTime,showFormat)}
            </div>
    );
  }
}


RangePickerCell.propTypes = {
  value: PropTypes.array,
  editable: PropTypes.bool,
  dateFormat:PropTypes.string,
  showTime:PropTypes.bool,
}

export default RangePickerCell
