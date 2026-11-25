import ToolPage from '@/components/ToolPage'
import BreathingTool from '@/components/tools/BreathingTool'

export default function Page() {
  return (
    <ToolPage
      gamePath="/games/breathing"
      emoji="🫁"
      title="Box Breathing"
      subtitle="A simple 4-4-4-4 breathing circle. Follow it for two minutes, then go back to your day."
      howTo={[
        'Sit comfortably and let your shoulders drop.',
        'Press Start and follow the circle: inhale for 4, hold for 4, exhale for 4, hold for 4.',
        'Complete four to eight cycles; pause or reset whenever you need.',
        'Stop if you feel dizzy and return to normal breathing.',
      ]}
      why="Paced breathing gives your attention a simple rhythm and slows the breath. Some people find it calming before a task or at the end of the day. The evidence is indirect and responses vary; this is a relaxation exercise, not a treatment for anxiety or a medical condition."
      note="No audio, no account, no data saved. If you have a respiratory or cardiovascular condition, ask a clinician before doing breath-holding exercises."
    >
      <BreathingTool />
    </ToolPage>
  )
}
