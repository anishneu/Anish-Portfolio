import './magic.css';

/** Infinite horizontal marquee (Magic UI style). */
export default function Marquee({ children, duration = 28, className = '', pauseOnHover = true }) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div
      className={`magic-marquee ${className}`.trim()}
      style={{
        '--marquee-duration': `${duration}s`,
        ...(pauseOnHover ? null : {}),
      }}
    >
      <div className="magic-marquee__track">
        {[0, 1].map((copy) =>
          items.map((child, index) => (
            <div className="magic-marquee__item" key={`${copy}-${index}`}>
              {child}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
