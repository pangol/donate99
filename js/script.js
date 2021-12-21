
// import * as THREE from '../lib/three.module.js'
import { OrbitControls } from '../lib/OrbitControls.js'
import { scene1Obj, THREE, manager, gltfLoader, scene } from './SceneEnv.js'

//Debug UI
const gui = new dat.GUI()

//get Element
const canvas = document.querySelector('canvas.webgl')
const nextSceneBtn = document.querySelector('#nextSceneBtn')
const beForeSceneBtn = document.querySelector('#beforeSceneBtn')
let sceneState = 0


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
const frontAo = new THREE.TextureLoader(manager).load('./texture/Wood_Barrel_Top_001_ambientOcclusion.jpg')
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

scene1Obj.makingMaterial()
scene1Obj.mappingMaterial()
// const sceneObjects = []
scene1Obj.loadScene()

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
scene2Floor.repeat.set(1, 1.5)
scene2Floor.wrapT = THREE.RepeatWrapping;
scene2Floor.wrapU = THREE.RepeatWrapping;
const scene2FloorNormal = new THREE.TextureLoader(manager).load('./texture/Metal_Plate_012_normal.jpg')
const scene2FloorRough = new THREE.TextureLoader(manager).load('./texture/Metal_Plate_012_roughness.jpg')
const scene2FloorAo = new THREE.TextureLoader(manager).load('./texture/Metal_Plate_012_ambientOcclusion.jpg')
const scene2FloorMm = new THREE.TextureLoader(manager).load('./texture/Metal_Plate_012_metallic.jpg')
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
const scene2mserverAo = new THREE.TextureLoader(manager).load('./texture/Metal_Plate_013_ambientOcclusion.jpg')
const scene2mserverMm = new THREE.TextureLoader(manager).load('./texture/Metal_Plate_013_metallic.jpg')
const scene2mserverMaterial = new THREE.MeshStandardMaterial({
    map: scene2mserver,
    normalMap: scene2mserverNormal,
    roughnessMap: scene2mserverRough,
    aoMap: scene2mserverAo,
    metalnessMap: scene2mserverMm
})

const scene2server = new THREE.TextureLoader(manager).load('./texture/Sci-fi_Pipes_001_basecolor.jpg')
scene2server.encoding = THREE.sRGBEncoding;
scene2server.repeat.set(1.5, 1)
scene2server.wrapT = THREE.RepeatWrapping;
scene2server.wrapU = THREE.RepeatWrapping;
const scene2serverNormal = new THREE.TextureLoader(manager).load('./texture/Sci-fi_Pipes_001_normal.jpg')
const scene2serverRough = new THREE.TextureLoader(manager).load('./texture/Sci-fi_Pipes_001_roughness.jpg')
const scene2serverAo = new THREE.TextureLoader(manager).load('./texture/Sci-fi_Pipes_001_ambientOcclusion.jpg')
const scene2serverMm = new THREE.TextureLoader(manager).load('./texture/Sci-fi_Pipes_001_metallic.jpg')
const scene2serverMaterial = new THREE.MeshStandardMaterial({
    map: scene2server,
    normalMap: scene2serverNormal,
    roughnessMap: scene2serverRough,
    aoMap: scene2serverAo,
    metalnessMap: scene2serverMm
})


let wireObjs
loadScene2()
function loadScene2() {
    gltfLoader.load(
        './model/scend2_desk_mserver_screen_server_wire.glb',
        (gltf) => {
            const root = gltf.scene
            root.position.set(0, 0, sceneMoveZindex * -1)

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
            wireObjs = root.children.filter(child => wireRe.test(child.name))
            settingWireMaterial(wireObjs, wireMaterial, circleMaterial)
            scene.add(root)
            scene2Object.push(root)
        }
    )
}

function settingWireMaterial(objs, firstMaterial, secondMaterial) {
    objs.forEach((obj, i) => {
        if (i % 2 == 0) {
            obj.material = firstMaterial
        } else {
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
        root.scale.set(.6, .6, .6)
        root.rotation.y = Math.PI
        scene.add(root)

        mixer = new THREE.AnimationMixer(root);
        const action = mixer.clipAction(clips[0]); // access first animation clip
        action.play();
    }
)

function settingChildMaterial(root, objName, material) {
    const obj = root.children.find((child) => child.name === objName)
    obj.material = material
}

function changeCircleMaterial(root, colorMaterial) {
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
    canvas.style.width = window.innerWidth * 70 / 100
    sizes.width = window.innerWidth * 70 / 100
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

    const deskGroup1 = scene1Obj['groups'].find(group => group.name === 'desk1')
    if (Object.keys(deskGroup1).includes('cloneobjs')) {
        deskGroup1['cloneobjs'].forEach((desk, i) => {
            scene1Obj.cloneAnimate(desk, elapsedTime, deskGroup1['cloneAnimationSpeed'][i], true)
        })
    }
    const deskGroup2 = scene1Obj['groups'].find(group => group.name === 'desk2')
    if (Object.keys(deskGroup2).includes('cloneobjs')) {
        deskGroup2['cloneobjs'].forEach((desk, i) => {
            scene1Obj.cloneAnimate(desk, elapsedTime, deskGroup2['cloneAnimationSpeed'][i], false)
        })
    }

    //animate scene2
    if (scene2Object.length > 0) {
        const scene2root = scene2Object[0]
        if (Math.sin(elapsedTime * 4) > 0) {
            changeCircleMaterial(scene2root, circleMaterial)
            settingWireMaterial(wireObjs, wireMaterial, circleMaterial)
        } else {
            changeCircleMaterial(scene2root, sDiskMaterial)
            settingWireMaterial(wireObjs, circleMaterial, wireMaterial)

        }
    }
    if (mixer) mixer.update(delta);
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

nextSceneBtn.addEventListener('click', function (event) {

    const lastState = 1
    if (sceneState != lastState) {
        sceneState++
        changebgColor(sceneState)
        changeSceneOnePosition('next')
    } else {
        sceneState = 0
    }

})

beforeSceneBtn.addEventListener('click', function (event) {
    sceneState--
    changebgColor(sceneState)
    changeSceneOnePosition('before')
})

function changebgColor(state) {
    const duration = 2
    if (state == 1) {
        gsap.to('#info', { duration: duration, delay: 0, backgroundColor: '#64c1cb' })
        gsap.to('.webgl', { duration: duration, delay: 0, backgroundImage: 'linear-gradient(to right, rgba(100, 192, 203, 1) 40%, rgba(100, 192, 203, .8))' })
        gsap.to('.header', { duration: duration, delay: 0, boxShadow: '10px 10px rgb(100 192 203 / 90%)' })
        frontObj.material = scene2FloorMaterial
    } else {
        gsap.to('#info', { duration: duration, delay: 0, backgroundColor: '#ffc0cb' })
        gsap.to('.webgl', { duration: duration, delay: 0, backgroundImage: 'linear-gradient(to right,#ffc0cb 40%, rgba(255, 192, 203, .8))' })
        gsap.to('.header', { duration: duration, delay: 0, boxShadow: '10px 10px rgb(255 192 203 / 90%)' })
        frontObj.material = frontMaterial
    }
}

function changeSceneOnePosition(direction) {
    let zIndex = sceneMoveZindex
    const duration = 2
    if (direction != 'next') {
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

tick()
