import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { cena, camera, renderer, windowProduct, partes } from './loadBlenderModel.js';

let raycaster = new THREE.Raycaster();
let rato = new THREE.Vector2();

function getFirstObjHit(candidatos) {
    raycaster.setFromCamera(rato, camera)

    let intersetados = raycaster.intersectObjects(candidatos)
    if (intersetados.length > 0) {
        let intersetado = intersetados[0];
        console.log(intersetado.object.name);
        
    }
}

let Largura_Canvas = windowProduct.offsetWidth;
let Altura_Canvas = windowProduct.offsetHeight;

function actOnClickedObject(func, args){ 
    window.addEventListener('click', (evento) => {
        rato.x = (evento.clientX / Largura_Canvas) * 2 - 1;
        rato.y = -(evento.clientY / Altura_Canvas) * 2 + 1;
        func(args);
    });
}

actOnClickedObject(getFirstObjHit, partes);