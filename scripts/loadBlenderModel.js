import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';




let cena = new THREE.Scene(); //Criar cena


//Criar uma ligh source

const LIGHT_POS_X = 0;
const LIGHT_POS_Y = 0;
const LIGHT_POS_Z = 0;


const LIGHT_COLOR = 0xffffff;
const LIGHT_INTENSITY = 2;
const light = new THREE.DirectionalLight(LIGHT_COLOR, LIGHT_INTENSITY);

light.position.set(LIGHT_POS_X, LIGHT_POS_Y, LIGHT_POS_Z);
cena.add(light);


//Criar Luz ambiente
const AMBIENT_COLOR = 0xffffff;
const AMBIENT_INTENSITY = 1;
const ambient = new THREE.AmbientLight(AMBIENT_COLOR, AMBIENT_INTENSITY);
cena.add(ambient);


//Criar câmera
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



//Criar renderer
const RENDER_BACKGROUND_COLOR = 0xffffff;

const renderer = new THREE.WebGLRenderer({antialias: true});   

renderer.setClearColor(RENDER_BACKGROUND_COLOR);

//Janela do Produto
let windowProduct = getTargetWindow("productWindow");

const RENDER_WIDTH = windowProduct.getBoundingClientRect().width;
const RENDERER_HEIGHT = windowProduct.getBoundingClientRect().height;

renderer.setSize(RENDER_WIDTH,RENDERER_HEIGHT);
windowProduct.appendChild(renderer.domElement);

const clock = new THREE.Clock(); 


//Criar controlos para mover a camera
let controlo = new OrbitControls(camera, windowProduct);
controlo.enableDamping = true; // suaviza o movimento


function getTargetWindow(id){ 
    return document.getElementById(id);
}

//Array que vai guardar partes do modelo

let partes = []

//Carregar modelo


const CAMINHO_MODELO = '../modelos/RecordPlayer.glb' 

async function carregarModelo(glbPath) {
  const loader = new GLTFLoader();

  try {
    const gltf = await loader.loadAsync(glbPath);
    cena.add(gltf.scene);

    gltf.scene.traverse(function (obj) {
      if (obj.isMesh) {
        }
      
    });

    
    return gltf; // in case you want to use it later

  } catch (erro) {
    console.error('Erro ao carregar modelo:', erro);
  }
}


await carregarModelo(CAMINHO_MODELO);

function desenhar() {
  requestAnimationFrame(desenhar);
  controlo.update(); // atualiza o controlo da câmara
  renderer.render(cena, camera);
}



desenhar();