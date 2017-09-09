import React from 'react'

const Questions = (props) => {
  let makeQuestion = () => {
    return (
      props.data.map((item, i) => {
        return (
          <li
            key={i}
            onTouchStart={(e) => props.handleMouseOver(item.image, item.sub, i)}
            onMouseOver={(e) => props.handleMouseOver(item.image, item.sub, i)}
            onMouseOut={props.handleMouseOut}>
            {/* <a onMouseOver={(e) => props.handleMouseOver(item.image)} onMouseOut={props.handleMouseOut} onClick={(e) => props.openQuestion(item.title, item.activeProject)}>{item.title}</a> */}
            <span className={props.mouseKey === i ? 'blue' : ''}>{item.title}</span>
          </li>
        )
      })
    )
  }

  return (
    <section className='asking'>
      <span className='askingTitle'>Currently asking:</span>
      <ol>
        {makeQuestion()}
      </ol>
    </section>
  )
}

export default Questions
