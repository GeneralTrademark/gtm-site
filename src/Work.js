import React from 'react'

// Work Page Content
export default function Work({viewKey, setGlobalState, data}) {
  return (
    <aside>
      <section className={'tile'}>
        <h1>{'Our Work'}</h1>
      </section>

      <section>
        <p>{data.whatDo2}</p>
        <p>{data.workedWith}</p>
        <ol className={'mp0-l'}>
          {
            data.projects.map((p) => {
              if (p.client !== 'Self-Initiated') {
                return <li className={'flexBetween rules'}><p>{p.client}</p><a href={p.href}>{p.name}</a></li>
              } else {
                return null
              }
            })
          }
        </ol>
      </section>

      <section className={''}>
        <h2>{'We do many self-initiated projects:'}</h2>
        <ol className={'mp0-l'}>
          {
            data.projects.map((p) => {
              if (p.client === 'Self-Initiated') {
                return <li className={'rules'}>{p.name}</li>
              } else {
                return null
              }
            })
          }
        </ol>
      </section>

      <section className={'flexBetween'}>
        <div>{'ಠ'}</div>
        <div>{'‿'}</div>
        <div>{'ಠ'}</div>
      </section>
    </aside>
  )
}
