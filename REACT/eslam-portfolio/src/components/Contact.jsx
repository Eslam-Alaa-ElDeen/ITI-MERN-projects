import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/portfolio';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.length < 10) e.message = 'Message too short';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');
    // Simulate send (replace with EmailJS integration)
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  const inputClass = (field) =>
    `w-full glass rounded-xl px-4 py-3 text-sm font-body text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-neon-cyan/40 focus:shadow-[0_0_20px_rgba(0,245,255,0.1)] ${
      errors[field] ? 'border-red-500/50' : 'border-white/10'
    }`;

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-1/4 bottom-0 w-96 h-96 bg-neon-cyan/5 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-neon-cyan font-mono text-sm tracking-widest">06. LET'S TALK</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-2 text-white">
            Get In <span className="text-gradient-cyan">Touch</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            I'm open to internships, freelance projects, and full-time roles. Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display font-semibold text-xl text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {[
                  { icon: '📧', label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: '📱', label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                  { icon: '📍', label: 'Location', value: personalInfo.location },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4 glass rounded-xl p-4 border border-white/5 hover:border-neon-cyan/20 transition-all group">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <span className="text-xs font-mono text-neon-cyan/60 block">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="text-slate-200 text-sm hover:text-neon-cyan transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-slate-200 text-sm">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <h3 className="font-display font-semibold text-lg text-white mb-4">Find Me Online</h3>
              <div className="flex gap-4">
                {[
                  { name: 'LinkedIn', href: personalInfo.linkedin, color: '#0077b5', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )},
                  { name: 'GitHub', href: personalInfo.github, color: '#ffffff', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )},
                ].map(social => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass p-3 rounded-xl border border-white/10 hover:border-white/25 transition-all group flex items-center gap-2"
                  >
                    <span className="text-slate-400 group-hover:text-white transition-colors">
                      {social.icon}
                    </span>
                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="glass rounded-2xl p-5 border border-neon-green/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-transparent" />
              <div className="relative z-10 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
                <div>
                  <p className="text-neon-green font-semibold text-sm">Available for Work</p>
                  <p className="text-slate-400 text-xs mt-0.5">Open to internships, freelance & full-time roles</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-white/5 space-y-5">
              <div>
                <label className="text-xs font-mono text-neon-cyan/60 block mb-2">YOUR NAME</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={inputClass('name')}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-mono text-neon-cyan/60 block mb-2">EMAIL ADDRESS</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="text-xs font-mono text-neon-cyan/60 block mb-2">MESSAGE</label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={`${inputClass('message')} resize-none`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full btn-primary py-4 flex items-center justify-center gap-2 ${status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {status === 'sending' && (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                )}
                {status === 'idle' && 'Send Message →'}
                {status === 'sending' && 'Sending...'}
                {status === 'success' && '✓ Message Sent!'}
                {status === 'error' && 'Failed. Try again.'}
              </button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-neon-green text-sm text-center"
                >
                  Thanks! I'll get back to you within 24 hours. 🚀
                </motion.p>
              )}

              <p className="text-slate-600 text-xs text-center">
                * Connect EmailJS to enable real sending. See README for setup.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
