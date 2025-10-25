// import * as THREE from './libs/three.module.js';
// import { GLTFLoader } from './libs/GLTFLoader.js';


import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
import { cena, camera, renderer} from './loadBlenderModel.js';

//Relogio 
const clock = new THREE.Clock(); 


function playAnimation(index) {
    if (!mixer || !animacoes.length) return;
    if (currentAction) currentAction.stop();

    currentAction = mixer.clipAction(animacoes[index]);
    currentAction.play();

}

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(cena, camera);
}

//animate();



