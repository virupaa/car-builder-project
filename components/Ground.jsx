import { memo, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { MeshReflectorMaterial, useTexture, Environment } from '@react-three/drei';
import { RepeatWrapping } from 'three';
import * as THREE from 'three';

function Ground(props) {
    const { gl, scene } = useThree();
    const { environment } = props;
    console.log('Ground', environment);
    const roadTexture = useTexture('/assets/images/envmap/Asphalt-040.jpg');
    roadTexture.wrapS = roadTexture.wrapT = RepeatWrapping;
    roadTexture.repeat.set(10, 10);
    roadTexture.anisotropy = gl.capabilities.getMaxAnisotropy();

    useEffect(() => {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(-5, 5, 5);
        scene.add(directionalLight);

        return () => {
            scene.remove(directionalLight);
        };
    }, [scene]);

    return (
        <>
            {console.log('Rendering Environment with:', environment)}
            <Environment key={environment} files={environment} background />
            <mesh name='Road' rotation-x={-Math.PI / 2} position={[0, -0.001, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <MeshReflectorMaterial
                    map={roadTexture}
                    metalness={0}
                    roughness={0.9}
                    clearcoat={1}
                    clearcoatRoughness={0}
                    toneMapped={true}
                    reflectorBlur={[400, 400]}
                />
            </mesh>
            <ambientLight intensity={0.11} />
            <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={2} castShadow />
        </>
    );
}

export default Ground;
