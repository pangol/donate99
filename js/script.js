
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

//object
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshStandardMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, sideMaterial)
// mesh.position.set(3,3,3)

// gui
//     .add(mesh.position, 'y')
//     .min(- 3)
//     .max(3)
//     .step(0.01)
//     .name('elevation')

// scene.add(mesh)

const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x112222 })
const portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
// const sideMaterial = new THREE.MeshBasicMaterial({ color: 0xd0f6ff })
const sideMaterial = new THREE.MeshBasicMaterial({ color: 0xd0f611 })

const baked = new THREE.TextureLoader().load( './texture/baked.jpg' );
baked.flipY = false
baked.encoding = THREE.sRGBEncoding
const bakedMaterial = new THREE.MeshBasicMaterial({ map: baked })

const side = new THREE.TextureLoader().load( './texture/side.jpg' );
side.flipY = false
side.encoding = THREE.sRGBEncoding
const sidetMaterial = new THREE.MeshBasicMaterial({ map: side })

const lightbaked = new THREE.TextureLoader().load( './texture/light_baked.jpg' );
lightbaked.flipY = false
lightbaked.encoding = THREE.sRGBEncoding
const lightbakedMaterial = new THREE.MeshBasicMaterial({ map: lightbaked })

gltfLoader.load(
    './model/phone_all.glb',
    // './model/phone_s_m_nm.glb',
    (gltf) => {
        // const body = gltf.scene.children.find((child) => child.name === 'body')
        // const front = gltf.scene.children.find((child) => child.name === 'front')
        // const side = gltf.scene.children.find((child) => child.name === 'side')

        // body.material = bodyMaterial
        // front.material = portalLightMaterial
        // side.material = sideMaterial 
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
        gltf.scene.traverse((child) =>
        {
            child.material = lightbakedMaterial
        })
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
        gltf.scene.position.y = 2
        scene.add(gltf.scene)

        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])
        action.play()
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
    if(air != null){
        air.position.x = 3 * Math.cos(elapsedTime)
        air.position.z = 3 * Math.sin(elapsedTime) 
        air.rotation.y = -elapsedTime
    }    
    
    // mesh.rotation.y = elapsedTime
    if(mixer)
    {
        mixer.update(elapsedTime)
    }
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
