<template>
  <div ref="containerRef" class="cyber-dreamscape-bg" aria-hidden="true" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

declare global {
  interface Window { THREE?: any }
}

const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
const GAME_START_DURATION = 2800
const CAMERA_START_Z = 48
const CAMERA_END_Z = 19.5
const CORE_START_SCALE = 0.28
const CORE_END_SCALE = 0.9
const containerRef = ref<HTMLDivElement | null>(null)

let renderer: any
let scene: any
let camera: any
let particles: any
let particleGeometry: any
let particleMaterial: any
let coreGroup: any
let coreMesh: any
let wireMesh: any
let pointLight: any
let ringMeshes: any[] = []
let clock: any
let animationId = 0
let basePositions: Float32Array | null = null
let pointerTargetX = 0
let pointerTargetY = 0
let pointerX = 0
let pointerY = 0
let cameraZ = CAMERA_START_Z
let gameStarted = false
let gameStartTime = 0

function loadThree() {
  if (window.THREE) return Promise.resolve(window.THREE)

  return new Promise<any>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${THREE_CDN}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(window.THREE), { once: true })
      existing.addEventListener('error', reject, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = THREE_CDN
    script.async = true
    script.onload = () => resolve(window.THREE)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

function getParticleCount() {
  return window.matchMedia('(max-width: 720px)').matches ? 1600 : 3600
}

function gaussianRandom() {
  let first = 0
  let second = 0
  while (first === 0) first = Math.random()
  while (second === 0) second = Math.random()
  return Math.sqrt(-2 * Math.log(first)) * Math.cos(Math.PI * 2 * second)
}

function createCore(THREE: any) {
  coreGroup = new THREE.Group()

  const coreGeometry = new THREE.IcosahedronGeometry(4, 1)
  const coreMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x00dff5,
    emissive: 0x005c82,
    emissiveIntensity: 0.72,
    roughness: 0.18,
    metalness: 0.9,
    transparent: true,
    opacity: 1
  })
  coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)

  const wireGeometry = new THREE.IcosahedronGeometry(4.55, 1)
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending
  })
  wireMesh = new THREE.Mesh(wireGeometry, wireMaterial)

  const innerGeometry = new THREE.IcosahedronGeometry(2.15, 0)
  const innerMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd700,
    wireframe: true,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending
  })
  const innerCore = new THREE.Mesh(innerGeometry, innerMaterial)

  const ringSettings = [
    { radius: 6.1, tube: 0.025, x: 1.18, y: 0.2 },
    { radius: 7.1, tube: 0.018, x: 0.45, y: 1.15 },
    { radius: 8.3, tube: 0.014, x: 1.45, y: 0.8 }
  ]

  ringMeshes = ringSettings.map((settings: any, index: number) => {
    const geometry = new THREE.TorusGeometry(settings.radius, settings.tube, 8, 160)
    const material = new THREE.MeshBasicMaterial({
      color: index === 1 ? 0xffd700 : 0x00f0ff,
      transparent: true,
      opacity: index === 1 ? 0.22 : 0.32,
      blending: THREE.AdditiveBlending
    })
    const ring = new THREE.Mesh(geometry, material)
    ring.rotation.x = settings.x
    ring.rotation.y = settings.y
    return ring
  })

  coreGroup.add(coreMesh, wireMesh, innerCore, ...ringMeshes)
  coreGroup.position.z = -1
  coreGroup.renderOrder = 2
  coreGroup.traverse((object: any) => {
    object.renderOrder = 2
  })
  scene.add(coreGroup)

  scene.add(new THREE.AmbientLight(0x8eb8ff, 0.18))
  pointLight = new THREE.PointLight(0x00f0ff, 2.8, 58)
  pointLight.position.set(0, 0, 2)
  coreGroup.add(pointLight)

}

function createParticles(THREE: any) {
  const particleCount = getParticleCount()
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)
  const colorSet = [
    new THREE.Color('#00f0ff'),
    new THREE.Color('#31c7ff'),
    new THREE.Color('#7357ff'),
    new THREE.Color('#ff2f92'),
    new THREE.Color('#ffd76a'),
    new THREE.Color('#ffffff')
  ]

  for (let index = 0; index < particleCount; index += 1) {
    const point = index * 3
    const belongsToNebula = Math.random() < 0.68

    if (belongsToNebula) {
      const radius = 8 + Math.sqrt(Math.random()) * 62
      const angle = Math.random() * Math.PI * 2 + radius * 0.025
      positions[point] = Math.cos(angle) * radius * 1.35 + gaussianRandom() * 2.4
      positions[point + 1] = Math.sin(angle) * radius * 0.68 + gaussianRandom() * 2.2
      positions[point + 2] = -14 - radius * 0.62 - Math.abs(gaussianRandom()) * 7
    } else {
      positions[point] = (Math.random() - 0.5) * 138
      positions[point + 1] = (Math.random() - 0.5) * 80
      positions[point + 2] = -12 - Math.random() * 94
    }

    const color = colorSet[Math.floor(Math.random() * colorSet.length)]
    colors[point] = color.r
    colors[point + 1] = color.g
    colors[point + 2] = color.b

    const sizeRoll = Math.random()
    if (sizeRoll < 0.7) sizes[index] = 0.5 + Math.random() * 1.3
    else if (sizeRoll < 0.95) sizes[index] = 1.8 + Math.random() * 2.1
    else sizes[index] = 4.2 + Math.random() * 3
  }

  basePositions = positions.slice()
  particleGeometry = new THREE.BufferGeometry()
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particleGeometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
  particleGeometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

  particleMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      attribute vec3 aColor;
      attribute float aSize;
      varying vec3 vColor;
      uniform float uTime;
      void main() {
        vColor = aColor;
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        float pulse = 1.0 + sin(uTime * 1.25 + position.x * 0.09 + position.z * 0.05) * 0.13;
        gl_PointSize = aSize * pulse * (88.0 / max(8.0, -viewPosition.z));
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        vec2 centered = gl_PointCoord - vec2(0.5);
        float distanceToCenter = length(centered);
        if (distanceToCenter > 0.5) discard;
        float glow = 1.0 - smoothstep(0.08, 0.5, distanceToCenter);
        float core = 1.0 - smoothstep(0.0, 0.16, distanceToCenter);
        gl_FragColor = vec4(vColor * (0.82 + core * 0.68), glow * 0.94);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })

  particles = new THREE.Points(particleGeometry, particleMaterial)
  particles.frustumCulled = false
  particles.renderOrder = 0
  scene.add(particles)
}

function initScene(THREE: any) {
  const container = containerRef.value
  if (!container) return

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x070514, 0.011)
  camera = new THREE.PerspectiveCamera(64, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = cameraZ

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setClearColor(0x070514, 1)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.domElement.className = 'cyber-dreamscape-canvas'
  container.appendChild(renderer.domElement)

  createCore(THREE)
  createParticles(THREE)
  clock = new THREE.Clock()
  animate()
}

function animate() {
  animationId = window.requestAnimationFrame(animate)
  if (!renderer || !scene || !camera || !particles || !basePositions || !coreGroup) return

  const elapsed = clock.getElapsedTime()
  particleMaterial.uniforms.uTime.value = elapsed
  const positions = particles.geometry.attributes.position.array as Float32Array

  for (let index = 0; index < positions.length; index += 3) {
    const baseX = basePositions[index]
    const baseY = basePositions[index + 1]
    const baseZ = basePositions[index + 2]
    positions[index + 1] = baseY + Math.sin(elapsed * 1.55 + baseX * 0.045 + baseZ * 0.025) * 1.05
  }
  particles.geometry.attributes.position.needsUpdate = true

  pointerX += (pointerTargetX - pointerX) * 0.065
  pointerY += (pointerTargetY - pointerY) * 0.065
  const startProgress = gameStarted
    ? Math.min((performance.now() - gameStartTime) / GAME_START_DURATION, 1)
    : 0
  const cameraProgress = Math.min(startProgress / 0.78, 1)
  const easedCameraProgress = cameraProgress < 0.5
    ? 4 * Math.pow(cameraProgress, 3)
    : 1 - Math.pow(-2 * cameraProgress + 2, 3) / 2
  const coreProgress = Math.max(0, Math.min((startProgress - 0.32) / 0.68, 1))
  const easedCoreProgress = 1 - Math.pow(1 - coreProgress, 3)
  const tunnelPulse = Math.sin(Math.PI * Math.min(startProgress / 0.82, 1))
  cameraZ = CAMERA_START_Z + (CAMERA_END_Z - CAMERA_START_Z) * easedCameraProgress

  camera.position.x = pointerX * 6.6
  camera.position.y = -pointerY * 4.8
  camera.position.z = cameraZ + Math.abs(pointerX) * 1.15
  camera.lookAt(pointerX * -0.65, pointerY * 0.5, -3)

  particles.position.x = 0
  particles.position.y = 0
  particles.scale.setScalar(1 + tunnelPulse * 0.2)
  particles.rotation.y = 0
  particles.rotation.x = 0
  particles.rotation.z = elapsed * 0.0015

  coreGroup.position.x = pointerX * -1.5
  coreGroup.position.y = Math.sin(elapsed * 0.82) * 0.7 + pointerY * 1.15
  coreGroup.scale.setScalar(CORE_START_SCALE + (CORE_END_SCALE - CORE_START_SCALE) * easedCoreProgress)
  coreGroup.rotation.y = elapsed * 0.2 + pointerX * 0.22
  coreGroup.rotation.x = Math.sin(elapsed * 0.48) * 0.18 + pointerY * 0.12
  coreMesh.rotation.z = -elapsed * 0.08
  wireMesh.rotation.z = elapsed * 0.13
  wireMesh.scale.setScalar(1 + Math.sin(elapsed * 2.1) * 0.025)
  pointLight.intensity = 2.6 + Math.sin(elapsed * 3) * 0.7

  ringMeshes.forEach((ring, index) => {
    ring.rotation.z += 0.0016 * (index % 2 === 0 ? 1 : -1)
    ring.rotation.y += 0.0008 * (index + 1)
  })

  renderer.render(scene, camera)
}

function handlePointerMove(event: PointerEvent) {
  pointerTargetX = (event.clientX / window.innerWidth - 0.5) * 2
  pointerTargetY = (event.clientY / window.innerHeight - 0.5) * 2
}

function handleGameStart() {
  if (gameStarted) return
  gameStarted = true
  gameStartTime = performance.now()
}

function handleResize() {
  if (!renderer || !camera) return
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(async () => {
  window.addEventListener('catto-game-start', handleGameStart)

  try {
    const THREE = await loadThree()
    initScene(THREE)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('resize', handleResize)
  } catch {
    containerRef.value?.classList.add('is-fallback')
  }
})

onUnmounted(() => {
  window.cancelAnimationFrame(animationId)
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('catto-game-start', handleGameStart)

  scene?.traverse((object: any) => {
    object.geometry?.dispose?.()
    if (Array.isArray(object.material)) object.material.forEach((item: any) => item.dispose?.())
    else object.material?.dispose?.()
  })
  renderer?.dispose()
  renderer?.domElement?.remove()
})
</script>

<style scoped>
.cyber-dreamscape-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: #070514;
}

.cyber-dreamscape-bg::before,
.cyber-dreamscape-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.cyber-dreamscape-bg::before {
  background:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 240, 255, 0.02) 1px, transparent 1px);
  background-size: 100% 5px, 82px 82px;
  mix-blend-mode: screen;
  opacity: 0.46;
}

.cyber-dreamscape-bg::after {
  background: radial-gradient(circle at 50% 50%, transparent 0 31%, rgba(7, 5, 20, 0.12) 61%, rgba(7, 5, 20, 0.66) 100%);
}

.cyber-dreamscape-bg.is-fallback {
  background: radial-gradient(circle at 50% 43%, rgba(0, 240, 255, 0.18), transparent 23rem), #070514;
}

:deep(.cyber-dreamscape-canvas) {
  position: absolute;
  inset: 0;
  width: 100% !important;
  height: 100% !important;
}

@media (prefers-reduced-motion: reduce) {
  :deep(.cyber-dreamscape-canvas) { opacity: 0.7; }
}
</style>
