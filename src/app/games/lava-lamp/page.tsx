import ToolPage from '@/components/ToolPage'
import LavaLampTool from '@/components/tools/LavaLampTool'

export default function Page() {
  return (
    <ToolPage
      gamePath="/games/lava-lamp"
      emoji="🫧"
      title="Lava Lamp"
      subtitle="Slow, drifting colour blobs. Pick a palette, adjust the speed, and watch for a minute."
      howTo={[
        'Choose a palette.',
        'Adjust the speed slider to make the blobs slower or faster.',
        'Press Pause whenever you want a still image.',
        'Refresh the page to reset the palette and speed.',
      ]}
      why="Slow visual motion can give your eyes a low-stakes thing to follow. It is a visual break, not a treatment; some people find motion distracting, so Pause is always available."
      note="No sound, no account, no saved settings. If motion makes you uncomfortable, pause or use a static image."
    >
      <LavaLampTool />
    </ToolPage>
  )
}
