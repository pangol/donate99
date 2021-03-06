import * as THREE from '../lib/three.module.js'
import { game } from './game.js'

class MaterialObj {

    static makingMaterial(material) {
        material.obj = new THREE.MeshStandardMaterial({ color: material['textures'][0] })
    }

    static settingRepeat(material, texture) {
        texture.repeat.set(material.repeat[0], material.repeat[0])
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapU = THREE.RepeatWrapping;
    }

    static settingRotation(material, texture) {
        texture.rotation = material.rotation
    }

    static settingCenter(material, texture) {
        texture.center.x = material.center[0]
        texture.center.y = material.center[1]
    }

    static settingEncoding(material, texture) {
        texture.encoding = material.encoding
    }
}

class VideoMaterialObj extends MaterialObj {
    static makingMaterial(material) {
        const video = document.getElementById(material['video'])
        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.flipY = false;

        this.settingEncoding(material, videoTexture)
        video.play()
        material.obj = new THREE.MeshBasicMaterial({ map: videoTexture })
    }

}

class BasicMaterialObj extends MaterialObj {
    static makingMaterial(material) {
        const basicTexture = new THREE.TextureLoader(game.manager).load(material['textures'][0])
        if (material['encoding']) {
            this.settingEncoding(material, basicTexture)
        }
        if (material['center']) {
            this.settingCenter(material, basicTexture)
        }
        if (material['rotation']) {
            this.settingRotation(material, basicTexture)
        }
        material.obj = new THREE.MeshStandardMaterial({
            map: basicTexture,
        })
    }
}

class StandardMaterialObj extends MaterialObj {
    static loadingTexture(material, map) {
        let result = null
        const texture = material.textures.find(texture => texture.map === map)
        if (texture) {
            result = new THREE.TextureLoader(game.manager).load(texture.filepath)
        }
        return result
    }
    static makingMaterial(material) {
        const basicTexture = this.loadingTexture(material, 'map')
        const normalTexture = this.loadingTexture(material, 'normalMap')
        const roughnessTexture = this.loadingTexture(material, 'roughnessMap')
        const aoTexture = this.loadingTexture(material, 'aoMap')
        const metalTexure = this.loadingTexture(material, 'metalnessMap')

        if (material['encoding']) {
            this.settingEncoding(material, basicTexture)
        }

        if(material['repeat']){
            this.settingRepeat(material, basicTexture)
        }

        material.obj = new THREE.MeshStandardMaterial({
            map: basicTexture,
            normalMap: normalTexture,
            roughnessMap: roughnessTexture,
            aoMap: aoTexture,
            metalnessMap: metalTexure
        })
    }
}

export { MaterialObj, VideoMaterialObj, BasicMaterialObj, StandardMaterialObj }