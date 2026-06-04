import { useState, useEffect, useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import './AnimatedCounter.css';

export default function AnimatedCounter({ end, suffix = '+', duration = 2000, label, icon: Icon }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useInView({ threshold: 0.3 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime;
    const startValue = 0;

    function animate(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(startValue + (end - startValue) * eased);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div className="counter-card" ref={ref}>
      {Icon && (
        <div className="counter-icon">
          <Icon size={24} />
        </div>
      )}
      <div className="counter-value">
        <span className="counter-number">{count.toLocaleString()}</span>
        <span className="counter-suffix">{suffix}</span>
      </div>
      <div className="counter-label">{label}</div>
    </div>
  );
}
