
import * as THREE from '../lib/three.module.js'
import { OrbitControls } from '../lib/OrbitControls.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'

/**
 * Materials
 */

//Debug UI
const gui = new dat.GUI()

//Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
//camera
const sizes = {
    width: canvas.offsetWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 1
camera.position.x = 1.5
camera.position.y = 2
scene.add(camera)

const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x112222 })
const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const sideMaterial = new THREE.MeshBasicMaterial({ color: 0xd0f611 })

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

gltfLoader.load(
    './model/phone_s_m_nm.glb',
    (gltf) => {
        const body = gltf.scene.children.find((child) => child.name === 'body')
        const front = gltf.scene.children.find((child) => child.name === 'front')
        const side = gltf.scene.children.find((child) => child.name === 'side')

        body.material = bodyMaterial
        front.material = portalLightMaterial
        side.material = sideMaterial
        // gltf.scene.rotation.z = Math.PI
        // gltf.scene.rotation.y = Math.PI

        // gltf.scene.traverse((child) => {

        // child.rotate.x = 0.5
        // if(child.name == 'side'){
        //     child.material = sideMaterial
        // }else if (child.name == 'body'){
        //     child.material = bodyMaterial
        // }else if (child.name == 'front'){
        //     child.material = frontMaterial
        // }

        // if ( child.material ) child.material.metalness = 0;
        // console.log(child.material)
        //     child.material = bodyMaterial
        // })
        scene.add(gltf.scene)
    }
)

let mixer = null
let air = null
gltfLoader.load(
    './model/day6.glb',
    (gltf) => {
        air = gltf.scene
        gltf.scene.scale.x = .5
        gltf.scene.scale.y = .5
        gltf.scene.scale.z = .5
        gltf.scene.position.y = 3
        scene.add(gltf.scene)

        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])
        action.play()
    }

)
const woodColor = new THREE.TextureLoader(manager).load('./texture/Wood067_1K_Color.jpg')
const woodNormal = new THREE.TextureLoader(manager).load('./texture/Wood067_1K_NormalDX.jpg')
const woodDis = new THREE.TextureLoader(manager).load('./texture/Wood067_1K_Displacement.jpg')
const woodtMaterial = new THREE.MeshBasicMaterial({ 
    map: woodColor,
    normalMap: woodNormal,
    displacementMap: woodDis
})

const chairTexture = new THREE.TextureLoader(manager).load('./texture/chair.jpg');
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
        scene.add(gltf.scene)
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


//object
// const geometry = new THREE.BoxGeometry(2, 2, 2)
// const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, screenMaterial)
// mesh.position.set(3,3,3)

// gui
//     .add(mesh.position, 'y')
//     .min(- 3)
//     .max(3)
//     .step(0.01)
//     .name('elevation')

// scene.add(mesh)

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
renderer.setClearColor(0xffc0cb, 1);
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
    if (air != null) {
        air.position.x = 3 * Math.cos(elapsedTime)
        air.position.z = 3 * Math.sin(elapsedTime)
        air.position.y = Math.sin(elapsedTime * 4)
        air.rotation.y = -elapsedTime
    }

    if (mixer) {
        mixer.update(elapsedTime)
    }
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
