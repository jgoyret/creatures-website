// import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('rgb(200,200,200)')
/**
 * Object
 */


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 6, -6)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.toneMapping = 0
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 *  Lights
 */

const directionalLight = new THREE.DirectionalLight(0xffffff, 20);
scene.add(directionalLight);

const light = new THREE.AmbientLight(0xffffff, 1); // soft white light
scene.add(light);


/**
 * 3D BICHO
 */
let mixer 
const bichox_loader = new GLTFLoader()

bichox_loader.load('../static/bichox.glb', (glb) => {
    scene.add(glb.scene)
    mixer = new THREE.AnimationMixer(glb.scene);
    glb.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
    });
},
    function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },

    function (error) {

        console.log('An error happened');

    })


/**
 * CONTROLS
 */

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 0.3

var animate = () => {

    requestAnimationFrame(animate)
    controls.update(0.5)
    mixer.update(0.0005)
    renderer.render(scene, camera)
}

animate()