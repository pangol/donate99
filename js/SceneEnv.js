import { THREE, game } from './game.js'
import { cha1Info, scene1Info, scene2Info, phoneInfo, scene3d1Info, scene3d2Info, scene3d3Info } from './SceneData.js'

class SceneEnv {
    constructor(objFile, models, groups, materials, position) {
        this.objFile = objFile
        this.root = new THREE.Group()
        this.models = models
        this.groups = groups
        this.materials = materials
        this.position = position
    }
    mappingMaterial() {
        const models = this['models']
        const materials = game['materials']
        models.forEach((model) => {

            if (model.type !== 'group') {
                const material = materials.find(material => material['name'] === model['materialName'])
                model['material'] = material['obj']
            } else {
                model['material'] = new Array()
                model.materialName.forEach(name => {
                    const material = materials.find(material => material['name'] === name)
                    model['material'].push(material['obj'])
                })
            }
        })
    }
    loadScene() {
        game.gltfLoader.load(
            this.objFile,
            (gltf) => {
                const root = gltf.scene

                this.models.forEach(model => {
                    if (model.type !== 'group') {
                        this.settingChildMaterial(root, model.name, model.material)
                    } else {
                        this.settingWireMaterial(this.gettingWireObjs(), model.material[0], model.material[1])
                    }
                })

                if (this.groups !== null) {
                    this.groups.forEach(group => {
                        group['obj'] = this.settingGroup(root, group.components)
                        this.root.add(group['obj'])
                    })

                    this.groups.forEach(group => {
                        if (Object.keys(group).includes('clonePositions')) {
                            const clones = this.cloneGroups(group.obj, group.clonePositions)
                            group['cloneobjs'] = clones
                            clones.forEach(clone => {
                                this.root.add(clone)
                            })
                        }
                    })
                } else {
                    this.root = root
                }
                this.root.position.set(this.position.x, this.position.y, this.position.z)
                game.scene.add(this.root)
                // sceneObjects.push(sceneObj.root)
            }
        )
    }
    settingGroup(root, objNames) {
        const group = new THREE.Group()
        objNames.forEach(name => {
            const obj = root.children.find((child) => child.name === name)
            group.add(obj)
        })
        return group
    }
    cloneGroups(rawObj, positions) {
        const result = new Array()
        positions.forEach(position => {
            const clone = rawObj.clone()
            clone.position.set(position.x, position.y, position.z)

            result.push(clone)
        })
        return result
    }
    cloneAnimate(obj, elapsedTime, speed, sin) {
        let middle
        if (sin) {
            middle = Math.sin(elapsedTime)
        } else {
            middle = Math.cos(elapsedTime)
        }
        obj.position.y += middle / speed
    }
    settingChildMaterial(root, objName, material) {
        const obj = root.children.find((child) => child.name === objName)
        obj.material = material
    }
    settingWireMaterial(objs, firstMaterial, secondMaterial) {
        objs.forEach((obj, i) => {
            if (i % 2 == 0) {
                obj.material = firstMaterial
            } else {
                obj.material = secondMaterial
            }
        })
    }
    gettingWireObjs() {
        const wireRe = /wire*/
        const wireObjs = this.root.children.filter(child => wireRe.test(child.name))
        return wireObjs
    }
    changeCircleMaterial(colorMaterial) {
        const circles = []
        circles.push(this.root.children.find((child) => child.name === 'circleBtn1'))
        circles.push(this.root.children.find((child) => child.name === 'circleBtn2'))
        circles.push(this.root.children.find((child) => child.name === 'circleBtn3'))
        circles.push(this.root.children.find((child) => child.name === 'circleBtn4'))
        circles.push(this.root.children.find((child) => child.name === 'circleBtn5'))
        circles.push(this.root.children.find((child) => child.name === 'circleServer'))
        circles.push(this.root.children.find((child) => child.name === 'circleServer1'))
        circles.push(this.root.children.find((child) => child.name === 'circleServer2'))
        circles.push(this.root.children.find((child) => child.name === 'circleServer3'))
        circles.forEach(circle => circle.material = colorMaterial)
    }
    cachingMaterial(names) {
        this.cacheMaterial = []
        names.forEach(name => {
            this.cacheMaterial.push(game.materials.find(material => material.name === name).obj)
        })
    }
}


class simpleModel {
    constructor(objFile, position, rotation, scale, animationIndex) {
        this.objFile = objFile
        this.position = position
        this.rotation = rotation
        this.scale = scale
        this.animationIndex = animationIndex
        this.clips = null
        this.mixer = null
        this.action = null
        this.root = null
    }
    loadModel() {
        game.gltfLoader.load(
            this.objFile,
            (gltf) => {
                const root = gltf.scene
                root.position.set(this.position.x, this.position.y, this.position.z)
                this.clips = gltf.animations;

                root.scale.set(this.scale[0],this.scale[1],this.scale[2])
                root.rotation.y = this.rotation[1]
                game.scene.add(root)

                this.mixer = new THREE.AnimationMixer(root);
                this.action = this.mixer.clipAction(this.clips[0]); // access first animation clip
                this.action.play();
                this.root = root
            })
    }
}

class animationModel extends simpleModel{
    constructor(objFile, position, rotation, scale, animationIndex){
        super(objFile, position, rotation, scale, animationIndex)
    }
    loadModel(){
        game.gltfLoader.load(
            this.objFile,
            (gltf) => {
                const root = gltf.scene
                root.position.set(this.position.x, this.position.y, this.position.z)
                this.clips = gltf.animations;
                root.scale.set(this.scale[0],this.scale[1],this.scale[2])
                root.rotation.y = this.rotation[1]

                game.scene.add(root)

                this.mixer = new THREE.AnimationMixer(root);
                this.action = this.mixer.clipAction(this.clips[0]); // access first animation clip
                this.action.play();
                this.root = root
            })
    }
}

const scene1Obj = new SceneEnv(scene1Info.objFile, scene1Info.models, scene1Info.groups, scene1Info.materials, scene1Info.position)
const scene2Obj = new SceneEnv(scene2Info.objFile, scene2Info.models, null, scene2Info.materials, scene2Info.position)
const phoneObj = new SceneEnv(phoneInfo.objFile, phoneInfo.models, null, phoneInfo.materials, phoneInfo.position)
const cha1Obj = new simpleModel(cha1Info.objFile, cha1Info.position, cha1Info.rotation, cha1Info.scale, cha1Info.animationIndex)
const scene3d1Obj = new simpleModel(scene3d1Info.objFile, scene3d1Info.position, scene3d1Info.rotation, scene3d1Info.scale, scene3d1Info.animationIndex)
const scene3d2Obj = new simpleModel(scene3d2Info.objFile, scene3d2Info.position, scene3d2Info.rotation, scene3d2Info.scale, scene3d2Info.animationIndex)
const scene3d3Obj = new simpleModel(scene3d3Info.objFile, scene3d3Info.position, scene3d3Info.rotation, scene3d3Info.scale, scene3d3Info.animationIndex)


export { scene3d3Obj, scene3d2Obj,scene3d1Obj, cha1Obj, scene2Obj, scene1Obj, phoneObj, THREE, game }