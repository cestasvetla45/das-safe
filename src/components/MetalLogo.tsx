import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export const GROUND_Y = -6
/** Scroll progress at which the descent phase begins (30vh / 120vh). */
export const DESCENT_P = 0.25
/** Scroll progress at which the logo hits the ground (80vh / 120vh). */
export const IMPACT_P = 0.667
export const FLOAT_Y = 0

export interface ImpactState {
  fired: boolean
  /** Clock time (s) when the impact fired. */
  t: number
}

// Exact polygon from the Das Safe logo SVG (viewBox 0 0 1080 979.57).
const LOGO_POINTS: Array<[number, number]> = [
  [871.15, 398.94], [709.71, 679.93], [572.12, 679.92], [572.12, 561.64],
  [633.12, 561.66], [721.72, 407.46], [628.66, 246.22], [628.62, 246.22],
  [448.51, 246.21], [358.28, 403.23], [449.59, 561.63], [507.9, 561.64],
  [507.9, 679.92], [375.25, 679.9], [208.85, 391.24], [373.29, 105.07],
  [701.5, 105.12], [701.55, 105.12],
]

// SVG bounding-box center of the polygon (x: 208.85–871.15, y: 105.07–679.93).
const CENTER_X = 540
const CENTER_Y = 392.5
const SCALE = 0.01

// Subtle, fixed normal-map scale for the brushed-metal effect (see normalMap useMemo below).
const BRUSH_NORMAL_SCALE = new THREE.Vector2(0.6, 0.6)

interface MetalLogoProps {
  progress: React.RefObject<number>
  impact: React.RefObject<ImpactState>
}

export function MetalLogo({ progress, impact }: MetalLogoProps) {
  const group = useRef<THREE.Group>(null)
  const smoothP = useRef(0)
  const rotY = useRef(0)
  const spinSpeed = useRef(0.5)
  const tiltZ = useRef(0)
  const { size } = useThree()

  const { geometry, halfHeight } = useMemo(() => {
    const shape = new THREE.Shape()
    let prev: [number, number] | null = null
    let first = true
    for (const [x, y] of LOGO_POINTS) {
      // Skip near-duplicate consecutive points to keep triangulation clean
      if (prev && Math.hypot(x - prev[0], y - prev[1]) < 0.5) continue
      const px = (x - CENTER_X) * SCALE
      const py = (CENTER_Y - y) * SCALE // flip: SVG y-axis points down
      if (first) {
        shape.moveTo(px, py)
        first = false
      } else {
        shape.lineTo(px, py)
      }
      prev = [x, y]
    }
    shape.closePath()

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.8,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.12,
      bevelSegments: 6,
    })
    geometry.center()
    geometry.computeBoundingBox()
    return { geometry, halfHeight: geometry.boundingBox!.max.y }
  }, [])

  // Procedural brushed-metal normal map: a flat-normal base with many thin,
  // low-opacity horizontal streaks nudging the green channel to fake anisotropic brushing.
  const normalMap = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = 'rgb(128, 128, 255)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const streakCount = 1200
    for (let i = 0; i < streakCount; i++) {
      const y = Math.floor(Math.random() * canvas.height)
      const x = Math.floor(Math.random() * canvas.width)
      const length = 20 + Math.random() * 200
      const green = 100 + Math.floor(Math.random() * 56) // 100–156
      ctx.strokeStyle = `rgba(128, ${green}, 255, 0.25)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, y + 0.5)
      ctx.lineTo(Math.min(x + length, canvas.width), y + 0.5)
      ctx.stroke()
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(3, 3)
    return tex
  }, [])

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const baseScale = size.width < 640 ? 0.65 : 0.95
    const hh = halfHeight * baseScale
    const settleY = GROUND_Y + hh

    const sp = (smoothP.current = THREE.MathUtils.damp(
      smoothP.current,
      progress.current ?? 0,
      12,
      dt,
    ))
    const im = impact.current

    const descent = THREE.MathUtils.clamp((sp - DESCENT_P) / (IMPACT_P - DESCENT_P), 0, 1)
    if (descent >= 1 && !im.fired) {
      im.fired = true
      im.t = t
    }
    if (im.fired && sp < IMPACT_P - 0.06) {
      im.fired = false
    }

    let y: number
    let squashY = 1
    let squashXZ = 1

    if (im.fired) {
      const elapsed = t - im.t
      const k = Math.min(elapsed / 0.35, 1)
      const pulse = Math.sin(k * Math.PI)
      squashY = 1 - 0.13 * pulse
      squashXZ = 1 + 0.07 * pulse
      // Keep the bottom edge on the ground while squashing
      y = GROUND_Y + hh * squashY
      tiltZ.current = THREE.MathUtils.damp(tiltZ.current, 0.12, 5, dt)
      spinSpeed.current = THREE.MathUtils.damp(spinSpeed.current, 0.12, 6, dt)
    } else {
      const fall = descent * descent // ease-in: accelerates like gravity
      const bob = Math.sin(t * 1.5) * 0.12 * (1 - descent)
      y = FLOAT_Y + (settleY - FLOAT_Y) * fall + bob
      tiltZ.current = THREE.MathUtils.damp(tiltZ.current, 0, 8, dt)
      spinSpeed.current = 0.5 + 9 * fall
    }

    rotY.current += spinSpeed.current * dt

    g.position.y = y
    g.rotation.order = 'ZYX' // apply the impact tilt in world space, after the spin
    g.rotation.set(0, rotY.current, tiltZ.current)
    g.scale.set(baseScale * squashXZ, baseScale * squashY, baseScale * squashXZ)
  })

  return (
    <group ref={group} position={[0, FLOAT_Y, 0]}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#b8c0c8"
          metalness={1.0}
          roughness={0.35}
          envMapIntensity={2.0}
          clearcoat={0.15}
          clearcoatRoughness={0.6}
          normalMap={normalMap}
          normalScale={BRUSH_NORMAL_SCALE}
        />
      </mesh>
    </group>
  )
}
