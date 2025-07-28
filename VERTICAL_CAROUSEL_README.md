# Vertical Carousel with 4-Image Rows

A smooth, scroll-triggered vertical carousel featuring 4 horizontal images per row that move in parallel as you scroll. Built with React, GSAP, and ScrollTrigger.

## Features

- **4 Images Per Row**: Each row contains 4 images displayed horizontally
- **Vertical Scrolling**: All rows move together vertically on scroll
- **Parallel Movement**: All 4 images in each row move in perfect sync
- **Smooth Snapping**: Automatically snaps to each row
- **Parallax Effects**: Subtle parallax animations between rows
- **Progress Indicator**: Visual progress bar and slide counter
- **Responsive Design**: Adapts to different screen sizes
- **Dark Theme**: Modern, clean aesthetic

## Structure

```
Row 1: [Image 1] [Image 2] [Image 3] [Image 4]
Row 2: [Image 5] [Image 6] [Image 7] [Image 8]
Row 3: [Image 9] [Image 10] [Image 11] [Image 12]
Row 4: [Image 13] [Image 14] [Image 15] [Image 16]
```

## How It Works

1. **Container Setup**: Creates a container with 4 rows, each 100vh tall
2. **GSAP Animation**: Uses `yPercent` to move all rows vertically
3. **ScrollTrigger**: Pins the section and enables smooth scrubbing
4. **Snap Points**: Each row becomes a snap point for smooth navigation
5. **Parallel Effects**: Individual images get subtle parallax offsets

## Key Animation Properties

```javascript
// Main vertical movement
yPercent: -((imageRows.length - 1) * 100) / imageRows.length * 100

// Snap configuration
snap: {
  snapTo: 1 / (imageRows.length - 1),
  duration: { min: 0.3, max: 0.8 },
  ease: 'power2.inOut'
}

// Individual image parallax
y: parallaxOffset + activeOffset,
opacity: isActive ? 1 : Math.max(0.6, 1 - distance * 0.2),
scale: isActive ? 1 : Math.max(0.95, 1 - distance * 0.02)
```

## Customization

### Change Number of Images Per Row
```javascript
// Update imageRows array structure
const imageRows = [
  [img1, img2, img3], // 3 images per row
  [img4, img5, img6],
  // ...
];
```

### Modify Parallax Intensity
```javascript
const parallaxOffset = (imgIndex - 1.5) * 20; // Increase multiplier for more movement
```

### Adjust Snap Behavior
```javascript
snap: {
  snapTo: 1 / (imageRows.length - 1),
  duration: { min: 0.5, max: 1.0 }, // Slower snapping
  delay: 0.2, // More delay before snap
  ease: 'power3.inOut' // Different easing
}
```

## Responsive Behavior

- **Desktop**: 4 images per row, full parallax effects
- **Tablet**: Reduced parallax, smaller text
- **Mobile**: Images stack vertically, minimal animations

## Performance Tips

1. **Optimize Images**: Use WebP format, appropriate sizes
2. **Reduce Parallax**: Lower parallax multipliers on mobile
3. **Transform Only**: Animations use only transform properties
4. **Hardware Acceleration**: `transform: translateZ(0)` applied

## Browser Support

- Chrome/Safari/Firefox/Edge (modern versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires ES6+ support

## Usage

```jsx
import VerticalCarousel from './components/VerticalCarousel';

function App() {
  return (
    <div>
      <VerticalCarousel />
    </div>
  );
}
```

The carousel automatically handles all scroll interactions and provides a smooth, professional gallery experience.
