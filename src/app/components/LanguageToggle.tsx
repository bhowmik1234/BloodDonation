'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()
  const [visible, setVisible] = useState(false)

  // Show popup on first visit only
  useEffect(() => {
    const chosen = sessionStorage.getItem('lang-chosen')
    if (!chosen) setVisible(true)
  }, [])

  const choose = (l: 'en' | 'hi') => {
    setLang(l)
    sessionStorage.setItem('lang-chosen', l)
    setVisible(false)
  }

  // Small floating button to reopen the picker anytime
  return (
    <>
      {/* ── Floating trigger button ───────────────────── */}
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-crimson text-white text-xs font-semibold rounded-full shadow-crimson hover:bg-crimson-dark transition-colors"
        aria-label="Change language"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        {lang === 'en' ? 'EN' : 'हि'}
      </button>

      {/* ── Backdrop ──────────────────────────────────── */}
      {visible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 backdrop-blur-sm px-4"
          onClick={() => {
            // Only dismiss if language was already chosen before
            if (sessionStorage.getItem('lang-chosen')) setVisible(false)
          }}
        >
          {/* ── Modal ───────────────────────────────────── */}
          <div
            className="bg-white rounded-2xl shadow-card-hover w-full max-w-sm p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo mark */}
            <div className="w-12 h-12 bg-crimson rounded-full flex items-center justify-center mx-auto mb-5 shadow-crimson-sm">
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M12 2C12 2 5 9.5 5 14a7 7 0 0 0 14 0c0-4.5-7-12-7-12z" />
              </svg>
            </div>

            <h2 className="font-display text-2xl font-bold text-charcoal mb-1">
              Choose Language
            </h2>
            <p className="font-display text-lg text-muted mb-6">
              भाषा चुनें
            </p>

            <div className="grid grid-cols-2 gap-3">
              {/* English */}
              <button
                onClick={() => choose('en')}
                className={`group flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all ${
                  lang === 'en'
                    ? 'border-crimson bg-rose-pale'
                    : 'border-border hover:border-crimson/40 hover:bg-surface'
                }`}
              >
                <span className="text-3xl">🇬🇧</span>
                <span className="font-semibold text-charcoal text-sm">English</span>
                {lang === 'en' && (
                  <span className="text-xs text-crimson font-semibold">Selected</span>
                )}
              </button>

              {/* Hindi */}
              <button
                onClick={() => choose('hi')}
                className={`group flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all ${
                  lang === 'hi'
                    ? 'border-crimson bg-rose-pale'
                    : 'border-border hover:border-crimson/40 hover:bg-surface'
                }`}
              >
                <span className="text-3xl">🇮🇳</span>
                <span className="font-semibold text-charcoal text-sm">हिन्दी</span>
                {lang === 'hi' && (
                  <span className="text-xs text-crimson font-semibold">चुना गया</span>
                )}
              </button>
            </div>

            {/* Dismiss — only if language was already set */}
            {sessionStorage.getItem('lang-chosen') && (
              <button
                onClick={() => setVisible(false)}
                className="mt-5 text-muted text-xs hover:text-charcoal transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}