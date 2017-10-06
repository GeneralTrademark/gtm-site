import React from 'react'

function Header(props) {
  return (
    <header>
      <Picker {...props}/>
    </header>
  )
}

function Footer(props) {
  return (
    <footer />
  )
}

function Picker(props) {
  return(
    <div id={'pickerContainer'}>
      {//<div id={'picker'} style={{backgroundColor: props.color}} />
      }
    </div>
  )
}

function Ticker(props) {
  return (
    <div className='ticker'>
      <p className='tickerText'>
        ◡ Hi!
        &nbsp; Thanks for visiting this web spot.
        &nbsp; We are currently looking for work...
        &nbsp; Have something we can help with?
        &nbsp; <a href='mailto:info@generaltrademark.com'>Please get in touch ↗</a>
        &nbsp;&nbsp;&nbsp; In other news...
        &nbsp; We recently updated <a href='printarena.now.sh'>printarena.now.sh</a>...
        &nbsp; just finished reading the <a href='http://www.e-flux.com/journal/10/61362/in-defense-of-the-poor-image/'>hito steryl</a> essay collection...
        &nbsp; got a new cactus for the studio...
        &nbsp; maybe you can come hang out with us to check it out?
      </p>
    </div>
  )
}

export {
  Header,
  Footer,
}
