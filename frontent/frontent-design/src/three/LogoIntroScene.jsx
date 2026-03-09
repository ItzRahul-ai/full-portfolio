import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import logoTextureUrl from '@/assets/logo.jpeg'

function pseudoRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453123
  return value - Math.floor(value)
}

function LogoCard() {
  const meshRef = useRef(null)
  const texture = useLoader(TextureLoader, logoTextureUrl)

  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.45
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.18
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2.2, 2.2, 0.22]} />
      <meshStandardMaterial map={texture} emissive="#5ab2ff" emissiveIntensity={0.5} roughness={0.32} />
    </mesh>
  )
}

function RingOrbit() {
  const ringRef = useRef(null)

  useFrame((state, delta) => {
    if (!ringRef.current) return
    ringRef.current.rotation.z += delta * 0.6
    ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.22
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[2.9, 0.05, 24, 120]} />
      <meshBasicMaterial color="#79d0ff" />
    </mesh>
  )
}

function ParticleCloud() {
  const cloudRef = useRef(null)
  const particles = useMemo(() => {
    const count = 380
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const radius = 2.6 + pseudoRandom(i + 0.13) * 2
      const theta = pseudoRandom(i + 0.26) * Math.PI * 2
      const phi = Math.acos(2 * pseudoRandom(i + 0.57) - 1)
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return positions
  }, [])

  useFrame((_, delta) => {
    if (!cloudRef.current) return
    cloudRef.current.rotation.y += delta * 0.05
    cloudRef.current.rotation.x -= delta * 0.03
  })

  return (
    <points ref={cloudRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8fd5ff" size={0.04} sizeAttenuation transparent opacity={0.82} />
    </points>
  )
}

function LogoIntroScene() {
  const dpr = useMemo(() => (window.innerWidth < 768 ? [1, 1.3] : [1, 1.7]), [])

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={dpr}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={0.8} />
      <directionalLight intensity={1} position={[4, 4, 2]} />
      <pointLight position={[0, 0, 2]} intensity={0.7} color="#76c9ff" />
      <RingOrbit />
      <LogoCard />
      <ParticleCloud />
    </Canvas>
  )
}

export default LogoIntroScene
