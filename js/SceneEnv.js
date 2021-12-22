import { THREE, manager, gltfLoader, scene } from './game.js'
import { MaterialObj, VideoMaterialObj, BasicMaterialObj, StandardMaterialObj } from './MaterialObj.js'

const scene2Info = {
    'objFile': './model/scend2_desk_mserver_screen_server_wire.glb',
    'models': [
        {name:'sMonitor1', materialName:'white'},
        {name:'sMonitor2', materialName:'white'},
        {name:'projectBoard', materialName:'white'},
        {name:'sScreen2', materialName:'s2screen'},
        {name:'sScreen1', materialName:'screenProject2'},
        {name:'sDisk1', materialName:'scene2mserver'},
        {name:'sDisk2', materialName:'scene2mserver'},
        {name:'sDisk3', materialName:'scene2mserver'},
        {name:'sDisk4', materialName:'scene2mserver'},
        {name:'sDisk5', materialName:'scene2mserver'},
        {name:'sScreenBoard', materialName:'sScreenBoard'},
        {name:'serverOut', materialName:'scene2server'},
        {name:'serverIn', materialName:'scene2mserver'},
        {name:'circleServer', materialName:'circle'},
        {name:'circleServer1', materialName:'circle'},
        {name:'circleServer2', materialName:'circle'},
        {name:'circleServer3', materialName:'circle'},
        {name:'wire', materialName: 'wire'}
    ],
    'materials': [
        {
            name: 'white',
            encoding: false,
            type: MaterialObj,
            textures: [
                0xf0f0f0
            ],
        },
        {
            name: 'circle',
            encoding: false,
            type: MaterialObj,
            textures: [
                0x7CCAD3
            ],
        },
        {
            name: 'wire',
            encoding: false,
            type: MaterialObj,
            textures: [
                0xfcf400
            ],
        },
        {
            name: 's2screen',
            encoding: THREE.sRGBEncoding,
            type: BasicMaterialObj,
            center: [0.5, 0.5],
            rotation: 3.15,
            textures: [
                './texture/project1.png'
            ],
        },
        {
            name: 'screenProject2',
            encoding: THREE.sRGBEncoding,
            type: BasicMaterialObj,
            center: [0.5, 0.5],
            textures: [
                './texture/project2.png'
            ],
        },
        {
            name: 'sScreenBoard',
            encoding: THREE.sRGBEncoding,
            type: BasicMaterialObj,
            center: [0.5, 0.5],
            textures: [
                './texture/total_project.png'
            ],
        },
        {
            name: 'scene2mserver',
            encoding: THREE.sRGBEncoding,
            type: StandardMaterialObj,
            wrapping: true,
            textures: [
                {map:'map', filepath: './texture/Metal_Plate_013_basecolor.jpg'},
                {map: 'normalMap', filepath: './texture/Metal_Plate_013_normal.jpg'},
                // {map: 'height', filepath: './texture/Metal_Plate_013_height.png'},
                {map: 'roughnessMap', filepath: './texture/Metal_Plate_013_roughness.jpg'},
                {map: 'aoMap', filepath:'./texture/Metal_Plate_013_ambientOcclusion.jpg'},
                {map: 'metalnessMap', filepath: './texture/Metal_Plate_013_metallic.jpg'}
            ],
        },
        {
            name: 'scene2server',
            encoding: THREE.sRGBEncoding,
            type: StandardMaterialObj,
            repeat: [1.5, 1],
            wrapping: true,
            textures: [
                {map:'map', filepath:'./texture/Sci-fi_Pipes_001_basecolor.jpg'},
                {map: 'normalMap', filepath:'./texture/Sci-fi_Pipes_001_normal.jpg'},
                {map: 'roughnessMap',filepath:'./texture/Sci-fi_Pipes_001_roughness.jpg'},
                {map: 'aoMap', filepath:'./texture/Sci-fi_Pipes_001_ambientOcclusion.jpg'},
                {map: 'metalnessMap', filepath: './texture/Sci-fi_Pipes_001_metallic.jpg'},
            ],
        }
        
    ]
}

const scene1Info = {
    'objFile': './model/scene1.glb',
    'models': [
        { name: 'outertBoard', materialName:'outBoarder' },
        { name: 'videoScreen', materialName:'video' },
        { name: 'desk',  materialName:'wood' },
        { name: 'desk2', materialName:'wood' },
        { name: 'chair_b',  materialName:'chair' },
        { name: 'chair_f',  materialName:'chair' },
        { name: 'chair_b2', materialName:'chair' },
        { name: 'chair_f2', materialName:'chair' },
        { name: 'silver', materialName:'silver' },
        { name: 'silver2', materialName:'silver' },
        { name: 'monitor', materialName:'monitor' },
        { name: 'com2', materialName:'monitor' },
    ],
    'groups': [
        {
            name: 'desk1',
            components: ['desk', 'chair_b', 'chair_f', 'silver', 'monitor', 'screen'],
            clonePositions: [{ x: -0.5, y: 0.3, z: 1 }, { x: 1.2, y: 0.7, z: 1.1 }],
            cloneAnimationSpeed: [1000, 2000]
        },
        {
            name: 'desk2',
            components: ['desk2', 'chair_b2', 'chair_f2', 'silver2', 'com2', 'screen2'],
            clonePositions: [{ x: 0, y: 0.7, z: 2.5 }, { x: -1, y: 0.3, z: 2 }],
            cloneAnimationSpeed: [800, 1000]
        }, {
            name: 'board',
            components: ['outertBoard', 'videoScreen']
        }
    ],
    'materials':[
        {
            name: 'wood',
            encoding: false,
            type: StandardMaterialObj,
            textures: [
                {map:'map', filepath:'./texture/Wood_Barrel_Top_001_basecolor.jpg'},
                {map: 'normalMap', filepath:'./texture/Wood_Barrel_Top_001_normal.jpg'},
                {map:'heightMap', filepath:'./texture/Wood_Barrel_Top_001_height.png'},
                {map:'roughnessMap', filepath:'./texture/Wood_Barrel_Top_001_roughness.jpg'},
                {map: 'aoMap', filepath:'./texture/Wood_Barrel_Top_001_ambientOcclusion.jpg'}
            ],
        }, 
        {
            name: 'chair',
            encoding: THREE.sRGBEncoding,
            type: BasicMaterialObj,
            textures: [
                './texture/chair_2.jpg'
            ]
        }, {
            name: 'silver',
            encoding: false,
            type: MaterialObj,
            textures: [
                0x82949d
            ],
        }, {
            name: 'monitor',
            encoding: false,
            type: MaterialObj,
            textures: [
                0x9c9c9c
            ],
        }, {
            name: 'outBoarder',
            encoding: false,
            type: MaterialObj,
            textures: [
                0xf1f1f1
            ],
        }, {
            name: 'video',
            video: 'video',
            type: VideoMaterialObj,
            encoding: THREE.sRGBEncoding,
        }
    ]
}

class SceneEnv {
    constructor(objFile, models, groups, materials){
        this.objFile = objFile
        this.root = new THREE.Group()
        this.models = models
        this.groups = groups
        this.materials = materials
    }
    mappingMaterial(){
        const models = this['models']
        const materials = this['materials']
        models.forEach( (model) => {
            const material = materials.find( material => material['name'] === model['materialName'])
            model['material'] = material['obj']
        })
    }
    makingMaterials() {
        this.materials.forEach( material => {
            material.type.makingMaterial(material)
        })
    }
    loadScene() {
        gltfLoader.load(
            this.objFile,
            (gltf) => {
                const root = gltf.scene
                this.models.forEach(model => {
                    this.settingChildMaterial(root, model.name, model.material)
                })
    
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
                scene.add(this.root)
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
}

const scene1Obj = new SceneEnv(scene1Info.objFile, scene1Info.models, scene1Info.groups, scene1Info.materials)
const scene2Obj = new SceneEnv(scene2Info.objFile, scene2Info.models, scene2Info.groups, scene2Info.materials)

export { scene2Obj, scene1Obj, THREE, manager, gltfLoader, scene }