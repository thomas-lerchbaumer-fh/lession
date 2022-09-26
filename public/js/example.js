import * as THREE from 'three'
import Stats from '../jsm/libs/stats.module.js'
import { GUI } from '../jsm/libs/lil-gui.module.min.js'
import { CinematicCamera } from '../jsm/cameras/CinematicCamera.js'
import { Vector3 } from 'three'
import { Buggy } from './Buggy.js'

let scene, camera, renderer
let cube

let buggy

function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)

    const material = new THREE.MeshBasicMaterial({ color: 0x44ff44 })
    let geometry = new THREE.BoxGeometry(1, 1, 1)
    cube = new THREE.Mesh(geometry, material)
    camera.position.z = 5
    
    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add( light );




    buggy = new Buggy(scene)

    scene.add(cube)
    document.body.appendChild(renderer.domElement)

    window.addEventListener('resize', onWindowResize)
   
}

function onWindowResize(event) {
    camera.apsect = window.innerwidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    buggy.animate();

    cube.rotation.x += 0.01
    cube.rotation.y += +0.01
    cube.rotation.z += 0.01
}
init()
animate()
