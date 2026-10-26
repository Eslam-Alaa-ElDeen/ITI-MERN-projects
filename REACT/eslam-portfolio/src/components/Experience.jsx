import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/portfolio';

function TimelineItem({ item, index, isLeft }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-start gap-6 ${isLeft ? 'md:flex-row-reverse md:text-right' : 'md:flex-row'} flex-row`}
    >
      {/* Card */}
      <div className="flex-1 glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all group"
        style={{
          '--accent': item.color,
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className={isLeft ? 'md:ml-auto' : ''}>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="px-2 py-0.5 rounded text-xs font-mono font-medium"
                style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}
              >
                {item.type === 'work' ? '💼 Work' : '🎓 Education'}
              </span>
              <span className="text-slate-600 text-xs font-mono">{item.duration}</span>
            </div>
            <h3 className="font-display font-bold text-lg text-white">{item.title}</h3>
            <p className="text-sm font-medium mt-0.5" style={{ color: item.color }}>{item.company}</p>
            <p className="text-slate-500 text-xs mt-0.5">{item.location} · {item.period}</p>
          </div>
          <span className="text-3xl opacity-60 flex-shrink-0">{item.icon}</span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-3">{item.description}</p>

        {/* Highlights */}
        <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
          {item.highlights.map(h => (
            <span
              key={h}
              className="px-2 py-1 rounded-lg text-xs font-mono text-slate-400 bg-white/5 border border-white/5"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Bottom accent */}
        <div
          className="mt-4 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
          style={{ background: `linear-gradient(90deg, ${item.color}, transparent)` }}
        />
      </div>

      {/* Timeline dot - hidden on mobile, visible on md+ */}
      <div className="hidden md:flex flex-col items-center gap-0 flex-shrink-0">
        <div
          className="w-4 h-4 rounded-full border-2 flex-shrink-0 relative z-10"
          style={{
            borderColor: item.color,
            background: `${item.color}30`,
            boxShadow: `0 0 12px ${item.color}60`,
          }}
        />
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent hidden md:block" />

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-neon-cyan font-mono text-sm tracking-widest">04. MY JOURNEY</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-2 text-white">
            Experience & <span className="text-gradient-cyan">Education</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            A timeline of my professional training and academic journey.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {experience.map((item, i) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={i}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
