import { onMounted, onUnmounted } from 'vue'

export function useRevealOnScroll(selector = '.reveal-image-container') {
  let observer: IntersectionObserver | null = null
  let targets: Element[] = []

  onMounted(() => {
    targets = Array.from(document.querySelectorAll(selector))

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('in-view', entry.isIntersecting)
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px',
      },
    )

    targets.forEach((target) => observer?.observe(target))
  })

  onUnmounted(() => {
    targets.forEach((target) => observer?.unobserve(target))
    observer?.disconnect()
  })
}
