import { Mesh, MeshPhongMaterial, HemisphereLight, PerspectiveCamera, TextureLoader, Scene, SphereGeometry, WebGLRenderer } from "/build/three.module.js";
// Scene
const canvas = document.getElementById("canvas");
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new Scene();
// Renderer
const renderer = new WebGLRenderer({
    antialias: true,
    canvas: canvas,
});
// Material
const texture = new TextureLoader().load("assets/images/globe/earthmap4k.jpg");
const bumpMap = new TextureLoader().load("assets/images/globe/earthbump4k.jpg");
const material2 = new MeshPhongMaterial({
    // color: 0xffff00 * Math.random(),
    specular: 0x222222,
    shininess: 25,
    bumpMap: bumpMap,
    bumpScale: 1000,
    map: texture,
});
// Cloud Material
const cloudTexture = new TextureLoader().load("assets/images/globe/earthclouds4k.png");
const cloudMaterial = new MeshPhongMaterial({
    // color: 0xffff00 * Math.random(),
    specular: 0x222222,
    shininess: 25,
    transparent: true,
    opacity: 0.8,
    map: cloudTexture,
});
// Geometry radius, width segment, height segment
const geometry = new SphereGeometry(0.5, 14, 14).translate(0, 0.1, 0);
const cloudGeometry = new SphereGeometry(0.51, 14, 14).translate(0, 0.1, 0);
const earth = new Mesh(geometry, material2);
const clouds = new Mesh(cloudGeometry, cloudMaterial);
init();
animate();
function init() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //light
    const light = new HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);
    window.addEventListener("resize", onWindowResize, false);
    earth.position.z = -2;
    clouds.position.z = -2;
    scene.add(earth);
    scene.add(clouds);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
function animate() {
    //requestAnimationFrame(animate);
    renderer.setAnimationLoop(animate);
    earth.rotation.y += 0.001;
    clouds.rotation.y += 0.0015;
    render();
}
function render() {
    renderer.render(scene, camera);
}
