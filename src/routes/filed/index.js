import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

const Filed = ({ location, dispatch, filed, loading }) => {
  const { list,dicList,pagination } = filed
  const { pageSize } = pagination
  const listProps = {
    dataSource:list,
    loading: loading.effects['filed/query'],
    pagination,
    location,
    expNowPageLoading:loading.effects['filed/exportNowPage'],
    expAllPageLoading:loading.effects['filed/exportAllRows'],
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
    exportNowPage(data,colums){
      dispatch({
        type:'filed/exportNowPage',
        payload:{
          data,
          colums,
        }
      })
    },
    exportAllRows(rows,colums){
      dispatch({
        type:'filed/exportAllRows',
        payload:{
          rows,
          colums,
        }
      })
    }
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

Filed.propTypes = {
  filed: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ filed, loading }) => ({ filed, loading }))(Filed)
