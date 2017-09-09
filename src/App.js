import React, { Component } from 'react';

import Info from './components/info.js'
// import Intro from './components/intro.js'
import Projects from './components/projects.js'

import Questions from './components/questions.js'
// import ProjectPage from './components/projectPage.js'
import LeftBar from './components/leftBar.js'
import RightBar from './components/rightBar.js'
import Update from './components/update.js'

import questions from './json/questions.json'

import {configureUrlQuery, addUrlProps, replaceUrlQuery, UrlQueryParamTypes } from 'react-url-query'

import './App.css';

let img = ''

const urlPropsQueryConfig = {
  URICurrentProject: { type: UrlQueryParamTypes.string, queryParam: 'p' },
}

configureUrlQuery({
  addRouterParams: false,
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openInfo: false,
      openProjects: false,
      openQuestion: false,
      message: 'hi',
      talking: '',
      mouseKey: '',
      imgSrc: img,
      prevScroll: 0,
      openProjectTitle: '',
      activeImage: false,
      imageLoaded: false,
      elapsed: 0,
      startMessages: false,
      activeProject: !this.props.URICurrentProject ? '' : this.props.URICurrentProject,
    }
  }

  componentDidMount(){
    if(this.state.activeProject !== ''){
      this.openQuestion('fromURL', this.state.activeProject)
    }
    // this.timer = setInterval(this.tick, 5000)
  }

  // componentWillUnmount(){
  //   clearInterval(this.timer)
  // }

  // tick = () => {
  //   if (this.state.elapsed === 1) {
  //     this.setState({elapsed: this.state.elapsed+1, startMessages: true})
  //     console.log('hi')
  //   } else {
  //     this.setState({elapsed: this.state.elapsed+1})
  //   }
  // }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.URICurrentProject !== this.props.URICurrentProject) {
      if(nextProps.URICurrentProject !== ''){
        this.openQuestion('fromURL', nextProps.URICurrentProject)
      }
      this.setState({
        activeProject: nextProps.URICurrentProject,
      })
    }
  }

  playMessages = () => {
    this.setState({startMessages: true})
    clearInterval(this.timer)
  }

  openInfo = () => {
    this.setState({openInfo: !this.state.openInfo})
  }

  openProjects = () => {
    this.setState({openProjects: !this.state.openProjects})
  }

  openQuestion = (title, active) => {
    let val = window.pageYOffset
    replaceUrlQuery({'p': active })
    this.setState({openQuestion: !this.state.openQuestion, prevScroll: -val, openProjectTitle: title, activeProject: active})
  }

  dismissOverlays = () => {
    replaceUrlQuery({'p': '' })
    this.setState({openInfo: false, openProjects: false, openQuestion: false})
  }

  dismissSideBars = () => {
    this.setState({openInfo: false, openProjects: false})
  }

  handleMouseOver = (image, message, key) => {
    this.setState({imgSrc: image, activeImage: true, message: message, mouseKey: key, startMessages: false, elapsed: 0})
  }

  handleMouseOut = () => {
    this.setState({imgSrc: img, activeImage: false, message: '', mouseKey: ''})
  }

  render() {
    return (
      <div className='App'>
        <div className='imgLoader'>
          <img alt='' src='./images/home/a.jpg'/>
          <img alt='' src='./images/home/b.jpg'/>
          {/* <img alt='' src='./images/home/c.jpg'/> */}
          <img alt='' src='./images/home/d.jpg'/>
          <img alt='' src='./images/home/e.jpg'/>
          <img alt='' src='./images/home/f.jpg'/>
          <img alt='' src='./images/Group.png'/>
        </div>
        <LeftBar openInfoPanel={this.openInfo} {...this.state}/>
        <RightBar openProjectsPanel={this.openProjects} {...this.state}/>
        <Update img={img}
          handlePlayMessages={this.playMessages}
          handleMouseOut={this.handleMouseOut} {...this.state}/>
        <section className={this.state.activeImage ? 'fixedImage color' : 'fixedImage'}>
          <img onLoad={this.imageLoaded}
            alt=''
            className={this.state.imageLoaded ? 'image loaded' : 'image'} src={this.state.imgSrc} />
        </section>
        <main className={this.state.openQuestion ? 'open' : ''}>
          <img onLoad={this.imageLoaded}
            className="bigTitle"
            alt='projectPreview' style={{width:'100%', maxWidth:1200}}
            src='./images/Group.png' />
          <img onLoad={this.imageLoaded}
            className="smallTitle"
            alt='projectPreview'
            src='./images/Group2.png' />
          {/* <Intro {...this.state}/> */}
          <Questions data={questions} handleMouseOver={this.handleMouseOver} handleMouseOut={this.handleMouseOut} openQuestion={this.openQuestion} openProjects={this.openProjects} {...this.state}/>
        </main>
        <div onClick={this.dismissOverlays} className={this.state.openProjects || this.state.openInfo || this.state.openQuestion ? 'projectsBG open' : 'projectsBG'}></div>
        {/* <ProjectPage handledismissSideBars={this.dismissSideBars} {...this.state}/> */}
        <Info {...this.state} />
        <Projects {...this.state} />
      </div>
    );
  }
}

export default addUrlProps({ urlPropsQueryConfig })(App);
