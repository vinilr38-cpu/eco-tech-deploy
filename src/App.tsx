import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import MembersPage from './pages/MembersPage';
import ContactPage from './pages/ContactPage';
import AlbumsPage from './pages/AlbumsPage';
import SplashScreen from './components/SplashScreen';
import CursorGlow from './components/CursorGlow';

function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/projects', label: 'Projects' },
    { path: '/albums', label: 'Albums' },
    { path: '/members', label: 'Members' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Eco Tech Logo" className="w-10 h-10 object-contain" />
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Eco Tech</span>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `font-medium transition-all duration-300 ${isActive ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-300 hover:text-emerald-400'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden pb-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block w-full text-left px-4 py-2 ${isActive ? 'text-emerald-400' : 'text-gray-300 hover:text-emerald-400'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-emerald-900/30 py-8 px-4 bg-slate-950/50">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2026 Eco Tech Club. Building the future sustainably.</p>
          <div className="mt-4 flex gap-6 justify-center">
            <a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // You can set this to your video path once you have it
  const videoAddress = ""; // Set to empty as /splash-video.mp4 is 0 bytes

  return (
    <Router>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen
            key="splash"
            onComplete={() => setShowSplash(false)}
            videoSrc={videoAddress}
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <CursorGlow />
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventDetailPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
                <Route path="/albums" element={<AlbumsPage />} />
                <Route path="/members" element={<MembersPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
    </Router>
  );
}

