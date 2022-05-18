function getLine ({ vectorPoint1, vectorPoint2, color }) {
  // const material = new THREE.LineBasicMaterial({ color });
  const material = new THREE.LineDashedMaterial({ color, dashSize: 1 });
  const points = [];
  points.push(vectorPoint1);
  points.push(vectorPoint2);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // return new THREE.Line(geometry, material);

  const line = new THREE.Line(geometry, material);
  line.computeLineDistances();

  return line;
}

function getDashLinePlane ({ division, gridSize, color }) {
  const group = new THREE.Object3D();
  const limit = division * gridSize;
  for (let i=0; i<=division; i++) {
    const xz = i * gridSize;
    const verticalLine = getLine({
      vectorPoint1: new THREE.Vector3(0, 0, xz),
      vectorPoint2: new THREE.Vector3(limit, 0, xz),
      color
    });
    group.add(verticalLine);
    const horizontalLine = getLine({
      vectorPoint1: new THREE.Vector3(xz, 0, 0),
      vectorPoint2: new THREE.Vector3(xz, 0, limit),
      color
    });
    group.add(horizontalLine);
  }

  const halfLimit = limit / 2;
  group.position.set(-halfLimit, 0, -halfLimit);

  return group;
}

function getGridPlane({ division, gridSize, color }) {
  const group = new THREE.Object3D();
  const limit = division * gridSize;
  const geometry = new THREE.PlaneGeometry(limit, limit);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
    opacity: 0.5,
    transparent: true
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.set(Math.PI/2, 0, 0);
  group.add(plane);

  const dashLinePlane = getDashLinePlane({ division, gridSize, color })
  group.add(dashLinePlane);

  return group
}
