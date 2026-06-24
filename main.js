import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const scene=new THREE.Scene();
scene.background=new THREE.Color(0x87ceeb);

const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

const light=new THREE.DirectionalLight(0xffffff,1);
light.position.set(5,10,5);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,0.6));

const floor=new THREE.Mesh(
 new THREE.PlaneGeometry(100,100),
 new THREE.MeshStandardMaterial()
);
floor.rotation.x=-Math.PI/2;
scene.add(floor);

const enemy=new THREE.Mesh(
 new THREE.BoxGeometry(1,2,1),
 new THREE.MeshStandardMaterial()
);
enemy.position.set(0,1,-10);
scene.add(enemy);

camera.position.y=1.7;

const keys={};
addEventListener('keydown',e=>keys[e.key.toLowerCase()]=true);
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);

document.body.addEventListener('click',()=>{
 document.body.requestPointerLock();
});

addEventListener('mousemove',e=>{
 if(document.pointerLockElement!==document.body)return;
 camera.rotation.y-=e.movementX*0.002;
 camera.rotation.x-=e.movementY*0.002;
});

addEventListener('mousedown',()=>{
 const dir=new THREE.Vector3();
 camera.getWorldDirection(dir);
 const ray=new THREE.Raycaster(camera.position,dir);
 const hit=ray.intersectObject(enemy);
 if(hit.length){
   enemy.position.set(
      (Math.random()-0.5)*20,
      1,
      -5-Math.random()*20
   );
 }
});

function animate(){
 requestAnimationFrame(animate);

 const speed=0.1;
 if(keys['w']) camera.translateZ(-speed);
 if(keys['s']) camera.translateZ(speed);
 if(keys['a']) camera.translateX(-speed);
 if(keys['d']) camera.translateX(speed);

 renderer.render(scene,camera);
}
animate();

addEventListener('resize',()=>{
 camera.aspect=innerWidth/innerHeight;
 camera.updateProjectionMatrix();
 renderer.setSize(innerWidth,innerHeight);
});
