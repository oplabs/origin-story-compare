import { useRef, useLayoutEffect, useState } from 'react'

export default function useElWidth() {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    function onResize() {
      if (ref?.current) {
        const el = ref.current as unknown as { offsetWidth: number }
        setWidth(el.offsetWidth)
      }
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return { ref, width }
}
