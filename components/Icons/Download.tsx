const Download = ({ size = 18 }) => (
  <svg
    className="download-icon"
    width={size}
    height={size}
    viewBox={`0 0 24 24`}
    fill="currentColor"
  >
    <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
  </svg>
);

export { Download };
