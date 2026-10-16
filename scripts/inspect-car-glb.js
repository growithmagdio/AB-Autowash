import fs from 'fs';
import path from 'path';

// Read GLB header and JSON chunk to see nodes and materials
const buffer = fs.readFileSync(path.resolve('public/models/car.glb'));
const magic = buffer.readUInt32LE(0);
const version = buffer.readUInt32LE(4);
const length = buffer.readUInt32LE(8);

const jsonChunkLength = buffer.readUInt32LE(12);
const jsonChunkType = buffer.readUInt32LE(16);
const jsonData = buffer.subarray(20, 20 + jsonChunkLength).toString('utf-8');
const gltf = JSON.parse(jsonData);

console.log('Meshes:', gltf.meshes?.map(m => m.name));
console.log('Nodes:', gltf.nodes?.map(n => n.name));
console.log('Materials:', gltf.materials?.map(m => m.name));
