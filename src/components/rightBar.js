import React from 'react'

const RightBar = (props) => {
  return (
    <div onClick={props.openProjectsPanel} className={props.openProjects ? 'sideRight open' : 'sideRight'}>
      <span><a>{props.openProjects ? 'close projects ↑' : 'all projects ↓'}</a></span>
    </div>
  )
}

export default RightBar
