import React, { Component } from 'react'
import { drag, mouse} from 'd3'
import { select } from 'd3-selection'
import { geoPath, geoOrthographic, geoCircle} from 'd3-geo'
import classnames from 'classnames'
import {versor} from './helpers/versor.js'
import {hpluvToHex, hexToHsluv} from 'hsluv'

export default class Picker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  componentDidMount() {
    this.createPicker()
  }

  createPicker = () => {
    const Rc = this
    const Rp = this.props

    const canvas = select(Rc.node)
    const cx = canvas.node().getContext('2d')
    const width = window.innerWidth * 0.5
    const height = window.innerHeight
    const ctr = [width * 0.5, height * 0.5] //frame center
    const dia = height * 0.35 // diameter for colorLens

    const projection = geoOrthographic().scale(dia).translate(ctr).precision(2)

    const path = geoPath().projection(projection).context(cx)

    const c = geoCircle().radius(90)
    const circ1 = c.center([0, 90])()
    const circ2 = c.center([0, -19.5])()
    const circ3 = c.center([120, -19.5])()
    const circ4 = c.center([240, -19.5])()

    canvas.call(drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragEnded)
    )

    let v0 // Mouse position in Cartesian coordinates at start of drag gesture.
    let r0 // Projection rotation as Euler angles at start.
    let q0 // Projection rotation as versor at start.

    let v1
    let q1
    let r1

    function dragstarted() {
      v0 = versor.cartesian(projection.invert(mouse(this)))
      r0 = projection.rotate()
      q0 = versor(r0)
    }

    function dragged() {
      v1 = versor.cartesian(projection.rotate(r0).invert(mouse(this)))
      q1 = versor.multiply(q0, versor.delta(v0, v1))
      r1 = versor.rotation(q1)
      projection.rotate(r1)
      renderD3()
    }

    function dragEnded(){
      Rp.getColorFromCanvas(cx, ctr)
    }


    cx.globalCompositeOperation = Rp.clrLens.mixMode
    cx.filter = Rp.clrLens.filter
    // cx.beginPath();
    // cx.arc(center[0], center[1], dia * 0.8, 0, Math.PI * 2, false);
    // cx.clip();
    const renderD3 = function() {
      cx.clearRect(0, 0, width, height)
      cx.beginPath(), path(circ1), cx.fillStyle = Rp.clrLens.c1, cx.fill() //North Pole
      cx.beginPath(), path(circ2), cx.fillStyle = Rp.clrLens.c2, cx.fill()
      cx.beginPath(), path(circ3), cx.fillStyle = Rp.clrLens.c3, cx.fill()
      cx.beginPath(), path(circ4), cx.fillStyle = Rp.clrLens.c4, cx.fill()
    }
    renderD3()
  }


  render() {
    let showPicker = classnames({
      fadeIn: this.props.drawMode,
      fadeOut: !this.props.drawMode,
    })
    return (
      <div id={'D3'} className={`abs ${showPicker}`}>
        <div id={'crosshair'} />
        <div id={'colorHistoryContainer'}>
          <button className={'circleB mr05'} style={{backgroundColor:'black'}} onClick={() => this.props.setColorInHistory('black')}/>
          {
            this.props.clrHistory.map((c) => {
              return <button className={'circleB mr05'} style={{backgroundColor:c}} onClick={() => this.props.setColorInHistory(c)}/>
            })
          }
        </div>
        <div id={'clipper'} style={{backgroundColor:'white'}}>
          <canvas id={'colorLens'}  ref={node => this.node = node} width={window.innerWidth * 0.50} height={window.innerHeight} />
        </div>
      </div>
    )
  }
}
