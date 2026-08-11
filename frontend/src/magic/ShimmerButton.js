import './magic.css';

/** Magic UI shimmer button — perimeter/light sweep CTA. */
export default function ShimmerButton({
  children,
  onClick,
  className = '',
  background,
  color,
  shimmerDuration = '2.8s',
  type = 'button',
  style,
  ...props
}) {
  return (
    <button
      type={type}
      className={`magic-shimmer-btn ${className}`.trim()}
      onClick={onClick}
      style={{
        '--shimmer-bg': background,
        '--shimmer-fg': color,
        '--shimmer-duration': shimmerDuration,
        ...style,
      }}
      {...props}
    >
      <span className="magic-shimmer-btn__sheen" aria-hidden />
      <span className="magic-shimmer-btn__label">{children}</span>
    </button>
  );
}
