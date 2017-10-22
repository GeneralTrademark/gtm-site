import React from 'react'

// About Page Content
export default function About({viewKey, setGlobalState, data}) {
  return (
    <aside>
      <section className={'tile'}>
        <h1></h1>
        <h1>{data.whatDo0}</h1>
      </section>

      <section>
        <p>{data.whatDo1}</p>
      </section>

      <section className={''}>
        <h2>{'For example, we can help you...'}</h2>
        <ol>
          {
            data.hireUsTo.map((it) => {
              return <li>{it}</li>
            })
          }
        </ol>
      </section>

      <section className={''}>
        <h2>{'Human Beans:'}</h2>
         {data.humanBeansBio}
      </section>

      <section className={'flexList '}>
        <h2>{'Stay in touch:'}</h2>
        <a href={data.email}>{data.email}</a>
        <a href={'https://goo.gl/maps/tkzibZVDTjC2'}>{data.address}</a>
        <a href={data.github}>{'Github'}</a>
        <a href={data.arena}>{'Are.na'}</a>
        <a href={data.instagram}>{'Instagram'}</a>
      </section>

      <section className={'flexBetween'}>
        <div>{'◕'}</div>
        <div>{'ᴗ'}</div>
        <div>{'◕'}</div>
      </section>
    </aside>
  )
}
