import React from 'react'
import Markdown from 'react-markdown';

import intro from '../markdown/intro.md'

const Intro = (props) => {
  return (
    <section className='intro'>
      <Markdown source={intro} />
    </section>
  )
}

export default Intro
