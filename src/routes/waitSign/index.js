import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const WaitSign = ({ location, dispatch, waitSign, loading }) => {
  const { list,dicList, pagination } = waitSign
  const { pageSize } = pagination
  const listProps = {
    dataSource:list,
    loading: loading.effects['waitSign/query'],
    pagination,
    location,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onEditItem (item) {
      dispatch({
        type: 'waitSign/signTask',
        payload: item,
      })
    },
  }

  const filterProps = {
    dicList,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
    </div>
  )
}

WaitSign.propTypes = {
  waitSign: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ waitSign, loading }) => ({ waitSign, loading }))(WaitSign)
