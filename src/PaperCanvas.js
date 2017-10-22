import React, { Component } from 'react'
import paper, { Path, Tool, Size, PaperScope } from 'paper'
import { BREAKPOINT } from './helpers/constants'

export default class PaperCanvas extends Component {
  componentDidMount = () => {
    if (window.innerWidth > BREAKPOINT) {
      this.createPaperCanvas(this.props.contentKey)
    }
  }

  createPaperCanvas = (key) => {
    const R = this

    // ample amounts of bullshit just to get the canvas sized for retina
    const canvas = document.getElementById(`paperNode-${key}`)
    const ctx = canvas.getContext('2d')
    const global_width = window.innerWidth * 0.5
    const global_height = window.innerHeight
    let ratio = 1
    if(ctx.webkitBackingStorePixelRatio < 2) ratio = window.devicePixelRatio || 1
    canvas.setAttribute('width', global_width*ratio)
    canvas.setAttribute('height', global_height*ratio)

    //make new scope for each paper instance
    const paper = new PaperScope()
    paper.setup(`paperNode-${key}`)

    // load initial drawing
    paper.project.importSVG(`./drawings/${key}.svg`)

    let tool = new Tool()
    let path

    tool.onMouseDown = function(event) {
			path = new Path()
			path.strokeColor = R.props.color
      path.strokeWidth = 2
			path.add(event.point)
    }

		tool.onMouseDrag = function(event) {
			path.add(event.point)
		}

    tool.onMouseUp = function(event) {
      path.smooth()
    }
  }

  render () {
    return (
      <div id={'sketchFrame'} className={'abs'}>
        <canvas data-paper-resize id={`paperNode-${this.props.contentKey}`}/>
      </div>
    )
  }
}
