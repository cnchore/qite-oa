import React from 'react'
import PropTypes from 'prop-types'
import { parse } from 'qs'
import styles from './index.css'

class Report extends React.Component {
  render () {
	  ///report?ShowReport.wx&PAGEID=userOrgInfo
	  const query=parse(location.hash.split('#/report?')[1]);
	  const iframeHeight=document.body.offsetHeight-47-64-48-24+'px';
	  const iframeSrc=window.location.origin+'/qite/'+Object.keys(query)[0]+'?'+location.hash.split('ShowReport.wx&')[1];
    return  <iframe height={iframeHeight} src={iframeSrc} scrolling="auto" className={styles['q-iframe']}></iframe>
  }
}


Report.propTypes = {
  
}

export default Report
