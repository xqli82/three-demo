import * as THREE from 'three'
import { DoubleSide } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

export default class app {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        this.renderer.setClearColor(0x177fb3, 0.5) //颜色和透明度
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.textureloader = new THREE.TextureLoader()

        //gui
        this.gui = new GUI()
        this.params = {
            color: 0xff0000,
            state: 'red',
            states: ['red', 'green', 'blue']
        }
        this.gui.addColor(this.params, 'color').onChange(e => {
            this.scene.getObjectByName('m').material.color.set(e)
        })
        this.gui.add(this.params, 'state').options(this.params.states).onChange(e => {
            switch (e) {
                case 'red':
                    this.scene.getObjectByName('m').material.color.set(0xff0000)
                    break;
                case 'green':
                    this.scene.getObjectByName('m').material.color.set(0x00ff00)
                    break;
                case 'blue':
                    this.scene.getObjectByName('m').material.color.set(0x0000ff)
                    break;
            }
        })
        //init
        this.init()
    }
    init() {
        this.camera.position.set(100, 100, 200)
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
        const pm = new THREE.PointsMaterial({
            color: 0x00ff00,
            size: 1
        })
        pm.name = 'pm'
        const gm = new THREE.Geometry()
        for (let i = 0; i < 10000; i++) {
            let point = new THREE.Vector3()
            point.x = THREE.MathUtils.randFloatSpread(100)
            point.y = THREE.MathUtils.randFloatSpread(100)
            point.z = THREE.MathUtils.randFloatSpread(100)
            gm.vertices.push(point)
        }
        // const gm=new THREE.BoxBufferGeometry(10,10,10)
        const m = new THREE.Points(gm, pm)
        m.name = 'm'
        this.scene.add(m)
    }
    render() {
        window.requestAnimationFrame(() => this.render())

        this.renderer.render(this.scene, this.camera)
    }
    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

}
