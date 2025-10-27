// import * as THREE from './libs/three.module.js';
// import { GLTFLoader } from './libs/GLTFLoader.js';


import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import { cena, camera, renderer, misturador, animacoes, controlo} from './loadBlenderModel.js';

//Relogio 
const clock = new THREE.Clock(); 


let currentAction = null;

function playAnimation(nomeAnimacao) {
    if (!misturador || animacoes.size === 0) return;
    if (currentAction) currentAction.stop();

    const clip = animacoes.get(nomeAnimacao);
    if (!clip) return;

    currentAction = misturador.clipAction(clip);
    currentAction.reset(); // optional, start from beginning
    currentAction.setLoop(THREE.LoopOnce, 1);  // play only once
    currentAction.clampWhenFinished = true;
    currentAction.play();
}

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (misturador) misturador.update(delta);
    controlo.update();
    renderer.render(cena, camera);
}

animate();


export { playAnimation };