# Horizontal Carousel with GSAP ScrollTrigger

A smooth, scroll-triggered horizontal image carousel built with React, GSAP, and ScrollTrigger. The carousel moves horizontally as users scroll vertically, with smooth animations, snapping, and a dark theme.

## Features

- **Horizontal Scroll**: Moves horizontally on vertical scroll
- **Smooth Scrubbing**: Real-time scroll-based animation
- **Snap to Slides**: Automatically snaps to each image
- **Progress Indicator**: Shows current position and progress
- **Responsive Design**: Works on all screen sizes
- **Dark Theme**: Clean, modern UI
- **Performance Optimized**: Uses GSAP's optimized animations
- **Flexible**: Easy to customize and extend

## Usage

### Basic Implementation

```jsx
import HorizontalCarousel from './components/HorizontalCarousel';

function App() {
  return (
    <div>
      <HorizontalCarousel />
    </div>
  );
}
```

### With Custom Images

Update the `images` array in `HorizontalCarousel.jsx`:

```javascript
const images = [
  { 
    id: 1, 
    src: '/path/to/image1.jpg', 
    title: 'Your Title', 
    description: 'Your description',
    fallback: 'https://fallback-url.com/image.jpg'
  },
  // ... more images
];
```

## Props and Customization

### Component Structure

- `containerRef`: Main container for ScrollTrigger
- `carouselRef`: Horizontal sliding container
- `imagesRef`: Individual slide references
- `progressBarRef`: Progress indicator

### Key Animations

1. **Horizontal Movement**: `xPercent` animation based on image count
2. **Scroll Trigger**: Pins section and enables scrubbing
3. **Snap Points**: Smooth transitions between slides
4. **Content Animations**: Fade and slide effects for active content

### ScrollTrigger Configuration

```javascript
scrollTrigger: {
  trigger: container,
  pin: true,                    // Pin section during scroll
  scrub: 1,                    // Smooth scrubbing (1-3 recommended)
  snap: {
    snapTo: 1 / (images.length - 1),  // Snap points
    duration: { min: 0.2, max: 0.6 }, // Snap duration range
    delay: 0.1,                       // Snap delay
    ease: 'power2.inOut'              // Snap easing
  },
  end: () => `+=${(images.length - 1) * window.innerWidth}` // Scroll distance
}
```

## Styling

The component uses Tailwind CSS with custom CSS for enhanced styling:

- `HorizontalCarousel.css`: Custom styles and animations
- Dark theme with glassmorphism effects
- Responsive breakpoints for mobile/tablet
- Performance optimizations with `will-change` and `backface-visibility`

## Performance Tips

1. **Image Optimization**: Use optimized images (WebP format recommended)
2. **Lazy Loading**: Consider implementing lazy loading for many images
3. **Reduce DOM Queries**: Cache DOM references
4. **Use `will-change`**: Applied to animated elements
5. **Transform Only**: Avoid layout-triggering properties

## Browser Support

- Modern browsers with ES6+ support
- Chrome/Safari/Firefox/Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- React 18+
- GSAP 3.13+
- @gsap/react 2.1+
- Tailwind CSS 3.4+

## Advanced Customization

### Custom Scroll Distance

```javascript
// Adjust scroll distance multiplier
end: () => `+=${(images.length - 1) * window.innerWidth * 1.2}`
```

### Different Snap Behavior

```javascript
snap: {
  snapTo: "labels",        // Snap to specific labels
  duration: 0.3,           // Fixed duration
  ease: "power2.inOut"
}
```

### Custom Progress Animation

```javascript
onUpdate: (self) => {
  // Custom progress logic
  const progress = self.progress;
  // Update custom indicators
}
```

## Troubleshooting

### Common Issues

1. **Images not loading**: Check image paths and fallback URLs
2. **Scrolling not smooth**: Ensure ScrollTrigger is registered
3. **Mobile issues**: Test viewport settings and touch events
4. **Performance**: Monitor frame rate and optimize images

### Debug Mode

Add to ScrollTrigger config for debugging:
```javascript
scrollTrigger: {
  // ... other config
  markers: true,    // Show scroll markers
  id: "carousel"    // Identify in DevTools
}
```

## License

MIT License - feel free to use in your projects!
