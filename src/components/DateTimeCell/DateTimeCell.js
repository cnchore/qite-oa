import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
//import styles from './DateTimeCell.less'
import { DatePicker } from 'antd'
import moment from 'moment';

class DateTimeCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
    showTime: this.props.showTime || true,
    dateFormat:this.props.dateFormat || 'YYYY-MM-DD HH:mm:ss'
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
  handleChange(dateString) {
    const {dateFormat} =this.state;
    //console.log('DateTimeCell:',dateString.format(this.state.dateFormat))
    this.setState({ value:dateString?dateString.format(dateFormat):null});
  }

  render() {
    const { value, editable,dateFormat,showTime } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <DatePicker style={{width:'100%'}}
                showTime={showTime}
                format={dateFormat}
                defaultValue={value?moment(value,dateFormat):null}
                onChange={e=>this.handleChange(e)}
              />
            </div>
            :
            <div className="editable-row-text">
              {value?value.toString():''}
            </div>
        }
      </div>
    );
  }
}


DateTimeCell.propTypes = {
  value: PropTypes.string,
  editable: PropTypes.bool,
  dateFormat:PropTypes.string,
  showTime:PropTypes.bool,
}

export default DateTimeCell
