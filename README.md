# Tracer

An interactive visual experience built with Three.js featuring animated geometric patterns and effects.

## Demo

🚀 **[Live Demo](https://controllingtransmission.github.io/tracer/)**

## About

This project creates dynamic visual effects using Three.js, featuring:
- Animated geometric patterns
- Interactive visual layers
- WebGL-based rendering
- Responsive design

## Local Development

To run locally:

1. Clone the repository
2. Serve the files using any web server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser

## Technology

- Three.js for 3D graphics and WebGL rendering
- Custom shader effects
- Responsive design for various screen sizes

## Keyboard Controls

The application responds to keyboard input and can be controlled interactively once loaded.

### Animation Controls
- `P`: pause/unpause animation
- `[`: decrease animation speed (halve rate)
- `]`: increase animation speed (double rate)

### Color Controls
- `Z`: set color to black
- `X`: set color to red
- `C`: set color to blue
- `V`: set color to gray

### Transparency Controls
- `,`: increase alpha (more opaque)
- `.`: decrease alpha (more transparent)

### Visual Effects
- `-`: toggle wireframe mode

### Camera Controls
- `;`: switch to orthographic camera
- `'`: switch to perspective camera

### Layer Selection
- `0-9`: select different visual layers

### Movement Effects (Q-L keys)
- `Q`: black color reset
- `W`: red color jitter
- `E`: blue color jitter
- `R`: white color jitter
- `T`: leap motion background gray
- `Y`: leap motion background hue
- `U`: x interleave movement
- `I`: y interleave movement
- `O`: z rotation
- `P`: wave movement
- `A`: zoom out
- `S`: zoom in
- `D`: x scale
- `F`: y scale
- `G`: wobbly shader effect

### Object Toggles
- `1` or `!`: toggle object 1
- `2` or `@`: toggle object 2