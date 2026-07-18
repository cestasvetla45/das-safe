import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GROUND_Y } from './MetalLogo'
import type { ImpactState } from './MetalLogo'

interface ImpactEffectsProps {
  impact: React.RefObject<ImpactState>
}

export function ImpactEffects({ impact }: ImpactEffectsProps) {
  const ring = useRef<THREE.Mesh>(null)
  const ringMat = useRef<THREE.MeshBasicMaterial>(null)
  const flash = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    const r = ring.current
    const m = ringMat.current
    const f = flash.current
    if (!r || !m || !f) return

    const im = impact.current
    if (!im.fired) {
      m.opacity = 0
      f.intensity = 0
      return
    }

    const elapsed = state.clock.elapsedTime - im.t

    // Dust/shockwave ring expanding outward over ~1s
    const k = Math.min(elapsed / 1.0, 1)
    r.scale.setScalar(0.5 + k * 9)
    m.opacity = 0.55 * (1 - k) ** 1.5

    // Flash: fast attack, slower decay
    f.intensity =
      elapsed < 0.08
        ? (elapsed / 0.08) * 80
        : Math.max(0, 80 * (1 - (elapsed - 0.08) / 0.45))
  })

  return (
    <>
      <mesh ref={ring} rotation-x={-Math.PI / 2} position={[0, GROUND_Y + 0.02, 0]}>
        <ringGeometry args={[0.85, 1, 64]} />
        <meshBasicMaterial
          ref={ringMat}
          color="#aebfd2"
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/*
        Keeps decay={2}: the flash sits ~1-3 units from the logo/ground, where
        inverse-square falloff still reads clearly — decay={0} at intensity 80
        would white out the whole scene at impact.
      */}
      <pointLight
        ref={flash}
        position={[0, GROUND_Y + 0.7, 1.8]}
        distance={25}
        decay={2}
        color="#e8f0ff"
        intensity={0}
      />
    </>
  )
}
