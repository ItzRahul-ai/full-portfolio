import { useEffect, useMemo, useRef, useState } from 'react'
import { motion as Motion } from 'framer-motion'

const TRAIL_LENGTH = 9

function createTrailPoints(x = 0, y = 0) {
  return Array.from({ length: TRAIL_LENGTH }, (_, index) => ({
    x,
    y,
    size: Math.max(6, 14 - index),
    opacity: Math.max(0.16, 0.85 - index * 0.08),
  }))
}

function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState(() => createTrailPoints())
  const targetRef = useRef({ x: 0, y: 0 })

  const isTouchDevice = useMemo(
    () => window.matchMedia?.('(hover: none)').matches || window.matchMedia?.('(pointer: coarse)').matches,
    [],
  )

  useEffect(() => {
    if (isTouchDevice) return undefined

    const handleMove = (event) => {
      const nextPosition = { x: event.clientX, y: event.clientY }
      targetRef.current = nextPosition
      setCursor(nextPosition)
      setVisible(true)

      const target = event.target
      if (target instanceof HTMLElement) {
        setActive(Boolean(target.closest('a, button, input, textarea, select, [data-cursor="active"]')))
      }
    }

    const hideCursor = () => setVisible(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', hideCursor)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', hideCursor)
    }
  }, [isTouchDevice])

  useEffect(() => {
    if (isTouchDevice) return undefined

    let frameId = 0
    const animateTrail = () => {
      setTrail((prevTrail) => {
        const nextTrail = [...prevTrail]
        for (let index = 0; index < nextTrail.length; index += 1) {
          const leader = index === 0 ? targetRef.current : nextTrail[index - 1]
          const node = nextTrail[index]
          nextTrail[index] = {
            ...node,
            x: node.x + (leader.x - node.x) * (index === 0 ? 0.3 : 0.36),
            y: node.y + (leader.y - node.y) * (index === 0 ? 0.3 : 0.36),
          }
        }
        return nextTrail
      })
      frameId = requestAnimationFrame(animateTrail)
    }

    frameId = requestAnimationFrame(animateTrail)
    return () => cancelAnimationFrame(frameId)
  }, [isTouchDevice])

  if (isTouchDevice) return null

  return (
    <>
      {trail.map((dot, index) => (
        <div
          key={`trail-dot-${index}`}
          className="pointer-events-none fixed left-0 top-0 z-[78] rounded-full bg-[var(--color-accent)] mix-blend-screen"
          style={{
            width: dot.size,
            height: dot.size,
            opacity: visible ? dot.opacity : 0,
            transform: `translate3d(${dot.x - dot.size / 2}px, ${dot.y - dot.size / 2}px, 0)`,
            transition: 'opacity 220ms ease',
          }}
        />
      ))}

      <Motion.div
        className="pointer-events-none fixed left-0 top-0 z-[80] h-7 w-7 rounded-full border border-[var(--color-accent)] mix-blend-screen"
        animate={{
          x: cursor.x - 14,
          y: cursor.y - 14,
          scale: active ? 1.8 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.2 }}
      />
    </>
  )
}

export default CustomCursor
