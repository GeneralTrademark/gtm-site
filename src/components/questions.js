import React from 'react'

const Questions = (props) => {
  let makeQuestion = () => {
    return (
      props.data.map((item, i) => {
        return (
          <li key={i} onMouseOver={(e) => props.handleMouseOver(item.image)} onMouseOut={props.handleMouseOut} onClick={(e) => props.openQuestion(item.title, item.activeProject)}>
            <a>{item.title}</a>
          </li>
        )
      })
    )
  }

  return (
    <section className='asking'>
      <span>Currently asking:</span>
      <ul>
        {makeQuestion()}
      </ul>
    </section>
  )
}

export default Questions
