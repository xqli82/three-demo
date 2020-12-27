import * as THREE from 'three'
import { DoubleSide, PlaneBufferGeometry } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import obj from './model/demo1.obj'
import mtl from './model/demo1.mtl'
import collada from './model/demo1.dae'
import img1 from './model/demo1/Groundcover_Gravel_1_inch.jpg'
import img2 from './model/demo1/Groundcover_River_Rock_4_inch.jpg'
import img3 from './model/demo1/Pavers_Driveway_Brick.jpg'
import img4 from './model/demo1/Pavers_with_Grass_Herringbone.jpg'
import img5 from './model/demo1/Vegetation_Grass_Artificial.jpg'

export default class app {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        this.renderer.setClearColor(0x177fb3, 0.5) //颜色和透明度
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.x=0
        this.y=100
        this.z=100
        this.angle=0
        this.init()
    }
    init() {
        this.camera.position.set(0, 100, 100)
        this.camera.lookAt(0, 0, 0)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)


        window.onresize = () => {
            this.resize()
        }
        this.scene.add(new THREE.AmbientLight(0x000000, 0.9))
        this.geomotry()
        this.render()
    }
    geomotry() {

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.9))
        new ColladaLoader().load(collada, collada => {
            //添加阴影
            collada.scene.traverse(function (item) {
                if (item instanceof THREE.Mesh) {
                    item.castShadow = true;
                    item.receiveShadow = true;
                }
            });
            //缩放
            collada.scene.scale.set(0.2, 0.2, 0.2)
            collada.scene.translateX(-50)
            collada.scene.translateY(-5)
            collada.scene.translateZ(-5)
            console.log(collada.scene)
            this.scene.add(collada.scene);
        })
    }
    render() {
        window.requestAnimationFrame(() => this.render())
        
        this.angle +=0.01
        this.x =200*Math.sin(this.angle)
        this.z =200*Math.cos(this.angle)
        this.y =100
        // console.log(this.x,this.y,this.z)
        this.camera.lookAt(0,0,0)


        this.camera.position.set(this.x,this.y,this.z)
        this.renderer.render(this.scene, this.camera)
    }
    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

}
