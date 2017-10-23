import React from 'react'

function LinkList({ list }) {
  let content = list.map((li) => {
    return <li><p>{li.title}</p><a href={li.href}>{li.name}</a></li>
  })
  return <ol className={'linkList rules'}>{content}</ol>
}

function WorkList({ list }) {
  let content = list.map((li) => {
    return (
      <li>
        <p className={'chat'}>{li.question}</p>
        <div className={'flexBetween alignCtr chat'}>
          <a href={li.href}>{li.name}</a><p>{li.client}</p>
        </div>
      </li>
    )
  })
  return <ol className={'projectList bubbles'}>{content}</ol>
}

function BubbleList({ list }) {
  let content = list.map((li) => {
    return (
      <li>
        <p className={'chat-grey chat'}>{li.question}</p>
        <div className={'inline chat-blue chat'}>
          <a href={li.href}>{li.name}</a><p>{li.client}</p>
        </div>
      </li>
    )
  })
  return <ol className={'chatList'}>{content}</ol>
}

// Work Page Content
export default function Work({viewKey, setGlobalState, data}) {
  return (
    <aside>
      <section className={'tile'}>
        <h1>{'Our Work'}</h1>
      </section>

      <section>
        <p>{'We work best when solving problems that combine hardware, software and infrastructure.'}</p>
        <p>{'Our best projects use a central question as a north star.'}</p>
        <WorkList list={data.clientProjects} />
      </section>

    </aside>
  )
}
