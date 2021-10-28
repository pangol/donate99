
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
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 5
camera.position.x = 3
camera.position.y = 3

scene.add(camera)

const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x112222 })
const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const sideMaterial = new THREE.MeshBasicMaterial({ color: 0xd0f611 })

const baked = new THREE.TextureLoader().load('./texture/baked.jpg');
baked.flipY = false
baked.encoding = THREE.sRGBEncoding
const bakedMaterial = new THREE.MeshBasicMaterial({ map: baked })

const side = new THREE.TextureLoader().load('./texture/side.jpg');
side.flipY = false
side.encoding = THREE.sRGBEncoding
const sidetMaterial = new THREE.MeshBasicMaterial({ map: side })

const lightbaked = new THREE.TextureLoader().load('./texture/light_baked.jpg');
lightbaked.flipY = false
lightbaked.encoding = THREE.sRGBEncoding
const lightbakedMaterial = new THREE.MeshBasicMaterial({ map: lightbaked })


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
    loadingDom.style.width = (itemsLoaded / itemsTotal) * 100 + '%'
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
const woodMaterial = new THREE.MeshBasicMaterial({ color: 0x8d6142 })
const woodTexture = new THREE.TextureLoader(manager).load('./texture/wood.jpg');
const woodtMaterial = new THREE.MeshBasicMaterial({ map: woodTexture })

const chairTexture = new THREE.TextureLoader(manager).load('./texture/chair.jpg');
const chairMaterial = new THREE.MeshBasicMaterial({ map: chairTexture })
const silverMaterial = new THREE.MeshBasicMaterial({ color: 0x82949d })
const monitorMaterial = new THREE.MeshBasicMaterial({ color: 0x9c9c9c })

let desks = []
gltfLoader.load(
    './model/desk_all_m_o.glb',
    (gltf) => {

        const root = gltf.scene
        const clone = root.clone()
        const mesh_names = ['desk', 'chair_b', 'chair_f', 'silver', 'monitor']
        clone.position.set(1, 1, 1)
        settingMaterial(root, mesh_names)
        settingMaterial(clone, mesh_names)

        scene.add(gltf.scene)
        scene.add(clone)
        desks.push(root, clone)
    }
)

function settingMaterial(mesh, mesh_names) {
    const desk = mesh.children.find((child) => child.name === mesh_names[0])
    const chair_b = mesh.children.find((child) => child.name === mesh_names[1])
    const chair_f = mesh.children.find((child) => child.name === mesh_names[2])
    const silver = mesh.children.find((child) => child.name === mesh_names[3])
    const monitor = mesh.children.find((child) => child.name === mesh_names[4])
    desk.material = woodMaterial
    chair_b.material = chairMaterial
    chair_f.material = chairMaterial
    silver.material = silverMaterial
    monitor.material = monitorMaterial
}

gltfLoader.load(
    './model/desk_com2.glb',
    (gltf) => {

        const root = gltf.scene
        const mesh_names = ['desk2', 'chair_b2', 'chair_f2', 'silver2', 'com2']
        settingMaterial(root, mesh_names)
        // const clone = root.clone()
        // clone.position.set(1, 1, 1)

        scene.add(root)
        // scene.add(clone)
        // desks.push(root, clone)
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
    sizes.width = window.innerWidth
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
        // desk.position.x =  ( Math.sin(elapsedTime * 4) / 18 )
        // desk.position.y =  ( Math.sin(elapsedTime) )
        // desk.rotation.y =  ( Math.sin(elapsedTime * 4) / 20 )
        // desk.rotation.x =  ( Math.sin(elapsedTime * 4) / 20 )
        if(i == 1 ){
            rotateDestAll(desk, elapsedTime)
        }else{
            rotateDesksin(desk, elapsedTime)
        }
    })
    
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
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
