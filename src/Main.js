import React, { Component } from 'react'
import TextLoop from 'react-text-loop'
import Scrollchor from 'react-scrollchor'
import classnames from 'classnames'
import {SketchField, Tools} from 'react-sketch'
import Page from './Page'
import {Header, Footer} from './HeaderFooter'
import ColorLensII from './ColorLensII'
import data from './data/data.json'
// import dataJson from './data/drawing.json'
import Swipe from 'react-easy-swipe'


const BREAKPOINT = 769

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewKey:  'ABOUT',
      color:    'black', // any color format
      innerWidth: 0,
      innerHeight: 0,
      drawMode: false,
      initialDrawing: '',
      clrHistory: ['rgb(118, 99, 147)'],
      clrLens: {
        c1: '#ff3600',
        c2: '#006eff',
        c3: '#8ba200',
        c4: '#00ff29',
        mixMode: 'luminosity',
        filter: 'blur(150px)',
      }
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

  toggleDrawMode = (currentState) => {
    this.setState({drawMode: !currentState})
  }

  setColor = (color) => {
    if (color !== this.state.color){
      this.setState({color:color})
      this.handleColorHistory(color)
    }
  }

  setColorInHistory = (color) => {
    this.setState({color:color})
  }

  getColorFromCanvas = (cx, ctr) => {
    let p = cx.getImageData(ctr[0], ctr[1], 1, 1).data
    let newColor = `rgb(${p[0]},${p[1]},${p[2]})`
    this.setColor(newColor)
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

  handleColorHistory = (color) => {
    let newExistingColors = this.state.clrHistory.concat(color)
    if (newExistingColors.length > 10) {
      newExistingColors.shift()
    }
    this.setState({clrHistory: newExistingColors})
  }

  handleCardChange = (key) => {
    this.setState({
      viewKey: key,
    })
  }

  render() {
    const color = this.state.color
    const colorMap = {
      borderColor: color,
      color: color,
    }

    const globalProps = {
      viewKey: this.state.viewKey,
      data,
      color,
      setGlobalState: this.setGlobalState,
      sketchProps: {
        height: this.state.innerHeight,
        width: this.state.innerWidth * 0.5000,
        tool: Tools.Pencil,
        lineColor: color,
        lineWidth: 2,
        defaultDataType: 'url',
        // defaultData: dataJson,
      },
    }

    const viewport = {
      innerWidth: this.state.innerWidth,
      innerHeight: this.state.innerHeight,
    }
    return (
      <body id={'trueAndRightfulBody'} style={colorMap}>

        <Header
          toggleDrawMode={() => this.toggleDrawMode(this.state.drawMode)}
          color={color}
          colorList={this.state.colorList}/>
        { window.innerWidth < BREAKPOINT ? null :
          <ColorLensII
          getColorFromCanvas={this.getColorFromCanvas}
          setColorInHistory={this.setColorInHistory}
          clrHistory={this.state.clrHistory}
          clrLens={this.state.clrLens}
          setColor={this.setColor}
          drawMode={this.state.drawMode}/> }
        <Swipe onSwipeRight={(e) => this.handleCardChange('ABOUT')} onSwipeLeft={(e) => this.handleCardChange('WORK')}>
          <main>
            <Page contentKey={'ABOUT'} {...globalProps}/>
            <Page contentKey={'WORK'} {...globalProps}/>
          </main>
        </Swipe>

        <Footer />
      </body>
    );
  }
}
