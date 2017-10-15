import React, { Component } from 'react'
import {SketchField, Tools} from 'react-sketch'
import classnames from 'classnames'

// Wraps Content by Key with SketchField
export default class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false,
    }
  }

  onMouseEnter = () => {
    this.setState({isHovering: true})
  }

  onMouseLeave = () => {
    this.setState({isHovering: false})
  }

  render () {
    const props = this.props
    let content
    switch (this.props.contentKey) {
      case 'WORK':
        content = <Work data={props.data} setGlobalState={props.setGlobalState} viewKey={props.viewKey}/>
        break
      default:
        content = <About data={props.data} setGlobalState={props.setGlobalState} viewKey={props.viewKey}/>
        break
    }

    const arrowStates = classnames({
      slideIn: this.state.isHovering,
      slideOut: !this.state.isHovering,
    })

    return (
      <aside id={'pageWrap'} className={'abs'}>
        <div id={'wrap'} className={'rel'} onMouseEnter={() => this.onMouseEnter()} onMouseLeave={() => this.onMouseLeave()}>
          <div id={'sketchFrame'} className={'abs'}>
            <SketchField defaultDataType={'url'} defaultData={props.defaultData} {...props.sketchProps}/>
          </div>
          <div id={'contentFrame'} className={'abs'}>
            {content}
          </div>
          <div id={'downArrowContainer'} className={'abs'}>
            <svg id={'downArrow'} className={arrowStates} width="32" height="42" viewBox="0 0 32 42" version="1.1">
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
            <path fill={this.props.color} id="path0_stroke" d="M 0 0L 38.9474 0L 38.9474 -1.5L 0 -1.5L 0 0Z"/>
            <path fill={this.props.color} id="path1_stroke" d="M 0 20.9026L -0.75 20.9026L -0.75 21.6526L 0 21.6526L 0 20.9026ZM 20.9026 20.1526L 0 20.1526L 0 21.6526L 20.9026 21.6526L 20.9026 20.1526ZM 0.75 20.9026L 0.75 0L -0.75 0L -0.75 20.9026L 0.75 20.9026Z"/>
            </defs>
            </svg>
          </div>
        </div>
      </aside>
    )
  }
}

// About Page Content
function About({viewKey, setGlobalState, data}) {
  return (
    <aside>
      <section className={'tile'}>
        <h1>{data.studioName}</h1>
        <h2>{data.whatDo0}</h2>
      </section>
      <section>
        <p>{data.whatDo1}</p>
      </section>
      <section>
        <h2>{'For example, we can help you...'}</h2>
        <ol>
          {
            data.hireUsTo.map((i) => {
              return <li>{i}</li>
            })
          }
        </ol>
      </section>
      <section>
        <h2>{'Human Beans'}</h2>
         {data.humanBeansBio}
      </section>
      <section className={'flexList'}>
        <h2>{'Contact:'}</h2>
         {data.address}
         <a href={data.github}>{'Github'}</a>
         <a href={data.arena}>{'Are.na'}</a>
         <a href={data.instagram}>{'Instagram'}</a>
      </section>
      <section className={'flexBetween'}>
        <div>{'◕'}</div>
        <div>{'ᴗ'}</div>
        <div>{'◕'}</div>
      </section>
    </aside>
  )
}

// Work Page Content
function Work({viewKey, setGlobalState, data}) {
  return (
    <aside>
      <section className={'tile'}>
        <h1>{'General Trademark'}</h1>
        <h2>{'Our Work'}</h2>
      </section>
      <section>
        <ol className={'mp0-l'}>
          {
            data.recentWork.map((p) => {
              return <p className={'mt4'}>{p.name}</p>
            })
          }
        </ol>
      </section>
      <section className={'flexBetween'}>
        <div>{'◕'}</div>
        <div>{'ᴗ'}</div>
        <div>{'◕'}</div>
      </section>
    </aside>
  )
}

// Project List Tile for portfolio
function ProjectTile({p}) {
  let rootPath = 'images/'
  return (
    <li className={'mp0-l mt4 noNum'}>
      <div>{p.name}</div>
    </li>
  )
}
