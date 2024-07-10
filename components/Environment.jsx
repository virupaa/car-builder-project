import { Environment, AccumulativeShadows, RandomizedLight, Stars } from '@react-three/drei'
import { BackSide, Color } from 'three'
import Ground from './Ground'
import React, { useEffect, useReducer, useState } from 'react'
import Editor from './Editor'
import Cookies from 'js-cookie';

export default function SceneEnvironment({ performanceDegraded }) {
    const [environment, setEnvironment] = useState(() => {
        return Cookies.get('environment') || '/assets/images/ground/skylit_garage_8k.hdr';
    });
    return (
        <>
            {/* Night Sky with Stars */}
            <color attach="background" args={["#000020"]} />
           
            
            {/* <Stars
                radius={100} // Radius of the inner sphere, where stars will be visible
                depth={50} // Depth of the star field
                count={5000} // Number of stars
                factor={2} // Size factor of stars
                saturation={0} // Saturation of star colors
                fade // Fades stars with depth
            /> */}

            <ambientLight intensity={0.3} /> {/* Low ambient light for a night environment */}
            <directionalLight 
                intensity={0.5} 
                position={[2, 5, 2]} 
                castShadow 
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />

            <Environment path={'assets/images/envmap/'} />
            

            <Ground environment={environment} />

            {!performanceDegraded && (
                <AccumulativeShadows temporal scale={10}>
                    <RandomizedLight position={[5, 5, -10]} radius={8} />
                </AccumulativeShadows>
            )}
        </>
    )
}
