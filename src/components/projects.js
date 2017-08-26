import React from 'react'
import Markdown from 'react-markdown';

import projects from '../markdown/projects.md'

const Projects = (props) => {
  return (
    <section className={props.openProjects ? 'projects open' : 'projects'}>
      <Markdown source={projects} />
    </section>

  )
}

export default Projects
