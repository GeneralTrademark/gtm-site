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
            <SketchField {...props.sketchProps}/>
          </div>
          <div id={'contentFrame'} className={'abs'}>
            {content}
          </div>
          <div id={'downArrowContainer'} className={'abs'}>
            <div id={'downArrow'} className={arrowStates} />

            <svg id={'downArrow'} className={arrowStates}  width="63" height="65" viewBox="0 0 63 65">
              <g transform="translate(273 275)">
                <clipPath id="a" clip-rule="evenodd">
                  <path d="M-273-275h63v65h-63v-65z" fill="#FFF"/>
                </clipPath>
                <g clip-path="url(#a)">
                  <path d="M-273-275h63v65h-63v-65z" fill="#FFF"/>
                  <use xlinkHref="#b" transform="rotate(90 3 -246)"/>
                  <use xlinkHref="#c" transform="scale(.99852 1.00148) rotate(-45 -399.183 197.23)"/>
                </g>
              </g>
              <defs>
                <path fill={this.props.color} id="b" d="M0 0h37v-1.5H0V0z"/>
                <path fill={this.props.color} id="c" d="M0 19.53h-.75v.75H0v-.75zm19.53-.75H0v1.5h19.53v-1.5zm-18.78.75V0h-1.5v19.53h1.5z"/>
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
        <h2>{'Hire us to'}</h2>
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
              return <ProjectTile p={p} />
            })
          }
        </ol>
      </section>
    </aside>
  )
}

// Project List Tile for portfolio
function ProjectTile({p}) {
  let rootPath = 'images/'
  return (
    <li className={'mp0-l mt4 noNum'}>
      <p>{p.name}</p>
      <img src={`${rootPath}${p.key}.jpg`}/>
    </li>
  )
}
