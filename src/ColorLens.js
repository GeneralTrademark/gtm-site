import React, { Component } from 'react'
import d3, { event, behavior, drag, scaleLinear, mouse, json, hsl } from 'd3'
import {interpolateCubehelixLong, interpolateCubehelix} from 'd3-interpolate'
import { scaleOrdinal } from 'd3-scale'
import {  } from 'd3-array'
import { select } from 'd3-selection'
import { geoPath, geoOrthographic, geoGraticule } from 'd3-geo'
import { cubehelix, rgb } from 'd3-color'

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
      .scale(height * 0.4)
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

    }
    var sphere = {type: "Sphere"}
    const graticule = geoGraticule()
    var colorArr = ["#000", "#26294a", "#01545a", "#017351", "#03c383", "#aad962","#fbbf45", "#ef6a32", "#710162", "#710162"]

    var colorScale = scaleLinear()
      .domain([.1, .2, .3, .4, .5, .6, .7])
      .range(colorArr)
      .interpolate(interpolateCubehelix);

    var ticks = colorScale.ticks(20)
    let tl = ticks.length * 0.5
    console.log(ticks)

    let tickMap = ticks.map((t, i) => {
      let q = i + 1
      let ll = {W: 0.0, N: (90 / tl) * (tl - i) +0.5, E: 360, S: (90 / tl) * (tl- q) };
      return geoGraticule().extentMajor([[ll.W, ll.S], [ll.E, ll.N]])
    })


    // context.filter = 'blur(10px)'
    render = function() {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      tickMap.forEach((g, i) => { context.beginPath(), path(g.outline()), context.fillStyle = colorScale(ticks[i]), context.fill() });
      let p = context.getImageData(center[0], center[1], 1, 1).data
      let newColor = `rgb(${p[0]},${p[1]},${p[2]})`
      that.props.setColor(newColor)
    };

    render();

  }


  render() {
    return (
      <div id={'D3'}>
        <div id={'crosshair'} />
        <canvas id={'colorLens'} ref={node => this.node = node} width={window.innerWidth} height={window.innerHeight} />
      </div>
    )
  }
}
