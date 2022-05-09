function getPlainBlock (col, row, dep) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x888800 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(col, row, dep);

  return cube;
}

function getWireBlock (col, row, dep) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xdddd00, wireframe: true });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(col, row, dep);

  return cube;
}

function getBuildingBlock () {
  const group = new THREE.Object3D();

  for (let row=-1; row<=1; row++) {
    for (let col=-1; col<=1; col++) {
      for (let dep=-1; dep<=1; dep++) {
        if (
          row !== 0 ||
          (Math.abs(col) === 1 && Math.abs(dep) === 1)
        ) {
          group.add(getPlainBlock(col, row, dep));
          group.add(getWireBlock(col, row, dep));
        }
      }
    }
  }

  return group;
}
