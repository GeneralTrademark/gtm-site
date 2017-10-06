import React, { Component } from 'react'
import d3 from 'd3'
import { scaleOrdinal } from 'd3-scale'
import { range } from 'd3-array'
import { select } from 'd3-selection'

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
     const bigBubbleRadius = 24
     const smallBubbleRadius = 14

     const colors = ["#1a1334", "#26294a", "#01545a", "#017351", "#03c383", "#aad962","#fbbf45", "#ef6a32", "#ed0345", "#a12a5e", "#710162", "#110141"]
     const homeX = 50
     const homeY = 0 + 50
     const node = select(this.node)
     node.style("filter", "url(#gooby)") //Set the filter on the container svg
    var colorScale = scaleOrdinal().range(colors);

    const defs = node.append('defs');
    const filter = defs.append('filter').attr('id','gooby');
    filter.append('feGaussianBlur')
  		.attr('in','SourceGraphic')
  		.attr('stdDeviation','10')
  		.attr('result','blur');
  	filter.append('feColorMatrix')
  		.attr('in','blur')
  		.attr('mode','matrix')
  		.attr('values','1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7');

    var steps = 12;
  	node.selectAll(".flyCircle")
  		.data(range(steps).map((num) => {return (num/steps)*(2*Math.PI); }))
  		.enter().append("circle")
  			.attr("class", "flyCircle")
  			.attr("cx", homeX)
  			.attr("cy", homeY)
  			.attr("r", smallBubbleRadius)
        .on("click",  setColor)
        .style("fill", (d, i) => {return colorScale(i)})

    node.append("circle")
     .attr("class", "centerCircle")
     .attr("cx", homeX)
     .attr("cy", homeY)
     .attr("r",  this.state.isOpen ? bigBubbleRadius : smallBubbleRadius)
     .style("fill", this.props.color)
     .on("click",  togglePicker)
     .on("mouseover", handleMouseOver)
     .on("mouseout", handleMouseOut);

    // React Class context
    const that = this

    function setColor(){
      let color = this.style.fill
      that.props.setColor(color)
    }

    function togglePicker() {
      const circle = node.selectAll(".flyCircle")
      const centerCircle = select(this)
      const dur = 600
      const del = 30
      if (that.state.isOpen) {
        (function repeat() {
          circle
            .transition("inward").duration(dur).delay((d,i) => { return i*del; })
              .attr("cx", homeX)
              .attr("cy", (i) => {return homeY})
              .attr("r", smallBubbleRadius);
        })();
      } else {
        (function repeat() {
          circle
            .transition("outward").duration(dur).delay((d,i) => { return i*del; })
              .attr("cx", homeX)
              .attr("cy", (i) => {return (i * 80) + homeY + bigBubbleRadius + 50})
              .attr("r", bigBubbleRadius);
        })();
      }
      that.state.isOpen ? centerCircle.transition().attr("r", smallBubbleRadius) : centerCircle.transition().attr("r", bigBubbleRadius)
      that.setState({isOpen: !that.state.isOpen})
    }

    function handleMouseOver() {
      select(this).transition().attr("r", bigBubbleRadius);
    }

    function handleMouseOut() {
      if (that.state.isOpen){
        select(this).transition().attr("r", bigBubbleRadius);
      } else {
        select(this).transition().attr("r", smallBubbleRadius);
      }
    }
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
