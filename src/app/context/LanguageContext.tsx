'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// ─── All site text in both languages ─────────────────────────────────────────
export const translations = {
  en: {
    // Header
    nav_home: 'Home',
    nav_banks: 'Blood Banks',
    nav_donate: 'Donate Now',

    // Hero
    hero_badge: 'World Blood Donor Day — June 14',
    hero_title_1: 'Every Drop',
    hero_title_2: 'Counts.',
    hero_subtitle: "One donation. Three lives saved. Register today to donate blood at your nearest camp or blood bank and be someone's reason to live.",
    hero_cta_primary: 'Register to Donate',
    hero_cta_secondary: 'Learn More',
    nearby_title: 'Camps Near You',
    nearby_detecting: 'Detecting your location...',
    nearby_denied_msg: 'Location access was denied. Enable it in your browser settings to find camps near you.',
    nearby_error_msg: 'Could not fetch location. Please try again.',
    nearby_retry: 'Try Again',
    nearby_book: 'Book a Slot',
    nearby_open: 'Open',
    nearby_tomorrow: 'Tomorrow',
    nearby_slots: 'slots left',

    // About
    about_tag: 'Why It Matters',
    about_title_1: 'The Gift of Life is',
    about_title_2: 'Always Needed',
    about_p1: "Blood cannot be manufactured — it can only come from generous donors. Every two seconds, someone in India needs blood. Whether it's a surgery, cancer treatment, trauma, or childbirth complication, donated blood is irreplaceable.",
    about_p2: 'Donating takes less than an hour. The process is safe, monitored by trained professionals, and your body replenishes the blood within weeks.',
    about_badge: 'Lives saved last year',
    feat_1_title: 'Safe & Sterile',
    feat_1_sub: 'New equipment, every time',
    feat_2_title: 'Under 1 Hour',
    feat_2_sub: 'Quick and convenient',
    feat_3_title: '500+ Camps',
    feat_3_sub: 'Across major cities',
    feat_4_title: 'Free Health Check',
    feat_4_sub: 'BP, Hb, pulse screening',

    // Blog
    blog_tag: 'Latest Updates',
    blog_title: 'News & Camps',
    blog_view_all: 'View all articles →',
    blog_read_more: 'Read more →',

    // Gallery
    gallery_tag: 'Gallery',
    gallery_title: 'From Our Camps',

    // Registration
    reg_tag: 'Sign Up',
    reg_title_1: 'Register to',
    reg_title_2: 'Donate Blood',
    reg_subtitle: "Fill in your details and we'll connect you with the nearest blood camp or bank in your city. Our team will reach out to confirm your appointment.",
    step_1_title: 'Register Online',
    step_1_desc: 'Fill this form with your details and preferred date.',
    step_2_title: 'Get Confirmed',
    step_2_desc: 'Our team will call you within 24 hours to confirm.',
    step_3_title: 'Visit & Donate',
    step_3_desc: 'Show up, get screened, and save up to 3 lives.',
    form_title: 'Donor Registration Form',
    form_required: 'All fields marked * are required.',
    form_name: 'Full Name *',
    form_age: 'Age *',
    form_email: 'Email Address *',
    form_phone: 'Phone Number *',
    form_blood: 'Blood Group *',
    form_city: 'City *',
    form_date: 'Preferred Donation Date *',
    form_notes: 'Medical Notes (optional)',
    form_notes_placeholder: 'Medications, past donations, health conditions...',
    form_submit: 'Register as Donor',
    form_submitting: 'Submitting...',
    form_consent: 'By registering, you consent to being contacted by our team. Your data is never shared.',
    form_success_title: 'Registration Received!',
    form_success_msg: "We'll contact you at",
    form_success_sub: 'within 24 hours.',
    form_register_another: 'Register Another',

    // Footer
    footer_tagline: 'Connecting generous donors with those who need blood the most, across India.',
    footer_banks: 'Blood Banks',
    footer_links: 'Quick Links',
    footer_emergency: 'Emergency',
    footer_helpline_label: '24/7 Blood Helpline',
    footer_helpline_sub: 'Toll free · All days',
    footer_copy: '© 2025 LifeStream. All rights reserved.',
    footer_built: 'Built with ❤️ to save lives across India.',
    link_home: 'Home',
    link_donate: 'Donate Now',
    link_find: 'Find a Camp',
    link_eligibility: 'Eligibility Checker',
    link_contact: 'Contact Us',
  },

  hi: {
    // Header
    nav_home: 'होम',
    nav_banks: 'ब्लड बैंक',
    nav_donate: 'अभी दान करें',

    // Hero
    hero_badge: 'विश्व रक्तदाता दिवस — 14 जून',
    hero_title_1: 'हर बूंद',
    hero_title_2: 'मायने रखती है।',
    hero_subtitle: 'एक दान। तीन जिंदगियाँ बचती हैं। आज ही अपने नजदीकी रक्तदान शिविर या ब्लड बैंक में रजिस्टर करें।',
    hero_cta_primary: 'दाता के रूप में रजिस्टर करें',
    hero_cta_secondary: 'और जानें',
    nearby_title: 'आपके पास के शिविर',
    nearby_detecting: 'आपका स्थान पता किया जा रहा है...',
    nearby_denied_msg: 'स्थान की अनुमति नहीं दी गई। ब्राउज़र सेटिंग में अनुमति दें।',
    nearby_error_msg: 'स्थान प्राप्त नहीं हुआ। कृपया पुनः प्रयास करें।',
    nearby_retry: 'पुनः प्रयास करें',
    nearby_book: 'स्लॉट बुक करें',
    nearby_open: 'खुला है',
    nearby_tomorrow: 'कल',
    nearby_slots: 'स्लॉट बचे हैं',

    // About
    about_tag: 'यह क्यों जरूरी है',
    about_title_1: 'जीवन का उपहार है',
    about_title_2: 'हमेशा जरूरी',
    about_p1: 'रक्त बनाया नहीं जा सकता — यह केवल उदार दाताओं से मिल सकता है। भारत में हर दो सेकंड में किसी को रक्त की जरूरत होती है। चाहे सर्जरी हो, कैंसर उपचार हो, आघात हो या प्रसव जटिलता — दान किया गया रक्त अपूरणीय है।',
    about_p2: 'दान करने में एक घंटे से कम समय लगता है। यह प्रक्रिया सुरक्षित है और प्रशिक्षित पेशेवरों द्वारा निगरानी की जाती है।',
    about_badge: 'पिछले साल बचाई गई जिंदगियाँ',
    feat_1_title: 'सुरक्षित और स्वच्छ',
    feat_1_sub: 'हर बार नए उपकरण',
    feat_2_title: '1 घंटे से कम',
    feat_2_sub: 'त्वरित और सुविधाजनक',
    feat_3_title: '500+ शिविर',
    feat_3_sub: 'प्रमुख शहरों में',
    feat_4_title: 'मुफ्त स्वास्थ्य जांच',
    feat_4_sub: 'BP, Hb, नाड़ी जांच',

    // Blog
    blog_tag: 'ताज़ा अपडेट',
    blog_title: 'समाचार और शिविर',
    blog_view_all: 'सभी लेख देखें →',
    blog_read_more: 'और पढ़ें →',

    // Gallery
    gallery_tag: 'गैलरी',
    gallery_title: 'हमारे शिविरों से',

    // Registration
    reg_tag: 'पंजीकरण करें',
    reg_title_1: 'रक्तदान के लिए',
    reg_title_2: 'रजिस्टर करें',
    reg_subtitle: 'अपनी जानकारी भरें और हम आपको आपके शहर के नजदीकी ब्लड बैंक से जोड़ेंगे।',
    step_1_title: 'ऑनलाइन रजिस्टर करें',
    step_1_desc: 'फॉर्म में अपनी जानकारी और पसंदीदा तारीख भरें।',
    step_2_title: 'पुष्टि प्राप्त करें',
    step_2_desc: 'हमारी टीम 24 घंटे के भीतर कॉल करेगी।',
    step_3_title: 'जाएं और दान करें',
    step_3_desc: 'जांच कराएं और 3 जिंदगियां बचाएं।',
    form_title: 'दाता पंजीकरण फॉर्म',
    form_required: '* से चिह्नित सभी फ़ील्ड आवश्यक हैं।',
    form_name: 'पूरा नाम *',
    form_age: 'आयु *',
    form_email: 'ईमेल पता *',
    form_phone: 'फ़ोन नंबर *',
    form_blood: 'रक्त समूह *',
    form_city: 'शहर *',
    form_date: 'पसंदीदा दान तारीख *',
    form_notes: 'चिकित्सा नोट्स (वैकल्पिक)',
    form_notes_placeholder: 'दवाइयां, पिछले दान, स्वास्थ्य स्थितियां...',
    form_submit: 'दाता के रूप में रजिस्टर करें',
    form_submitting: 'जमा हो रहा है...',
    form_consent: 'रजिस्टर करके आप हमारी टीम से संपर्क की अनुमति देते हैं। आपका डेटा कभी साझा नहीं किया जाता।',
    form_success_title: 'पंजीकरण प्राप्त हुआ!',
    form_success_msg: 'हम आपसे संपर्क करेंगे',
    form_success_sub: '24 घंटे के भीतर।',
    form_register_another: 'दूसरा पंजीकरण करें',

    // Footer
    footer_tagline: 'उदार दाताओं को जरूरतमंदों से जोड़ना, पूरे भारत में।',
    footer_banks: 'ब्लड बैंक',
    footer_links: 'त्वरित लिंक',
    footer_emergency: 'आपातकाल',
    footer_helpline_label: '24/7 रक्त हेल्पलाइन',
    footer_helpline_sub: 'टोल फ्री · सभी दिन',
    footer_copy: '© 2025 LifeStream. सर्वाधिकार सुरक्षित।',
    footer_built: 'भारत में जिंदगियाँ बचाने के लिए ❤️ के साथ बनाया गया।',
    link_home: 'होम',
    link_donate: 'अभी दान करें',
    link_find: 'शिविर खोजें',
    link_eligibility: 'पात्रता जांचें',
    link_contact: 'संपर्क करें',
  },
}

export type Language = 'en' | 'hi'
export type TranslationKey = keyof typeof translations.en

// ─── Context ──────────────────────────────────────────────────────────────────
interface LanguageContextType {
  lang: Language
  setLang: (l: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key) => key,
})

// ─── Provider ─────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en')
  const t = (key: TranslationKey) => translations[lang][key]
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLanguage() {
  return useContext(LanguageContext)
}