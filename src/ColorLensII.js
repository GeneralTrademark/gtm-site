import React, { Component } from 'react'
import { drag, mouse} from 'd3'
import { select } from 'd3-selection'
import { geoPath, geoOrthographic, geoCircle} from 'd3-geo'
import classnames from 'classnames'

import {versor} from './helpers/versor.js'

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

  componentDidUpdate() {
    // this.createPicker()
  }

  createPicker = () => {
    const canvas = select(this.node)
    const context = canvas.node().getContext("2d");
    const width = window.innerWidth * 0.5
    const height = window.innerHeight
    const center = [width * 0.5, height * 0.5]
    const that = this


    var projection = geoOrthographic()
      .scale(height * 0.5)
      .translate(center)
      .precision(0.1);

    var path = geoPath()
      .projection(projection)
      .context(context)


    canvas.call(drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragEnded));

    var render = function() {},
      v0, // Mouse position in Cartesian coordinates at start of drag gesture.
      r0, // Projection rotation as Euler angles at start.
      q0; // Projection rotation as versor at start.

    function dragstarted() {
      v0 = versor.cartesian(projection.invert(mouse(this)));
      r0 = projection.rotate();
      q0 = versor(r0);
    }

    function dragged() {
      var v1 = versor.cartesian(projection.rotate(r0).invert(mouse(this))),
          q1 = versor.multiply(q0, versor.delta(v0, v1)),
          r1 = versor.rotation(q1);
      projection.rotate(r1);
      render();
    }

    function dragEnded(){
      let p = context.getImageData(center[0], center[1], 1, 1).data
      let newColor = `rgb(${p[0]},${p[1]},${p[2]})`
      that.props.setColor(newColor)
      console.log(newColor)
    }

    let c = geoCircle().radius(90)

    context.globalCompositeOperation = 'soft-light';
    context.filter = 'blur(120px)';

    // context.filter = 'blur(10px)'
    render = function() {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)

      context.beginPath(),  path(c.center([0,90])()), context.fillStyle = '#de2f00', context.fill() //North Pole
      context.beginPath(),  path(c.center([0,-19.5])()), context.fillStyle = '#92da1d', context.fill()
      context.beginPath(),  path(c.center([120,-19.5])()), context.fillStyle = '#155fee', context.fill()
      context.beginPath(),  path(c.center([240,-19.5])()), context.fillStyle = '#7102c8', context.fill()

    }

    render();

  }


  render() {
    let showPicker = classnames({
      fadeIn: this.props.drawMode,
      fadeOut: !this.props.drawMode,
    })
    return (
      <div id={'D3'} className={`abs ${showPicker}`}>
        <div id={'crosshair'} />
        <canvas id={'colorLens'} ref={node => this.node = node} width={window.innerWidth} height={window.innerHeight} />
      </div>
    )
  }
}
