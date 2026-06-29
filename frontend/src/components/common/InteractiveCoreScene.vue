<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { coreThemeColors, type CoreMode, type CoreTheme } from '../../data/coreNavigation'

const props = defineProps<{ mode: CoreMode; theme: CoreTheme }>()
const emit = defineEmits<{
  'core-click': []
  'core-hover': [hovered: boolean]
  'hold-progress': [progress: number]
  'hold-complete': []
  'intro-complete': []
  'menu-ready': []
  'webgl-failed': []
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const isHovered = ref(false)
const isHudMode = computed(() => ['transitioning', 'radar', 'terminal'].includes(props.mode))
const isRaisedMode = computed(() => ['menu', 'transitioning', 'radar', 'terminal'].includes(props.mode))
const isHidden = computed(() => props.mode === 'hidden')

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let coreAnchor: THREE.Group
let coreGroup: THREE.Group
let coreMesh: THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshPhysicalMaterial>
let wireMesh: THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshBasicMaterial>
let hitMesh: THREE.Mesh
let pointLight: THREE.PointLight
let particles: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>
let particleMaterial: THREE.ShaderMaterial
let basePositions: Float32Array
let ringMeshes: Array<THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>> = []
let clock: THREE.Clock
let frameId = 0
let timeline: gsap.core.Timeline | undefined
let pointerX = 0
let pointerY = 0
let targetX = 0
let targetY = 0
let pointerDown: { id: number; x: number; y: number } | null = null
let holdStartedAt = 0
let holdTriggered = false
let lastHoldProgress = -1
let initialized = false

const raycaster = new THREE.Raycaster()
const pointerNdc = new THREE.Vector2()
const interactionScale = { value: 1 }
const spin = { value: 1 }

function gaussianRandom() {
  let a = 0
  let b = 0
  while (!a) a = Math.random()
  while (!b) b = Math.random()
  return Math.sqrt(-2 * Math.log(a)) * Math.cos(Math.PI * 2 * b)
}

function createCore() {
  coreAnchor = new THREE.Group()
  coreAnchor.position.z = -1
  coreGroup = new THREE.Group()

  const material = new THREE.MeshPhysicalMaterial({
    color: 0x00dff5,
    emissive: 0x005c82,
    emissiveIntensity: 0.72,
    roughness: 0.18,
    metalness: 0.9,
    transparent: true,
    opacity: 1
  })
  coreMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(4, 1), material)
  wireMesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry(4.55, 1),
    new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending })
  )
  const innerCore = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.15, 0),
    new THREE.MeshBasicMaterial({ color: 0xffd700, wireframe: true, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending })
  )
  ringMeshes = [
    { radius: 6.1, tube: 0.025, x: 1.18, y: 0.2 },
    { radius: 7.1, tube: 0.018, x: 0.45, y: 1.15 },
    { radius: 8.3, tube: 0.014, x: 1.45, y: 0.8 }
  ].map((item, index) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(item.radius, item.tube, 8, 160),
      new THREE.MeshBasicMaterial({ color: index === 1 ? 0xffd700 : 0x00f0ff, transparent: true, opacity: index === 1 ? 0.22 : 0.32, blending: THREE.AdditiveBlending })
    )
    ring.rotation.set(item.x, item.y, 0)
    return ring
  })
  hitMesh = new THREE.Mesh(
    new THREE.SphereGeometry(5.15, 18, 18),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false })
  )
  coreGroup.add(coreMesh, wireMesh, innerCore, ...ringMeshes, hitMesh)
  coreAnchor.add(coreGroup)
  coreAnchor.traverse((object) => { object.renderOrder = 2 })
  scene.add(coreAnchor)

  scene.add(new THREE.AmbientLight(0x8eb8ff, 0.18))
  pointLight = new THREE.PointLight(0x00f0ff, 2.8, 58)
  pointLight.position.set(0, 0, 2)
  coreGroup.add(pointLight)
}

function createParticles() {
  const count = window.matchMedia('(max-width: 720px)').matches ? 1600 : 3600
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const palette = ['#00f0ff', '#31c7ff', '#7357ff', '#ff2f92', '#ffd76a', '#ffffff'].map((value) => new THREE.Color(value))

  for (let index = 0; index < count; index += 1) {
    const point = index * 3
    if (Math.random() < 0.68) {
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
    const color = palette[Math.floor(Math.random() * palette.length)]
    colors.set([color.r, color.g, color.b], point)
    const roll = Math.random()
    sizes[index] = roll < 0.7 ? 0.5 + Math.random() * 1.3 : roll < 0.95 ? 1.8 + Math.random() * 2.1 : 4.2 + Math.random() * 3
  }

  basePositions = positions.slice()
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  particleMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uOpacity: { value: 1 } },
    vertexShader: `
      attribute vec3 aColor; attribute float aSize; varying vec3 vColor; uniform float uTime;
      void main() { vColor = aColor; vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        float pulse = 1.0 + sin(uTime * 1.25 + position.x * 0.09 + position.z * 0.05) * 0.13;
        gl_PointSize = aSize * pulse * (88.0 / max(8.0, -viewPosition.z)); gl_Position = projectionMatrix * viewPosition; }
    `,
    fragmentShader: `
      varying vec3 vColor; uniform float uOpacity;
      void main() { vec2 centered = gl_PointCoord - vec2(0.5); float distanceToCenter = length(centered);
        if (distanceToCenter > 0.5) discard; float glow = 1.0 - smoothstep(0.08, 0.5, distanceToCenter);
        float core = 1.0 - smoothstep(0.0, 0.16, distanceToCenter);
        gl_FragColor = vec4(vColor * (0.82 + core * 0.68), glow * 0.94 * uOpacity); }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
  particles = new THREE.Points(geometry, particleMaterial)
  particles.frustumCulled = false
  scene.add(particles)
}

function radarTarget() {
  const mobile = window.matchMedia('(max-width: 720px)').matches
  const distance = camera.position.z + 1
  const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * distance
  const halfWidth = halfHeight * camera.aspect
  return { x: halfWidth * (mobile ? 0.7 : 0.86), y: halfHeight * (mobile ? 0.74 : 0.78), scale: mobile ? 0.24 : 0.32 }
}

function resetBoot() {
  timeline?.kill()
  camera.position.set(0, 0, 48)
  coreAnchor.visible = true
  coreAnchor.position.set(0, 0, -1)
  coreAnchor.scale.setScalar(0.28)
  particles.visible = true
  particles.position.set(0, 0, 0)
  particles.scale.setScalar(1)
  particleMaterial.uniforms.uOpacity.value = 1
}

function playIntro() {
  resetBoot()
  timeline = gsap.timeline({ onComplete: () => emit('intro-complete') })
  timeline
    .to(camera.position, { z: 34, duration: 1, ease: 'power4.out' }, 0)
    .to(particles.position, { z: 54, duration: 0.5, ease: 'power3.out' }, 0.08)
    .to(camera.position, { z: 21, duration: 1.8, ease: 'power2.inOut' }, 1)
    .to(particles.scale, { x: 1.34, y: 1.34, z: 1.34, duration: 0.9, ease: 'sine.inOut' }, 1)
    .to(particles.scale, { x: 1, y: 1, z: 1, duration: 0.9, ease: 'sine.inOut' }, 1.9)
    .to(camera.position, { z: 19.5, duration: 0.7, ease: 'power3.out' }, 2.8)
    .to(coreAnchor.scale, { x: 0.9, y: 0.9, z: 0.9, duration: 0.7, ease: 'power3.out' }, 2.8)
    .to(particles.position, { z: 0, duration: 0.7, ease: 'power2.out' }, 2.8)
}

function moveToCenter(duration: number, done?: () => void, scale = 0.9) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  coreAnchor.visible = true
  camera.position.z = 19.5
  gsap.to(coreAnchor.position, { x: 0, y: 0, z: -1, duration: reduced ? 0.01 : duration, ease: 'power3.inOut' })
  gsap.to(coreAnchor.scale, { x: scale, y: scale, z: scale, duration: reduced ? 0.01 : duration, ease: 'power3.inOut', onComplete: done })
}

function moveToRadar(duration: number) {
  const target = radarTarget()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  camera.position.z = 19.5
  gsap.to(particleMaterial.uniforms.uOpacity, {
    value: 0,
    duration: reduced ? 0.01 : Math.min(duration, 0.4),
    onComplete: () => { particles.visible = false }
  })
  gsap.to(coreAnchor.position, { x: target.x, y: target.y, z: -1, duration: reduced ? 0.01 : duration, ease: 'power3.inOut' })
  gsap.to(coreAnchor.scale, { x: target.scale, y: target.scale, z: target.scale, duration: reduced ? 0.01 : duration, ease: 'power3.inOut' })
}

function changeMode(mode: CoreMode, oldMode: CoreMode) {
  if (!initialized) return
  timeline?.kill()
  if (mode === 'hidden') {
    coreAnchor.visible = false
    particles.visible = false
  } else if (mode === 'boot') {
    resetBoot()
  } else if (mode === 'intro') {
    playIntro()
  } else if (mode === 'lobby') {
    particles.visible = true
    gsap.to(particleMaterial.uniforms.uOpacity, { value: 1, duration: 0.35 })
    moveToCenter(oldMode === 'intro' ? 0.01 : 0.55)
  } else if (mode === 'menu') {
    particles.visible = false
    particleMaterial.uniforms.uOpacity.value = 0
    if (oldMode === 'radar' || oldMode === 'terminal' || oldMode === 'transitioning') {
      moveToCenter(0.75, () => emit('menu-ready'), 1.06)
    } else {
      moveToCenter(0.38, () => emit('menu-ready'), 1.06)
    }
  } else if (mode === 'transitioning') {
    moveToRadar(0.9)
  } else if (mode === 'radar' || mode === 'terminal') {
    coreAnchor.visible = true
    particles.visible = false
    particleMaterial.uniforms.uOpacity.value = 0
    moveToRadar(oldMode === 'transitioning' ? 0.2 : 0.45)
  }
}

function applyTheme(theme: CoreTheme) {
  if (!initialized || !coreMesh) return
  const values = coreThemeColors[theme]
  const color = new THREE.Color(values.color)
  const emissive = new THREE.Color(values.emissive)
  gsap.to(coreMesh.material.color, { r: color.r, g: color.g, b: color.b, duration: 0.4 })
  gsap.to(coreMesh.material.emissive, { r: emissive.r, g: emissive.g, b: emissive.b, duration: 0.4 })
  gsap.to(wireMesh.material.color, { r: color.r, g: color.g, b: color.b, duration: 0.4 })
  gsap.to(pointLight.color, { r: color.r, g: color.g, b: color.b, duration: 0.4 })
  ringMeshes.forEach((ring, index) => {
    if (theme === 'cyan' && index === 1) return
    gsap.to(ring.material.color, { r: color.r, g: color.g, b: color.b, duration: 0.4 })
  })
  gsap.to(spin, { value: values.spin, duration: 0.4 })
}

function interactive() {
  return props.mode === 'lobby' || props.mode === 'menu' || props.mode === 'radar'
}

function intersectsCore(clientX: number, clientY: number) {
  if (!interactive() || !coreAnchor.visible) return false
  pointerNdc.set(clientX / window.innerWidth * 2 - 1, -(clientY / window.innerHeight) * 2 + 1)
  scene.updateMatrixWorld(true)
  raycaster.setFromCamera(pointerNdc, camera)
  return raycaster.intersectObject(hitMesh, false).length > 0
}

function setHovered(value: boolean) {
  if (value === isHovered.value) return
  isHovered.value = value
  emit('core-hover', value)
  gsap.to(coreMesh.material, { emissiveIntensity: value ? 1.42 : 0.72, duration: 0.22 })
  gsap.to(interactionScale, { value: value ? 1.035 : 1, duration: 0.22 })
}

function cancelHold() {
  holdStartedAt = 0
  holdTriggered = false
  lastHoldProgress = -1
  emit('hold-progress', 0)
}

function handlePointerMove(event: PointerEvent) {
  targetX = (event.clientX / window.innerWidth - 0.5) * 2
  targetY = (event.clientY / window.innerHeight - 0.5) * 2
  setHovered(intersectsCore(event.clientX, event.clientY))
  if (pointerDown && Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y) > 12) {
    pointerDown = null
    cancelHold()
  }
}

function handlePointerDown(event: PointerEvent) {
  if (!intersectsCore(event.clientX, event.clientY)) return
  pointerDown = { id: event.pointerId, x: event.clientX, y: event.clientY }
  holdTriggered = false
  if (props.mode === 'radar') holdStartedAt = performance.now()
}

function pulseCore() {
  gsap.timeline()
    .to(interactionScale, { value: 0.92, duration: 0.09 })
    .to(interactionScale, { value: 1.08, duration: 0.13 })
    .to(interactionScale, { value: 1, duration: 0.2, ease: 'back.out(2)' })
}

function handlePointerUp(event: PointerEvent) {
  if (!pointerDown || pointerDown.id !== event.pointerId) return
  const clicked = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y) <= 12 && intersectsCore(event.clientX, event.clientY)
  pointerDown = null
  const completedHold = holdTriggered
  cancelHold()
  if (clicked && !completedHold) {
    pulseCore()
    emit('core-click')
  }
}

function handlePointerCancel() {
  pointerDown = null
  cancelHold()
}

function handleProxyKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' && event.key !== ' ') return
  event.preventDefault()
  pulseCore()
  emit('core-click')
}

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  if (props.mode === 'radar' || props.mode === 'terminal') moveToRadar(0.01)
}

function animate() {
  frameId = requestAnimationFrame(animate)
  const elapsed = clock.getElapsedTime()
  if (particles.visible) {
    particleMaterial.uniforms.uTime.value = elapsed
    const positions = particles.geometry.attributes.position.array as Float32Array
    for (let index = 0; index < positions.length; index += 3) {
      positions[index + 1] = basePositions[index + 1] + Math.sin(elapsed * 1.55 + basePositions[index] * 0.045 + basePositions[index + 2] * 0.025) * 1.05
    }
    particles.geometry.attributes.position.needsUpdate = true
  }

  pointerX += (targetX - pointerX) * 0.065
  pointerY += (targetY - pointerY) * 0.065
  const menuLocked = props.mode === 'menu'
  const central = ['boot', 'intro', 'lobby', 'menu'].includes(props.mode)
  const influence = menuLocked ? 0 : central ? 1 : 0.22
  if (menuLocked) {
    camera.position.x = 0
    camera.position.y = 0
  } else {
    camera.position.x += (pointerX * 2.2 * influence - camera.position.x) * 0.045
    camera.position.y += (-pointerY * 1.5 * influence - camera.position.y) * 0.045
  }
  camera.lookAt(0, 0, -3)

  let holdProgress = 0
  if (holdStartedAt && !holdTriggered) {
    holdProgress = Math.min((performance.now() - holdStartedAt) / 1500, 1)
    if (Math.abs(holdProgress - lastHoldProgress) > 0.01) {
      lastHoldProgress = holdProgress
      emit('hold-progress', holdProgress)
    }
    if (holdProgress >= 1) {
      holdTriggered = true
      emit('hold-complete')
    }
  }

  const shake = holdProgress * 0.11
  coreGroup.position.x = Math.sin(elapsed * 75) * shake
  coreGroup.position.y = (menuLocked ? 0 : Math.sin(elapsed * 0.82) * 0.7) + Math.cos(elapsed * 68) * shake
  coreGroup.scale.setScalar(interactionScale.value)
  coreGroup.rotation.y = elapsed * 0.2 * spin.value + pointerX * 0.22
  coreGroup.rotation.x = Math.sin(elapsed * 0.48) * 0.18 + pointerY * 0.12
  coreMesh.rotation.z = -elapsed * 0.08 * spin.value
  wireMesh.rotation.z = elapsed * 0.13 * spin.value
  wireMesh.scale.setScalar(1 + Math.sin(elapsed * 2.1) * 0.025)
  pointLight.intensity = 2.6 + Math.sin(elapsed * 3) * 0.7 + holdProgress * 2
  ringMeshes.forEach((ring, index) => {
    ring.rotation.z += 0.0016 * spin.value * (index % 2 === 0 ? 1 : -1)
    ring.rotation.y += 0.0008 * spin.value * (index + 1)
  })
  particles.rotation.z = elapsed * 0.0015
  renderer.render(scene, camera)
}

function initScene() {
  if (!containerRef.value) return
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x070514, 0.011)
  camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 1000)
  camera.position.z = 48
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setClearColor(0x070514, 0)
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.setSize(innerWidth, innerHeight)
  renderer.domElement.className = 'interactive-core-canvas'
  containerRef.value.appendChild(renderer.domElement)
  createCore()
  createParticles()
  clock = new THREE.Clock()
  initialized = true
  applyTheme(props.theme)
  changeMode(props.mode, props.mode)
  animate()
}

watch(() => props.mode, (mode, oldMode) => changeMode(mode, oldMode))
watch(() => props.theme, applyTheme)

onMounted(() => {
  try {
    initScene()
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true, capture: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true, capture: true })
    window.addEventListener('pointercancel', handlePointerCancel, { passive: true })
    window.addEventListener('resize', handleResize)
  } catch {
    containerRef.value?.classList.add('is-fallback')
    emit('webgl-failed')
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId)
  timeline?.kill()
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerdown', handlePointerDown, true)
  window.removeEventListener('pointerup', handlePointerUp, true)
  window.removeEventListener('pointercancel', handlePointerCancel)
  window.removeEventListener('resize', handleResize)
  scene?.traverse((object) => {
    const mesh = object as THREE.Mesh
    mesh.geometry?.dispose?.()
    if (Array.isArray(mesh.material)) mesh.material.forEach((material) => material.dispose())
    else mesh.material?.dispose?.()
  })
  renderer?.dispose()
  renderer?.domElement.remove()
})
</script>

<template>
  <div ref="containerRef" class="interactive-core-scene" :class="{ 'is-hud': isRaisedMode, 'is-hidden': isHidden }" aria-hidden="true"></div>
  <div
    v-if="!isHidden"
    class="core-focus-proxy"
    :class="{ 'is-radar': isHudMode, 'is-hovered': isHovered }"
    role="button"
    tabindex="0"
    :aria-label="isHudMode ? 'Open CattoCake core navigation' : 'Activate CattoCake core navigation'"
    @keydown="handleProxyKeydown"
  ></div>
</template>

<style scoped>
.interactive-core-scene { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; background: #070514; }
.interactive-core-scene::before,
.interactive-core-scene::after { content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.interactive-core-scene::before { background: linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,.02) 1px,transparent 1px); background-size: 100% 5px,82px 82px; mix-blend-mode: screen; opacity: .46; }
.interactive-core-scene::after { background: radial-gradient(circle at 50% 50%,transparent 0 31%,rgba(7,5,20,.12) 61%,rgba(7,5,20,.66) 100%); }
.interactive-core-scene.is-hud { z-index: 45; background: transparent; }
.interactive-core-scene.is-hud::before,
.interactive-core-scene.is-hud::after { display: none; }
.interactive-core-scene.is-hidden { display: none; }
:deep(.interactive-core-canvas) { position: absolute; inset: 0; width: 100% !important; height: 100% !important; }
.core-focus-proxy { position: fixed; top: 50%; left: 50%; z-index: 90; width: min(46vw,520px); aspect-ratio: 1; border-radius: 50%; pointer-events: none; transform: translate(-50%,-50%); }
.core-focus-proxy.is-radar { top: 1.2rem; right: 1.2rem; left: auto; width: 132px; transform: none; }
.core-focus-proxy::before,
.core-focus-proxy::after { content: ''; position: absolute; border-radius: 50%; opacity: 0; transition: opacity .2s ease, transform .25s ease; }
.core-focus-proxy::before { inset: 18%; border: 1px solid rgba(0,240,255,.64); box-shadow: 0 0 22px rgba(0,240,255,.28); transform: scale(.88); }
.core-focus-proxy::after { inset: 14%; border: 1px dashed rgba(255,215,0,.4); transform: scale(1.08) rotate(10deg); }
.core-focus-proxy.is-radar::before { inset: 8%; }
.core-focus-proxy.is-radar::after { inset: 2%; }
.core-focus-proxy.is-hovered::before,
.core-focus-proxy.is-hovered::after { opacity: 1; transform: scale(1) rotate(0); }
.core-focus-proxy:focus-visible { outline: 1px solid rgba(0,240,255,.72); outline-offset: 6px; }
@media (max-width: 720px) { .core-focus-proxy.is-radar { width: 96px; } }
</style>
