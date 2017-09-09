import React from 'react'

const LeftBar = (props) => {
  return (
    <div onClick={props.openInfoPanel} className={props.openInfo ? 'sideLeft open' : 'sideLeft'}>
      <span ><a>{props.openInfo ? 'less info ↑' : 'more info ↓'}</a></span>
    </div>
  )
}

export default LeftBar
