import Navbar from './NavBar'
import Hero from './Hero'
import TechStackMarquee from './TechStackMarquee'
import Projects from './Projects'
import BlogMarquee from './BlogMarquee'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <div className="relative z-[9999]">
          <TechStackMarquee />
        </div>
        <section id="projects" className="relative"><Projects /></section>
        <section id="blog"><BlogMarquee /></section>
      </main>
    </div>
  )
}
