import React, { Component } from 'react'
import d3, {event, behavior, drag, scaleLinear} from 'd3'
import { scaleOrdinal } from 'd3-scale'
import { range } from 'd3-array'
import { select } from 'd3-selection'
import { geoPath, geoOrthographic, geoGraticule } from 'd3-geo'


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
    this.createPicker()
  }

  createPicker = () => {
    var width = 600,
        height = 400,
        scale = 100,
        origin = {x: 55, y:-40};

    var λ = scaleLinear()
  	  .domain([-width, width])
  	  .range([-180, 180])

  	var φ = scaleLinear()
  	  .domain([-height, height])
  	  .range([90, -90]);


    const sens = 0.25
    const node = select(this.node)

    var projection = geoOrthographic()
      .scale(scale)
      .translate([width/2, height/2])
      .rotate([origin.x, origin.y])
      .center([0,0])
      .clipAngle(90);

    var gp = geoPath(projection)
    const graticule = geoGraticule()

    const group = node.append('g')
    group.append("path")
      .attr("fill", "blue")
      .attr("stroke", "#000")
      .attr("class", "graticule")
      .datum(graticule)
      .attr('d', gp);


    group.call(drag().on('drag', dragged));


    function dragged() {
        var r = {
            x: λ((event.x = event.x)),
            y: φ((event.y = event.y))
        };
        projection.rotate([origin.x + r.x, origin.y + r.y]);
        updatePaths(node, graticule, gp);
    };
    // .call(drag()
    //   .origin(function() { var r = projection.rotate(); return {x: r[0] / sens, y: -r[1] / sens}; })
    //   .on("drag", function() {
    //     var rotate = projection.rotate()
    //     projection.rotate([event.x * sens, -event.y * sens, rotate[2]]);
    //   }));



    function updatePaths(node, graticule, geoPath) {
    	node.selectAll('path.graticule').datum(graticule).attr('d', geoPath);
    };

  }



  render() {
    return (
      <div id={'D3'}>
        <svg ref={node => this.node = node} width={window.innerWidth} height={window.innerHeight} />
      </div>
    )
  }
}
