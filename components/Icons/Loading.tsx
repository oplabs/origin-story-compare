import React from 'react'

const Loading = ({
  color = undefined,
  stroke = '16',
  size = '16',
  className = '',
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={`stroke-current ${className}`}
      {...props}
    >
      <circle
        cx="60"
        cy="60"
        r="52"
        strokeWidth={stroke}
        stroke={color}
        strokeLinecap="round"
        strokeDasharray="339.292"
        strokeDashoffset="105.181"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 60 60"
          to="360 60 60"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}

export {Loading}
