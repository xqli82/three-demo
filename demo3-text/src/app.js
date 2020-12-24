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
        this.renderer.setClearColor(0x177fb3, 0.5) //颜色和透明度
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.textureloader = new THREE.TextureLoader()
        this.rect1=new Rect(0,0,50,50,'red',3,1)
        this.init()
    }
    init() {
        this.camera.position.set(10, 10, 20)
        this.camera.lookAt(0, 0, 0)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({
            color: new THREE.Color(0xff0000),
            wireframe: true
        }))
        this.mesh.name = 'box1'
        this.mesh.position.z=5
        this.scene.add(this.mesh)

        this.p1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10, 10, 10), new THREE.MeshBasicMaterial({
            map: this.createCanvas('hello world'),
            side: DoubleSide
        }))
        this.p1.name = 'p1'
        this.scene.add(this.p1)

        window.onresize = () => {
            this.resize()
        }
        this.render()
    }
    render() {
        window.requestAnimationFrame(() => this.render())
        this.mesh.rotation.x += 0.001
        this.mesh.rotation.y += 0.01


        this.scene.getObjectByName('p1').material.map = this.createCanvas(new Date().getSeconds() > 10 ? new Date().getSeconds() : `0${new Date().getSeconds()}`)

        this.renderer.render(this.scene, this.camera)
    }
    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    createText(text, width, height) {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')

        this.rect1.draw(ctx)
        this.rect1.move(canvas)

        ctx.font = '20px arial'
        ctx.fillStyle = "white"
        ctx.fillText(text, 50, 100)
        return canvas
    }
    createCanvas(text) {
        return new THREE.CanvasTexture(this.createText(text, 200, 200))
    }
}

class Rect{
    constructor(x,y,width,height,color,speedX,speedY){
        this.x=x
        this.y=y
        this.width=width
        this.height=height
        this.color=color
        this.speedX=speedX
        this.speedY=speedY
    }
    draw(context){
        context.beginPath();
        context.strokeStyle=this.color
        context.strokeRect(this.x,this.y,this.width,this.height)
        context.closePath();
    }
    move(canvas){
        this.x +=this.speedX
        this.y +=this.speedY
        if(this.x>canvas.width-this.width){
            this.speedX *=-1
        }else if(this.x<0){
            this.speedX *=-1
        }
        if(this.y>canvas.width-this.width){
            this.speedY *=-1
        }else if(this.y<0){
            this.speedY *=-1
        }
    }
}