import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class BaseObejct {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = undefined
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        this.control=undefined
    }
    base_init(DOM,cameraPos_x,cameraPos_y,cameraPos_z,cameraLook) {
        this.camera=new THREE.PerspectiveCamera(60, DOM.clientWidth / DOM.clientHeight, 0.1, 100)
        this.camera.position.set(cameraPos_x,cameraPos_y,cameraPos_z)
        this.camera.lookAt(cameraLook)
        this.renderer.setSize(DOM.clientWidth, DOM.clientHeight)
        DOM.appendChild(this.renderer.domElement)
        this.control=new OrbitControls(this.camera, this.renderer.domElement)
    }

}