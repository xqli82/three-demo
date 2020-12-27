import * as THREE from 'three'
import { DoubleSide } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import img1 from './img/img1.jpg'

export default class app {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        this.renderer.setClearColor(0x177fb3, 0.5) //颜色和透明度
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.loader = new THREE.TextureLoader()
        this.texture = this.loader.load(img1)
        this.texture.wrapS = THREE.RepeatWrapping
        this.texture.wrapT = THREE.RepeatWrapping
        this.texture.repeat.x = 10
        this.texture.repeat.y = 2
        this.init()
    }
    init() {
        this.camera.position.set(10, 10, 20)
        this.camera.lookAt(0, 0, 0)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        window.onresize = () => {
            this.resize()
        }
        this.geometry()
        this.render()
    }
    geometry() {
        const path = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-8, -4, 0),
            new THREE.Vector3(-7, 4, 0),
            new THREE.Vector3(7, 4, 0),
            new THREE.Vector3(8, -4, 0)
        ], false/*是否闭合*/);
        // console.log(path.getPoint(0.6))
        const tube = new THREE.TubeBufferGeometry(path, 50, 1, 50, false)
        const g1 = new THREE.Mesh(tube, new THREE.MeshBasicMaterial({
            // color: 0xff0000,
            side: DoubleSide,
            map: this.texture
        }))
        const tube2 = new THREE.TubeBufferGeometry(path, 50, 1.1, 50, false)
        const g2 = new THREE.Mesh(tube2, new THREE.MeshBasicMaterial({
            color: 0x4488ff,
            side: DoubleSide,
            transparent:true,
            opacity:0.3
        }))

        this.scene.add(g1)
        this.scene.add(g2)
    }
    render() {
        window.requestAnimationFrame(() => this.render())

        this.texture.offset.x += -0.01
        this.renderer.render(this.scene, this.camera)
    }
    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

}
