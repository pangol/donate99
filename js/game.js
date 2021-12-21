import * as THREE from '../lib/three.module.js'
import { GLTFLoader } from '../lib/GLTFLoader.js'

//game objet - scene, manager, camera, light, loader, loadingdom

// Scene
const scene = new THREE.Scene()

// Loading Manager
const manager = new THREE.LoadingManager();
const loadingDom = document.getElementById('loading')


manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};
manager.onLoad = function () {
    loadingDom.style.display = 'none'
    console.log('Loading complete!')
};
manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    loadingDom.style.width = (itemsLoaded / itemsTotal) * 70 + '%'
    // console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
};
manager.onError = function (url) {
    console.log('There was an error loading ' + url);
};

const gltfLoader = new GLTFLoader(manager)

export { manager, THREE, gltfLoader, scene }