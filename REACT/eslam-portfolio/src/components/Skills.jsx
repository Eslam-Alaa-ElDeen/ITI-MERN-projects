import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '../data/portfolio';

function SkillCard({ item, index, color }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative glass rounded-xl p-4 border border-white/5 cursor-default text-center group overflow-hidden"
      style={{
        borderColor: hovered ? `${color}40` : undefined,
        boxShadow: hovered ? `0 0 20px ${color}20, 0 0 40px ${color}10` : undefined,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Glow bg on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        style={{ background: `radial-gradient(circle at center, ${color}10, transparent 70%)` }}
      />
      <div className="relative z-10">
        <span className="text-3xl block mb-2">{item.icon}</span>
        <span className="text-sm font-body text-slate-300 group-hover:text-white transition-colors">{item.name}</span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute left-0 top-1/2 w-64 h-64 bg-neon-cyan/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-neon-cyan font-mono text-sm tracking-widest">02. WHAT I KNOW</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-2 text-white">
            My <span className="text-gradient-cyan">Skills</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl">
            A collection of technologies and tools I've worked with, organized by category.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-12">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: catIdx * 0.15 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                  style={{ background: `${category.color}20`, border: `1px solid ${category.color}30` }}>
                  {catIdx === 0 ? '⚛️' : catIdx === 1 ? '🖥️' : '🔧'}
                </div>
                <h3 className="font-display font-semibold text-xl"
                  style={{ color: category.color }}>
                  {category.title}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {category.items.map((item, i) => (
                  <SkillCard
                    key={item.name}
                    item={item}
                    index={i}
                    color={category.color}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="font-display font-semibold text-xl text-white mb-6 flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            Certifications & Training
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'ICPC Level Zero Training', org: 'ICPC', color: '#00f5ff', icon: '🧩' },
              { name: 'MERN Stack Developer', org: 'Information Technology Institute (ITI)', color: '#b44fff', icon: '💻' },
              { name: 'Front-End Development', org: 'National Telecommunication Institute (NTI)', color: '#00ff88', icon: '🎨' },
              { name: 'Graphic Design', org: 'Information Technology Institute (ITI)', color: '#ff6b35', icon: '✏️' },
            ].map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="glass rounded-xl p-4 border border-white/5 hover:border-white/15 transition-all group"
              >
                <span className="text-2xl">{cert.icon}</span>
                <h4 className="font-display font-semibold text-white mt-2 text-sm">{cert.name}</h4>
                <p className="text-slate-500 text-xs mt-1">{cert.org}</p>
                <div className="mt-3 w-8 h-0.5 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ background: cert.color }} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
