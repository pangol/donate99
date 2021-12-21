import { THREE, manager, gltfLoader, scene } from './game.js'

const sceneEnv = {
    'objFile': './model/scene1.glb',
    'root': new THREE.Group(),
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
            color: false,
            textures: [
                './texture/Wood_Barrel_Top_001_basecolor.jpg',
                './texture/Wood_Barrel_Top_001_normal.jpg',
                './texture/Wood_Barrel_Top_001_height.png',
                './texture/Wood_Barrel_Top_001_roughness.jpg',
                './texture/Wood_Barrel_Top_001_ambientOcclusion.jpg'
            ],
        }, {
            name: 'chair',
            encoding: THREE.sRGBEncoding,
            color: false,
            textures: [
                './texture/chair_2.jpg'
            ]
        }, {
            name: 'silver',
            encoding: false,
            color: true,
            textures: [
                0x82949d
            ],
        }, {
            name: 'monitor',
            encoding: false,
            color: true,
            textures: [
                0x9c9c9c
            ],
        }, {
            name: 'outBoarder',
            encoding: false,
            color: true,
            textures: [
                0xf1f1f1
            ],
        }, {
            name: 'video',
            video: 'video',
            color: false,
            encoding: THREE.sRGBEncoding,
    
        }
    ],
    mappingMaterial : function mappingMaterial(){
        const models = this['models']
        const materials = this['materials']
        models.forEach( (model) => {
            const material = materials.find( material => material['name'] === model['materialName'])
            model['material'] = material['obj']
        })
    },
    makingMaterial: function makingMaterial() {
        this.materials.forEach( material => {
            let resultMaterial
            if (material['color']) {
                resultMaterial = new THREE.MeshStandardMaterial({ color: material['textures'][0] })
            } else if (material['video']) {
                const video = document.getElementById(material['video'])
                video.play()
                const videoTexture = new THREE.VideoTexture(video);
                videoTexture.flipY = false;
                videoTexture.encoding = material.encoding
                resultMaterial = new THREE.MeshBasicMaterial({ map: videoTexture })
            } else {
                const colorTex = new THREE.TextureLoader(manager).load(material['textures'][0])
                let normalTex, disTex, roughTex, aoTex
                if (material['textures'].length > 1) {
                    normalTex = new THREE.TextureLoader(manager).load(material['textures'][1])
                    disTex = new THREE.TextureLoader(manager).load(material['textures'][2])
                    roughTex = new THREE.TextureLoader(manager).load(material['textures'][3])
                    aoTex = new THREE.TextureLoader(manager).load(material['textures'][4])
                }
        
                if (material['encoding']) {
                    colorTex.encoding = material['encoding']
                }
        
                resultMaterial = new THREE.MeshStandardMaterial({
                    map: colorTex,
                    normalMap: normalTex,
                    roughnessMap: roughTex,
                    aoMap: aoTex,
                })
            }
            material['obj'] = resultMaterial
        })
    },
    loadScene: function loadScene() {
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
    },
    settingGroup: function settingGroup(root, objNames) {
        const group = new THREE.Group()
        objNames.forEach(name => {
            const obj = root.children.find((child) => child.name === name)
            group.add(obj)
        })
        return group
    },
    cloneGroups: function cloneGroups(rawObj, positions) {
        const result = new Array()
        positions.forEach(position => {
            const clone = rawObj.clone()
            clone.position.set(position.x, position.y, position.z)
    
            result.push(clone)
        })
        return result
    },
    cloneAnimate: function cloneAnimate(obj, elapsedTime, speed, sin) {
        let middle
        if (sin) {
            middle = Math.sin(elapsedTime)
        } else {
            middle = Math.cos(elapsedTime)
        }
        obj.position.y += middle / speed
    },
    settingChildMaterial: function settingChildMaterial(root, objName, material) {
        const obj = root.children.find((child) => child.name === objName)
        obj.material = material
    }
}

export { sceneEnv, THREE, manager, gltfLoader, scene }