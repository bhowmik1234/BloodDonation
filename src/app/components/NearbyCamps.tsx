'use client'

import { useState, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Camp {
  id: number
  name: string
  address: string
  distance: string
  date: string
  slots: number
  open: boolean
}

type Status = 'idle' | 'loading' | 'success' | 'error' | 'denied'

// ─── Mock camp data generator (replace with real API call using lat/lng) ──────
// In production: call your backend or a service like Google Places API
// e.g. fetch(`/api/camps?lat=${lat}&lng=${lng}`)
function getMockCamps(lat: number, lng: number): Camp[] {
  // The lat/lng can be passed to a real API. Mock data shown here for UI.
  void lat; void lng
  return [
    {
      id: 1,
      name: 'City Blood Bank',
      address: 'Rajiv Gandhi Rd, Sector 4',
      distance: '1.2 km',
      date: 'Today, 9am – 5pm',
      slots: 8,
      open: true,
    },
    {
      id: 2,
      name: 'Apollo Donation Camp',
      address: 'MG Road, Near Metro Station',
      distance: '2.8 km',
      date: 'Today, 10am – 4pm',
      slots: 3,
      open: true,
    },
    {
      id: 3,
      name: 'Red Cross Centre',
      address: 'Civil Lines, District Hospital',
      distance: '4.5 km',
      date: 'Tomorrow, 8am – 6pm',
      slots: 15,
      open: false,
    },
  ]
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function NearbyCamps() {
  const [status, setStatus] = useState<Status>('idle')
  const [camps, setCamps] = useState<Camp[]>([])
  const [cityName, setCityName] = useState<string>('')

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setStatus('error')
      return
    }

    setStatus('loading')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        // Reverse geocode to get city name (no API key needed)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
          const data = await res.json()
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            'your area'
          setCityName(city)
        } catch {
          setCityName('your area')
        }

        // Replace getMockCamps() with your real API call here:
        // const res = await fetch(`/api/camps?lat=${latitude}&lng=${longitude}`)
        // const camps = await res.json()
        const nearCamps = getMockCamps(latitude, longitude)
        setCamps(nearCamps)
        setStatus('success')
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus('denied')
        } else {
          setStatus('error')
        }
      },
      { timeout: 10000 }
    )
  }

  // Auto-request on mount
  useEffect(() => {
    fetchLocation()
  }, [])

  // ── Idle / Loading ──────────────────────────────────────────────────────────
  if (status === 'idle' || status === 'loading') {
    return (
      <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-6 max-w-sm ml-auto w-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">
            Nearby Camps
          </p>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-3 bg-white/10 rounded w-3/4 mb-1.5" />
              <div className="h-2.5 bg-white/10 rounded w-1/2" />
            </div>
          ))}
        </div>
        <p className="text-white/40 text-xs mt-4">Detecting your location...</p>
      </div>
    )
  }

  // ── Permission Denied ───────────────────────────────────────────────────────
  if (status === 'denied') {
    return (
      <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-6 max-w-sm ml-auto w-full">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">Nearby Camps</p>
        </div>
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          Location access was denied. Enable it in your browser settings to find camps near you.
        </p>
        <button
          onClick={fetchLocation}
          className="w-full py-2 bg-crimson/80 hover:bg-crimson text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  // ── Error ───────────────────────────────────────────────────────────────────
  if (status === 'error') {
    return (
      <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-6 max-w-sm ml-auto w-full">
        <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-3">Nearby Camps</p>
        <p className="text-white/70 text-sm mb-4">Could not fetch location. Please try again.</p>
        <button
          onClick={fetchLocation}
          className="w-full py-2 bg-crimson/80 hover:bg-crimson text-white text-xs font-semibold rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  // ── Success ─────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white/10 backdrop-blur border border-white/15 rounded-2xl p-5 max-w-sm ml-auto w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">
            Camps Near You
          </p>
        </div>
        <span className="text-white/40 text-xs">{cityName}</span>
      </div>

      {/* Camp List */}
      <div className="space-y-3">
        {camps.map((camp) => (
          <div
            key={camp.id}
            className="bg-white/8 border border-white/10 rounded-xl p-3 hover:bg-white/12 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-white text-sm font-semibold leading-tight">{camp.name}</p>
              <span
                className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  camp.open
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-white/10 text-white/40'
                }`}
              >
                {camp.open ? 'Open' : 'Tomorrow'}
              </span>
            </div>

            <p className="text-white/50 text-xs mb-2">{camp.address}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Distance */}
                <span className="flex items-center gap-1 text-white/60 text-xs">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {camp.distance}
                </span>
                {/* Time */}
                <span className="flex items-center gap-1 text-white/60 text-xs">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {camp.date}
                </span>
              </div>

              {/* Slots */}
              <span
                className={`text-xs font-medium ${
                  camp.slots <= 5 ? 'text-orange-400' : 'text-white/50'
                }`}
              >
                {camp.slots} slots left
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <a
        href="#register"
        className="mt-4 flex items-center justify-center gap-1.5 w-full py-2 bg-crimson hover:bg-crimson-dark text-white text-xs font-semibold rounded-lg transition-colors"
      >
        Book a Slot
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  )
}