import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolio';

const filters = ['All', 'Web', 'Apps', 'Design'];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative glass rounded-2xl overflow-hidden border border-white/5 group"
      style={{
        borderColor: hovered ? `${project.accent}30` : undefined,
        boxShadow: hovered ? `0 20px 60px ${project.accent}15` : undefined,
        transition: 'all 0.4s ease',
      }}
    >
      {/* Project image / gradient */}
      <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        {/* Animated pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        {/* Center decoration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 group-hover:scale-110 transform transition-transform">
            {project.category === 'Web' ? '🌐' : project.category === 'Apps' ? '📱' : '🎨'}
          </div>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2 py-1 rounded-full text-xs font-mono font-medium"
            style={{ background: `${project.accent}20`, color: project.accent, border: `1px solid ${project.accent}30` }}
          >
            {project.category}
          </span>
        </div>
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 rounded-full text-xs font-mono bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              ⭐ Featured
            </span>
          </div>
        )}
        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center gap-3"
          style={{ background: 'rgba(3,7,18,0.8)' }}
        >
          <a
            href={project.demo}
            className="px-4 py-2 rounded-xl text-sm font-body font-medium transition-all"
            style={{ background: `${project.accent}20`, color: project.accent, border: `1px solid ${project.accent}40` }}
          >
            Live Demo ↗
          </a>
          <a
            href={project.github}
            className="px-4 py-2 rounded-xl text-sm font-body font-medium bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all"
          >
            GitHub
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-white group-hover:text-gradient-cyan transition-all">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map(tech => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs font-mono text-slate-400 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
        {/* Links row */}
        <div className="flex gap-4 mt-4 pt-4 border-t border-white/5">
          <a href={project.demo} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-neon-cyan transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>
          <a href={project.github} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-neon-cyan/3 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="text-neon-cyan font-mono text-sm tracking-widest">03. WHAT I BUILT</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-2 text-white">
            Featured <span className="text-gradient-cyan">Projects</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl">
            A selection of projects showcasing my skills across web development and design.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-xl text-sm font-body font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/40'
                  : 'glass text-slate-400 border border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {filter}
              {filter === 'All' && <span className="ml-2 text-xs opacity-60">{projects.length}</span>}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View more */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/eslam-alaa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            View All on GitHub
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
