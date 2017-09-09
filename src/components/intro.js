import React from 'react'
import Markdown from 'react-markdown';

import intro from '../markdown/intro.md'

const Intro = (props) => {
  return (
    <section className={props.activeImage ? 'intro' : 'intro'}>
      <Markdown className={'introText'} source={intro}/>
    </section>
  )
}

export default Intro
