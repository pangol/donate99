
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
    // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
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
const woodtMaterial = new THREE.MeshStandardMaterial({ 
    map: woodColor,
    normalMap: woodNormal,
    roughnessMap: woodRough,
    aoMap: woodAo,
})

const chairTexture = new THREE.TextureLoader(manager).load('./texture/chair_2.jpg');
chairTexture.encoding = THREE.sRGBEncoding;
const chairMaterial = new THREE.MeshStandardMaterial({ map: chairTexture })
const silverMaterial = new THREE.MeshStandardMaterial({ color: 0x82949d })
const monitorMaterial = new THREE.MeshStandardMaterial({ color: 0x9c9c9c })
const outertBoardMaterial = new THREE.MeshStandardMaterial({ color: 0xf1f1f1 })

const video = document.getElementById('video')
video.play()
const videoTexture = new THREE.VideoTexture( video );
videoTexture.flipY = false;
videoTexture.encoding = THREE.sRGBEncoding;
const videoMaterial = new THREE.MeshBasicMaterial({map: videoTexture})

const screen1Texture = new THREE.TextureLoader(manager).load('./texture/appsscript_1.jpg');
screen1Texture.encoding = THREE.sRGBEncoding;
screen1Texture.center.x = 0.5
screen1Texture.center.y = 0.5
const screen1Material = new THREE.MeshBasicMaterial({ map: screen1Texture })

const scene1Objects = []
loadScene1()
function loadScene1(){
    gltfLoader.load(
        './model/scene1.glb',
        (gltf) => {
            const root = gltf.scene
            settingChildMaterial(root, 'outertBoard', outertBoardMaterial)
            settingChildMaterial(root, 'videoScreen', videoMaterial)
            settingChildMaterial(root, 'desk', woodtMaterial)
            settingChildMaterial(root, 'desk2', woodtMaterial)
            settingChildMaterial(root, 'chair_b', chairMaterial)
            settingChildMaterial(root, 'chair_f', chairMaterial)
            settingChildMaterial(root, 'chair_b2', chairMaterial)
            settingChildMaterial(root, 'chair_f2', chairMaterial)
            settingChildMaterial(root, 'silver', silverMaterial)
            settingChildMaterial(root, 'silver2', silverMaterial)
            settingChildMaterial(root, 'monitor', monitorMaterial)
            settingChildMaterial(root, 'com2', monitorMaterial)
           

            cloneObj(root, 'desk', scene1Objects, scene)
            scene.add(root)
            scene1Objects.push(root)
        })
}

function cloneObj(root, name, sceneObjs, scene){
    const obj = root.children.find((child) => child.name === name)
    const clone = obj.clone()
    console.log(clone)
    clone.position.set(-0.5,0.3,1)
    scene.add(clone)
    sceneObjs.push(clone)
}

// let desks = []
// const count_of_desks = 2
// gltfLoader.load(
//     './model/desk_all_m_o.glb',
//     (gltf) => {

//         const root = gltf.scene
//         const mesh_names = ['desk', 'chair_b', 'chair_f', 'silver', 'monitor']
//         const postion_array = [{x:-0.5,y: 0.3,z: 1}, {x:1.2,y:0.7,z:1.1}]
//         settingMaterial(root, mesh_names)

//         desks.push(root)
//         scene.add(root)
//         for(let i = 0 ; i < count_of_desks; i++){
//             const clone = root.clone()
            
//             clone.position.set(postion_array[i].x, postion_array[i].y, postion_array[i].z)
//             settingMaterial(clone, mesh_names)
//             desks.push(clone)
//             scene.add(clone)
//         }

//     }
// )

// function settingMaterial(mesh, mesh_names) {
//     const desk = mesh.children.find((child) => child.name === mesh_names[0])
//     const chair_b = mesh.children.find((child) => child.name === mesh_names[1])
//     const chair_f = mesh.children.find((child) => child.name === mesh_names[2])
//     const silver = mesh.children.find((child) => child.name === mesh_names[3])
//     const monitor = mesh.children.find((child) => child.name === mesh_names[4])
//     desk.material = woodtMaterial
//     chair_b.material = chairMaterial
//     chair_f.material = chairMaterial
//     silver.material = silverMaterial
//     monitor.material = monitorMaterial
// }
// const desks2 = []
// gltfLoader.load(
//     './model/desk_com2.glb',
//     (gltf) => {

//         const root = gltf.scene
//         const mesh_names = ['desk2', 'chair_b2', 'chair_f2', 'silver2', 'com2']
//         const postion_array = [{x:0,y: 0.7,z: 2.5}, {x:-1,y:0.3,z:2}]
//         settingMaterial(root, mesh_names)
//         desks2.push(root)
//         scene.add(root)

//         for(let i = 0; i < count_of_desks; i++){
//             const clone = root.clone()
            
//             clone.position.set(postion_array[i].x, postion_array[i].y, postion_array[i].z)
//             settingMaterial(clone, mesh_names)
//             desks2.push(clone)
//             scene.add(clone)
//         }

//     }
// )
// const video = document.getElementById('video')
// video.play()
// const videoTexture = new THREE.VideoTexture( video );
// videoTexture.flipY = false;
// videoTexture.encoding = THREE.sRGBEncoding;
// const videoMaterial = new THREE.MeshBasicMaterial({map: videoTexture})

// let whiteBoardObject = ""
// gltfLoader.load(
//     './model/whiteBoard.glb',
//     (gltf) => {
//         const root = gltf.scene
//         root.scale.set(.6,.6,.6)
//         root.position.y = .6
//         whiteBoardObject = root
//         const outertBoard = root.children.find((child) => child.name === 'outertBoard')
//         const videoScreen = root.children.find((child) => child.name === 'videoScreen')
//         const outertBoardMaterial = new THREE.MeshBasicMaterial({ color: 0x9c9c9c })
//         outertBoard.material = outertBoardMaterial
//         videoScreen.material = videoMaterial

//         scene.add(root)
//     }
// )

let scene2Object = []
const sceneMoveZindex = 5

const circleMaterial = new THREE.MeshBasicMaterial({ color: 0x7CCAD3 })
const wireMaterial = new THREE.MeshBasicMaterial({ color: 0xfcf400 })
const sDiskMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 })
const witeMaterial = new THREE.MeshBasicMaterial({ color: 0xf0f0f0 })


const s2screenTexture1 = new THREE.TextureLoader(manager).load('./texture/project1.png');
s2screenTexture1.encoding = THREE.sRGBEncoding;
s2screenTexture1.center.x = 0.5
s2screenTexture1.center.y = 0.5
s2screenTexture1.rotation = 3.15
const s2screenMaterial1 = new THREE.MeshBasicMaterial({ map: s2screenTexture1 })

const testTexture = new THREE.TextureLoader(manager).load('./texture/uv-test-bw.png');
testTexture.encoding = THREE.sRGBEncoding;
testTexture.center.x = 0.5
testTexture.center.y = 0.5
// testTexture.rotation = 3.15
const testMaterial = new THREE.MeshBasicMaterial({ map: testTexture })

const screenProject2Texture = new THREE.TextureLoader(manager).load('./texture/project2.png');
screenProject2Texture.encoding = THREE.sRGBEncoding;
screenProject2Texture.center.x = 0.5
screenProject2Texture.center.y = 0.5
// screenProject2Texture.rotation = 3.15
const screenProject2Material = new THREE.MeshBasicMaterial({ map: screenProject2Texture })

const screendBoardTexture = new THREE.TextureLoader(manager).load('./texture/total_project.png');
screendBoardTexture.encoding = THREE.sRGBEncoding;
screendBoardTexture.center.x = 0.5
screendBoardTexture.center.y = 0.5
// screendBoardTexture.rotation = 3.15
const screenBoardMaterial = new THREE.MeshBasicMaterial({ map: screendBoardTexture })


const scene2Floor = new THREE.TextureLoader(manager).load('./texture/Metal_Plate_012_basecolor.jpg')
scene2Floor.encoding = THREE.sRGBEncoding;
scene2Floor.repeat.set(1,1.5)
scene2Floor.wrapT = THREE.RepeatWrapping;
scene2Floor.wrapU = THREE.RepeatWrapping;
const scene2FloorNormal = new THREE.TextureLoader(manager).load('./texture/Metal_Plate_012_normal.jpg')
const scene2FloorRough = new THREE.TextureLoader(manager).load('./texture/Metal_Plate_012_roughness.jpg')
const scene2FloorAo= new THREE.TextureLoader(manager).load('./texture/Metal_Plate_012_ambientOcclusion.jpg')
const scene2FloorMm= new THREE.TextureLoader(manager).load('./texture/Metal_Plate_012_metallic.jpg')
const scene2FloorMaterial = new THREE.MeshStandardMaterial({ 
    map: scene2Floor,
    normalMap: scene2FloorNormal,
    roughnessMap: scene2FloorRough,
    aoMap: scene2FloorAo,
    metalnessMap: scene2FloorMm
})


const scene2mserver = new THREE.TextureLoader(manager).load('./texture/Metal_Plate_013_basecolor.jpg')
scene2mserver.encoding = THREE.sRGBEncoding;
// scene2mserver.repeat.set(1,1.5)
scene2mserver.wrapT = THREE.RepeatWrapping;
scene2mserver.wrapU = THREE.RepeatWrapping;
const scene2mserverNormal = new THREE.TextureLoader(manager).load('./texture/Metal_Plate_013_normal.jpg')
const scene2mserverRough = new THREE.TextureLoader(manager).load('./texture/Metal_Plate_013_roughness.jpg')
const scene2mserverAo= new THREE.TextureLoader(manager).load('./texture/Metal_Plate_013_ambientOcclusion.jpg')
const scene2mserverMm= new THREE.TextureLoader(manager).load('./texture/Metal_Plate_013_metallic.jpg')
const scene2mserverMaterial = new THREE.MeshStandardMaterial({ 
    map: scene2mserver,
    normalMap: scene2mserverNormal,
    roughnessMap: scene2mserverRough,
    aoMap: scene2mserverAo,
    metalnessMap: scene2mserverMm
})

const scene2server = new THREE.TextureLoader(manager).load('./texture/Sci-fi_Pipes_001_basecolor.jpg')
scene2server.encoding = THREE.sRGBEncoding;
scene2server.repeat.set(1.5,1)
scene2server.wrapT = THREE.RepeatWrapping;
scene2server.wrapU = THREE.RepeatWrapping;
const scene2serverNormal = new THREE.TextureLoader(manager).load('./texture/Sci-fi_Pipes_001_normal.jpg')
const scene2serverRough = new THREE.TextureLoader(manager).load('./texture/Sci-fi_Pipes_001_roughness.jpg')
const scene2serverAo= new THREE.TextureLoader(manager).load('./texture/Sci-fi_Pipes_001_ambientOcclusion.jpg')
const scene2serverMm= new THREE.TextureLoader(manager).load('./texture/Sci-fi_Pipes_001_metallic.jpg')
const scene2serverMaterial = new THREE.MeshStandardMaterial({ 
    map: scene2server,
    normalMap: scene2serverNormal,
    roughnessMap: scene2serverRough,
    aoMap: scene2serverAo,
    metalnessMap: scene2serverMm
})


let wireObjs
loadScene2()
function loadScene2(){
    gltfLoader.load(
        './model/scend2_desk_mserver_screen_server_wire.glb',
        (gltf) => {
            const root = gltf.scene
            root.position.set(0,0, sceneMoveZindex * -1)

            const s2Desk = root.children.find((child) => child.name === 'sDesk')
            s2Desk.material = sideMaterial
            changeCircleMaterial(root, circleMaterial)
            
            settingChildMaterial(root, 'sMonitor1', witeMaterial)
            settingChildMaterial(root, 'sMonitor2', witeMaterial)
            settingChildMaterial(root, 'sScreen2', s2screenMaterial1)
            settingChildMaterial(root, 'projectBoard', witeMaterial)
            settingChildMaterial(root, 'sScreen1', screenProject2Material)
            
            settingChildMaterial(root, 'sDisk1', scene2mserverMaterial)
            settingChildMaterial(root, 'sDisk2', scene2mserverMaterial)
            settingChildMaterial(root, 'sDisk3', scene2mserverMaterial)
            settingChildMaterial(root, 'sDisk4', scene2mserverMaterial)
            settingChildMaterial(root, 'sDisk5', scene2mserverMaterial)
            settingChildMaterial(root, 'sScreenBoard', screenBoardMaterial)
            settingChildMaterial(root, 'serverOut', scene2serverMaterial)
            settingChildMaterial(root, 'serverIn', scene2mserverMaterial)
            settingChildMaterial(root, 'circleServer', circleMaterial)
            settingChildMaterial(root, 'circleServer1', circleMaterial)
            settingChildMaterial(root, 'circleServer2', circleMaterial)
            settingChildMaterial(root, 'circleServer3', circleMaterial)
    
            const wireRe = /wire*/
            wireObjs = root.children.filter( child => wireRe.test(child.name))
            settingWireMaterial(wireObjs, wireMaterial, circleMaterial)
            scene.add(root)
            scene2Object.push(root)
        }
    )
}

function settingWireMaterial(objs, firstMaterial, secondMaterial){
 objs.forEach( (obj, i) => {
     if(i % 2 == 0){
         obj.material = firstMaterial
     }else{
         obj.material = secondMaterial
     }
 })
}


let mixer
gltfLoader.load(
    './model/readyPlay_c_r.glb',
    (gltf) => {
        const root = gltf.scene
        const clips = gltf.animations;
        // console.log(clips)
        root.scale.set(.6,.6,.6)
        root.rotation.y = Math.PI
        scene.add(root)

        mixer = new THREE.AnimationMixer( root );
        const action = mixer.clipAction( clips[ 0 ] ); // access first animation clip
        action.play();
    }
)

function settingChildMaterial(root, objName, material){
    const obj= root.children.find((child) => child.name === objName)
    obj.material = material
}

function changeCircleMaterial(root, colorMaterial){
    const circles = []
    circles.push(root.children.find((child) => child.name === 'circleBtn1'))
    circles.push(root.children.find((child) => child.name === 'circleBtn2'))
    circles.push(root.children.find((child) => child.name === 'circleBtn3'))
    circles.push(root.children.find((child) => child.name === 'circleBtn4'))
    circles.push(root.children.find((child) => child.name === 'circleBtn5'))
    circles.push(root.children.find((child) => child.name === 'circleServer'))
    circles.push(root.children.find((child) => child.name === 'circleServer1'))
    circles.push(root.children.find((child) => child.name === 'circleServer2'))
    circles.push(root.children.find((child) => child.name === 'circleServer3'))
    circles.forEach(circle => circle.material = colorMaterial)
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
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime()
    // desks.forEach((desk, i) => {
    //     if(i == 1 ){
    //         rotateDestAll(desk, elapsedTime)
    //     }else if(i == 2){
    //         rotateDesksin(desk, elapsedTime)
    //     }else if(i == 3) {
    //         rotateDeskRight(desk, elapsedTime)
    //     }
    // })
    // desks2.forEach((desk,i) => {
    //     if(i == 1){
    //         rotateDesk2Left(desk, elapsedTime)
    //     }else if (i == 2){
    //         rotateDesk2Right(desk, elapsedTime)
    //     }
    // })

    //animate scene2
    if(scene2Object.length > 0){
        const scene2root = scene2Object[0]
        if(Math.sin(elapsedTime*4) > 0){
            changeCircleMaterial(scene2root, circleMaterial)
            settingWireMaterial(wireObjs, wireMaterial, circleMaterial)
        }else{
            changeCircleMaterial(scene2root, sDiskMaterial)
            settingWireMaterial(wireObjs, circleMaterial, wireMaterial)

        }
    }
    if ( mixer ) mixer.update( delta );
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
        frontObj.material = scene2FloorMaterial
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
    //change Scene1
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
