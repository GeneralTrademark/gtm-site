import React, { Component } from 'react'
import d3 from 'd3'
import { scaleOrdinal } from 'd3-scale'
import { range } from 'd3-array'
import { select } from 'd3-selection'
var colors = ["#1a1334", "#26294a", "#01545a", "#017351", "#03c383", "#aad962",
    "#fbbf45", "#ef6a32", "#ed0345", "#a12a5e", "#710162", "#110141"]
var idx =0
export default class Picker extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.createPicker = this.createPicker.bind(this)
  }

   componentDidMount() {
      this.createPicker()


   }

   componentDidUpdate() {
      this.createPicker()
   }

   createPicker() {
     const node = select(this.node)
     node.style("filter", "url(#gooey)") //Set the filter on the container svg

     node.append("circle")
			.attr("class", "centerCircle")
			.attr("cx", 200)
			.attr("cy", 200)
			.attr("r", 30)
			.style("fill", this.props.color);

    var colorScale = scaleOrdinal().range(colors);

    const defs = node.append('defs');
    const filter = defs.append('filter').attr('id','gooey');
    filter.append('feGaussianBlur')
  		.attr('in','SourceGraphic')
  		.attr('stdDeviation','11')
  		.attr('result','blur');
  	filter.append('feColorMatrix')
  		.attr('in','blur')
  		.attr('mode','matrix')
  		.attr('values','1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7');

    var steps = 12;
  	node.selectAll(".flyCircle")
  		.data(range(steps).map(function(num) {return (num/steps)*(2*Math.PI); }))
  		.enter().append("circle")
  			.attr("class", "flyCircle")
  			.attr("cx", 200)
  			.attr("cy", 100)
  			.attr("r", 30)
        .style("fill", function(d, i) {return colorScale(i)})
        .call(update)

    function update() {

			var circle = node.selectAll(".flyCircle");
			var dur = 1000,
				del = 200;

			(function repeat() {
				circle
					.transition("outward").duration(dur).delay(function(d,i) { return i*del; })
						.attr("cx", 200)
            .attr("cy", 500)
					.transition("inward").duration(dur).delay(function(d,i) { return steps*del + i*del; })
						.attr("cx", 200)
						.attr("cy", 500)
			})();

	}//update

  		// .style("filter", "url(#gooey)") //Set the filter on the container svg
  		// .attr("transform", "translate(" + (width/2 + margin.left) + "," +(height/2 +  margin.top) + ")");
   }


  render() {
    return (
      <div id={'D3'}>
        <svg ref={node => this.node = node} width={window.innerWidth} height={window.innerHeight}>
        </svg>
      </div>
    )
  }
}
