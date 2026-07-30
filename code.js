import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.170/examples/jsm/controls/OrbitControls.js";

const scene=new THREE.Scene();
scene.background=new THREE.Color(0xf2f2f2);

const camera=new THREE.PerspectiveCamera(
55,
window.innerWidth/window.innerHeight,
0.1,
100
);

camera.position.set(0,1.8,5);

const renderer=new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;
renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild(renderer.domElement);

const controls=new OrbitControls(camera,renderer.domElement);

controls.enableDamping=true;

scene.add(new THREE.AmbientLight(0xffffff,.8));

const sun=new THREE.DirectionalLight(0xffffff,2.5);

sun.position.set(6,8,5);

sun.castShadow=true;

scene.add(sun);

const floor=new THREE.Mesh(

new THREE.CircleGeometry(12,80),

new THREE.ShadowMaterial({
opacity:.22
})

);

floor.rotation.x=-Math.PI/2;
floor.position.y=-1.6;
floor.receiveShadow=true;

scene.add(floor);

const plastic=new THREE.MeshPhysicalMaterial({

color:0x111111,

roughness:.55,

metalness:.15,

clearcoat:.25,

clearcoatRoughness:.4

});

const rubber=new THREE.MeshPhysicalMaterial({

color:0x090909,

roughness:.95,

metalness:0

});

const buttonMaterial=new THREE.MeshPhysicalMaterial({

color:0x232323,

roughness:.3,

metalness:.35

});

const whiteMaterial=new THREE.MeshPhysicalMaterial({

color:0xffffff,

roughness:.15,

metalness:.25

});

function roundedBox(x,y,z,r){

return new THREE.BoxGeometry(x,y,z,8,8,8);

}

function capsule(radius,length){

return new THREE.CapsuleGeometry(radius,length,12,24);

}

function makeButton(r){

return new THREE.Mesh(

new THREE.CylinderGeometry(r,r,.03,32),

buttonMaterial

);

}

function makeThumbStick(){

const g=new THREE.Group();

const base=new THREE.Mesh(

new THREE.CylinderGeometry(.12,.14,.05,48),

rubber

);

g.add(base);

const stick=new THREE.Mesh(

new THREE.CylinderGeometry(.05,.05,.08,32),

rubber

);

stick.position.y=.05;

g.add(stick);

const cap=new THREE.Mesh(

new THREE.SphereGeometry(.085,32,32),

rubber

);

cap.position.y=.11;

g.add(cap);

return g;

}

function createController(side){

const g=new THREE.Group();

g.position.x=side*1.05;

scene.add(g);

return g;

}

const leftController=createController(-1);
const rightController=createController(1);

function animate(){

requestAnimationFrame(animate);

controls.update();

renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

camera.aspect=innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});