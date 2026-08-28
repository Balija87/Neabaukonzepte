import { useEffect, useState } from 'react'

const contactEmail = 'info@neabaukonzepte.de'
const maxMessagesPerBrowser = 2
const lockDurationMs = 24 * 60 * 60 * 1000
const themeImages = {
  dark: { src: '/fiberOptic.jpg', alt: 'Glasfaser und LWL-Kabel in blauer Lichtstimmung' },
  light: { src: '/Fiber%20Optic%20white.jpg', alt: 'LWL-Glasfaserkabel mit leuchtenden Lichtleitern' }
}

const copy = {
  de: {
    tagline: 'Glasfaserbau · Tiefbau · Hausanschlüsse',
    category: 'Breitbandausbau Deutschland',
    heading: 'Glasfaserbau, Tiefbau und FTTH-Hausanschlüsse aus einer Hand',
    description: 'NEA Baukonzepte realisiert Tiefbauarbeiten, LWL-Kabelverlegung, FTTH/FTTB-Hausanschlüsse und LWL-Montage für den zuverlässigen Breitbandausbau in Hessen und deutschlandweit.',
    primaryAction: 'Projekt anfragen', servicesLabel: 'Leistungen', servicesTitle: 'Leistungen für den professionellen Glasfaserausbau',
    services: [['⚡', 'Tiefbauarbeiten für Glasfaser', 'Präziser Tiefbau, Trassenbau und sichere Vorbereitung von Kabeltrassen für den Breitbandausbau.'], ['⌁', 'LWL-Kabelverlegung', 'Fachgerechte Verlegung von Glasfaser- und LWL-Kabeln für leistungsfähige FTTH- und FTTB-Netze.'], ['⚙', 'FTTH Hausanschluss & LWL-Montage', 'Gebäudeeinführung, Montage von Anschlusskästen sowie Prüfung und Dokumentation der Glasfaserstrecke.']],
    aboutLabel: 'Über NEA Baukonzepte', aboutTitle: 'Ihr Partner für Tiefbau und Glasfasernetze in Hessen', aboutText: 'Wir verbinden Baukompetenz mit modernen Telekommunikationsstandards – von der Trasse über die Gebäudeeinführung bis zur abnahmebereiten Glasfaserinstallation.', benefits: ['Tiefbau und Trassenplanung für Glasfaserprojekte', 'LWL-Kabelverlegung und FTTH/FTTB-Hausanschlüsse', 'LWL-Montage, Messung und Endprüfung vor Übergabe'],
    contactLabel: 'Kontakt', contactTitle: 'Glasfaserprojekt unverbindlich anfragen', contactText: 'Wir beraten Unternehmen, Bauträger und Netzbetreiber zu Glasfaserbau, Tiefbau und Hausanschlüssen in Hessen und bundesweit.', name: 'Ihr Name', email: 'Ihre E-Mail-Adresse', message: 'Projektbeschreibung', submit: 'Nachricht senden', sending: 'Wird gesendet…', sent: 'Ihre Nachricht wurde erfolgreich an unser Team übermittelt.', remaining: 'Sie können heute noch eine weitere Nachricht senden.', locked: 'Nach zwei Nachrichten können Sie in 24 Stunden wieder eine Anfrage senden.', sendError: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.', footer: '© 2026 NEA Baukonzepte GmbH · Glasfaserbau, Tiefbau und FTTH Hausanschlüsse in Hessen & deutschlandweit.'
  },
  sr: {
    tagline: 'Optika · Iskop · Kućni priključci', category: 'Izgradnja optičke mreže', heading: 'Iskop, optika i FTTH priključci na jednom mjestu', description: 'NEA Baukonzepte izvodi iskop, polaganje optičkog kabla, FTTH/FTTB kućne priključke i LWL montažu u Hessenu i širom Njemačke.', primaryAction: 'Pošaljite upit', servicesLabel: 'Usluge', servicesTitle: 'Profesionalna izgradnja optičkih mreža',
    services: [['⚡', 'Iskop za optičke mreže', 'Precizan iskop, priprema trase i zaštita terena za širokopojasne mreže.'], ['⌁', 'Polaganje LWL kabla', 'Stručno polaganje optičkih i LWL kablova za FTTH i FTTB mreže.'], ['⚙', 'FTTH priključak i LWL montaža', 'Uvod kabla u objekat, montaža priključaka, mjerenje i završna kontrola.']],
    aboutLabel: 'O nama', aboutTitle: 'Partner za iskop i optičke mreže u Hessenu', aboutText: 'Spajamo građevinsko iskustvo i moderne telekom standarde – od trase do predaje gotove optičke instalacije.', benefits: ['Iskop i planiranje trase za optičke projekte', 'LWL kablovi i FTTH/FTTB kućni priključci', 'Montaža, mjerenje i završno testiranje'],
    contactLabel: 'Kontakt', contactTitle: 'Zatražite ponudu za optički projekat', contactText: 'Savjetujemo firme, investitore i mrežne operatere u Hessenu i širom Njemačke.', name: 'Vaše ime', email: 'Vaš e-mail', message: 'Opis projekta', submit: 'Pošalji poruku', sending: 'Slanje…', sent: 'Poruka je uspješno poslana našem timu.', remaining: 'Danas možete poslati još jednu poruku.', locked: 'Nakon dvije poruke, novi upit možete poslati za 24 sata.', sendError: 'Poruka nije poslana. Pokušajte ponovo ili nam pišite direktno e-mailom.', footer: '© 2026 NEA Baukonzepte GmbH · Izgradnja optike i iskop u Hessenu i Njemačkoj.'
  }
}

export default function App() {
  const [language, setLanguage] = useState('de')
  const [theme, setTheme] = useState(() => localStorage.getItem('nea-theme') || 'dark')
  const [sendError, setSendError] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sentCount, setSentCount] = useState(() => Number(localStorage.getItem('nea-contact-daily-message-count')) || 0)
  const [lockExpiresAt, setLockExpiresAt] = useState(() => Number(localStorage.getItem('nea-contact-lock-expires-at')) || 0)
  const text = copy[language]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('nea-theme', theme)
  }, [theme])

  const resetLimitIfExpired = () => {
    if (lockExpiresAt && lockExpiresAt <= Date.now()) {
      localStorage.removeItem('nea-contact-lock-expires-at')
      localStorage.removeItem('nea-contact-daily-message-count')
      setLockExpiresAt(0)
      setSentCount(0)
      return true
    }
    return false
  }

  useEffect(() => { resetLimitIfExpired() }, [])

  async function sendMail(event) {
    event.preventDefault()
    if (isSending) return
    if (lockExpiresAt > Date.now()) {
      setSendError(text.locked)
      return
    }
    resetLimitIfExpired()
    const form = event.currentTarget
    setSendError('')
    setSent(false)
    setIsSending(true)

    try {
      const fields = Object.fromEntries(new FormData(form).entries())
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(fields) })
      const result = await response.json()
      if (!response.ok || result.success === false) throw new Error(result.message || 'Delivery failed')
      form.reset()
      const nextCount = sentCount + 1
      localStorage.setItem('nea-contact-daily-message-count', String(nextCount))
      setSentCount(nextCount)
      if (nextCount === maxMessagesPerBrowser) {
        const expires = Date.now() + lockDurationMs
        localStorage.setItem('nea-contact-lock-expires-at', String(expires))
        setLockExpiresAt(expires)
      }
      setSent(true)
    } catch {
      setSendError(text.sendError)
    } finally { setIsSending(false) }
  }

  const requestQuote = () => document.querySelector('#kontakt')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const successMessage = sentCount >= maxMessagesPerBrowser ? `${text.sent} ${text.locked}` : `${text.sent} ${text.remaining}`
  const heroImage = themeImages[theme]

  return <div className="site-shell">
    <header className="hero"><nav className="toolbar container" aria-label="Hauptnavigation"><div className="brand"><div><strong>NEA <em>Baukonzepte</em></strong><span>{text.tagline}</span></div></div><div className="controls"><div className="language-control" aria-label="Sprachauswahl">{['de', 'sr'].map(code => <button type="button" className={language === code ? 'active' : ''} onClick={() => setLanguage(code)} key={code} lang={code}>{code.toUpperCase()}</button>)}</div><button className="theme-button" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Darstellung ändern">{theme === 'dark' ? '☀' : '☾'}</button></div></nav><div className="hero-content container"><p className="eyebrow">{text.category}</p><h1>{text.heading}</h1><p className="hero-description">{text.description}</p><button className="button button-primary" type="button" onClick={requestQuote}>{text.primaryAction}</button><img key={heroImage.src} className="hero-image" src={heroImage.src} width="1600" height="900" alt={heroImage.alt} loading="eager" fetchPriority="high" decoding="async" /></div></header>
    <main className="container main-content"><section aria-labelledby="leistungen"><div className="section-heading"><p className="eyebrow">{text.servicesLabel}</p><h2 id="leistungen">{text.servicesTitle}</h2></div><div className="service-grid">{text.services.map(([icon, title, description]) => <article className="card service-card" key={title}><span className="service-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section><section className="about-section" aria-labelledby="ueber-uns"><div className="about-copy"><p className="eyebrow">{text.aboutLabel}</p><h2 id="ueber-uns">{text.aboutTitle}</h2><p>{text.aboutText}</p></div><aside className="card benefits-card"><h3>{language === 'de' ? 'Warum NEA Baukonzepte?' : 'Zašto NEA Baukonzepte?'}</h3><ul>{text.benefits.map(item => <li key={item}>✓ {item}</li>)}</ul></aside></section><section id="kontakt" aria-labelledby="kontakt-heading"><div className="section-heading"><p className="eyebrow">{text.contactLabel}</p><h2 id="kontakt-heading">{text.contactTitle}</h2></div><div className="contact-grid"><article className="card contact-card"><h3>{language === 'de' ? 'Kontakt & Einsatzgebiet' : 'Kontakt i područje rada'}</h3><p>{text.contactText}</p><a href={`mailto:${contactEmail}`}>✉&nbsp; {contactEmail}</a><a href="https://www.google.com/maps/search/Waldstr.+168,+63071+Offenbach+Main" target="_blank" rel="noreferrer">⌖&nbsp; Waldstr. 168, 63071 Offenbach am Main</a><p><strong>{language === 'de' ? 'Einsatzgebiet:' : 'Područje rada:'}</strong> Hessen &amp; deutschlandweit</p></article><form className="card contact-form" onSubmit={sendMail}><input className="honeypot" type="text" name="_honey" tabIndex="-1" autoComplete="off" aria-hidden="true" /><label>{text.name}<input name="name" type="text" autoComplete="name" placeholder={text.name} required /></label><label>{text.email}<input name="email" type="email" autoComplete="email" placeholder="email@example.com" required /></label><label>{text.message}<textarea name="message" rows="5" placeholder={text.message} required /></label>{sent && <p className="form-success" role="status" aria-live="polite">{successMessage}</p>}{sendError && <p className="form-error" role="alert">{sendError}</p>}<button className="button button-primary" type="submit" disabled={isSending}>{isSending ? text.sending : text.submit}</button></form></div></section></main>
    <footer><p>{text.footer}</p><p>Waldstr. 168, 63071 Offenbach am Main · <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p></footer>
  </div>
}
