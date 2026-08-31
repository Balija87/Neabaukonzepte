import { useEffect, useState } from 'react'

const themeImages = {
  dark: { src: '/fiberOptic.jpg', alt: 'Glasfaser und LWL-Kabel in blauer Lichtstimmung' },
  light: { src: '/Fiber%20Optic%20white.jpg', alt: 'LWL-Glasfaserkabel mit leuchtenden Lichtleitern' }
}

const copy = {
  de: {
    tagline: 'Schnelle Verbindung, sichere Installation',
    category: 'Glasfaser · Bau · Netzwerk',
    heading: 'Erdarbeiten und Glasfaserinstallationen aus einer Hand',
    description: 'Wir realisieren optische Netze, sichere Anschlussarbeiten und zuverlässige Lösungen für Wohn- und Geschäftskunden.',
    primaryAction: 'Angebot anfordern',
    servicesLabel: 'Leistungen',
    servicesTitle: 'Unsere Kernkompetenzen',
    services: [
      { icon: '⚡', title: 'Trassenarbeiten', short: 'Präziser Tiefbau und sichere Vorbereitung der Kabeltrasse.', full: 'Wir bereiten die Trasse fachgerecht vor und sorgen für eine sichere, saubere Grundlage für jede Glasfaser- und Leitungsinstallation.' },
      { icon: '⌁', title: 'Glasfaserverlegung', short: 'Professionelle Verlegung von Glasfaserkabeln für stabile Anschlüsse.', full: 'Unsere Verlegung erfolgt präzise und auf Qualität ausgelegt – für zuverlässige Netze, hohe Stabilität und langfristige Performance.' },
      { icon: '⚙', title: 'Anschlusstechnik', short: 'Fachgerechte Montage von Anschlusskästen und Übergabestellen.', full: 'Wir installieren Anschlusskästen, prüfen die Verbindung und dokumentieren die Übergabe bis zur fertigen Gebäudeeinführung.' }
    ],
    aboutLabel: 'Über uns', aboutTitle: 'Erfahrung, Qualität und ein sicherer Anschluss', aboutText: 'Unser Team verbindet Bauexpertise mit modernen Telekommunikationsstandards – für eine zuverlässige Verbindung vom ersten Spatenstich bis zur Übergabe.',
    benefits: ['Präziser Tiefbau und Trassenplanung', 'Glasfaserverlegung nach modernem Standard', 'Abnahme und Endprüfung vor Übergabe'],
    contactLabel: 'Kontakt', contactTitle: 'Kostenlose Beurteilung vereinbaren', contactText: 'Kontaktieren Sie uns für Ihre nächste Glasfaserinstallation.',
    name: 'Ihr Name', message: 'Kurze Beschreibung der Arbeiten', submit: 'Nachricht senden', footer: '© 2026 NEA Baukonzepte GmbH. Alle Rechte vorbehalten.', sent: 'Ihre Nachricht wurde vorbereitet.', locked: 'Neue Nachrichten sind auf diesem Gerät in', lockedEnd: 'wieder möglich.'
  },
  sr: {
    tagline: 'Brza veza, sigurna instalacija',
    category: 'Optika · Izgradnja · Mreža',
    heading: 'Iskop i instalacija optičkih mreža na jednom mjestu',
    description: 'Realizujemo optičke mreže, sigurne priključke i pouzdana rješenja za privatne i poslovne objekte.',
    primaryAction: 'Zatraži ponudu',
    servicesLabel: 'Usluge',
    servicesTitle: 'Radovi koje radimo',
    services: [
      { icon: '⚡', title: 'Iskop i priprema trase', short: 'Precizno iskopavanje i zaštita terena prije polaganja kablova.', full: 'Pripremamo trasu stručno i uredno, kako bi svaka optička instalacija imala stabilnu i sigurnu osnovu.' },
      { icon: '⌁', title: 'Polaganje optike', short: 'Profesionalna instalacija optičkog kabla i priključaka.', full: 'Optički kablovi se polažu precizno i u skladu sa zahtjevima moderne mrežne infrastrukture.' },
      { icon: '⚙', title: 'Montaža priključaka', short: 'Postavljanje priključnih kutija i završnih konekcija.', full: 'Ugradnja priključnih kutija, provjera veze i završna dokumentacija do kompletne predaje radova.' }
    ],
    aboutLabel: 'O nama', aboutTitle: 'Iskustvo, kvalitet i siguran priključak', aboutText: 'Naš tim spaja građevinsko iskustvo i moderne telekom standarde – za pouzdanu vezu od prvog iskopa do predaje radova.', benefits: ['Iskop i zaštita trase', 'Polaganje kablova i montaža priključaka', 'Testiranje veze prije predaje radova'],
    contactLabel: 'Kontakt', contactTitle: 'Dogovorite besplatnu procjenu', contactText: 'Javite nam se za brzu i profesionalnu realizaciju.', name: 'Vaše ime', message: 'Kratak opis radova', submit: 'Pošalji poruku', footer: '© 2026 NEA Baukonzepte GmbH. Sva prava zadržana.', sent: 'Poruka je spremna za slanje.', locked: 'Novo slanje sa ovog preglednika je dostupno za', lockedEnd: '.'
  }
}

const impressum = {
  title: 'Impressum',
  intro: 'Angaben gemäß § 5 DDG',
  owner: 'NEA Baukonzepte GmbH',
  address: 'Waldstr. 168, 63071 Offenbach am Main',
  email: 'info@neabaukonzepte.de',
  representative: 'Vertreten durch',
  representativeName: 'Amel Korać',
  disclaimerTitle: 'Verantwortlich für den Inhalt',
  disclaimerText: 'Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Informationen übernehmen wir keine Gewährleistung.',
  note: 'Kontaktaufnahme per E-Mail ist jederzeit möglich; wir bemühen uns um eine zeitnahe Antwort.'
}

const privacy = {
  title: 'Datenschutzerklärung',
  intro: 'Hinweise zum Datenschutz',
  section1Title: '1. Verantwortlicher',
  section1Text: 'Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist NEA Baukonzepte GmbH, Waldstr. 168, 63071 Offenbach am Main, E-Mail: info@neabaukonzepte.de.',
  section2Title: '2. Erhobene Daten',
  section2Text: 'Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, verarbeiten wir Ihre Angaben wie Name, E-Mail-Adresse und Projektbeschreibung. Zusätzlich können technisch notwendige Informationen im Browser lokal gespeichert werden.',
  section3Title: '3. Zweck der Verarbeitung',
  section3Text: 'Die Daten werden zur Bearbeitung Ihrer Anfrage, zur Kommunikation mit Ihnen und zur Sicherstellung der Funktionalität der Website verwendet.',
  section4Title: '4. Cookies und lokale Speicherung',
  section4Text: 'Diese Website nutzt technisch notwendige Cookies und lokale Speicherung, um etwa das gewählte Design oder die Formularfunktion korrekt zu erhalten. Es werden keine Werbecookies verwendet.',
  section5Title: '5. Weitergabe an Dritte',
  section5Text: 'Ihre Daten werden nicht an Dritte verkauft. Eine Weitergabe erfolgt nur, wenn dies zur Erfüllung rechtlicher Pflichten oder zur Bearbeitung Ihrer Anfrage erforderlich ist.',
  section6Title: '6. Ihre Rechte',
  section6Text: 'Sie haben das Recht, Auskunft, Berichtigung oder Löschung Ihrer personenbezogenen Daten zu verlangen. Bitte senden Sie hierzu eine Anfrage an info@neabaukonzepte.de.',
  closing: 'Stand: 2026'
}

export default function RestoredApp() {
  const [language, setLanguage] = useState('de')
  const [theme, setTheme] = useState('dark')
  const [view, setView] = useState('home')
  const [expandedService, setExpandedService] = useState(0)
  const [cookieConsent, setCookieConsent] = useState(() => localStorage.getItem('nea-cookie-consent') || 'undecided')
  const [lockExpiresAt, setLockExpiresAt] = useState(0)
  const [now, setNow] = useState(Date.now())
  const text = copy[language]

  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  useEffect(() => {
    if (cookieConsent !== 'undecided') {
      localStorage.setItem('nea-cookie-consent', cookieConsent)
    }
  }, [cookieConsent])
  useEffect(() => {
    setLockExpiresAt(Number(localStorage.getItem('nea-contact-lock-expires-at')) || 0)
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const sendMail = (event) => {
    event.preventDefault()
    if (lockExpiresAt > Date.now()) return
    const data = new FormData(event.currentTarget)
    const subject = language === 'de' ? 'Kontaktanfrage über die Website' : 'Upit preko web stranice'
    const body = `Name: ${data.get('name')}\n\n${data.get('message')}`
    const expires = Date.now() + 60 * 60 * 1000
    localStorage.setItem('nea-contact-lock-expires-at', String(expires))
    setLockExpiresAt(expires)
    window.location.href = `mailto:info@neabaukonzepte.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const locked = lockExpiresAt > now
  const remaining = Math.max(0, Math.ceil((lockExpiresAt - now) / 1000))
  const clock = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`
  const requestQuote = () => { window.location.href = `mailto:info@neabaukonzepte.de?subject=${encodeURIComponent(language === 'de' ? 'Anfrage für ein Angebot' : 'Upit za ponudu')}` }
  const saveCookieChoice = (choice) => setCookieConsent(choice)
  const heroImage = themeImages[theme]

  const toggleService = (index) => {
    setExpandedService((current) => (current === index ? null : index))
  }

  if (view === 'impressum') {
    return <div className="site-shell">
      <div className="container impressum-shell">
        <header className="impressum-header">
          <div className="brand compact-brand"><div><strong>NEA <em>Baukonzepte</em></strong><span>{text.tagline}</span></div></div>
          <button className="button button-primary" type="button" onClick={() => setView('home')}>Zurück zur Startseite</button>
        </header>
        <main className="impressum-page card">
          <p className="eyebrow">{impressum.intro}</p>
          <h1>{impressum.title}</h1>
          <div className="impressum-grid">
            <div className="impressum-block"><h2>Unternehmen</h2><p><strong>{impressum.owner}</strong></p><p>{impressum.address}</p></div>
            <div className="impressum-block"><h2>Kontakt</h2><p><strong>E-Mail:</strong> <a href={`mailto:${impressum.email}`}>{impressum.email}</a></p></div>
            <div className="impressum-block"><h2>{impressum.representative}</h2><p>{impressum.representativeName}</p></div>
          </div>
          <div className="legal-note">
            <h2>{impressum.disclaimerTitle}</h2>
            <p>{impressum.disclaimerText}</p>
            <p>{impressum.note}</p>
          </div>
        </main>
      </div>
    </div>
  }

  if (view === 'privacy') {
    return <div className="site-shell">
      <div className="container impressum-shell">
        <header className="impressum-header">
          <div className="brand compact-brand"><div><strong>NEA <em>Baukonzepte</em></strong><span>{text.tagline}</span></div></div>
          <button className="button button-primary" type="button" onClick={() => setView('home')}>Zurück zur Startseite</button>
        </header>
        <main className="impressum-page card">
          <p className="eyebrow">{privacy.intro}</p>
          <h1>{privacy.title}</h1>
          <div className="legal-note"><h2>{privacy.section1Title}</h2><p>{privacy.section1Text}</p></div>
          <div className="legal-note"><h2>{privacy.section2Title}</h2><p>{privacy.section2Text}</p></div>
          <div className="legal-note"><h2>{privacy.section3Title}</h2><p>{privacy.section3Text}</p></div>
          <div className="legal-note"><h2>{privacy.section4Title}</h2><p>{privacy.section4Text}</p></div>
          <div className="legal-note"><h2>{privacy.section5Title}</h2><p>{privacy.section5Text}</p></div>
          <div className="legal-note"><h2>{privacy.section6Title}</h2><p>{privacy.section6Text}</p></div>
          <p className="privacy-date">{privacy.closing}</p>
        </main>
      </div>
    </div>
  }

  return <div className="site-shell">
    <header className="hero"><nav className="toolbar container" aria-label="Glavna navigacija">
      <div className="brand"><div><strong>NEA <em>Baukonzepte</em></strong><span>{text.tagline}</span></div></div>
      <div className="controls"><div className="language-control" aria-label="Izbor jezika">{['de', 'sr'].map(code => <button type="button" className={language === code ? 'active' : ''} onClick={() => setLanguage(code)} key={code}>{code.toUpperCase()}</button>)}</div><button className="theme-button" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Promijeni temu">{theme === 'dark' ? '☀' : '☾'}</button></div>
    </nav><div className="hero-content container"><p className="eyebrow">{text.category}</p><h1>{text.heading}</h1><p className="hero-description">{text.description}</p><button className="button button-primary" type="button" onClick={requestQuote}>{text.primaryAction}</button><img key={heroImage.src} className="hero-image" src={heroImage.src} width="1600" height="900" alt={heroImage.alt} loading="eager" fetchPriority="high" decoding="async" /></div></header>
    <main className="container main-content"><section><div className="section-heading"><p className="eyebrow">{text.servicesLabel}</p><h2>{text.servicesTitle}</h2></div><div className="service-grid">{text.services.map((service, index) => { const isOpen = expandedService === index; return <article className={`card service-card ${isOpen ? 'is-open' : ''}`} key={service.title} tabIndex={0} role="button" aria-expanded={isOpen} onClick={() => toggleService(index)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleService(index); } }}><div className="service-summary"><span className="service-icon" aria-hidden="true">{service.icon}</span><div className="service-copy"><h3>{service.title}</h3><p className="service-preview">{service.short}</p></div><span className="service-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span></div><div className={`service-detail ${isOpen ? 'visible' : ''}`}><p>{service.full}</p></div></article> })}</div></section>
    <section className="about-section"><div className="about-copy"><p className="eyebrow">{text.aboutLabel}</p><h2>{text.aboutTitle}</h2><p>{text.aboutText}</p></div><aside className="card benefits-card"><h3>{language === 'de' ? 'Warum wir?' : 'Zašto nas izabrati?'}</h3><ul>{text.benefits.map(item => <li key={item}>✓ {item}</li>)}</ul></aside></section>
    <section><div className="section-heading"><p className="eyebrow">{text.contactLabel}</p><h2>{text.contactTitle}</h2></div><div className="contact-grid"><article className="card contact-card"><h3>{language === 'de' ? 'Kontaktinformationen' : 'Kontakt informacije'}</h3><p>{text.contactText}</p><a href="mailto:info@neabaukonzepte.de">✉&nbsp; info@neabaukonzepte.de</a><a href="https://www.google.com/maps/search/Waldstr.+168,+63071+Offenbach+Main" target="_blank" rel="noreferrer">⌖&nbsp; Waldstr. 168, 63071 Offenbach Main</a></article><form className={`card contact-form ${locked ? 'form-locked' : ''}`} onSubmit={sendMail}>{locked ? <div className="send-success" role="status"><span className="success-mark">✓</span><strong>{text.sent}</strong><p>{text.locked} <b>{clock}</b> {text.lockedEnd}</p></div> : <><label>{text.name}<input name="name" type="text" placeholder={text.name} required /></label><label>{text.message}<textarea name="message" rows="5" placeholder={text.message} required /></label><button className="button button-primary" type="submit">{text.submit}</button></>}</form></div></section></main>
    <footer>
      <p>{text.footer}</p>
      <p>
        <button type="button" className="footer-link-button" onClick={() => setView('impressum')}>Impressum</button>
        <span> · </span>
        <button type="button" className="footer-link-button" onClick={() => setView('privacy')}>Datenschutzerklärung</button>
      </p>
    </footer>

    {cookieConsent === 'undecided' && (
      <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie-Einstellungen">
        <div className="cookie-banner__content">
          <h3>Cookie-Einstellungen</h3>
          <p>
            Diese Website verwendet Cookies, um die Funktionalität zu gewährleisten und die Nutzung zu verbessern.
            Technisch notwendige Cookies werden für die korrekte Darstellung und Formularfunktion verwendet.
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button type="button" className="button button-secondary" onClick={() => saveCookieChoice('essential')}>
            Nur notwendige
          </button>
          <button type="button" className="button button-primary" onClick={() => saveCookieChoice('all')}>
            Akzeptieren
          </button>
        </div>
      </div>
    )}
  </div>
}
