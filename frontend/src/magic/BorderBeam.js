import './magic.css';

/** Animated conic border beam around a card/panel. */
export default function BorderBeam({
  children,
  className = '',
  colorFrom = 'var(--portfolio-accent)',
  colorTo = 'var(--portfolio-secondary)',
  duration = 6,
  style,
}) {
  return (
    <div
      className={`magic-border-beam ${className}`.trim()}
      style={{
        '--beam-a': colorFrom,
        '--beam-b': colorTo,
        '--beam-duration': `${duration}s`,
        ...style,
      }}
    >
      <div className="magic-border-beam__inner">{children}</div>
    </div>
  );
}
