import * as THREE from '../lib/three.module.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'
import { OrbitControls } from '../lib/OrbitControls.js'

//game objet - scene, manager, camera, light, loader, loadingdom

class Game {
    constructor(canvasID, sceneMoveZindex) {
        this.scene = new THREE.Scene()
        this.manager = new THREE.LoadingManager()
        this.gltfLoader = new GLTFLoader()
        this.canvas = document.querySelector(canvasID)
        this.sizes = {
            width: this.canvas.offsetWidth,
            height: window.innerHeight
        }
        // this.gui = new dat.GUI()
        this.sceneMoveZindex = sceneMoveZindex
        this.sceneState = 0
        this.loadingDom = document.getElementById('loading')
    }
    settingAddCamera() {
        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height)
        this.camera.position.z = 1
        this.camera.position.x = 2
        this.camera.position.y = 3
        this.scene.add(this.camera)
    }
    settingLights() {
        this.light = new THREE.AmbientLight(0xffffff, 1)
        // this.gui.add(this.light, 'intensity').min(0).max(5).step(0.001)
        this.scene.add(this.light)
    }
    settingLoadingManger() {
        const game = this
        this.manager.onStart = function (url, itemsLoaded, itemsTotal) {
            console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
        };
        this.manager.onLoad = function () {
            game.loadingDom.style.display = 'none'
            console.log('Loading complete!')
        };
        this.manager.onProgress = function (url, itemsLoaded, itemsTotal) {
            game.loadingDom.style.width = (itemsLoaded / itemsTotal) * 70 + '%'
        };
        this.manager.onError = function (url) {
            console.log('There was an error loading ' + url);
        };
    }
    settingRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        })
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.outputEncoding = THREE.sRGBEncoding
    }
    settingControl() {
        this.controls = new OrbitControls(this.camera, this.canvas)
    }
    settingResize() {
        window.addEventListener('resize', () => {
            const canvas = document.querySelector('canvas.webgl')
            canvas.style.width = window.innerWidth * 70 / 100
            this.sizes.width = window.innerWidth * 70 / 100
            this.sizes.height = window.innerHeight

            this.camera.aspect = this.sizes.width / this.sizes.height
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(this.sizes.width, this.sizes.height)
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })
    }
    init(){
        this.settingAddCamera()
        this.settingLights()
        this.settingLoadingManger()
        this.settingControl()
        this.settingRenderer()
        this.settingResize()
    }
}



const game = new Game('canvas.webgl', 5)
game.init()

export { THREE, game }