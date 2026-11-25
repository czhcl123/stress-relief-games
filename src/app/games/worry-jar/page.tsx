import ToolPage from '@/components/ToolPage'
import WorryJarTool from '@/components/tools/WorryJarTool'

export default function Page() {
  return (
    <ToolPage
      gamePath="/games/worry-jar"
      emoji="🫙"
      title="Worry Jar"
      subtitle="Write a worry, drop it in the jar, and release it when you are ready. Nothing is saved or sent."
      howTo={[
        'Type one worry into the box.',
        'Press Add or Enter to drop it in the jar.',
        'Add up to twelve slips.',
        'Press Release all when you want to let them go.',
      ]}
      why="Naming a worry and putting it somewhere can make it feel less vague. Expressive-writing research is indirect, and this is a short letting-go exercise, not therapy."
      note="The text stays in this browser tab and disappears on refresh. If worry is persistent or affecting your sleep or work, talk to a qualified professional."
    >
      <WorryJarTool />
    </ToolPage>
  )
}
