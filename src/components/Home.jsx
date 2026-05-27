import Navbar from './NavBar'
import Hero from './Hero'
import Projects from './Projects'
import BlogMarquee from './BlogMarquee'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section id="hero"><Hero /></section>
        <section id="projects"><Projects /></section>
        <section id="blog"><BlogMarquee /></section>
      </main>
    </div>
  )
}
