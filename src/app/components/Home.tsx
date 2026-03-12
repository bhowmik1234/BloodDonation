'use client'

import { useState } from 'react'
import { LanguageProvider, useLanguage } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'
import NearbyCamps from './NearbyCamps'

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  fullName: string
  email: string
  phone: string
  bloodGroup: string
  age: string
  city: string
  preferredDate: string
  message: string
}

interface BlogPost {
  id: number
  tag: string
  title: string
  excerpt: string
  date: string
  readTime: string
  imageSrc: string
  imageAlt: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const blogPosts: BlogPost[] = [
  {
    id: 1,
    tag: 'Camp Announcement',
    title: 'Annual Blood Donation Drive — Summer 2025',
    excerpt:
      'Join us this summer for our largest blood donation camp yet. Over 40 hospitals and 200+ volunteers will participate across 12 cities to collect life-saving units.',
    date: 'June 14, 2025',
    readTime: '3 min read',
    imageSrc: 'https://images.unsplash.com/photo-1615461066841-6116e61059a4?w=800&q=80',
    imageAlt: 'Blood donation camp volunteers',
  },
  {
    id: 2,
    tag: 'Health & Wellness',
    title: 'What Happens to Your Body After You Donate Blood?',
    excerpt:
      "Donating blood is safe, simple, and saves lives. Here's a science-backed look at how your body recovers and why regular donors are often healthier.",
    date: 'May 28, 2025',
    readTime: '5 min read',
    imageSrc: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
    imageAlt: 'Medical illustration of blood cells',
  },
  {
    id: 3,
    tag: 'Success Stories',
    title: 'One Donation, Three Lives: Stories from Real Donors',
    excerpt:
      'Every blood donation can be split into three components: red cells, platelets, and plasma, each helping a different patient. Read real stories from across India.',
    date: 'May 10, 2025',
    readTime: '6 min read',
    imageSrc: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    imageAlt: 'Smiling blood donor',
  },
]

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

// ─── Header ───────────────────────────────────────────────────────────────────
function Header() {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-14 sm:h-16">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-crimson rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 sm:w-5 sm:h-5">
              <path d="M12 2C12 2 5 9.5 5 14a7 7 0 0 0 14 0c0-4.5-7-12-7-12z" />
            </svg>
          </div>
          <span className="font-display text-lg sm:text-xl font-bold text-charcoal tracking-tight">
            Life<span className="text-crimson">Stream</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <a href="#home" className="px-4 py-2 text-sm font-medium text-crimson bg-rose-pale rounded-lg">
            {t('nav_home')}
          </a>
          <a href="#blood-banks" className="px-4 py-2 text-sm font-medium text-charcoal hover:text-crimson hover:bg-surface rounded-lg transition-colors">
            {t('nav_banks')}
          </a>
          <a href="#register" className="ml-3 px-5 py-2 bg-crimson text-white text-sm font-semibold rounded-lg hover:bg-crimson-dark transition-colors">
            {t('nav_donate')}
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-charcoal hover:bg-surface transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 space-y-1.5">
            <span className={`block h-0.5 bg-charcoal transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-charcoal transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-charcoal transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-3 flex flex-col gap-1.5">
          <a href="#home" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 text-sm font-medium text-crimson bg-rose-pale rounded-lg">{t('nav_home')}</a>
          <a href="#blood-banks" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 text-sm font-medium text-charcoal hover:bg-surface rounded-lg transition-colors">{t('nav_banks')}</a>
          <a href="#register" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 bg-crimson text-white text-sm font-semibold rounded-lg text-center mt-1">{t('nav_donate')}</a>
        </div>
      )}
    </header>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-charcoal">
      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1600&q=80"
        alt="Blood donation"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40 sm:to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 bg-crimson" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-12 sm:pb-16 w-full">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">

          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-crimson/20 border border-crimson/30 text-crimson text-xs font-semibold rounded-full uppercase tracking-widest mb-5 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
              {t('hero_badge')}
            </span>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-4 sm:mb-6">
              {t('hero_title_1')} <br />
              <span className="text-crimson">{t('hero_title_2')}</span>
            </h1>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md">
              {t('hero_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a href="#register" className="px-6 sm:px-7 py-3 sm:py-3.5 bg-crimson text-white font-semibold rounded-lg hover:bg-crimson-dark transition-colors text-center text-sm sm:text-base">
                {t('hero_cta_primary')}
              </a>
              <a href="#about" className="px-6 sm:px-7 py-3 sm:py-3.5 bg-white/10 text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-colors text-center text-sm sm:text-base">
                {t('hero_cta_secondary')}
              </a>
            </div>
          </div>

          {/* Nearby Camps — desktop */}
          <div className="hidden md:block">
            <NearbyCamps />
          </div>

          {/* Nearby Camps — mobile */}
          <div className="md:hidden">
            <NearbyCamps />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-white/30" />
      </div>
    </section>
  )
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  const { t } = useLanguage()

  const features = [
    { icon: '🩸', labelKey: 'feat_1_title' as const, subKey: 'feat_1_sub' as const },
    { icon: '⏱', labelKey: 'feat_2_title' as const, subKey: 'feat_2_sub' as const },
    { icon: '🏥', labelKey: 'feat_3_title' as const, subKey: 'feat_3_sub' as const },
    { icon: '❤️', labelKey: 'feat_4_title' as const, subKey: 'feat_4_sub' as const },
  ]

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Images collage */}
          <div className="relative h-64 sm:h-80 md:h-[420px] lg:h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700&q=80"
              alt="Nurse preparing blood donation"
              className="absolute top-0 left-0 w-[65%] h-[60%] object-cover rounded-xl sm:rounded-2xl shadow-card"
            />
            <img
              src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=700&q=80"
              alt="Blood donation equipment"
              className="absolute bottom-0 right-0 w-[60%] h-[55%] object-cover rounded-xl sm:rounded-2xl shadow-card"
            />
            <div className="absolute bottom-8 sm:bottom-14 left-0 z-10 bg-crimson text-white rounded-lg sm:rounded-xl px-3 sm:px-5 py-2 sm:py-4">
              <p className="font-display text-xl sm:text-3xl font-bold">4.5M+</p>
              <p className="text-white/80 text-xs sm:text-sm">{t('about_badge')}</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="text-crimson text-xs font-semibold uppercase tracking-widest">{t('about_tag')}</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal mt-3 mb-5 sm:mb-6 leading-tight">
              {t('about_title_1')} <br />
              <em className="text-crimson not-italic">{t('about_title_2')}</em>
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
              {t('about_p1')}
            </p>
            <p className="text-muted text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              {t('about_p2')}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {features.map((item) => (
                <div key={item.labelKey} className="flex gap-2 sm:gap-3 items-start p-2.5 sm:p-3 bg-surface rounded-xl">
                  <span className="text-xl sm:text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-charcoal text-xs sm:text-sm">{t(item.labelKey)}</p>
                    <p className="text-muted text-xs hidden sm:block">{t(item.subKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="bg-crimson py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          {[
            { value: '500+', label: 'Blood Camps' },
            { value: '1.2L+', label: 'Registered Donors' },
            { value: '98%', label: 'Donor Satisfaction' },
            { value: '24/7', label: 'Emergency Support' },
          ].map((stat) => (
            <div key={stat.label} className="text-white">
              <p className="font-display text-3xl sm:text-4xl font-bold">{stat.value}</p>
              <p className="text-white/70 text-xs sm:text-sm mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Blog Section ─────────────────────────────────────────────────────────────
function BlogSection() {
  const { t } = useLanguage()

  return (
    <section id="blog" className="py-16 sm:py-20 lg:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-12">
          <div>
            <span className="text-crimson text-xs font-semibold uppercase tracking-widest">{t('blog_tag')}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-2">{t('blog_title')}</h2>
          </div>
          <a href="#" className="text-crimson font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all self-start sm:self-auto">
            {t('blog_view_all')}
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group">
              <div className="relative overflow-hidden h-44 sm:h-52">
                <img
                  src={post.imageSrc}
                  alt={post.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-crimson text-white text-xs font-semibold rounded-lg">
                  {post.tag}
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2 sm:gap-3 text-muted text-xs mb-2 sm:mb-3">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-charcoal leading-snug mb-2 group-hover:text-crimson transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                <a href="#" className="inline-block mt-3 sm:mt-4 text-crimson text-sm font-semibold hover:underline">
                  {t('blog_read_more')}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Gallery Section ──────────────────────────────────────────────────────────
function GallerySection() {
  const { t } = useLanguage()

  const photos = [
    { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80', alt: 'Doctor with patient' },
    { src: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&q=80', alt: 'Blood donation bags' },
    { src: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=80', alt: 'Volunteer at camp' },
    { src: 'https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=600&q=80', alt: 'Hospital corridor' },
    { src: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=600&q=80', alt: 'Medical team' },
    { src: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80', alt: 'Blood bank lab' },
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-crimson text-xs font-semibold uppercase tracking-widest">{t('gallery_tag')}</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal mt-2">{t('gallery_title')}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-lg sm:rounded-xl group ${i === 0 ? 'sm:row-span-2' : ''}`}
              style={{ height: i === 0 ? undefined : '160px' }}
            >
              <div className={i === 0 ? 'h-[160px] sm:h-full' : 'h-full'} style={i === 0 ? { minHeight: '160px' } : {}}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Registration Section ─────────────────────────────────────────────────────
function RegistrationSection() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    fullName: '', email: '', phone: '', bloodGroup: '',
    age: '', city: '', preferredDate: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1500)
  }

  const inputClass =
    'w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg text-charcoal placeholder-muted text-sm bg-white focus:outline-none focus:border-crimson focus:ring-2 focus:ring-crimson/10 transition-all'

  const steps = [
    { step: '01', titleKey: 'step_1_title' as const, descKey: 'step_1_desc' as const },
    { step: '02', titleKey: 'step_2_title' as const, descKey: 'step_2_desc' as const },
    { step: '03', titleKey: 'step_3_title' as const, descKey: 'step_3_desc' as const },
  ]

  return (
    <section id="register" className="py-16 sm:py-20 lg:py-24 bg-rose-pale">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Mobile header */}
        <div className="mb-8 md:hidden">
          <span className="text-crimson text-xs font-semibold uppercase tracking-widest">{t('reg_tag')}</span>
          <h2 className="font-display text-3xl font-bold text-charcoal mt-2 leading-tight">
            {t('reg_title_1')} {t('reg_title_2')}
          </h2>
          <p className="text-muted text-sm leading-relaxed mt-3">{t('reg_subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Left info — desktop only */}
          <div className="hidden md:block md:col-span-2">
            <span className="text-crimson text-xs font-semibold uppercase tracking-widest">{t('reg_tag')}</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal mt-2 mb-5 leading-tight">
              {t('reg_title_1')} <br />{t('reg_title_2')}
            </h2>
            <p className="text-muted text-sm lg:text-base leading-relaxed mb-8">{t('reg_subtitle')}</p>
            <div className="space-y-5">
              {steps.map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <span className="font-display text-3xl font-black text-crimson/20 min-w-[40px] leading-none">{item.step}</span>
                  <div>
                    <p className="font-semibold text-charcoal text-sm">{t(item.titleKey)}</p>
                    <p className="text-muted text-sm">{t(item.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form card */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-2xl shadow-card p-5 sm:p-6 lg:p-8">
              {submitted ? (
                <div className="text-center py-10 sm:py-12">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-crimson rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal mb-2">{t('form_success_title')}</h3>
                  <p className="text-muted text-sm sm:text-base">
                    {t('form_success_msg')} <strong>{formData.fullName}</strong>.{' '}
                    {t('form_success_sub')}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-5 sm:mt-6 px-6 py-2.5 border border-crimson text-crimson text-sm font-semibold rounded-lg hover:bg-rose-pale transition-colors"
                  >
                    {t('form_register_another')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-charcoal">{t('form_title')}</h3>
                    <p className="text-muted text-xs sm:text-sm mt-1">{t('form_required')}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">{t('form_name')}</label>
                      <input name="fullName" type="text" placeholder="Arjun Sharma"
                        value={formData.fullName} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">{t('form_age')}</label>
                      <input name="age" type="number" placeholder="18 - 65"
                        value={formData.age} onChange={handleChange} className={inputClass} min={18} max={65} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">{t('form_email')}</label>
                      <input name="email" type="email" placeholder="arjun@example.com"
                        value={formData.email} onChange={handleChange} className={inputClass} required />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">{t('form_phone')}</label>
                      <input name="phone" type="tel" placeholder="+91 98765 43210"
                        value={formData.phone} onChange={handleChange} className={inputClass} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">{t('form_blood')}</label>
                      <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className={inputClass} required>
                        <option value="">Select blood group</option>
                        {bloodGroups.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">{t('form_city')}</label>
                      <input name="city" type="text" placeholder="Chennai, Mumbai, Delhi"
                        value={formData.city} onChange={handleChange} className={inputClass} required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">{t('form_date')}</label>
                    <input name="preferredDate" type="date"
                      value={formData.preferredDate} onChange={handleChange} className={inputClass} required />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">{t('form_notes')}</label>
                    <textarea name="message" rows={3}
                      placeholder={t('form_notes_placeholder')}
                      value={formData.message} onChange={handleChange}
                      className={`${inputClass} resize-none`} />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-3 sm:py-3.5 bg-crimson text-white font-semibold rounded-lg hover:bg-crimson-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        {t('form_submitting')}
                      </>
                    ) : t('form_submit')}
                  </button>

                  <p className="text-muted text-xs text-center">{t('form_consent')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { t } = useLanguage()

  return (
    <footer id="blood-banks" className="bg-charcoal text-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-crimson rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <path d="M12 2C12 2 5 9.5 5 14a7 7 0 0 0 14 0c0-4.5-7-12-7-12z" />
                </svg>
              </div>
              <span className="font-display text-base sm:text-lg font-bold">
                Life<span className="text-crimson">Stream</span>
              </span>
            </div>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{t('footer_tagline')}</p>
          </div>

          {/* Blood Banks */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3 sm:mb-4">{t('footer_banks')}</p>
            <ul className="space-y-1.5 sm:space-y-2 text-white/70 text-xs sm:text-sm">
              {['AIIMS, Delhi', 'KEM Hospital, Mumbai', 'Apollo, Chennai', 'Manipal, Bangalore', 'SSKM, Kolkata'].map((bank) => (
                <li key={bank}><a href="#" className="hover:text-crimson transition-colors">{bank}</a></li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3 sm:mb-4">{t('footer_links')}</p>
            <ul className="space-y-1.5 sm:space-y-2 text-white/70 text-xs sm:text-sm">
              {[
                t('link_home'),
                t('link_donate'),
                t('link_find'),
                t('link_eligibility'),
                t('link_contact'),
              ].map((link) => (
                <li key={link}><a href="#" className="hover:text-crimson transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Emergency */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3 sm:mb-4">{t('footer_emergency')}</p>
            <div className="bg-crimson/20 border border-crimson/30 rounded-xl p-3 sm:p-4">
              <p className="text-white text-xs sm:text-sm font-semibold mb-1">{t('footer_helpline_label')}</p>
              <p className="text-crimson text-lg sm:text-xl font-display font-bold">1800-180-0010</p>
              <p className="text-white/50 text-xs mt-1">{t('footer_helpline_sub')}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between gap-2 sm:gap-3 text-white/40 text-xs">
          <p>{t('footer_copy')}</p>
          <p>{t('footer_built')}</p>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <LanguageProvider>
      <LanguageToggle />
      <Header />

      <main>
        <HeroSection />
        <AboutSection />
        <RegistrationSection />
        <StatsBar />
        <BlogSection />
        <GallerySection />
      </main>

      <Footer />
    </LanguageProvider>
  )
}