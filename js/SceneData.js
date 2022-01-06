import * as THREE from '../lib/three.module.js'
import { MaterialObj, VideoMaterialObj, BasicMaterialObj, StandardMaterialObj } from './MaterialObj.js'
import { game } from './game.js'

const scene3d3Info = {
    position: {x:0,y:0, z:game.sceneMoveZindex * -2},
    objFile: './model/scene3_d3.glb',
    rotation: [null, null, null],
    scale:[.6,.6,.6],
    animationIndex:0
}

const scene3d2Info = {
    position: {x:0,y:0, z:game.sceneMoveZindex * -2},
    objFile: './model/scene3_d2.glb',
    rotation: [null, null, null],
    scale:[.6,.6,.6],
    animationIndex:0
}
const scene3d1Info = {
    position: {x:0,y:0, z:game.sceneMoveZindex * -2},
    objFile: './model/scene3_d1.glb',
    rotation: [null, null, null],
    scale:[.6,.6,.6],
    animationIndex:0
}

const cha1Info = {
    position: {x:0,y:0, z:0},
    objFile: './model/readyPlay_c_r.glb',
    rotation: [null, Math.PI, null],
    scale:[.6,.6,.6],
    animationIndex:0
}

const phoneInfo = {
    position: {x:0,y:0, z:0},
    objFile: './model/phone_s_m_nm.glb',
    models: [
        {name:'body', materialName:'body'},
        {name:'front', materialName:'front'},
        {name:'side', materialName:'side'},
    ],
    materials: [
        {
            name:'side',
            encoding: false,
            type: MaterialObj,
            textures: [
                0xAEE1CD
            ],
        },{
            name: 'body',
            encoding:false,
            type:StandardMaterialObj,
            textures: [
                { map: 'map', filepath: './texture/Plastic006_1K_Color.jpg' },
                { map: 'normalMap', filepath: './texture/Plastic006_1K_NormalDX.jpg' },
                { map: 'metalnessMap', filepath: './texture/Plastic006_1K_Roughness.jpg' }
            ]
        },{
            name: 'front',
            encoding: THREE.sRGBEncoding,
            type:StandardMaterialObj,
            textures: [
                { map: 'map', filepath: './texture/Wood_Barrel_Top_001_basecolor.jpg' },
                { map: 'normalMap', filepath: './texture/Wood_Barrel_Top_001_normal.jpg' },
                { map: 'heightMap', filepath: './texture/Wood_Barrel_Top_001_height.png' },
                { map: 'roughnessMap', filepath: './texture/Wood_Barrel_Top_001_roughness.jpg' },
                { map: 'aoMap', filepath: './texture/Wood_Barrel_Top_001_ambientOcclusion.jpg' }
            ],
        },{
            name: 'scene2Floor',
            encoding: THREE.sRGBEncoding,
            type: StandardMaterialObj,
            wrapping:true,
            repeat:[1,1.5],
            textures:[
                { map: 'map', filepath: './texture/Metal_Plate_012_basecolor.jpg' },
                { map: 'normalMap', filepath: './texture/Metal_Plate_012_normal.jpg' },
                // { map: 'heightMap', filepath: './texture/Wood_Barrel_Top_001_height.png' },
                { map: 'roughnessMap', filepath: './texture/Metal_Plate_012_roughness.jpg' },
                { map: 'aoMap', filepath: './texture/Metal_Plate_012_ambientOcclusion.jpg' },
                { map: 'metalnessMap', filepath: './texture/Metal_Plate_012_metallic.jpg' }
            ]
        }
    ]
}

const scene2Info = {
    'position':{x:0,y:0, z:game.sceneMoveZindex * -1},
    'objFile': './model/scend2_desk_mserver_screen_server_wire.glb',
    'models': [
        { name: 'sMonitor1', materialName: 'white' },
        { name: 'sMonitor2', materialName: 'white' },
        { name: 'projectBoard', materialName: 'white' },
        { name: 'sScreen2', materialName: 's2screen' },
        { name: 'sScreen1', materialName: 'screenProject2' },
        { name: 'sDesk', materialName: 'side' },
        { name: 'sDisk1', materialName: 'scene2mserver' },
        { name: 'sDisk2', materialName: 'scene2mserver' },
        { name: 'sDisk3', materialName: 'scene2mserver' },
        { name: 'sDisk4', materialName: 'scene2mserver' },
        { name: 'sDisk5', materialName: 'scene2mserver' },
        { name: 'sScreenBoard', materialName: 'sScreenBoard' },
        { name: 'serverOut', materialName: 'scene2server' },
        { name: 'serverIn', materialName: 'scene2mserver' },
        { name: 'circleServer', materialName: 'circle' },
        { name: 'circleServer1', materialName: 'circle' },
        { name: 'circleServer2', materialName: 'circle' },
        { name: 'circleServer3', materialName: 'circle' },
        { name: 'circleBtn1', materialName: 'circle' },
        { name: 'circleBtn1', materialName: 'circle' },
        { name: 'circleBtn2', materialName: 'circle' },
        { name: 'circleBtn3', materialName: 'circle' },
        { name: 'wire', type: 'group', materialName: ['wire', 'circle'] }
    ],
    'materials': [
        {
            name:'side',
            encoding:false,
            type:StandardMaterialObj,
            textures: [
                { map: 'map', filepath: './texture/Plastic006_1K_Color.jpg' },
                { map: 'normalMap', filepath: './texture/Plastic006_1K_NormalDX.jpg' },
                { map: 'metalnessMap', filepath: './texture/Plastic006_1K_Roughness.jpg' }
            ],
        },
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
            name: 'sDisk',
            encoding: false,
            type: MaterialObj,
            textures: [
                0xffff00
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
                { map: 'map', filepath: './texture/Metal_Plate_013_basecolor.jpg' },
                { map: 'normalMap', filepath: './texture/Metal_Plate_013_normal.jpg' },
                // {map: 'height', filepath: './texture/Metal_Plate_013_height.png'},
                { map: 'roughnessMap', filepath: './texture/Metal_Plate_013_roughness.jpg' },
                { map: 'aoMap', filepath: './texture/Metal_Plate_013_ambientOcclusion.jpg' },
                { map: 'metalnessMap', filepath: './texture/Metal_Plate_013_metallic.jpg' }
            ],
        },
        {
            name: 'scene2server',
            encoding: THREE.sRGBEncoding,
            type: StandardMaterialObj,
            repeat: [1.5, 1],
            wrapping: true,
            textures: [
                { map: 'map', filepath: './texture/Sci-fi_Pipes_001_basecolor.jpg' },
                { map: 'normalMap', filepath: './texture/Sci-fi_Pipes_001_normal.jpg' },
                { map: 'roughnessMap', filepath: './texture/Sci-fi_Pipes_001_roughness.jpg' },
                { map: 'aoMap', filepath: './texture/Sci-fi_Pipes_001_ambientOcclusion.jpg' },
                { map: 'metalnessMap', filepath: './texture/Sci-fi_Pipes_001_metallic.jpg' },
            ],
        }
    ],
}

const scene1Info = {
    'objFile': './model/scene1.glb',
    'position': {x:0, y:0, z:0},
    'models': [
        { name: 'outertBoard', materialName: 'outBoarder' },
        { name: 'videoScreen', materialName: 'video' },
        { name: 'desk', materialName: 'wood' },
        { name: 'desk2', materialName: 'wood' },
        { name: 'chair_b', materialName: 'chair' },
        { name: 'chair_f', materialName: 'chair' },
        { name: 'chair_b2', materialName: 'chair' },
        { name: 'chair_f2', materialName: 'chair' },
        { name: 'silver', materialName: 'silver' },
        { name: 'silver2', materialName: 'silver' },
        { name: 'monitor', materialName: 'monitor' },
        { name: 'com2', materialName: 'monitor' },
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
    'materials': [
        {
            name: 'wood',
            encoding: false,
            type: StandardMaterialObj,
            textures: [
                { map: 'map', filepath: './texture/Wood_Barrel_Top_001_basecolor.jpg' },
                { map: 'normalMap', filepath: './texture/Wood_Barrel_Top_001_normal.jpg' },
                { map: 'heightMap', filepath: './texture/Wood_Barrel_Top_001_height.png' },
                { map: 'roughnessMap', filepath: './texture/Wood_Barrel_Top_001_roughness.jpg' },
                { map: 'aoMap', filepath: './texture/Wood_Barrel_Top_001_ambientOcclusion.jpg' }
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

export { scene1Info, scene2Info, phoneInfo, cha1Info, scene3d1Info, scene3d2Info, scene3d3Info }