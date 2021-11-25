
import * as THREE from '../lib/three.module.js'
import { OrbitControls } from '../lib/OrbitControls.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'

/**
 * Materials
 */

//Debug UI
const gui = new dat.GUI()

//get Element
const canvas = document.querySelector('canvas.webgl')
const nextSceneBtn = document.querySelector('#nextSceneBtn')
const beForeSceneBtn = document.querySelector('#beforeSceneBtn')
let sceneState = 0

// Scene
const scene = new THREE.Scene()
//camera
const sizes = {
    width: canvas.offsetWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 1
camera.position.x = 2
camera.position.y = 3
scene.add(camera)

// Loading Manager
const manager = new THREE.LoadingManager();
const loadingDom = document.getElementById('loading')


manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};
manager.onLoad = function () {
    loadingDom.style.display = 'none'
    console.log('Loading complete!')
};
manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    loadingDom.style.width = (itemsLoaded / itemsTotal) * 70 + '%'
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};
manager.onError = function (url) {
    console.log('There was an error loading ' + url);
};

const gltfLoader = new GLTFLoader(manager)

const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xAEE1CD })

const sideColor = new THREE.TextureLoader(manager).load('./texture/Plastic006_1K_Color.jpg')
const sideNormal = new THREE.TextureLoader(manager).load('./texture/Plastic006_1K_NormalDX.jpg')
const sideDis = new THREE.TextureLoader(manager).load('./texture/Plastic006_1K_Displacement.jpg')
const sideRough = new THREE.TextureLoader(manager).load('./texture/Plastic006_1K_Roughness.jpg')
const sideMaterial = new THREE.MeshBasicMaterial({ 
    map: sideColor,
    normalMap: sideNormal,
    displacementMap: sideDis,
    roughnessMap: sideRough,
})

const frontColor = new THREE.TextureLoader(manager).load('./texture/Wood_Barrel_Top_001_basecolor.jpg')
frontColor.encoding = THREE.sRGBEncoding;

const frontNormal = new THREE.TextureLoader(manager).load('./texture/Wood_Barrel_Top_001_normal.jpg')
const frontDis = new THREE.TextureLoader(manager).load('./texture/Wood_Barrel_Top_001_height.png')
const frontRough = new THREE.TextureLoader(manager).load('./texture/Wood_Barrel_Top_001_roughness.jpg')
const frontAo= new THREE.TextureLoader(manager).load('./texture/Wood_Barrel_Top_001_ambientOcclusion.jpg')
const frontMaterial = new THREE.MeshBasicMaterial({ 
    map: frontColor,
    normalMap: frontNormal,
    displacementMap: frontDis,
    roughnessMap: frontRough,
    aoMap: frontAo,
})


let frontObj
gltfLoader.load(
    './model/phone_s_m_nm.glb',
    (gltf) => {
        const root = gltf.scene
        const body = root.children.find((child) => child.name === 'body')
        const front = root.children.find((child) => child.name === 'front')
        const side = root.children.find((child) => child.name === 'side')

        body.material = sideMaterial
        front.material = frontMaterial
        side.material = bodyMaterial
       
        frontObj = front
        scene.add(root)
    }
)

const woodColor = new THREE.TextureLoader(manager).load('./texture/Wood_Barrel_Top_001_basecolor.jpg')

const woodNormal = new THREE.TextureLoader(manager).load('./texture/Wood_Barrel_Top_001_normal.jpg')
const woodDis = new THREE.TextureLoader(manager).load('./texture/Wood_Barrel_Top_001_height.png')
const woodRough = new THREE.TextureLoader(manager).load('./texture/Wood_Barrel_Top_001_roughness.jpg')
const woodAo= new THREE.TextureLoader(manager).load('./texture/Wood_Barrel_Top_001_ambientOcclusion.jpg')
const woodtMaterial = new THREE.MeshBasicMaterial({ 
    map: woodColor,
    normalMap: woodNormal,
    displacementMap: woodDis,
    roughnessMap: woodRough,
    aoMap: woodAo,
})

const chairTexture = new THREE.TextureLoader(manager).load('./texture/chair_2.jpg');
chairTexture.encoding = THREE.sRGBEncoding;
const chairMaterial = new THREE.MeshBasicMaterial({ map: chairTexture })
const silverMaterial = new THREE.MeshBasicMaterial({ color: 0x82949d })
const monitorMaterial = new THREE.MeshBasicMaterial({ color: 0x9c9c9c })

let desks = []
const count_of_desks = 2
gltfLoader.load(
    './model/desk_all_m_o.glb',
    (gltf) => {

        const root = gltf.scene
        const mesh_names = ['desk', 'chair_b', 'chair_f', 'silver', 'monitor']
        const postion_array = [{x:-0.5,y: 0.3,z: 1}, {x:1.2,y:0.7,z:1.1}]
        settingMaterial(root, mesh_names)

        desks.push(root)
        scene.add(root)
        for(let i = 0 ; i < count_of_desks; i++){
            const clone = root.clone()
            
            clone.position.set(postion_array[i].x, postion_array[i].y, postion_array[i].z)
            settingMaterial(clone, mesh_names)
            desks.push(clone)
            scene.add(clone)
        }

    }
)

function settingMaterial(mesh, mesh_names) {
    const desk = mesh.children.find((child) => child.name === mesh_names[0])
    const chair_b = mesh.children.find((child) => child.name === mesh_names[1])
    const chair_f = mesh.children.find((child) => child.name === mesh_names[2])
    const silver = mesh.children.find((child) => child.name === mesh_names[3])
    const monitor = mesh.children.find((child) => child.name === mesh_names[4])
    desk.material = woodtMaterial
    chair_b.material = chairMaterial
    chair_f.material = chairMaterial
    silver.material = silverMaterial
    monitor.material = monitorMaterial
}
const desks2 = []
gltfLoader.load(
    './model/desk_com2.glb',
    (gltf) => {

        const root = gltf.scene
        const mesh_names = ['desk2', 'chair_b2', 'chair_f2', 'silver2', 'com2']
        const postion_array = [{x:0,y: 0.7,z: 2.5}, {x:-1,y:0.3,z:2}]
        settingMaterial(root, mesh_names)
        desks2.push(root)
        scene.add(root)

        for(let i = 0; i < count_of_desks; i++){
            const clone = root.clone()
            
            clone.position.set(postion_array[i].x, postion_array[i].y, postion_array[i].z)
            settingMaterial(clone, mesh_names)
            desks2.push(clone)
            scene.add(clone)
        }

    }
)
const video = document.getElementById('video')
video.play()
const videoTexture = new THREE.VideoTexture( video );
videoTexture.flipY = false;
videoTexture.encoding = THREE.sRGBEncoding;
const videoMaterial = new THREE.MeshBasicMaterial({map: videoTexture})

let whiteBoardObject = ""
gltfLoader.load(
    './model/whiteBoard.glb',
    (gltf) => {
        const root = gltf.scene
        root.scale.set(.6,.6,.6)
        root.position.y = .6
        whiteBoardObject = root
        const outertBoard = root.children.find((child) => child.name === 'outertBoard')
        const videoScreen = root.children.find((child) => child.name === 'videoScreen')
        const outertBoardMaterial = new THREE.MeshBasicMaterial({ color: 0x9c9c9c })
        outertBoard.material = outertBoardMaterial
        videoScreen.material = videoMaterial

        scene.add(root)
    }
)

let scene2Object = []
const sceneMoveZindex = 5
loadScene2()
function loadScene2(){
    gltfLoader.load(
        './model/sDesk.glb',
        (gltf) => {
            const root = gltf.scene
            root.position.set(0,0, sceneMoveZindex * -1)
            root.traverse( child => {
                child.material = sideMaterial
            })
            // root.scale.set(.6,.6,.6)
            // root.position.y = .6
            // whiteBoardObject = root
            // const outertBoard = root.children.find((child) => child.name === 'outertBoard')
            // const videoScreen = root.children.find((child) => child.name === 'videoScreen')
            // const outertBoardMaterial = new THREE.MeshBasicMaterial({ color: 0x9c9c9c })
            // outertBoard.material = outertBoardMaterial
            // videoScreen.material = videoMaterial
    
            scene.add(root)
            scene2Object.push(root)
        }
    )
}


//Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
gui.add(ambientLight, 'intensity').min(0).max(5).step(0.001)
scene.add(ambientLight)

//controls
const controls = new OrbitControls(camera, canvas)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.setClearColor(0xffc0cb, 1);
renderer.outputEncoding = THREE.sRGBEncoding
//resize
window.addEventListener('resize', () => {
    const canvas = document.querySelector('canvas.webgl')
    canvas.style.width = window.innerWidth  * 70/100
    sizes.width = window.innerWidth * 70/100
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    desks.forEach((desk, i) => {
        if(i == 1 ){
            rotateDestAll(desk, elapsedTime)
        }else if(i == 2){
            rotateDesksin(desk, elapsedTime)
        }else if(i == 3) {
            rotateDeskRight(desk, elapsedTime)
        }
    })
    desks2.forEach((desk,i) => {
        if(i == 1){
            rotateDesk2Left(desk, elapsedTime)
        }else if (i == 2){
            rotateDesk2Right(desk, elapsedTime)
        }
    })
    
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

nextSceneBtn.addEventListener('click', function(event){

    const lastState = 1
    if (sceneState != lastState){
        sceneState++
        changebgColor(sceneState)
        changeSceneOnePosition('next')
    } else {
        sceneState = 0
    }
    
})

beforeSceneBtn.addEventListener('click', function(event){
    sceneState--
    changebgColor(sceneState)
    changeSceneOnePosition('before')
})

function changebgColor(state){
    const duration = 2
    if(state == 1){
        gsap.to('#info', {duration: duration, delay:0, backgroundColor: '#64c1cb'})
        gsap.to('.webgl', { duration: duration, delay:0, backgroundImage:'linear-gradient(to right, rgba(100, 192, 203, 1) 40%, rgba(100, 192, 203, .8))'})
        gsap.to('.header', { duration: duration, delay:0, boxShadow:'10px 10px rgb(100 192 203 / 90%)'})
        frontObj.material = woodtMaterial
    }else{
        gsap.to('#info', {duration: duration, delay:0, backgroundColor: '#ffc0cb'})
        gsap.to('.webgl', { duration: duration, delay:0, backgroundImage:'linear-gradient(to right,#ffc0cb 40%, rgba(255, 192, 203, .8))'})
        gsap.to('.header', { duration: duration, delay:0, boxShadow:'10px 10px rgb(255 192 203 / 90%)'})
        frontObj.material = frontMaterial
    }
}

function changeSceneOnePosition(direction){
    let zIndex = sceneMoveZindex
    const duration = 2
    if(direction != 'next'){
        zIndex *= -1
    }
    desks.forEach(desk => {
        gsap.to(desk.position, { duration: duration, delay: 0, z: desk.position.z + zIndex })
    })
    desks2.forEach(desk => {
        gsap.to(desk.position, { duration: duration, delay: 0, z: desk.position.z + zIndex })
    })
    gsap.to(whiteBoardObject.position, { duration: duration, delay: 0, z: whiteBoardObject.position.z + zIndex })

    //change Scene2
    scene2Object.forEach(obj => {
        gsap.to(obj.position, { duration: duration, delay: 0, z: obj.position.z + zIndex })
    })
}


function rotateDesk2Right(desk, elapsedTime) {
    const deskO = desk.getObjectByName('desk2')
    const monitor = desk.getObjectByName('com2')
    const chair_b = desk.getObjectByName('chair_b2')
    const chair_f = desk.getObjectByName('chair_f2')
    const silver = desk.getObjectByName('silver2')
    const screen = desk.getObjectByName('screen2')
    deskO.rotation.y = elapsedTime
    monitor.rotation.y = elapsedTime
    chair_b.rotation.y = elapsedTime
    chair_f.rotation.y = elapsedTime
    silver.rotation.y = elapsedTime
    screen.rotation.y = elapsedTime
}

function rotateDeskRight(desk, elapsedTime) {
    const deskO = desk.getObjectByName('desk')
    const monitor = desk.getObjectByName('monitor')
    const chair_b = desk.getObjectByName('chair_b')
    const chair_f = desk.getObjectByName('chair_f')
    const silver = desk.getObjectByName('silver')
    const screen = desk.getObjectByName('screen')
    deskO.rotation.y = elapsedTime
    monitor.rotation.y = elapsedTime
    chair_b.rotation.y = elapsedTime
    chair_f.rotation.y = elapsedTime
    silver.rotation.y = elapsedTime
    screen.rotation.y = -elapsedTime
}

function rotateDesksin(desk, elapsedTime) {
    const period = 4
    const width = 8
    const deskO = desk.getObjectByName('desk')
    const monitor = desk.getObjectByName('monitor')
    const chair_b = desk.getObjectByName('chair_b')
    const chair_f = desk.getObjectByName('chair_f')
    const silver = desk.getObjectByName('silver')
    const screen = desk.getObjectByName('screen')
    deskO.rotation.z = ( Math.sin(elapsedTime * period) / width ) + Math.PI
    monitor.rotation.z = ( Math.sin(elapsedTime * period) / width )
    chair_b.rotation.z = ( Math.sin(elapsedTime * period) / width )
    chair_f.rotation.z = ( Math.sin(elapsedTime * period) / width )
    silver.rotation.z = ( Math.sin(elapsedTime * period) / width ) + Math.PI
    screen.rotation.z = -( Math.sin(elapsedTime * period) / width )
}

function rotateDesk2Left(desk, elapsedTime) {
    const deskO = desk.getObjectByName('desk2')
    const comO = desk.getObjectByName('com2')
    const chair_b = desk.getObjectByName('chair_b2')
    const chair_f = desk.getObjectByName('chair_f2')
    const silver = desk.getObjectByName('silver2')
    const screen = desk.getObjectByName('screen2')
    deskO.rotation.y = -elapsedTime
    comO.rotation.y = -elapsedTime
    chair_b.rotation.y = -elapsedTime
    chair_f.rotation.y = -elapsedTime
    silver.rotation.y = -elapsedTime
    screen.rotation.y = -elapsedTime
}

function rotateDestAll(desk, elapsedTime) {
    const deskO = desk.getObjectByName('desk')
    const monitor = desk.getObjectByName('monitor')
    const chair_b = desk.getObjectByName('chair_b')
    const chair_f = desk.getObjectByName('chair_f')
    const silver = desk.getObjectByName('silver')
    const screen = desk.getObjectByName('screen')
    deskO.rotation.x = elapsedTime
    monitor.rotation.x = elapsedTime
    chair_b.rotation.x = elapsedTime
    chair_f.rotation.x = elapsedTime
    silver.rotation.x = elapsedTime
    screen.rotation.x = elapsedTime + Math.PI
}

tick()
