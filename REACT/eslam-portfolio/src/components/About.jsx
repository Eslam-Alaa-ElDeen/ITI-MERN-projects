import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo, skills } from '../data/portfolio';

function SkillBar({ name, level, delay, color = '#00f5ff' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-body text-slate-300">{name}</span>
        <span className="text-xs font-mono text-slate-500">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        >
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/80 shadow-[0_0_6px_rgba(0,245,255,0.8)]" />
        </motion.div>
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-neon-purple/3 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <motion.span variants={itemVariants} className="text-neon-cyan font-mono text-sm tracking-widest">
            01. WHO I AM
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display font-bold text-4xl md:text-5xl mt-2 text-white">
            About <span className="text-gradient-cyan">Me</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Profile + bio */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {/* Avatar */}
            <motion.div variants={itemVariants} className="relative w-fit">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden glass border border-neon-cyan/20">
                {/* Placeholder avatar */}
                <div className="w-full h-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center">
                  <span className="font-display font-bold text-6xl text-gradient-cyan">EA</span>
                </div>
                {/* Scan line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent animate-[scan_3s_ease-in-out_infinite]" />
              </div>
              {/* Decorative border */}
              <div className="absolute -top-2 -right-2 w-full h-full border border-neon-cyan/20 rounded-2xl" />
              {/* Status dot */}
              <div className="absolute -bottom-2 -right-2 glass px-3 py-1 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span className="text-xs font-mono text-neon-green">Open to work</span>
              </div>
            </motion.div>

            {/* Bio text */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                {personalInfo.bio}
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                {personalInfo.bioExtended}
              </p>
            </motion.div>

            {/* Info grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              {[
                { label: 'Name', value: 'Eslam Alaa' },
                { label: 'Location', value: 'Damanhour, Egypt' },
                { label: 'Email', value: 'ea33669900@gmail.com', small: true },
                { label: 'Phone', value: '01004037294' },
                { label: 'University', value: 'Damanhour University' },
                { label: 'Training', value: 'ITI Damanhour' },
              ].map(item => (
                <div key={item.label} className="glass p-3 rounded-xl border border-white/5 hover:border-neon-cyan/20 transition-colors">
                  <span className="text-xs font-mono text-neon-cyan/60 block">{item.label}</span>
                  <span className={`text-slate-200 font-body mt-0.5 block ${item.small ? 'text-xs' : 'text-sm'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex gap-3">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-4 py-2 rounded-xl text-sm font-body text-slate-300 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-4 py-2 rounded-xl text-sm font-body text-slate-300 hover:text-white hover:border-white/30 transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {/* Frontend */}
            <motion.div variants={itemVariants} className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="font-display font-semibold text-neon-cyan mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-neon-cyan rounded-full" />
                Frontend
              </h3>
              <div className="space-y-4">
                {skills.frontend.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} delay={i * 0.1} color="#00f5ff" />
                ))}
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div variants={itemVariants} className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="font-display font-semibold text-neon-purple mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-neon-purple rounded-full" />
                Backend
              </h3>
              <div className="space-y-4">
                {skills.backend.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} delay={i * 0.1} color="#b44fff" />
                ))}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div variants={itemVariants} className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="font-display font-semibold text-neon-green mb-5 flex items-center gap-2">
                <span className="w-1 h-4 bg-neon-green rounded-full" />
                Tools & Other
              </h3>
              <div className="space-y-4">
                {skills.tools.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} delay={i * 0.1} color="#00ff88" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
