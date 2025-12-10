import { useRef, useState, useEffect } from 'react';

type JoystickProps = {
  onMove: (data: { x: number; y: number }) => void;
  //* Size of the base in pixels. Default 100
  size?: number;
  //* Size of the sticky knob in pixels. Default 50
  knobSize?: number;
  //* Optional class name for positioning or styling
  className?: string;
};

export default function Joystick({ onMove, size = 100, knobSize = 50, className = '' }: JoystickProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  //* Center coordinate of the knob relative to the container center
  const maxDistance = size / 2;

  const updatePosition = (clientX: number, clientY: number) => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    //* Clamp distance to max radius
    const clampedDistance = Math.min(distance, maxDistance);
    const angle = Math.atan2(dy, dx);

    const x = Math.cos(angle) * clampedDistance;
    const y = Math.sin(angle) * clampedDistance;

    setPosition({ x, y });

    //* Normalize output -1 to 1
    //* y is inverted in screen coordinates (down is positive), but usually for games up is positive Y or Z forward
    //* Let's standardise: x right is positive 1, y down is positive 1. Consumer handles logic.
    onMove({
      x: x / maxDistance,
      y: y / maxDistance,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setActive(true);
    updatePosition(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (!active) return;
    updatePosition(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    setActive(false);
    setPosition({ x: 0, y: 0 });
    onMove({ x: 0, y: 0 });
  };

  //* Prevent default behaviours to avoid scrolling while using joystick
  useEffect(() => {
    const el = wrapperRef.current;
    if(!el) return;
    const prevent = (e: TouchEvent) => e.preventDefault();
    el.addEventListener('touchmove', prevent, { passive: false });
    return () => el.removeEventListener('touchmove', prevent);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`absolute z-50 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 touch-none select-none ${className}`}
      style={{
        width: size,
        height: size,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Knob */}
      <div
        className={`absolute rounded-full bg-white/80 shadow-lg pointer-events-none transition-transform duration-75 ${!active ? 'transition-all duration-200 ease-out' : ''}`}
        style={{
          width: knobSize,
          height: knobSize,
          left: '50%',
          top: '50%',
          // transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
          // Using margin to center then translate
          marginLeft: -knobSize / 2,
          marginTop: -knobSize / 2,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </div>
  );
}
