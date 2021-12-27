import * as THREE from '../lib/three.module.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'
import { OrbitControls } from '../lib/OrbitControls.js'
import { MaterialObj, VideoMaterialObj, BasicMaterialObj, StandardMaterialObj } from './MaterialObj.js'

class Game {
    constructor(canvasID, sceneMoveZindex, materials) {
        this.scene = new THREE.Scene()
        this.manager = new THREE.LoadingManager()
        this.gltfLoader = new GLTFLoader(this.manager)
        this.canvas = document.querySelector(canvasID)
        this.sizes = {
            width: this.canvas.offsetWidth,
            height: window.innerHeight
        }
        this.materials = materials
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
    makingMaterialObjs() {
        this.materials.forEach(material => {
            material.type.makingMaterial(material)
        })
    }
    init() {
        this.settingAddCamera()
        this.settingLights()
        this.settingLoadingManger()
        this.settingControl()
        this.settingRenderer()
        this.settingResize()
        this.makingMaterialObjs()
    }
}

const materialDatas = [
    {
        name: 'wood',
        encoding: false,
        type: StandardMaterialObj,
        textures: [
            { map: 'map', filepath: './texture/Wood_Barrel_Top_001_basecolor.jpg' },
            { map: 'normalMap', filepath: './texture/Wood_Barrel_Top_001_normal.jpg' },
            { map: 'heightMap', filepath: './texture/Wood_Barrel_Top_001_height.png' },
            { map: 'roughnessMap', filepath: './texture/Wood_Barrel_Top_001_roughness.jpg' },
            { map: 'aoMap', filepath: './texture/Wood_Barrel_Top_001_ambientOcclusion.jpg' }
        ],
    },
    {
        name: 'chair',
        encoding: THREE.sRGBEncoding,
        type: BasicMaterialObj,
        textures: [
            './texture/chair_2.jpg'
        ]
    }, {
        name: 'silver',
        encoding: false,
        type: MaterialObj,
        textures: [
            0x82949d
        ],
    }, {
        name: 'monitor',
        encoding: false,
        type: MaterialObj,
        textures: [
            0x9c9c9c
        ],
    }, {
        name: 'outBoarder',
        encoding: false,
        type: MaterialObj,
        textures: [
            0xf1f1f1
        ],
    }, {
        name: 'video',
        video: 'video',
        type: VideoMaterialObj,
        encoding: THREE.sRGBEncoding,
    },
    {
        name:'side',
        encoding:false,
        type:StandardMaterialObj,
        textures: [
            { map: 'map', filepath: './texture/Plastic006_1K_Color.jpg' },
            { map: 'normalMap', filepath: './texture/Plastic006_1K_NormalDX.jpg' },
            { map: 'metalnessMap', filepath: './texture/Plastic006_1K_Roughness.jpg' }
        ],
    },
    {
        name: 'white',
        encoding: false,
        type: MaterialObj,
        textures: [
            0xf0f0f0
        ],
    },
    {
        name: 'circle',
        encoding: false,
        type: MaterialObj,
        textures: [
            0x7CCAD3
        ],
    },
    {
        name: 'wire',
        encoding: false,
        type: MaterialObj,
        textures: [
            0xfcf400
        ],
    },
    {
        name: 'sDisk',
        encoding: false,
        type: MaterialObj,
        textures: [
            0xffff00
        ],
    },
    {
        name: 's2screen',
        encoding: THREE.sRGBEncoding,
        type: BasicMaterialObj,
        center: [0.5, 0.5],
        rotation: 3.15,
        textures: [
            './texture/project1.png'
        ],
    },
    {
        name: 'screenProject2',
        encoding: THREE.sRGBEncoding,
        type: BasicMaterialObj,
        center: [0.5, 0.5],
        textures: [
            './texture/project2.png'
        ],
    },
    {
        name: 'sScreenBoard',
        encoding: THREE.sRGBEncoding,
        type: BasicMaterialObj,
        center: [0.5, 0.5],
        textures: [
            './texture/total_project.png'
        ],
    },
    {
        name: 'scene2mserver',
        encoding: THREE.sRGBEncoding,
        type: StandardMaterialObj,
        wrapping: true,
        textures: [
            { map: 'map', filepath: './texture/Metal_Plate_013_basecolor.jpg' },
            { map: 'normalMap', filepath: './texture/Metal_Plate_013_normal.jpg' },
            // {map: 'height', filepath: './texture/Metal_Plate_013_height.png'},
            { map: 'roughnessMap', filepath: './texture/Metal_Plate_013_roughness.jpg' },
            { map: 'aoMap', filepath: './texture/Metal_Plate_013_ambientOcclusion.jpg' },
            { map: 'metalnessMap', filepath: './texture/Metal_Plate_013_metallic.jpg' }
        ],
    },
    {
        name: 'scene2server',
        encoding: THREE.sRGBEncoding,
        type: StandardMaterialObj,
        repeat: [1.5, 1],
        wrapping: true,
        textures: [
            { map: 'map', filepath: './texture/Sci-fi_Pipes_001_basecolor.jpg' },
            { map: 'normalMap', filepath: './texture/Sci-fi_Pipes_001_normal.jpg' },
            { map: 'roughnessMap', filepath: './texture/Sci-fi_Pipes_001_roughness.jpg' },
            { map: 'aoMap', filepath: './texture/Sci-fi_Pipes_001_ambientOcclusion.jpg' },
            { map: 'metalnessMap', filepath: './texture/Sci-fi_Pipes_001_metallic.jpg' },
        ],
    },
    {
        name: 'body',
        encoding:false,
        type:StandardMaterialObj,
        textures: [
            { map: 'map', filepath: './texture/Plastic006_1K_Color.jpg' },
            { map: 'normalMap', filepath: './texture/Plastic006_1K_NormalDX.jpg' },
            { map: 'metalnessMap', filepath: './texture/Plastic006_1K_Roughness.jpg' }
        ]
    },{
        name: 'front',
        encoding: THREE.sRGBEncoding,
        type:StandardMaterialObj,
        textures: [
            { map: 'map', filepath: './texture/Wood_Barrel_Top_001_basecolor.jpg' },
            { map: 'normalMap', filepath: './texture/Wood_Barrel_Top_001_normal.jpg' },
            { map: 'heightMap', filepath: './texture/Wood_Barrel_Top_001_height.png' },
            { map: 'roughnessMap', filepath: './texture/Wood_Barrel_Top_001_roughness.jpg' },
            { map: 'aoMap', filepath: './texture/Wood_Barrel_Top_001_ambientOcclusion.jpg' }
        ],
    },{
        name: 'scene2Floor',
        encoding: THREE.sRGBEncoding,
        type: StandardMaterialObj,
        wrapping:true,
        repeat:[1,1.5],
        textures:[
            { map: 'map', filepath: './texture/Metal_Plate_012_basecolor.jpg' },
            { map: 'normalMap', filepath: './texture/Metal_Plate_012_normal.jpg' },
            // { map: 'heightMap', filepath: './texture/Wood_Barrel_Top_001_height.png' },
            { map: 'roughnessMap', filepath: './texture/Metal_Plate_012_roughness.jpg' },
            { map: 'aoMap', filepath: './texture/Metal_Plate_012_ambientOcclusion.jpg' },
            { map: 'metalnessMap', filepath: './texture/Metal_Plate_012_metallic.jpg' }
        ]
    },
]

const game = new Game('canvas.webgl', 5, materialDatas)
game.init()

export { THREE, game }