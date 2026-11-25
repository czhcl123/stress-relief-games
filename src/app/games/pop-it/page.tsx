import ToolPage from '@/components/ToolPage'
import PopItTool from '@/components/tools/PopItTool'

export default function Page() {
  return (
    <ToolPage
      gamePath="/games/pop-it"
      emoji="🟣"
      title="Pop It"
      subtitle="A 6×6 silicone-style pop toy. Pop and unpop the bubbles; no download, no signup."
      howTo={[
        'Tap or click a bubble to pop it.',
        'Tap it again to push it back up.',
        'Switch palettes or press Reset.',
        'Sound starts after the first tap; mute your device if needed.',
      ]}
      why="Repetitive popping gives restless hands a small, complete action. The evidence is indirect (fidgeting research), and responses vary; it is a short break, not a treatment."
      note="Progress is not saved. The sound is synthesised; this is not a real silicone toy."
    >
      <PopItTool />
    </ToolPage>
  )
}
