import {
    scene1Obj, scene2Obj, THREE, game, phoneObj, cha1Obj
} from './SceneEnv.js'

//get Element
const nextSceneBtn = document.querySelector('#nextSceneBtn')
const beforeSceneBtn = document.querySelector('#beforeSceneBtn')

phoneObj.makingMaterials()
phoneObj.mappingMaterial()
phoneObj.loadScene()
phoneObj.cachingMaterial(['front','scene2Floor'])

scene1Obj.makingMaterials()
scene1Obj.mappingMaterial()
scene1Obj.loadScene()

scene2Obj.makingMaterials()
scene2Obj.mappingMaterial()
scene2Obj.loadScene()

cha1Obj.loadModel()

const testTexture = new THREE.TextureLoader(game.manager).load('./texture/uv-test-bw.png');
testTexture.encoding = THREE.sRGBEncoding;
testTexture.center.x = 0.5
testTexture.center.y = 0.5
const testMaterial = new THREE.MeshBasicMaterial({ map: testTexture })


// let mixer
// game.gltfLoader.load(
//     './model/readyPlay_c_r.glb',
//     (gltf) => {
//         const root = gltf.scene
//         const clips = gltf.animations;
//         // console.log(clips)
//         root.scale.set(.6, .6, .6)
//         root.rotation.y = Math.PI
//         game.scene.add(root)

//         mixer = new THREE.AnimationMixer(root);
//         const action = mixer.clipAction(clips[0]); // access first animation clip
//         action.play();
//     }
// )

const clock = new THREE.Clock()
const tick = () => {
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime()

    //animate scen1
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
        const circleMaterial = scene2Obj.materials.find(material => material.name === 'circle').obj
        const sDiskMaterial = scene2Obj.materials.find(material => material.name === 'sDisk').obj
        const wireMaterial = scene2Obj.materials.find(material => material.name === 'wire').obj

        if (Math.sin(elapsedTime * 4) > 0) {
            scene2Obj.changeCircleMaterial(circleMaterial)
            scene2Obj.settingWireMaterial(scene2Obj.gettingWireObjs(), wireMaterial, circleMaterial)
        } else {
            scene2Obj.changeCircleMaterial(sDiskMaterial)
            scene2Obj.settingWireMaterial(scene2Obj.gettingWireObjs(), circleMaterial, wireMaterial)
        }
    }
    if (cha1Obj.mixer) cha1Obj.mixer.update(delta);
    
    game.renderer.render(game.scene, game.camera)
    window.requestAnimationFrame(tick)
}

nextSceneBtn.addEventListener('click', function (event) {
    const lastState = 1
    if (game.sceneState != lastState) {
        game.sceneState++
        changebgColor(game.sceneState)
        changeSceneOnePosition('next')
    } else {
        game.sceneState = 1
    }
})

beforeSceneBtn.addEventListener('click', function (event) {
    const firstState = 0
    if (game.sceneState != firstState) {
        game.sceneState--
        changebgColor(game.sceneState)
        changeSceneOnePosition('before')
    } else {
        game.sceneState = 0
    }
})

function changebgColor(state) {
    const duration = 2
    const frontObj = phoneObj.root.children.find( child => child.name == 'front')
    if (state == 1) {
        gsap.to('#info', { duration: duration, delay: 0, backgroundColor: '#64c1cb' })
        gsap.to('.webgl', { duration: duration, delay: 0, backgroundImage: 'linear-gradient(to right, rgba(100, 192, 203, 1) 40%, rgba(100, 192, 203, .8))' })
        gsap.to('.header', { duration: duration, delay: 0, boxShadow: '10px 10px rgb(100 192 203 / 90%)' })
        frontObj.material = phoneObj.cacheMaterial[1]
    } else {
        gsap.to('#info', { duration: duration, delay: 0, backgroundColor: '#ffc0cb' })
        gsap.to('.webgl', { duration: duration, delay: 0, backgroundImage: 'linear-gradient(to right,#ffc0cb 40%, rgba(255, 192, 203, .8))' })
        gsap.to('.header', { duration: duration, delay: 0, boxShadow: '10px 10px rgb(255 192 203 / 90%)' })
        frontObj.material = phoneObj.cacheMaterial[0]
    }
}

function changeSceneOnePosition(direction) {
    let zIndex = game.sceneMoveZindex
    const duration = 2
    if (direction != 'next') {
        zIndex *= -1
    }
    gsap.to(scene1Obj.root.position, { duration: duration, delay: 0, z: scene1Obj.root.position.z + zIndex })
    gsap.to(scene2Obj.root.position, { duration: duration, delay: 0, z: scene2Obj.root.position.z + zIndex })
}

tick()
