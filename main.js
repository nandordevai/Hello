import * as THREE from 'three';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer(
  {
    antialias: true,
    alpha: true,
  }
);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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

const matLine = new LineMaterial({
  color: 0xff33cc,
  linewidth: 8,
  resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
});

const hello = new LineSegments2(geometry, matLine);
scene.add(hello);

camera.position.z = 3.5;

function animate(time) {
  // cubeRight.rotation.y = time * 0.001;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
