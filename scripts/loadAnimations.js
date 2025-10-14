// import * as THREE from './libs/three.module.js';
// import { GLTFLoader } from './libs/GLTFLoader.js';


import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';


let mixer;
let currentAction;

let animacoes =[];


let cena = new THREE.Scene(); //Criar cena

const LIGHT_POS_X = 0;
const LIGHT_POS_Y = 0;
const LIGHT_POS_Z = 0;


const LIGHT_COLOR = 0xffffff;
const LIGHT_INTENSITY = 2;
const light = new THREE.DirectionalLight(LIGHT_COLOR, LIGHT_INTENSITY);
light.position.set(LIGHT_POS_X, LIGHT_POS_Y, LIGHT_POS_Z);
cena.add(light);

const AMBIENT_COLOR = 0xffffff;
const AMBIENT_INTENSITY = 1;
const ambient = new THREE.AmbientLight(AMBIENT_COLOR, AMBIENT_INTENSITY);
cena.add(ambient);


const CAMERA_POS_X = 0.5;
const CAMERA_POS_Y = 0.5;
const CAMERA_POS_Z = 0;

const CAMERA_LOOKING_AT_X = 0;
const CAMERA_LOOKING_AT_Y = 0;
const CAMERA_LOOKING_AT_Z = 0;

const FOV = 75; 
const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const NEAR_CLIPPING_PLANE = 0.1;
const FAR_CLIPPING_PLANE = 1000;
const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO , NEAR_CLIPPING_PLANE, FAR_CLIPPING_PLANE);

camera.position.set(CAMERA_POS_X, CAMERA_POS_Y, CAMERA_POS_Z);
camera.lookAt(CAMERA_LOOKING_AT_X, CAMERA_LOOKING_AT_Y, CAMERA_LOOKING_AT_Z); 


const RENDER_BACKGROUND_COLOR = 0xffffff;

const renderer = new THREE.WebGLRenderer({antialias: true});   

renderer.setClearColor(RENDER_BACKGROUND_COLOR);


let windowAnimacao = getTargetWindow("productWindow");

const RENDER_WIDTH = windowAnimacao.getBoundingClientRect().width;
const RENDERER_HEIGHT = windowAnimacao.getBoundingClientRect().height;

renderer.setSize(RENDER_WIDTH,RENDERER_HEIGHT);
windowAnimacao.appendChild(renderer.domElement);

const clock = new THREE.Clock(); 

function getTargetWindow(id){ 
    return document.getElementById(id);
}

getTargetWindow("productWindow");


function playAnimation(index) {
    if (!mixer || !animacoes.length) return;
    if (currentAction) currentAction.stop();

    currentAction = mixer.clipAction(animacoes[index]);
    currentAction.play();

}

//carregarModelo("../animations/RecordPlayer.glb")

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(cena, camera);
}

animate();

function carregarModeloAsync(glbPath) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(
            glbPath,
            function(gltf) {
                const model = gltf.scene;
                cena.add(model);

                if (gltf.animations && gltf.animations.length) {
                    mixer = new THREE.AnimationMixer(model);
                    animacoes = gltf.animations;
                }

                resolve(gltf); 
            },
            undefined,
            function(error) {
                reject(error);
            }
        );
    });
}

async function init(path, index) {
    await carregarModeloAsync(path);
    playAnimation(index); 
}

init("../animations/RecordPlayer.glb",0);

