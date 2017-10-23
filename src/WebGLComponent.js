import React, { Component } from 'react'
import classnames from 'classnames'
import {
  Scene,
  PerspectiveCamera,
  Mesh,
  WebGLRenderer,
  Color,
  MeshPhongMaterial,
  AmbientLight,
} from 'three'
// import STLLoader from 'three-stl-loader'
import { BREAKPOINT } from './helpers/constants'

var THREE = require('three')
var STLLoader = require('three-stl-loader')(THREE)


export default class WebGLComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  componentDidMount() {
    if (window.innerWidth > BREAKPOINT ) {
      this.initThreeJS()
    }
  }

  initThreeJS = () => {
    let scene = new Scene();
    // scene.background = new Color( 0xffffff );

    let camera = new PerspectiveCamera( 30, window.innerWidth * 0.5 / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    var light = new THREE.AmbientLight( 0xFFF, 2 ); // soft white light
    scene.add( light );

    const scaleFactor = 50
    let mesh = false

    const loader = new STLLoader()
    let renderer = new WebGLRenderer({ antialias: false, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    renderer.setSize( window.innerWidth * 0.5, window.innerHeight )
    document.getElementById(`WebGL-${this.props.contentKey}`).appendChild(renderer.domElement)

    loader.load(`/${this.props.contentKey}.stl`, function (geometry) {
      let material = new MeshPhongMaterial( {
        color: 0xff5a00,
        wireframe: true,
      } );
      mesh = new Mesh(geometry, material)
      mesh.scale.set(scaleFactor,scaleFactor,scaleFactor);
      scene.add( mesh )
    })

    renderer.render( scene, camera )

    function animate() {
      requestAnimationFrame( animate )
      if (mesh) {
        mesh.rotation.x += 0.0005
        mesh.rotation.y += 0.001
      }
      renderer.render( scene, camera )
    }
    animate()

  }


  render() {
    return (
      <div id={`WebGL-${this.props.contentKey}`} className={'abs'} style={{minWidth:'50vw', minHeight:'100vh'}}/>
    )
  }
}
