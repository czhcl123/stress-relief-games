export interface GameDetail {
  /** First-hand implementation note: what the game actually is. */
  built: string
  /** Browsers/devices the game is built and checked for. */
  tested: string[]
  /** Honest limits of the browser version. */
  limitations: string[]
  updated: string
}

/**
 * First-hand "how it was built / what we tested / known limitations" copy for
 * each game. This is the Experience signal AI systems cannot get from a
 * generic game description.
 */
export const gameDetails: Record<string, GameDetail> = {
  '/games/bubble-wrap': {
    built:
      'Built as a React client component. The 192-bubble sheet is a real grid of elements, not a video: popping a bubble removes it from the sheet and the remaining bubbles close the gap. Each pop synthesises a noise burst, a short tone chirp and a click with the Web Audio API; the pitch and decay vary slightly so repeated pops do not sound identical.',
    tested: [
      'Desktop: current Chrome and Edge.',
      'Mobile: Android Chrome, including touch drag across a row.',
      'Mouse click, tap and drag; the controls have a visible keyboard focus ring.',
    ],
    limitations: [
      'Browsers require a tap or click before audio can play.',
      'Refreshing the page starts a new sheet; progress is not saved.',
      'Browsers without Web Audio fall back to silent play.',
    ],
    updated: 'November 25, 2026',
  },
  '/games/slime-simulator': {
    built:
      'The slime is a canvas soft-body simulation: a ring of control points is pulled toward the pointer, then springs back. Six palettes change the colour, not the physics. The squish sound is synthesised in the browser with filtered noise and a short pitch drop.',
    tested: [
      'Desktop: current Chrome and Edge.',
      'Mobile: one-finger drag on Android Chrome.',
      'Touch gestures are captured so the page does not scroll while you stretch.',
    ],
    limitations: [
      'No temperature, weight or real texture; it is a screen approximation.',
      'Audio starts only after you tap the slime.',
      'Refreshing resets the slime and the poke count.',
    ],
    updated: 'November 25, 2026',
  },
  '/games/zen-garden': {
    built:
      'The sand is a canvas height map: dragging a rake lowers the height along the path and leaves raised edges. Stones and plants are draggable objects on top of the sand. Three rake patterns change the shape of the groove, and Clear Sand resets the height map without moving the objects.',
    tested: [
      'Desktop: current Chrome and Edge.',
      'Mobile: one-finger raking and dragging on Android Chrome.',
      'Touch gestures are captured so the page does not scroll while raking.',
    ],
    limitations: [
      'No score, timer or saved garden; it is a single session.',
      'The screen cannot reproduce the weight or grain of real sand.',
      'Clear Sand resets the raking but keeps the stones and plants.',
    ],
    updated: 'November 25, 2026',
  },
  '/games/stress-ball': {
    built:
      'The ball is a canvas physics object with bounce, squash and friction. Dragging sets a velocity; releasing throws it. Six ball types change the bounce and squash profile. The squish and wall thud are synthesised with the Web Audio API and follow how hard you pull.',
    tested: [
      'Desktop: current Chrome and Edge.',
      'Mobile: one-finger drag and throw on Android Chrome.',
      'Touch gestures are captured so the page does not scroll while you play.',
    ],
    limitations: [
      'No real resistance or texture; a physical stress ball feels different.',
      'Audio starts only after you interact with the page.',
      'Refreshing resets the ball and the throw count.',
    ],
    updated: 'November 25, 2026',
  },
  '/games/fidget-spinner': {
    built:
      'The spinner is a canvas wheel with angular velocity, friction and a bearing-hum oscillator. Dragging around the edge adds torque; the centre slows it. Six designs change the visual, not the physics. The RPM readout is calculated from the current angular velocity.',
    tested: [
      'Desktop: current Chrome and Edge.',
      'Mobile: one-finger flick and the Flick button on Android Chrome.',
      'Touch gestures are captured so the page does not scroll while you spin.',
    ],
    limitations: [
      'No weight or metal-bearing feel; it is a screen approximation.',
      'The hum is synthesised and starts only after interaction.',
      'Refreshing resets the RPM and spin count.',
    ],
    updated: 'November 25, 2026',
  },
  '/games/sand-cutting': {
    built:
      'The sand is a canvas height map. Slice lowers a narrow trench and leaves raised edges; Scoop removes a rounded crater and piles the sand at the rim; Smooth presses an area back to flat. Six colours and three tools change the surface, and cuts persist for the session.',
    tested: [
      'Desktop: current Chrome and Edge.',
      'Mobile: one-finger cutting and scooping on Android Chrome.',
      'Touch gestures are captured so the page does not scroll while you work.',
    ],
    limitations: [
      'No real kinetic-sand texture, temperature or mess.',
      'Audio starts only after you interact with the page.',
      'Refreshing resets the tray.',
    ],
    updated: 'November 25, 2026',
  },
  '/games/breathing': {
    built:
      'A React timer drives four phases — inhale 4 seconds, hold 4, exhale 4, hold 4. The circle scales with the phase and the remaining seconds, and a cycle counter tracks completed rounds. No audio, no canvas.',
    tested: [
      'Desktop: current Chrome and Edge.',
      'Mobile: Android Chrome.',
      'Start, pause and reset controls; no audio permission needed.',
    ],
    limitations: [
      'No audio cues; the guide is visual only.',
      'Refreshing resets the cycle count.',
      'Stop if you feel dizzy; this is a relaxation exercise, not medical advice.',
    ],
    updated: 'November 25, 2026',
  },
  '/games/rain-sounds': {
    built:
      'A looping noise buffer is filtered and shaped with the Web Audio API. Light, Medium and Heavy change the filter and gain, and the volume slider is independent. The rain is synthesised in the browser, not a recorded file.',
    tested: [
      'Desktop: current Chrome and Edge.',
      'Mobile: Android Chrome.',
      'Play/pause, intensity and volume controls; audio starts after a click.',
    ],
    limitations: [
      'Synthesised rain, not a field recording.',
      'No sleep timer; closing the tab stops the sound.',
      'Browsers require a user gesture before audio can play.',
    ],
    updated: 'November 25, 2026',
  },
  '/games/lava-lamp': {
    built:
      'CSS-animated blobs inside a lamp-shaped container; each blob has its own duration and offset. Palettes change the gradient, the speed slider changes animation duration, and Pause stops the animations.',
    tested: [
      'Desktop: current Chrome and Edge.',
      'Mobile: Android Chrome.',
      'Palette, speed and pause controls.',
    ],
    limitations: [
      'Visual only; there is no sound.',
      'Palette and speed are not saved after refresh.',
      'Motion may not suit everyone; Pause is always available.',
    ],
    updated: 'November 25, 2026',
  },
  '/games/mandala': {
    built:
      'A canvas 2D drawing surface with sixfold rotational symmetry. Pointer events draw one stroke and mirror it around the centre; there are six colours and three brush sizes, and Download exports the canvas as a PNG.',
    tested: [
      'Desktop: current Chrome and Edge.',
      'Mobile: Android Chrome.',
      'Mouse, pointer and touch drawing; PNG download.',
    ],
    limitations: [
      'No undo yet; Clear resets the canvas.',
      'Download is a PNG of the current canvas.',
      'Nothing is saved to an account or the cloud.',
    ],
    updated: 'November 25, 2026',
  },
  '/games/worry-jar': {
    built:
      'A React state list renders up to twelve paper slips inside a CSS jar. Text never leaves the browser tab and is never persisted; Release all clears the list with a short animation.',
    tested: [
      'Desktop: current Chrome and Edge.',
      'Mobile: Android Chrome.',
      'Typing, adding and releasing; no network calls.',
    ],
    limitations: [
      'Refreshing the page clears the jar.',
      'The text is not encrypted — it is simply not saved or sent.',
      'This is a letting-go exercise, not therapy.',
    ],
    updated: 'November 25, 2026',
  },
  '/games/pop-it': {
    built:
      'A 6×6 React grid with a popped/unpopped state per cell. Each pop synthesises a short click with the Web Audio API; colour themes change the palette, and Reset clears the grid.',
    tested: [
      'Desktop: current Chrome and Edge.',
      'Mobile: Android Chrome.',
      'Tap and click; sound starts after the first interaction.',
    ],
    limitations: [
      'Progress is not saved after refresh.',
      'The sound is synthesised; this is not a real silicone toy.',
      'Browsers require a user gesture before audio can play.',
    ],
    updated: 'November 25, 2026',
  },
}
