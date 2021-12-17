import * as THREE from '../lib/three.module.js'

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
    ]
}

export { sceneEnv, THREE }