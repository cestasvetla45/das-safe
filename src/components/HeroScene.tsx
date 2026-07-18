import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import { MetalLogo, DESCENT_P, IMPACT_P, GROUND_Y } from './MetalLogo'
import type { ImpactState } from './MetalLogo'
import { Ground } from './Ground'
import { ImpactEffects } from './ImpactEffects'

interface HeroSceneProps {
  progress: React.RefObject<number>
}

function CameraRig({ progress, impact }: HeroSceneProps & { impact: React.RefObject<ImpactState> }) {
  const smoothP = useRef(0)

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const sp = (smoothP.current = THREE.MathUtils.damp(
      smoothP.current,
      progress.current ?? 0,
      12,
      dt,
    ))
    const descent = THREE.MathUtils.clamp((sp - DESCENT_P) / (IMPACT_P - DESCENT_P), 0, 1)
    const e = descent * descent

    let cx = 0
    let cy = 0 + (GROUND_Y + 1.5 - 0) * e
    const cz = 14 - 1.5 * e
    let lookY = 0 + (GROUND_Y + 2.5 - 0) * e

    // Impact camera shake: short, small, decaying
    const im = impact.current
    if (im.fired) {
      const elapsed = t - im.t
      if (elapsed < 0.4) {
        const mag = 0.12 * (1 - elapsed / 0.4)
        cx += Math.sin(t * 91) * mag * 0.7
        cy += Math.sin(t * 73 + 1.3) * mag
      }
    }

    state.camera.position.set(cx, cy, cz)
    state.camera.lookAt(0, lookY, 0)
  })

  return null
}

export function HeroScene({ progress }: HeroSceneProps) {
  const impact = useRef<ImpactState>({ fired: false, t: 0 })

  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      camera={{ fov: 35, position: [0, 0, 14], near: 0.1, far: 300 }}
    >
      <color attach="background" args={['#000000']} />
      {/* Fade the floor into black before the horizon line becomes visible */}
      <fog attach="fog" args={['#000000', 19, 55]} />

      <ambientLight intensity={0.15} />
      {/*
        three@0.180 uses physically-correct light units (candela for point/spot lights),
        so intensities that read well under the old (pre-r155) model would be near-invisible
        here. Convention chosen for this scene: keep decay={0} on all point/spot lights so
        intensity behaves like the legacy, distance-independent brightness scale — this lets
        us use the same small, human-tunable intensity values as the directional lights below
        instead of physically "correct" but visually opaque four-figure candela values.
      */}
      {/* Key light */}
      <spotLight
        position={[5, 8, 6]}
        intensity={3}
        angle={0.5}
        penumbra={0.8}
        decay={0}
      />
      {/* Cool rim light from behind */}
      <directionalLight position={[-8, 3, -8]} intensity={2} color="#4a6fa5" />
      {/* Warm fill */}
      <directionalLight position={[8, 2, 4]} intensity={0.8} color="#ffd9b0" />
      {/* Ground bounce */}
      <pointLight position={[0, -5, 0]} intensity={0.5} color="#1a1a2e" decay={0} />

      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      <MetalLogo progress={progress} impact={impact} />
      <Ground />
      <ImpactEffects impact={impact} />
      <CameraRig progress={progress} impact={impact} />
    </Canvas>
  )
}
