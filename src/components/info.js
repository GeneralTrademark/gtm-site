import React from 'react'
import Markdown from 'react-markdown';

// import image from '../images/printer.jpg'

import info from '../markdown/info.md'

const Info = (props) => {
  return (
    <section className={props.openInfo ? 'info open' : 'info'}>
      <Markdown source={info} />
      {/* <img alt='hi' src={image} /> */}
    </section>

  )
}

export default Info
