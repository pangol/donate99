// import * as THREE from '../lib/three.module.js'
import { OrbitControls } from '../lib/OrbitControls.js'
import { 
    scene1Obj, scene2Obj, THREE, manager, gltfLoader, scene,
    sceneMoveZindex
} from './SceneEnv.js'

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

scene1Obj.makingMaterials()
scene1Obj.mappingMaterial()
scene1Obj.loadScene()

scene2Obj.makingMaterials()
scene2Obj.mappingMaterial()
scene2Obj.loadScene()

const testTexture = new THREE.TextureLoader(manager).load('./texture/uv-test-bw.png');
testTexture.encoding = THREE.sRGBEncoding;
testTexture.center.x = 0.5
testTexture.center.y = 0.5
const testMaterial = new THREE.MeshBasicMaterial({ map: testTexture })

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
    if (scene2Obj.root.children.length > 0) {
        const circleMaterial = scene2Obj.materials.find( material => material.name === 'circle').obj
        const sDiskMaterial = scene2Obj.materials.find( material => material.name === 'sDisk').obj
        const wireMaterial = scene2Obj.materials.find( material => material.name === 'wire').obj
        
        if (Math.sin(elapsedTime * 4) > 0) {
            scene2Obj.changeCircleMaterial(circleMaterial)
            scene2Obj.settingWireMaterial(scene2Obj.gettingWireObjs(), wireMaterial, circleMaterial)
        } else {
            scene2Obj.changeCircleMaterial(sDiskMaterial)
            scene2Obj.settingWireMaterial(scene2Obj.gettingWireObjs(), circleMaterial, wireMaterial)
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
        sceneState = 1
    }
})

beforeSceneBtn.addEventListener('click', function (event) {
    const firstState = 0
    if (sceneState != firstState){
        sceneState--
        changebgColor(sceneState)
        changeSceneOnePosition('before')
    }else{
        sceneState = 0
    }
   
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
    gsap.to(scene1Obj.root.position, { duration: duration, delay: 0, z: scene1Obj.root.position.z + zIndex })
    gsap.to(scene2Obj.root.position, { duration: duration, delay: 0, z: scene2Obj.root.position.z + zIndex })
}

tick()
