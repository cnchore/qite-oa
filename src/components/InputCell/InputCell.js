import React from 'react'
import PropTypes from 'prop-types'
//import ReactDOM from 'react-dom'
//import styles from './InputCell.less'
import { Input,Tooltip } from 'antd'

class InputCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
    length:this.props.length,
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
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  render() {
    const { value, editable,length } = this.state;
    let _length=length?length:value&&value.toString().length;
    return (
      <div>
        {
          editable ?
            <div>
              <Input
                value={value}
                onChange={e => this.handleChange(e)}
              />
            </div>
            :
            <div className="editable-row-text">
              {
                value && value.toString().length>_length?
                <Tooltip title={value.toString()}>{`${value.toString().substr(0,(_length-3))}...`}</Tooltip>
                :<span>{value && value}</span>
                }
            </div>
        }
      </div>
    );
  }
}


InputCell.propTypes = {
  value: PropTypes.string,
  editable: PropTypes.bool,
  
}

export default InputCell
