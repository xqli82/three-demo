import * as THREE from 'three'
import { DoubleSide } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

import nx from './img/nx.jpg'
import ny from './img/ny.jpg'
import nz from './img/nz.jpg'
import px from './img/px.jpg'
import py from './img/py.jpg'
import pz from './img/pz.jpg'

export default class app {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        this.renderer.setClearColor(0x177fb3, 0.5) //颜色和透明度
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.controlSet()
        this.textureloader = new THREE.TextureLoader()

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
        const cubeTextureLoader = new THREE.CubeTextureLoader()
        // cubetextureloader.setPath('')
        //六张图片分别是朝前的（posz）、朝后的（negz）、朝上的（posy）、朝下的（negy）、朝右的（posx）和朝左的（negx）。
        const cubeTexture = cubeTextureLoader.load([
            px, nx,
            py, ny,
            pz, nz
        ])
        this.scene.background = cubeTexture

        this.scene.add(new THREE.AxesHelper(10))
    }
    controlSet() {
        //设置控制器的中心点
        //controls.target.set( 0, 5, 0 );
        // 如果使用animate方法时，将此函数删除
        //controls.addEventListener( 'change', render );
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        this.control.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        this.control.enableZoom = true;
        //是否自动旋转
        this.control.autoRotate = false;
        this.control.autoRotateSpeed = 0.5;
        //设置相机距离原点的最远距离
        this.control.minDistance = 1;
        //设置相机距离原点的最远距离
        this.control.maxDistance = 2000;
        //是否开启右键拖拽
        this.control.enablePan = true;
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
