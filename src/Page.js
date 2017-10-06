import React, { Component } from 'react'
import {SketchField, Tools} from 'react-sketch'
let isScrolling
// Wraps Content by Key with SketchField
export default class Page extends Component {
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
    return (
      <aside id={'pageWrap'} className={'abs'}>
        <div id={'wrap'} className={'rel'}>
          <div id={'sketchFrame'} className={'abs'}>
            <SketchField {...props.sketchProps}/>
          </div>
          <div id={'contentFrame'} className={'abs'}>
            {content}
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
