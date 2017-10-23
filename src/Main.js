import React, { Component } from 'react'
import Page from './Page'
import data from './data/data.json'
import Swipe from 'react-easy-swipe'
import paper from 'paper'
import Dropbox from 'dropbox'
import {PaperScope} from 'paper'
import { BREAKPOINT, makeHash } from './helpers/constants'

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
      userHasDrawn: false,
      clrHistory: ['rgb(118, 99, 147)'],
      clrLens: {
        c1: '#ff3600',
        c2: '#006eff',
        c3: '#8ba200',
        c4: '#00ff29',
        mixMode: 'luminosity',
        filter: 'blur(150px)',
      },
      notifications: [], //array of objects {message::str, type::str(key)}
    }
    const token = process.env.REACT_APP_DROPBOX_ACCESS_TOKEN
    this.dbx = new Dropbox({ accessToken: token })
    paper.install(window)
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

  clearCanvases = () => {
    paper.projects.map((project) => {
      project.activeLayer.removeChildren()
    })
  }

  addNotification = (message, type, component) => {
    // types: PERSISTANT, TEMPORARY
    // components: PROMPT, MESSAGE
    const maxNots = 3
    const newNot = { message, type, component }

    let nots = this.state.notifications
    // only trim end of array when
    if (nots.length >= maxNots) {
      nots[nots.length].type !== 'PERSISTANT' ? nots.pop() : null
    }

    let newNots = nots.concat(newNot)
    this.setState({ notifications: newNots })
  }

  sendCanvases = () => {
    // make .SVG
    paper.projects.map((project) => {
      const hash = makeHash()
      const fileName = `message_from_gtm_dot_nyc_${hash}.svg`
      const svg = project.exportSVG({asString:true})
      // send to dbx
      this.dbx.filesUpload({path: '/' + fileName, contents: svg})
        .then(function(response) {
          this.showNotification('Success :)', 'MESSAGE_SUCCESS')
        })
        .catch(function(error) {
          this.showNotification('Something went wrong :(', 'MESSAGE_ERROR')
      })
    })
  }

  exportCanvases = () => {
    paper.projects.map((project) => {
      // make .SVG
      let fileName = 'i_made_this_on_gtm_dot_nyc.svg'
      const url = "data:image/svg+xml;utf8," + encodeURIComponent(project.exportSVG({asString:true}))
      // Execute download
      const link = document.createElement("a")
      link.download = fileName
      link.href = url
      link.click()
    })
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
    this.setState({ viewKey: key })
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
      userHasDrawn: this.state.userHasDrawn,
      addNotification: this.addNotification,
      paper: this.paper,
      toggleDrawMode: () => this.toggleDrawMode(this.state.drawMode)
    }

    const colorLensProps = {
      exportCanvases: this.exportCanvases,
      sendCanvases: this.sendCanvases,
      clearCanvases:this.clearCanvases,
      getColorFromCanvas: this.getColorFromCanvas,
      setColorInHistory:this.setColorInHistory,
      clrHistory: this.state.clrHistory,
      clrLens: this.state.clrLens,
      setColor: this.setColor,
      drawMode: this.state.drawMode,
    }
    
    return (
      <content >
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
