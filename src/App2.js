import React, { Component } from 'react';
import TextLoop from 'react-text-loop';
import Scrollchor from 'react-scrollchor';
import './App2.css';

class App extends Component {
  render() {
    return (
    <main>
      <div className='title' >
        <p className=''>
          <span className='header'>General Trademark</span> is a design collective doing research & development.
        </p>
        <div className='flipper'>
          We&nbsp;
          <TextLoop
              speed={6500}
              adjustingSpeed={0}
              mask={true}
              children={["make tools","write code","make prototypes","use datasets",]}/>
          &nbsp;to&nbsp;
          <TextLoop
              speed={10300}
              adjustingSpeed={0}
              mask={true}
              children={["answer questions","learn new things","find problems","make prototypes"]}/>.
        </div>
        {/* <div className='image'>
          <img alt='' src='images/a.jpg' />
        </div> */}
      </div>
      <div className='how'>
        <p>We work closely with our clients to build tools ranging from digital products to manufacturing systems.</p>

        <p>Our focus is on providing access to knowledge and facilitating the type of futures described by <a target='_blank' rel="noopener noreferrer" href='http://www.newmediareader.com/book_samples/nmr-26-kay.pdf'>Alan Kay</a>, <a target='_blank' rel="noopener noreferrer" href='https://vimeo.com/97903574'>Brett Victor</a> and <a target='_blank' rel="noopener noreferrer" href='https://www.designboom.com/design/jane-fulton-suri-interview-ideo-little-book-of-design-research-ethics-04-25-2016/'>Jane Fulton Suri.</a></p>

        <p>We work best when solving problems that combine hardware, software and infrastructure.</p>

      </div>
      <div className='hire'>
        <p className='header'>Hire us to...</p>
        <ol>
          <li>Build front end experiences for complex ideas.</li>
          <li>Think about machine learning for non traditional domains.</li>
          <li>Build a next generation manufacturing system.</li>
          <li>Invent a new operating system.</li>
        </ol>
      </div>
      <div className='projects' id='work'>
        <p className='header'>Recent Work</p>
        <img alt='' className='linkImage' src='images/02.jpg' />
        <ol>
          <li>
            <a target='_blank' rel="noopener noreferrer" href='https://arenatv.now.sh'>arena.tv ↗</a>
          </li>
          <li>
            <a target='_blank' rel="noopener noreferrer" href='https://printarena.now.sh'>arena.print (alpha) ↗</a>
          </li>
          <li>
            <a target='_blank' rel="noopener noreferrer" href='http://printer.gtm.nyc/'>m01 Printer ↗</a>
          </li>
          <li>
            <a target='_blank' rel="noopener noreferrer" href='https://www.instagram.com/imbeddedforms/'>Imbedded Forms ↗</a>
          </li>
        </ol>
      </div>
      <div className='who'>
        <p className='header'>Human beans</p>
        <p>General Trademark is <a href='http://callil.com'>Callil Capuozzo</a> and <a href='http://gav.space'>Gavin Atkinson</a>. We are supported by a network of designers, developers and writers in addition to organizations like <a href='http://learning-gardens.co/'>Learning Gardens.</a></p>
        <div className='image'>
          <img alt='' src='images/e.jpg' />
        </div>
      </div>
      <div className='contact' id='info'>
        <p className='header'>Get in touch</p>
        <p>84 Withers St. Brooklyn, NY 11221</p>
        <p><a href='mailto:info@generaltrademark.com'>info@generaltrademark.com</a></p>
        <p>
        <a target='_blank' rel="noopener noreferrer" href='https://github.com/GeneralTrademark/'>Github</a>
        &nbsp; <a target='_blank' rel="noopener noreferrer" href='https://www.are.na/callil-capuozzo/gtm-reference'>Arena</a>
        &nbsp; <a target='_blank' rel="noopener noreferrer" href='https://twitter.com/general_bot'>Twitter</a>
        &nbsp; <a target='_blank' rel="noopener noreferrer" href='https://www.instagram.com/generaltrademark/'>Instagram</a>&nbsp;
        </p>
        <div className='image'>
          <img alt='' src='images/f.jpg' />
        </div>
      </div>

      <div className='buttons' id='L'>
        <Scrollchor animate={{offset: -40}} to="#info" className="nav-link">info ↓</Scrollchor>
      </div>
      <div className='buttons' id='M'>
        <Scrollchor animate={{offset: -40}} to="#title" className="nav-link">◡</Scrollchor>
      </div>
      <div className='buttons' id='R'>
        <Scrollchor animate={{offset: -40}} to="#work" className="nav-link">work ↓</Scrollchor>
      </div>
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
    </main>
    );
  }
}

export default App;
