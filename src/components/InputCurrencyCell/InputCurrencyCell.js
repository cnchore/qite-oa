import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
//import styles from './InputCurrencyCell.less'
import { InputNumber } from 'antd'

class InputCurrencyCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
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
    this.setState({ value });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div>
        {
          editable ?
            <div>
              <InputNumber step={1}
                defaultValue={value}
                formatter={temp => `¥ ${temp?temp.toString().replace(/¥\s?|(,*)/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','):'0.00'}`}
                parser={temp => temp?temp.toFixed(2).toString().replace(/¥\s?|(,*)/g, ''):0}
                onChange={e=>this.handleChange(e)}
              />
            </div>
            :
            <div className="editable-row-text">
              { `¥ ${value?value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):0}` || '¥ 0.00'}
            </div>
        }
      </div>
    );
  }
}


InputCurrencyCell.propTypes = {
  //value: PropTypes.string,
  editable: PropTypes.bool,
  
}

export default InputCurrencyCell
