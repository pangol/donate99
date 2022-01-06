import {
    scene1Obj, scene2Obj, THREE, game, phoneObj, cha1Obj, scene3d1Obj, scene3d2Obj, scene3d3Obj
} from './SceneEnv.js'

//get Element
const nextSceneBtn = document.querySelector('#nextSceneBtn')
const beforeSceneBtn = document.querySelector('#beforeSceneBtn')


phoneObj.mappingMaterial()
phoneObj.loadScene()
phoneObj.cachingMaterial(['front','scene2Floor'])

scene1Obj.mappingMaterial()
scene1Obj.loadScene()

scene2Obj.mappingMaterial()
scene2Obj.loadScene()

cha1Obj.loadModel()
scene3d1Obj.loadModel()

scene3d2Obj.loadModel()
scene3d3Obj.loadModel()

const testTexture = new THREE.TextureLoader(game.manager).load('./texture/uv-test-bw.png');
testTexture.encoding = THREE.sRGBEncoding;
testTexture.center.x = 0.5
testTexture.center.y = 0.5
const testMaterial = new THREE.MeshBasicMaterial({ map: testTexture })

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
        const circleMaterial = game.materials.find(material => material.name === 'circle').obj
        const sDiskMaterial = game.materials.find(material => material.name === 'sDisk').obj
        const wireMaterial = game.materials.find(material => material.name === 'wire').obj

        if (Math.sin(elapsedTime * 4) > 0) {
            scene2Obj.changeCircleMaterial(circleMaterial)
            scene2Obj.settingWireMaterial(scene2Obj.gettingWireObjs(), wireMaterial, circleMaterial)
        } else {
            scene2Obj.changeCircleMaterial(sDiskMaterial)
            scene2Obj.settingWireMaterial(scene2Obj.gettingWireObjs(), circleMaterial, wireMaterial)
        }
    }
    if (cha1Obj.mixer) cha1Obj.mixer.update(delta);
    if (scene3d1Obj.mixer) scene3d1Obj.mixer.update(delta)
    if (scene3d2Obj.mixer) scene3d2Obj.mixer.update(delta)
    if (scene3d3Obj.mixer) scene3d3Obj.mixer.update(delta)
    
    game.renderer.render(game.scene, game.camera)
    window.requestAnimationFrame(tick)
}

nextSceneBtn.addEventListener('click', function (event) {
    const lastState = 1
    if (game.sceneState != lastState) {
        game.sceneState++
        changebgColor(game.sceneState)
        changeUI(game.sceneState)
        changeSceneOnePosition('next')
        changeChaStageAnimation(game.sceneState)
    } else {
        game.sceneState = 1
    }
})

beforeSceneBtn.addEventListener('click', function (event) {
    const firstState = 0
    if (game.sceneState != firstState) {
        game.sceneState--
        changebgColor(game.sceneState)
        changeUI(game.sceneState)
        changeSceneOnePosition('before')
        changeChaStageAnimation(game.sceneState)
    } else {
        game.sceneState = 0
    }
})

function changeChaStageAnimation(state){
    if( state === 1){
        changeAnimation(cha1Obj, 2)
        gsap.to(cha1Obj.root.position, { duration: 2, delay: 0, z: cha1Obj.root.position.z - 1 })
        gsap.to(cha1Obj.root.rotation, { duration: 0, delay: 2, y: Math.PI/-2})
        gsap.to(cha1Obj.root.position, { duration: 2, delay: 2, x: cha1Obj.root.position.x - .5,
            onComplete: () => {
                changeAnimation(cha1Obj, 0)
            }
        })
    }else{
        changeAnimation(cha1Obj, 2)
        gsap.to(cha1Obj.root.rotation, { duration: 0, delay: 0, y: Math.PI/2})
        gsap.to(cha1Obj.root.position, { duration: 2, delay: 0, x: 0})
        gsap.to(cha1Obj.root.rotation, { duration: 0, delay: 2, y: Math.PI * 2})
        gsap.to(cha1Obj.root.position, { duration: 2, delay: 2, z: 0})
        gsap.to(cha1Obj.root.rotation, { duration: 0, delay: 4, y: Math.PI, onComplete: ()=>{
            changeAnimation(cha1Obj, 0)
        }})
    }
}

function changeAnimation(character,index){
    character.action.stop()
    character.action = character.mixer.clipAction(character.clips[index]);
    character.action.play()
}

function changeUI(state){
    const stageDoms = document.querySelectorAll('.stage')
    stageDoms.forEach( dom => {
        dom.style.display = 'none'
    })
    let blockDoms = null
    if( state === 1){
        blockDoms = document.querySelectorAll('.stage01')
    }else{
        blockDoms = document.querySelectorAll('.stage00')
    }
    blockDoms.forEach( dom => {
        dom.style.display = 'block'
    })
}

function changebgColor(state) {
    const duration = 2
    const frontObj = phoneObj.root.children.find( child => child.name == 'front')
    if (state === 1) {
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
