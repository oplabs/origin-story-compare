const Check = ({ size = 18 }) => (
  <svg
    className="check-icon"
    width={size}
    height={size}
    viewBox={`0 0 24 24`}
    fill="currentColor"
  >
    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

export { Check };
