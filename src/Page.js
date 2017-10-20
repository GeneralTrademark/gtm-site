import React, { Component } from 'react'
import classnames from 'classnames'
import paper, { Path, Tool, Size } from 'paper'

const BREAKPOINT = 769

// Wraps Content by Key with SketchField

export default class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false,
      paper: null,
    }
  }

  componentDidMount = () => {
    this.createPaperCanvas()
  }

  createPaperCanvas = () => {
    const R = this
    // ample amounts of bullshit just to get the canvas sized for retina
    const canvas = document.getElementById('paperNode-ABOUT')
    const ctx = canvas.getContext('2d')
    const global_width = window.innerWidth
    const global_height = window.innerHeight
    let ratio = 1
    if(ctx.webkitBackingStorePixelRatio < 2) ratio = window.devicePixelRatio || 1
    canvas.setAttribute('width', global_width*ratio)
    canvas.setAttribute('height', global_height*ratio)

    paper.setup('paperNode-ABOUT')
    paper.project.importSVG('./drawings/1.svg')

    const tool = new Tool();
    let path;

    tool.onMouseDown = function(event) {
			path = new Path()
			path.strokeColor = R.props.color
      path.strokeWidth = 2
			path.add(event.point)
    }

		tool.onMouseDrag = function(event) {
			path.add(event.point)
		}

    tool.onMouseUp = function(event) {
      path.smooth()
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

    const mobileCardState = classnames({
      moveRight: props.viewKey === 'WORK' && props.contentKey === 'WORK',
    })

    return (

      <aside id={'pageWrap'} className={`abs ${mobileCardState}`}>
        <div id={'wrap'} className={'rel'} onMouseEnter={() => this.onMouseEnter()} onMouseLeave={() => this.onMouseLeave()}>
          {
            window.innerWidth < BREAKPOINT ? null :
            <div id={'sketchFrame'} className={'abs'}>
              <canvas data-paper-resize id={`paperNode-${props.viewKey}`}/>
            </div>
          }
          <div id={'contentFrame'} className={'abs'}>
            {content}
          </div>
          {
            window.innerWidth < BREAKPOINT ? null :
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
          }

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
        <h1 className={'tm'}>{data.studioName}</h1>
        <h1>{data.whatDo0}</h1>
      </section>

      <section>
        <p>{data.whatDo1}</p>
      </section>

      <section className={''}>
        <h2>{'For example, we can help you...'}</h2>
        <ol>
          {
            data.hireUsTo.map((it) => {
              return <li>{it}</li>
            })
          }
        </ol>
      </section>

      <section className={''}>
        <h2>{'Human Beans:'}</h2>
         {data.humanBeansBio}
      </section>

      <section className={'flexList '}>
        <h2>{'Stay in touch:'}</h2>
        <a href={data.email}>{data.email}</a>
        <a href={'https://goo.gl/maps/tkzibZVDTjC2'}>{data.address}</a>
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
        <h1 className={'tm'}>{'General Trademark'}</h1>
        <h1>{'Our Work'}</h1>
      </section>

      <section>
        <p>{data.whatDo2}</p>
        <p>{data.workedWith}</p>
        <ol className={'mp0-l'}>
          {
            data.projects.map((p) => {
              if (p.client !== 'Self-Initiated') {
                return <li className={'flexBetween rules'}><p>{p.client}</p><a href={p.href}>{p.name}</a></li>
              }
            })
          }
        </ol>
      </section>

      <section className={''}>
        <h2>{'We do many self-initiated projects:'}</h2>
        <ol className={'mp0-l'}>
          {
            data.projects.map((p) => {
              if (p.client === 'Self-Initiated') {
                return <li className={'rules'}>{p.name}</li>
              }
            })
          }
        </ol>
      </section>

      <section className={'flexBetween'}>
        <div>{'ಠ'}</div>
        <div>{'‿'}</div>
        <div>{'ಠ'}</div>
      </section>
    </aside>
  )
}

// Project List Tile for portfolio
function ProjectTile({p}) {
  let rootPath = 'images/'
  return (
    <li className={'mp0-l mt2 noNum'}>
      <div>{p.name}</div>
    </li>
  )
}
