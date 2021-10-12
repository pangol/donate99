
import * as THREE from '../lib/three.module.js'
import { OrbitControls } from '../lib/OrbitControls.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const gltfLoader = new GLTFLoader()

//Debug UI
const gui = new dat.GUI()

//Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//object
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)

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

gltfLoader.load(
    './model/iphone.glb',
    (gltf) => {
        gltf.scene.traverse((child) => {
            child.material = bakedMaterial
        })
        scene.add(gltf.scene)
    }
)

//Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
// directionalLight.position.set(0, 0, 0)
// scene.add(directionalLight)

// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
// scene.add(hemisphereLight)

// const pointLight = new THREE.PointLight(0xff9000, 0.5)
// scene.add(pointLight)

// const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
// spotLight.position.set(0, 2, 3)
// scene.add(spotLight)

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
// scene.add(hemisphereLightHelper)

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
// scene.add(directionalLightHelper)

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
// scene.add(pointLightHelper)

//controls
const controls = new OrbitControls(camera, canvas)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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
