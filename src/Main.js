import React, { Component } from 'react'
import TextLoop from 'react-text-loop'
import Scrollchor from 'react-scrollchor'
import classnames from 'classnames'
import {SketchField, Tools} from 'react-sketch'
import Page from './Page'
import {Header, Footer} from './HeaderFooter'
import Picker from './Picker'
import ColorLens from './ColorLens'
import data from './data/data.json'

const BREAKPOINT = 769

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewKey:  'ABOUT',
      color:    'black', // any color format
      colorList: ["black", "#26294a", "#01545a", "#017351", "#03c383", "#aad962","#fbbf45", "#ef6a32", "#ed0345", "#a12a5e", "#710162", "#110141"],
      innerWidth: 0,
      innerHeight: 0,
    }
  }

  componentWillMount = () => {
    this.setState({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    })
  }

  setGlobalState = (key, value) => {
    this.setState({key, value})
  }

  setColor = (color) => {
    if (color !== this.state.color){
      this.setState({color:color})
    }
  }

  toggleViewKey = (e, currentViewKey) => {
    e.preventDefault()
    e.stopPropagation()
    if (window.innerWidth < BREAKPOINT) {
      switch(currentViewKey){
        case 'ABOUT':
          this.setState({viewKey:'WORK'})
          break
        default:
          this.setState({viewKey:'ABOUT'})
          break
      }
    }
  }

  render() {
    const color = this.state.color
    const colorMap = {
      borderColor: color,
      color: color,
    }

    const globalProps = {
      viewKey:this.state.viewKey,
      data,
      color,
      setGlobalState:this.setGlobalState,
      sketchProps: {
        height:this.state.innerHeight,
        width:this.state.innerWidth * 0.5000,
        tool:Tools.Pencil,
        lineColor: color,
        lineWidth: 2,
      },
    }

    const viewport = {
      innerWidth: this.state.innerWidth,
      innerHeight: this.state.innerHeight,
    }
    return (
      <body id={'trueAndRightfulBody'} style={colorMap}>
        <Header color={color} colorList={this.state.colorList}/>
        <main>
          <ColorLens setColor={this.setColor}/>
          <Page contentKey={'ABOUT'} {...globalProps}/>
          <Page contentKey={'WORK'} {...globalProps}/>
        </main>
        <Footer />
      </body>
    );
  }
}
