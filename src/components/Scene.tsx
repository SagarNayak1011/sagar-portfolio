import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Html, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { av } from '../data'

const orbiters = [av.profile, av.education, av.projects, av.contact]

function Avatar({ src, color, label, href, px, ring = false }: { src: string; color: string; label: string; href: string; px: number; ring?: boolean }) {
  return (
    <a
      href={href}
      aria-label={`Go to ${label}`}
      className="group block rounded-full outline-none transition-transform duration-300 hover:scale-110 focus-visible:scale-110"
      style={{ width: px, height: px }}
    >
      <span
        className="block h-full w-full rounded-full p-[3px]"
        style={{ background: `conic-gradient(${color}, #fff3, ${color})`, boxShadow: `0 0 ${ring ? 50 : 28}px -4px ${color}` }}
      >
        <img src={src} alt={`Illustrated avatar of Sagar — ${label}`} draggable={false} className="h-full w-full rounded-full object-cover" />
      </span>
      {!ring && (
        <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          {label}
        </span>
      )}
    </a>
  )
}

function Orbiter({ i, r, px }: { i: number; r: number; px: number }) {
  const a = orbiters[i]
  const anchor = useRef<THREE.Group>(null!)
  const box = useRef<HTMLDivElement>(null)
  const v = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    anchor.current.getWorldPosition(v)
    const k = THREE.MathUtils.clamp((v.z + r) / (2 * r), 0, 1)
    if (box.current) {
      box.current.style.transform = `scale(${0.68 + 0.32 * k})`
      box.current.style.opacity = String(0.5 + 0.5 * k)
    }
  })
  const ang = (i / orbiters.length) * Math.PI * 2
  return (
    <group ref={anchor} position={[Math.cos(ang) * r, 0, Math.sin(ang) * r]}>
      <Html center zIndexRange={[30, 0]}>
        <div ref={box} className="relative">
          <Avatar {...a} px={px} />
        </div>
      </Html>
    </group>
  )
}

function World() {
  const { viewport, size } = useThree()
  const root = useRef<THREE.Group>(null!)
  const orbit = useRef<THREE.Group>(null!)
  const ringA = useRef<THREE.Mesh>(null!)
  const ringB = useRef<THREE.Mesh>(null!)

  const centerPx = THREE.MathUtils.clamp(size.width * 0.3, 120, 190)
  const orbPx = THREE.MathUtils.clamp(size.width * 0.17, 62, 96)
  const unit = viewport.width / size.width
  const sphereR = centerPx * unit * 0.78
  const r = Math.min(3.3, viewport.width * 0.42)

  useFrame((s, d) => {
    orbit.current.rotation.y += d * 0.28
    ringA.current.rotation.z += d * 0.25
    ringB.current.rotation.x += d * 0.2
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, s.pointer.x * 0.35, 0.05)
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, 0.78 - s.pointer.y * 0.2, 0.05)
  })

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 4, 6]} intensity={60} color="#22e5ea" />
      <pointLight position={[-6, -3, 5]} intensity={60} color="#9d5cff" />
      <pointLight position={[0, -6, 4]} intensity={40} color="#ff6b5c" />

      <group ref={root}>
        <mesh position={[0, 0, -0.8]}>
          <icosahedronGeometry args={[sphereR, 24]} />
          <MeshDistortMaterial color="#6d3dff" emissive="#2b1a7a" distort={0.26} speed={1.8} roughness={0.2} metalness={0.6} />
        </mesh>
        <mesh ref={ringA} rotation={[1.2, 0, 0]}>
          <torusGeometry args={[sphereR * 1.28, 0.03, 16, 120]} />
          <meshStandardMaterial color="#22e5ea" emissive="#22e5ea" emissiveIntensity={1.4} />
        </mesh>
        <mesh ref={ringB} rotation={[0, 0.6, 0.8]}>
          <torusGeometry args={[sphereR * 1.45, 0.025, 16, 120]} />
          <meshStandardMaterial color="#ff6b5c" emissive="#ff6b5c" emissiveIntensity={1.2} />
        </mesh>

        <Html center zIndexRange={[20, 0]}>
          <Avatar {...av.working} px={centerPx} ring />
        </Html>

        <group ref={orbit}>
          {orbiters.map((_, i) => (
            <Orbiter key={i} i={i} r={r} px={orbPx} />
          ))}
        </group>

        <Float speed={2} floatIntensity={1.5}>
          <mesh position={[-r * 1.05, r * 0.8, -1]}>
            <octahedronGeometry args={[0.32]} />
            <meshStandardMaterial color="#ff6b5c" emissive="#ff6b5c" emissiveIntensity={0.6} roughness={0.2} />
          </mesh>
        </Float>
        <Float speed={1.6} floatIntensity={1.8}>
          <mesh position={[r * 1.05, -r * 0.75, -0.5]}>
            <icosahedronGeometry args={[0.3]} />
            <meshStandardMaterial color="#2ee6a6" emissive="#2ee6a6" emissiveIntensity={0.6} roughness={0.2} />
          </mesh>
        </Float>
        <Float speed={2.4} floatIntensity={1.2}>
          <mesh position={[r * 0.9, r * 0.85, -1.5]}>
            <torusGeometry args={[0.28, 0.09, 16, 40]} />
            <meshStandardMaterial color="#ffb020" emissive="#ffb020" emissiveIntensity={0.5} roughness={0.2} />
          </mesh>
        </Float>
      </group>

      <Sparkles count={70} scale={[viewport.width, viewport.height, 4]} size={3} speed={0.4} color="#9fefff" />
    </>
  )
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <World />
    </Canvas>
  )
}
