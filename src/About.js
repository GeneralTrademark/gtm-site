import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import marked from 'marked'

function LinkList({ list }) {
  let content = list.map((li) => {
    return <li><p>{li.title}</p><a href={li.href}>{li.name}</a></li>
  })
  return <ol className={'linkList rules'}>{content}</ol>
}

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markdown: null,
    }
  }

  componentWillMount() {
    const readmePath = './about.md'
    fetch(readmePath)
      .then((response) => { return response.text() })
      .then((text) => { this.setState({ markdown: marked(text) }) })
  }

  render() {
    return (
      <aside>
        <section className={'tile'}>
          <h1>{'We are a product R&D studio'}</h1>
        </section>

        <section>
          {this.state.markdown ? <ReactMarkdown source={this.state.markdown} /> : null}
          <h2>{'Things We Think About'}</h2>
        </section>


      </aside>
    )
  }
}

export default About
