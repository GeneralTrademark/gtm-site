import React, { Component } from 'react';
import TextLoop from 'react-text-loop';
import './App.css';

class App extends Component {
  _onIdle = () =>{
    console.log('idle')
  }

  render() {
    return (
    <main>
      <div id='ticker'>
        <p id='tickerText'>
          ◡ Hi!
          &nbsp; Thanks for visiting this web spot.
          &nbsp; We are currently looking for work...
          &nbsp; Have something we can help with?
          &nbsp; <a href='mailto:info@generaltrademark.com'>Please get in touch ↗</a>
        </p>
      </div>
      <div className='buttons' id='L'>
        <a href='#who'>info</a> ↓
      </div>
      <div className='buttons' id='M'>
        <a href='#title'>◡</a>
      </div>
      <div className='buttons' id='R'>
        <a href='#projects'>work</a> ↓
      </div>
      <div id='title'>
        <p><span id='titleheader'>General Trademark </span> is a design studio doing research & development.</p>
        <div>We&nbsp;
          <TextLoop
              speed={6500}
              adjustingSpeed={0}
              // fade={false}
              children={["make tools","write code","make prototypes","use datasets",]}/>
          &nbsp;to&nbsp;
          <TextLoop
              speed={10300}
              adjustingSpeed={0}
              children={["answer questions","learn new things","find problems","make prototypes"]}/>.
        </div>
        <div id='image'>
          <img alt='' src='images/a.jpg' />
        </div>
      </div>
      <div id='how'>
        <p>We work closely with our clients to build tools ranging from digital products to manufacturing systems.</p>

        <p>Our focus is on providing access to knowledge and facilitating the type of futures described by <a target='_blank' rel="noopener noreferrer" href='http://www.newmediareader.com/book_samples/nmr-26-kay.pdf'>Alan Kay</a>, <a target='_blank' rel="noopener noreferrer" href='https://vimeo.com/97903574'>Brett Victor</a> and <a target='_blank' rel="noopener noreferrer" href='https://www.designboom.com/design/jane-fulton-suri-interview-ideo-little-book-of-design-research-ethics-04-25-2016/'>Jane Fulton Suri.</a></p>

        <p>We work best when solving problems that combine hardware, software and infrastructure.</p>

      </div>
      <div id='hire'>
        <p id='header'>Hire us to...</p>
        <ul>
          <li>Build front end experiences for complex ideas.</li>
          <li>Think about machine learning for non traditional domains.</li>
          <li>Build a next generation manufacturing system.</li>
          <li>Invent a new operating system.</li>
        </ul>
      </div>
      <div id='projects'>
        <p id='header'>Recent Work</p>
        <img alt='' className='linkImage' src='images/02.jpg' />
        <ul>
          <li>
            <a target='_blank' rel="noopener noreferrer" href='https://arenatv.now.sh'>arena.tv ↗</a>
            {/* <img alt='' className='linkImage' src='images/02.jpg' /></a> */}
          </li>
          <li>
            <a target='_blank' rel="noopener noreferrer" href='https://printarena.now.sh'>arena.print (alpha) ↗</a>
            {/* <img alt='' className='linkImage' src='images/03.jpg' /> */}

          </li>
          <li>
            <a target='_blank' rel="noopener noreferrer" href='http://printer.gtm.nyc/'>m01 Printer ↗</a>
              {/* <img alt='' className='linkImage' src='images/04.jpg' /> */}

          </li>
          <li>
            <a target='_blank' rel="noopener noreferrer" href='https://www.instagram.com/imbeddedforms/'>Imbedded Forms ↗</a>
              {/* <img alt='' className='linkImage' src='images/05.jpg' /> */}

          </li>
        </ul>
      </div>
      <div id='who'>
        <p id='header'>Human beans</p>
        <p>General Trademark is <a href='http://callil.com'>Callil Capuozzo</a> and <a href='http://gav.space'>Gavin Atkinson</a>. We are supported by a network of designers, developers and writers in addition to organizations like <a href='http://learning-gardens.co/'>Learning Gardens.</a></p>
        <div id='image'>
          <img alt='' src='images/e.jpg' />
        </div>
      </div>
      <div id='contact'>
        <p id='header'>Get in touch</p>
        <p>84 Withers St. Brooklyn, NY 11221</p>
        <p><a href='mailto:info@generaltrademark.com'>info@generaltrademark.com</a></p>
        <a target='_blank' rel="noopener noreferrer" href='https://github.com/GeneralTrademark/'>Github</a>
        &nbsp; <a target='_blank' rel="noopener noreferrer" href='https://www.are.na/callil-capuozzo/gtm-reference'>Arena</a>
        &nbsp; <a target='_blank' rel="noopener noreferrer" href='https://twitter.com/general_bot'>Twitter</a>
        &nbsp; <a target='_blank' rel="noopener noreferrer" href='https://www.instagram.com/generaltrademark/'>Instagram</a>&nbsp;
        <div id='image'>
          <img alt='' src='images/f.jpg' />
        </div>
      </div>
    </main>
    );
  }
}

export default App;
