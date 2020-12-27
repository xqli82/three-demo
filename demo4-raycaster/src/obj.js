import * as THREE from 'three'
import { DoubleSide } from 'three'
import Base from './base'

export default class obj extends Base {
    constructor() {
        super()

        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        this.dom = document.body

        this.init()
    }
    init() {
        this.base_init(this.dom, 10, 10, 10, new THREE.Vector3(0, 0, 0))
        this.addMesh()
        this.render()
        window.addEventListener('mousemove',(e)=>this.onMouseMove(e))
    }
    addMesh() {
        const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10, 10, 10), new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: DoubleSide
        }))
        const m1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
            color: 0xff0000
        }))
        m1.position.set(10,0,0)
        this.scene.add(m1)
        this.scene.add(plane)
    }
    render() {
        this.raycaster.setFromCamera(this.mouse, this.camera)
        let intersects = this.raycaster.intersectObjects(this.scene.children)
        // intersects.forEach(item => {
        //     // item.object.material.color.set(0x00ff00)
        //     console.log(item)
        // })
        // console.log(intersects)
        if(intersects.length>1){
            console.log(intersects)
        }

        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(() => this.render())
    }
    onMouseMove(e) {
        this.mouse.x = (e.clientX / this.dom.clientWidth) * 2 - 1
        this.mouse.y = (e.clientY / this.dom.clientHeight) * 2 - 1
        // console.log(this.mouse)
    }
    
}