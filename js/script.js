
import * as THREE from '../lib/three.module.js'
import { OrbitControls } from '../lib/OrbitControls.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'

/**
 * Materials
 */
const gltfLoader = new GLTFLoader()

//Debug UI
const gui = new dat.GUI()

//Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//object
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// mesh.position.set(3,3,3)

// gui
//     .add(mesh.position, 'y')
//     .min(- 3)
//     .max(3)
//     .step(0.01)
//     .name('elevation')

// scene.add(mesh)

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

const texture = new THREE.TextureLoader().load( './texture/Metal_Damascus_Steel_001_basecolor.jpg' );
const normalMap = new THREE.TextureLoader().load( './texture/Metal_Damascus_Steel_001_normal.jpg' );
const metalnessMap = new THREE.TextureLoader().load( './texture/Metal_Damascus_Steel_001_metallic.jpg' );

const sideMaterial = new THREE.MeshStandardMaterial({ color: 0xdbe4be, metalness: 0.1, roughness:0.9 })
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x112222 })
const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

gltfLoader.load(
    './model/phone_normal_nmn.glb',
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

//Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
gui.add(ambientLight, 'intensity').min(0).max(5).step(0.001)
scene.add(ambientLight)

//controls
const controls = new OrbitControls(camera, canvas)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0xffc0cb, 1);

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
    // mesh.rotation.y = elapsedTime

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
