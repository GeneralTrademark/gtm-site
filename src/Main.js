import React, { Component } from 'react'
import TextLoop from 'react-text-loop'
import Scrollchor from 'react-scrollchor'
import classnames from 'classnames'
import Page from './Page'
import {Header, Footer} from './HeaderFooter'
import data from './data/data.json'
import Swipe from 'react-easy-swipe'
import paper from 'paper'
import Dropbox from 'dropbox'
import { BREAKPOINT } from './helpers/constants'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewKey:  'ABOUT', // mostly for mobile, key of current view
      color:    'black', // any color format
      innerWidth: 0,
      innerHeight: 0,
      drawMode: false,
      initialDrawing: {},
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
    const token = process.env.REACT_APP_DROPBOX_ACCESS_TOKEN
    this.dbx = new Dropbox({ accessToken: token })
  }

  componentWillMount = () => {
    this.setState({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    })
  }

  setGlobalState = (obj) => {
    if (typeof obj === 'object') {
      this.setState(obj)
    }
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

  clearCanvas = () => {
    paper.project.activeLayer.removeChildren()
  }

  showNotification = (message, type) => {

  }

  makeHash = () => {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
  };

  sendCanvas = () => {
    const fileName = `message_from_gtm_dot_nyc_${this.makeHash()}.svg`
    const svg = paper.project.exportSVG({asString:true})
    this.dbx.filesUpload({path: '/' + fileName, contents: svg})
      .then(function(response) {
        this.showNotification('Success :)', 'MESSAGE_SUCCESS')
      })
      .catch(function(error) {
        this.showNotification('Something went wrong :(', 'MESSAGE_ERROR')
    });
  }

  exportCanvas = () => {
    let fileName = 'i_made_this_on_gtm_dot_nyc.svg'
    const url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}))
    const link = document.createElement("a")
    link.download = fileName
    link.href = url
    link.click()
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
      toggleDrawMode: () => this.toggleDrawMode(this.state.drawMode)
    }

    const colorLensProps = {
      exportCanvas: this.exportCanvas,
      sendCanvas: this.sendCanvas,
      clearCanvas:this.clearCanvas,
      getColorFromCanvas: this.getColorFromCanvas,
      setColorInHistory:this.setColorInHistory,
      clrHistory: this.state.clrHistory,
      clrLens: this.state.clrLens,
      setColor: this.setColor,
      drawMode: this.state.drawMode,
    }

    const viewport = {
      innerWidth: this.state.innerWidth,
      innerHeight:this.state.innerHeight,
    }
    return (
      <content style={colorMap}>
        <Swipe
          onSwipeRight={(e) => this.handleCardChange('ABOUT')}
          onSwipeLeft={(e) => this.handleCardChange('WORK')}>
          <main>
            <Page contentKey={'ABOUT'} {...globalProps} {...colorLensProps}/>
            <Page contentKey={'WORK'} {...globalProps} {...colorLensProps}/>
          </main>
        </Swipe>
      </content>
    );
  }
}
