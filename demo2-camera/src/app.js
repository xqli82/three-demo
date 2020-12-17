import * as THREE from 'three'
import { DoubleSide } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class app {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.init()
    }
    init() {
        this.camera.position.set(10, 10, 10)
        this.camera.lookAt(0, 0, 0)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
            color: new THREE.Color(0xff0000),
            wireframe:true
        }))
        this.mesh.name='box1'
        this.scene.add(this.mesh)

        this.plane =new THREE.Mesh(new THREE.PlaneBufferGeometry(5,10,32),new THREE.MeshBasicMaterial({
            // color:new THREE.Color(),
            side:DoubleSide,
            // wireframe:true
        }))
        this.plane.rotation.x=Math.PI/2
        this.plane.name='plane'
        this.scene.add(this.plane)

        
        window.onresize = () => {
            this.resize()
        }
        this.render()
    }
    render() {
        window.requestAnimationFrame(() => this.render())
        this.mesh.rotation.x += 0.001
        this.mesh.rotation.y += 0.01
        this.mesh.position.y +=0.01
        // this.mesh.setAttribute('position',this.mesh)
        // this.camera.lookAt(this.mesh.position)
        this.renderer.render(this.scene, this.camera)
    }
    resize() {
        this.camera.aspect=window.innerWidth/window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
}