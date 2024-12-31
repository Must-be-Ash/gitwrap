"use client"

import { animate, motion, useMotionValue, useTransform, MotionValue } from "framer-motion"
import { interpolate } from "flubber"
import { useEffect, useState } from "react"

// Convert icon paths to SVG paths
const iconPaths = {
  github: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  star: "M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z",
  code: "M24 10.935v2.131l-8 3.947v-2.23l5.64-2.783-5.64-2.79v-2.223l8 3.948zm-16 3.848l-5.64-2.783 5.64-2.79v-2.223l-8 3.948v2.131l8 3.947v-2.23zm7.047-10.783h-2.078l-4.011 16h2.073l4.016-16z",
  bolt: "M13 0l-13 16h8l-8 16 24-20h-8l8-12z",
  branch: "M21 3c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm-3 3c-1.657 0-3 1.343-3 3v12c0 1.657 1.343 3 3 3s3-1.343 3-3v-12c0-1.657-1.343-3-3-3zm-12-3c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm-3 3c-1.657 0-3 1.343-3 3v12c0 1.657 1.343 3 3 3s3-1.343 3-3v-12c0-1.657-1.343-3-3-3z"
}

const colors = ["#4f46e5", "#7c3aed", "#2563eb", "#db2777", "#f59e0b", "#4f46e5"]
const paths = [
  iconPaths.github,
  iconPaths.star,
  iconPaths.code,
  iconPaths.bolt,
  iconPaths.branch,
  iconPaths.github
]

interface IconMorphProps {
  onComplete: () => void;
}

export default function IconMorph({ onComplete }: IconMorphProps) {
  const [pathIndex, setPathIndex] = useState(0)
  const progress = useMotionValue(pathIndex)
  const fill = useTransform(progress, paths.map((_, i) => i), colors)
  const path = useFlubber(progress, paths)

  useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: 0.8,
      ease: "easeInOut",
      onComplete: () => {
        if (pathIndex === paths.length - 1) {
          onComplete()
        } else {
          setPathIndex(pathIndex + 1)
        }
      },
    })

    return () => animation.stop()
  }, [pathIndex, progress, onComplete])

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="relative"
    >
      <svg width="200" height="200" viewBox="0 0 24 24">
        <motion.path fill={fill} d={path} />
      </svg>
    </motion.div>
  )
}

function useFlubber(progress: MotionValue<number>, paths: string[]) {
  return useTransform(progress, paths.map((_, i) => i), paths, {
    mixer: (a: string, b: string) => interpolate(a, b, { maxSegmentLength: 0.1 }),
  })
} 