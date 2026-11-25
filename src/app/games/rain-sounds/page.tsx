import ToolPage from '@/components/ToolPage'
import RainSoundsTool from '@/components/tools/RainSoundsTool'

export default function Page() {
  return (
    <ToolPage
      gamePath="/games/rain-sounds"
      emoji="🌧️"
      title="Rain Sounds"
      subtitle="Steady rain noise for focus, reading or winding down. Synthesised in the browser, no download."
      howTo={[
        'Press Play rain; audio starts after the click.',
        'Choose Light, Medium or Heavy for the density.',
        'Adjust the volume; headphones make the texture easier to hear.',
        'Pause or close the tab to stop.',
      ]}
      why="A steady sound can mask background noise and give your attention a consistent texture. Some people find it easier to read or settle with rain in the background; others prefer silence. There is no sleep timer, and this is not a treatment for insomnia."
      note="The rain is synthesised, not a field recording. No account, no download, no saved settings."
    >
      <RainSoundsTool />
    </ToolPage>
  )
}
