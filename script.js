const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = () => {
  //create a basic Babylon scene object
  const scene = new BABYLON.Scene(engine);

  // create and position a free camera
  const camera = new BABYLON.ArcRotateCamera("camera",
    -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
  // target the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  // attach the camera to the canvas
  camera.attachControl(canvas, true);

  // create a light
  const light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
  // dim the light
  light.intensity = 0.7;

  const box = BABYLON.MeshBuilder.CreateBox("box", {});
  box.position.y = 0.5;
  const boxMaterial = new BABYLON.StandardMaterial("boxMaterial");
  boxMaterial.diffuseTexture = new BABYLON.Texture("https://www.babylonjs-playground.com/textures/floor.png");
  box.material = boxMaterial;

  const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
    diameter: 1.3,
    height: 1.2,
    tessellation: 3
  });
  roof.scaling.x = 0.75;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;

  const roofMaterial = new BABYLON.StandardMaterial("roofMaterial");
  roofMaterial.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg", scene);
  roof.material = roofMaterial;

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 10,
    height: 10
  });
  const groundMaterial = new BABYLON.StandardMaterial("groundMaterial");
  groundMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);
  ground.material = groundMaterial;

  return scene;
}

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});