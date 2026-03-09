import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function pseudoRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453123
  return value - Math.floor(value)
}

function ParticleField({ count = 1200, size = 0.02, radius = 28, speed = 0.02 }) {
  const pointsRef = useRef(null)
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const randomRadius = radius * Math.pow(pseudoRandom(i + 0.19), 0.45)
      const theta = pseudoRandom(i + 0.31) * Math.PI * 2
      const phi = Math.acos(2 * pseudoRandom(i + 0.73) - 1)
      array[i * 3] = randomRadius * Math.sin(phi) * Math.cos(theta)
      array[i * 3 + 1] = randomRadius * Math.sin(phi) * Math.sin(theta)
      array[i * 3 + 2] = randomRadius * Math.cos(phi)
    }
    return array
  }, [count, radius])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * speed
    pointsRef.current.rotation.x -= delta * speed * 0.4
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#91d6ff" size={size} sizeAttenuation transparent opacity={0.82} depthWrite={false} />
    </points>
  )
}

function SceneContent({ mobile }) {
  const objectRef = useRef(null)
  const clusterRef = useRef(null)
  const smoothedProgress = useRef(0)

  useFrame((state, delta) => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight
    const rawProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0
    smoothedProgress.current = THREE.MathUtils.damp(smoothedProgress.current, rawProgress, 6, delta)

    const angle = smoothedProgress.current * Math.PI * 2
    const radius = mobile ? 3.2 : 4.4
    state.camera.position.x = Math.sin(angle) * radius
    state.camera.position.z = Math.cos(angle) * radius + 3.8 - smoothedProgress.current * 1.5
    state.camera.position.y = 1.4 + Math.sin(angle * 0.8) * 0.9
    state.camera.lookAt(0, 0, 0)

    if (objectRef.current) {
      objectRef.current.rotation.x += delta * 0.18
      objectRef.current.rotation.y += delta * 0.3
      objectRef.current.scale.setScalar(1 + smoothedProgress.current * 0.22)
    }

    if (clusterRef.current) {
      clusterRef.current.rotation.y -= delta * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={0.95} />
      <pointLight position={[-4, -1, -2]} intensity={0.8} color="#5aaeff" />

      <group ref={clusterRef}>
        <mesh ref={objectRef}>
          <torusKnotGeometry args={[1.1, 0.32, 180, 22]} />
          <meshStandardMaterial color="#6bb8ff" metalness={0.72} roughness={0.24} />
        </mesh>

        <mesh position={[2.6, -1, -1.5]} rotation={[0.5, 0.2, 0.4]}>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial color="#8f9eff" metalness={0.48} roughness={0.3} />
        </mesh>

        <mesh position={[-2.6, 0.8, -0.7]} rotation={[0.3, 0.6, 0.2]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#3dd2bf" metalness={0.52} roughness={0.38} />
        </mesh>
      </group>

      <ParticleField count={mobile ? 900 : 1450} size={mobile ? 0.015 : 0.018} radius={32} speed={0.017} />
      <ParticleField count={mobile ? 350 : 520} size={mobile ? 0.045 : 0.055} radius={52} speed={0.008} />
    </>
  )
}

function SpaceBackground() {
  const mobile = useMemo(() => window.innerWidth < 768, [])
  const dpr = mobile ? [1, 1.2] : [1, 1.6]

  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-90">
      <Canvas dpr={dpr} camera={{ fov: 50, position: [0, 0, 5] }} gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <SceneContent mobile={mobile} />
      </Canvas>
    </div>
  )
}

export default SpaceBackground
