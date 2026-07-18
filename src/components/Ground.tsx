import { MeshReflectorMaterial } from '@react-three/drei'
import { GROUND_Y } from './MetalLogo'

export function Ground() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, GROUND_Y, 0]}>
      <planeGeometry args={[140, 140]} />
      <MeshReflectorMaterial
        blur={[400, 130]}
        resolution={1024}
        mixBlur={1}
        mixStrength={6}
        roughness={0.8}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#0a0a0a"
        metalness={0.5}
        mirror={0.45}
        envMapIntensity={0.15}
      />
    </mesh>
  )
}
