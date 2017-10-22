import React, { Component } from 'react'
import classnames from 'classnames'
import Work from './Work'
import About from './About'
import PaperCanvas from './PaperCanvas'
import ColorLensII from './ColorLensII'

import { BREAKPOINT } from './helpers/constants'

// Wraps Content by Key with SketchField
export default class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false,
      isHeaderShowing: true,
    }
  }

  onMouseEnter = () => {
    this.setState({isHovering: true})
  }

  onMouseLeave = () => {
    this.setState({isHovering: false})
  }

  handleScroll = (e) => {
    const x = e.target.scrollTop
    const thresh = window.innerHeight - (window.innerHeight * 0.40)
    const currentState = this.state.isHeaderShowing
    // only set state when something has changed
    if (x > thresh && currentState) {
      this.setState({isHeaderShowing: false})
    } else if (x < thresh && !currentState) {
      this.setState({isHeaderShowing: true})
    }
  }

  handleColorPicker = () => {
    if (window.innerWidth > BREAKPOINT && this.props.contentKey === 'WORK') {
      return (
          <ColorLensII {...this.props} />
      )
    } else {
      return null
    }
  }

  render () {
    const props = this.props
    let content
    switch (props.contentKey) {
      case 'WORK':
        content = <Work
          data={props.data}
          viewKey={props.viewKey}/>
        break
      default:
        content = <About
          data={props.data}
          viewKey={props.viewKey}/>
        break
    }

    const arrowClasses = classnames({
      slideIn: this.state.isHovering,
      slideOut: !this.state.isHovering,
    })

    const mobileCardClasses = classnames({
      moveRight: props.viewKey === 'WORK' && props.contentKey === 'WORK',
    })

    const headerClasses = classnames({
      fadeIn: this.state.isHeaderShowing,
      fadeOut: !this.state.isHeaderShowing,
    })

    return (
      <aside className={`abs pageWrap ${mobileCardClasses}`}>
        <div
          className={'rel wrap'}
          onMouseEnter={() => this.onMouseEnter()}
          onMouseLeave={() => this.onMouseLeave()}
          onScroll={(e) => this.handleScroll(e)}>
            <h1 className={`tm fix ${headerClasses}`}>{'General Trademark'}</h1>
            {this.handleColorPicker()}
            <PaperCanvas contentKey={props.contentKey} color={props.color}/>
            <div id={'contentFrame'} className={'abs'}>
              {content}
            </div>
            <Dot
              headerClasses={headerClasses}
              color={props.color}
              toggleDrawMode={props.toggleDrawMode}
              contentKey={props.contentKey} />
            <Arrow
              color={props.color}
              arrowClasses={arrowClasses} />
        </div>
      </aside>
    )
  }
}

function Dot({color, toggleDrawMode, contentKey, headerClasses}) {
  if (window.innerWidth > BREAKPOINT && contentKey === 'WORK') {
    return (
      <div id={'dotWrapper'} className={`fix ${headerClasses}`}>
        <button style={{backgroundColor:color}} id={'dot'} onClick={toggleDrawMode} />
      </div>
    )
  } else {
    return null
  }
}

function Arrow({ color, arrowClasses}) {
  if (window.innerWidth > BREAKPOINT) {
    return (
      <div id={'downArrowContainer'} className={'abs'}>
        <svg id={'downArrow'} className={arrowClasses} width="32" height="42" viewBox="0 0 32 42" version="1.1">
        <g id="Canvas" transform="translate(-2474 -2083)">
        <clipPath id="clip-0" clip-rule="evenodd">
        <path d="M 2474 2083L 2506 2083L 2506 2125L 2474 2125L 2474 2083Z" fill="#FFFFFF"/>
        </clipPath>
        <g id="Frame" clip-path="url(#clip-0)">
        <path d="M 2474 2083L 2506 2083L 2506 2125L 2474 2125L 2474 2083Z" fill="#FFFFFF"/>
        <g id="Group">
        <g id="Line">
        <use xlinkHref="#path0_stroke" transform="matrix(6.66118e-17 1 -1 5.62873e-17 2489.14 2083)"/>
        </g>
        <g id="Rectangle">
        <use xlinkHref="#path1_stroke" transform="matrix(0.717614 -0.696441 0.717614 0.696441 2475 2108.44)"/>
        </g>
        </g>
        </g>
        </g>
        <defs>
        <path fill={color} id="path0_stroke" d="M 0 0L 38.9474 0L 38.9474 -1.5L 0 -1.5L 0 0Z"/>
        <path fill={color} id="path1_stroke" d="M 0 20.9026L -0.75 20.9026L -0.75 21.6526L 0 21.6526L 0 20.9026ZM 20.9026 20.1526L 0 20.1526L 0 21.6526L 20.9026 21.6526L 20.9026 20.1526ZM 0.75 20.9026L 0.75 0L -0.75 0L -0.75 20.9026L 0.75 20.9026Z"/>
        </defs>
        </svg>
      </div>
    )
  } else {
    return null
  }
}
