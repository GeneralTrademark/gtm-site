import React from 'react'
import Markdown from 'react-markdown';

import a from '../markdown/projects/a.md'
import b from '../markdown/projects/b.md'
import c from '../markdown/projects/c.md'
import d from '../markdown/projects/d.md'
import e from '../markdown/projects/e.md'

const ProjectPage = (props) => {

  let lastProj = a

  let renderProject = (props) => {
    switch(props.activeProject) {
        case 'a':
          lastProj = a
          return <Markdown source={a} />
        case 'b':
          lastProj = b
          return <Markdown source={b} />
        case 'c':
          lastProj = c
          return <Markdown source={c} />
        case 'd':
          lastProj = d
          return <Markdown source={d} />
        case 'e':
          lastProj = e
          return <Markdown source={e} />
        case '':
          return <Markdown source={lastProj} />
        default:
          return <div> No project here </div>
      }
  }
  return (
    <section onClick={props.handledismissSideBars} className={props.openQuestion ? 'question open' : 'question'}>
      <section className='title'><span className='titleArrow'>→</span></section>
      {renderProject(props)}
    </section>
  )
}

export default ProjectPage
