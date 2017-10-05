import React, { Component } from 'react'
import TextLoop from 'react-text-loop'
import Scrollchor from 'react-scrollchor'
import classnames from 'classnames'
import {SketchField, Tools} from 'react-sketch'
import data from './data/data.json'

const PAGES = ['ABOUT', 'PROJECTS']

function ProjectTile({p}) {
  let rootPath = 'images/'
  return (
    <li className={'mp0-l mt4 noNum'}>
      <p>{p.name}</p>
      <img src={`${rootPath}${p.key}.jpg`}/>
    </li>
  )
}

function Ticker(props) {
  return (
    <div className='ticker'>
      <p className='tickerText'>
        ◡ Hi!
        &nbsp; Thanks for visiting this web spot.
        &nbsp; We are currently looking for work...
        &nbsp; Have something we can help with?
        &nbsp; <a href='mailto:info@generaltrademark.com'>Please get in touch ↗</a>
        &nbsp;&nbsp;&nbsp; In other news...
        &nbsp; We recently updated <a href='printarena.now.sh'>printarena.now.sh</a>...
        &nbsp; just finished reading the <a href='http://www.e-flux.com/journal/10/61362/in-defense-of-the-poor-image/'>hito steryl</a> essay collection...
        &nbsp; got a new cactus for the studio...
        &nbsp; maybe you can come hang out with us to check it out?
      </p>
    </div>
  )
}

function Page({contentKey, globalProps}) {
  let content
  switch (contentKey){
    case 'WORK':
      content = <Work globalProps/>
      break
    default:
      content = <About globalProps/>
      break
  }
  return (
    <aside id={'pageWrap'} className={'abs'}>
      <div id={'wrap'} className={'rel'}>
        <div id={'sketchFrame'} className={'abs'}>
          <SketchField {...globalProps.sketchProps}/>
        </div>
        <div id={'contentFrame'} className={'abs'}>
          {content}
        </div>
      </div>
    </aside>
  )
}

function About({viewKey, setGlobalState, sketchProps}) {
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

function Work({viewKey, setGlobalState, sketchProps}) {
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

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewKey:  'ABOUT',
      color:    'blue',
      innerWidth: 0,
      innerHeight: 0,
    }
  }

  componentWillMount = () => {
    this.setState({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    })
  }

  setGlobalState = (key, value) => {
    this.setState({key, value})
  }

  toggleViewKey = (e, currentViewKey) => {
    e.preventDefault()
    e.stopPropagation()
    switch(currentViewKey){
      case 'ABOUT':
        this.setState({viewKey:'WORK'})
        break
      default:
        this.setState({viewKey:'ABOUT'})
        break
    }
  }

  render() {
    const c = this.state.color
    const colorMap = {
      borderColor: c,
      color: c,
    }

    const globalProps = {
      viewKey: this.state.viewKey,
      setGlobalState:this.setGlobalState,
      sketchProps: {
        height:this.state.innerHeight,
        width:this.state.innerWidth * 0.5000,
        tool:Tools.Pencil,
        color:this.state.color,
        lineColor:this.state.color,
        lineWidth:2,
      },
    }
    return (
    <body id={'trueAndRightfulBody'} style={colorMap}>
      <header></header>
      <main>
        <Page contentKey={'ABOUT'} globalProps={globalProps}/>
        <Page contentKey={'WORK'} globalProps={globalProps}/>
      </main>
      <footer></footer>
    </body>
    );
  }
}
