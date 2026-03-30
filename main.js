import * as THREE from 'three';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer(
  {
    antialias: true,
    alpha: true,
  }
);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(2);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xffffff, 0.08);
renderer.setClearColor(0xffffff, 0);
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

const height = 1.9;
const depth = 0.7;
const leftSide = [
  // upper left
  -0, 0.5, 0,           -0.5, 0.5, 0,
  -0.5, 0.5, 0,         -0.5, height, 0,
  -0.5, height, 0,      -1.1, height, depth,
  -1.1, height, depth,  -2.1, height, 0,

  // lower left
  -0, -0.5, 0,          -0.5, -0.5, 0,
  -0.5, -0.5, 0,        -0.5, -height, 0,
  -0.5, -height, 0,     -1.1, -height, depth,
  -1.1, -height, depth, -2.1, -height, 0,

  // vertical
  -1.1, height, depth,      -1.1, -height, depth,
  -1.6, height, depth / 2,  -1.6, -height, depth / 2,
  -2.1, height, 0,          -2.1, -height, 0,
];

const rightSide = leftSide.map((val, index) => {
  if (index % 3 === 0) {
    return val === 0 ? 0 : -val;
  }
  return val;
});

const positions = [...leftSide, ...rightSide];

const geometry = new LineSegmentsGeometry();
geometry.setPositions(positions);

const material = new LineMaterial({
  color: 0xff33cc,
  linewidth: 0.08,
  resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
  worldUnits: true,
  fog: true,
  transparent: true,
});

const hello = new LineSegments2(geometry, material);
hello.position.x = -2;
scene.add(hello);

const controls = new OrbitControls( camera, renderer.domElement );

let startZ = 30;
let endZ = 3;
let progress = 0;
const speed = 0.01;
const startTh = Math.PI * 0.5;

let textLayer = document.querySelector('.overlay');

camera.position.z = -20;

function animate(time) {
  if (progress < 1) {
    textLayer.style.transform = `translateZ(${time * speed * 40}px) rotateY(-${time * speed * 3}deg)`;
    progress += speed;
    const alpha = THREE.MathUtils.smoothstep(progress, 0, 1);
    hello.position.x = 2 * alpha - 2;
    hello.rotation.y = startTh - (startTh * alpha);
    camera.position.z = startZ + (endZ - startZ) * alpha;
  }
  renderer.render(scene, camera);
}

document.body.addEventListener('mousemove', (e) => {
  x = e.clientX / window.innerWidth - 0.5;
  y = e.clientY / window.innerHeight - 0.5;
});

renderer.setAnimationLoop(animate);