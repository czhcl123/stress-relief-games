import ToolPage from '@/components/ToolPage'
import MandalaTool from '@/components/tools/MandalaTool'

export default function Page() {
  return (
    <ToolPage
      gamePath="/games/mandala"
      emoji="🌀"
      title="Mandala Drawing"
      subtitle="Draw one stroke; the pattern repeats in sixfold symmetry. A quiet creative break."
      howTo={[
        'Pick a colour and brush size.',
        'Choose 6, 8 or 12 repeats.',
        'Draw on the canvas; each stroke is mirrored around the centre.',
        'Download the PNG when you are happy; Clear starts again.',
      ]}
      why="Repetitive, symmetrical drawing gives your attention a simple visual task with a clear result. Some people find art-making absorbing; the evidence is indirect, and this is not art therapy."
      note="No undo yet; download before clearing. Nothing is uploaded; the drawing stays in your browser."
    >
      <MandalaTool />
    </ToolPage>
  )
}
