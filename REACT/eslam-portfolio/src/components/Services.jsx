import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { services } from '../data/portfolio';

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section-padding relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-neon-purple/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-neon-cyan font-mono text-sm tracking-widest">05. WHAT I OFFER</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-2 text-white">
            My <span className="text-gradient-cyan">Services</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative glass rounded-2xl p-6 border border-white/5 group overflow-hidden hover:border-white/10 transition-all"
            >
              {/* Hover bg */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${service.color}08, transparent 70%)` }}
              />

              <div className="relative z-10">
                <span className="text-4xl block mb-4">{service.icon}</span>
                <h3 className="font-display font-semibold text-white text-lg mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>

                <div
                  className="mt-6 w-8 h-0.5 rounded-full group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
