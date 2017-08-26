import React, { Component } from 'react';

import Info from './components/info.js'
import Intro from './components/intro.js'
import Projects from './components/projects.js'

import Questions from './components/questions.js'
import ProjectPage from './components/projectPage.js'
import LeftBar from './components/leftBar.js'
import RightBar from './components/rightBar.js'

import questions from './json/questions.json'

import {configureUrlQuery, addUrlProps, replaceUrlQuery, UrlQueryParamTypes } from 'react-url-query'

import './App.css';

let img = './images/_z.jpg'

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
      imgSrc: img,
      prevScroll: 0,
      openProjectTitle: '',
      activeImage: false,
      imageLoaded: false,
      activeProject: !this.props.URICurrentProject ? '' : this.props.URICurrentProject,
    }
  }

  componentDidMount(){
    if(this.state.activeProject !== ''){
      this.openQuestion('fromURL', this.state.activeProject)
    }
  }

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

  handleMouseOver = (image) => {
    this.setState({imgSrc: image, activeImage: true})
  }

  handleMouseOut = () => {
    this.setState({imgSrc: img, activeImage: false})
  }

  handleImageLoaded = () => {

  }

  render() {
    return (
      <div className='App'>
        <LeftBar openInfoPanel={this.openInfo} {...this.state}/>
        <RightBar openProjectsPanel={this.openProjects} {...this.state}/>
        <Info {...this.state} />
        <Projects {...this.state} />
        <section className={this.state.openQuestion ? 'update open' : 'update'} onClick={this.dismissOverlays} onMouseOver={(e) => this.handleMouseOver(img)} onMouseOut={this.handleMouseOut}>
          <span className='icon'>{this.state.openQuestion ? '⤴' : '◡'}</span> <span className='text'>{this.state.openQuestion ? 'back up' : 'hi!'}</span>
        </section>
        <section className={this.state.activeImage ? 'fixedImage color' : 'fixedImage'}>
          <img onLoad={this.imageLoaded} alt='projectPreview' className={this.state.imageLoaded ? 'image loaded' : 'image'} src={this.state.imgSrc} />
        </section>
        <main className={this.state.openQuestion ? 'open' : ''}>
          <Intro />
          <Questions data={questions} handleMouseOver={this.handleMouseOver} handleMouseOut={this.handleMouseOut} openQuestion={this.openQuestion}/>
        </main>
        <div onClick={this.dismissOverlays} className={this.state.openProjects || this.state.openInfo || this.state.openQuestion ? 'projectsBG open' : 'projectsBG'}></div>
        <ProjectPage handledismissSideBars={this.dismissSideBars} {...this.state}/>
      </div>
    );
  }
}

export default addUrlProps({ urlPropsQueryConfig })(App);
