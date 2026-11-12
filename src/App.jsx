import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowDownRight, ArrowRight, Armchair, Check, ChevronDown, Clock3,
  Droplets, Instagram, Layers3, MapPin, Menu, Phone, ScanLine, ShieldCheck,
  Sparkles, Star, X,
} from 'lucide-react';
import { benefits, business, gallery, packages, photoSrcSet, photoUrl, photos, reviews, services } from './data.js';

const iconMap = {
  droplets: Droplets,
  sparkles: Sparkles,
  armchair: Armchair,
  shield: ShieldCheck,
  layers: Layers3,
  scan: ScanLine,
};

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} onKeyDown={(event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }}>
      <div className="header-inner container">
        <a className="brand" href="#top" onClick={close} aria-label="BLACKLINE DETAILING — на главную">
          <span className="brand-mark" aria-hidden="true">B<span>.</span></span>
          <span className="brand-copy"><strong>BLACKLINE</strong><small>DETAILING STUDIO</small></span>
        </a>
        <button ref={menuButtonRef} className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} aria-controls="main-navigation">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="main-navigation" className={`main-nav ${open ? 'nav-open' : ''}`} aria-label="Основная навигация">
          <a href="#services" onClick={close}>Услуги</a>
          <a href="#pricing" onClick={close}>Цены</a>
          <a href="#work" onClick={close}>Работы</a>
          <a href="#about" onClick={close}>О студии</a>
          <a href="#contacts" onClick={close}>Контакты</a>
          <a className="nav-cta" href="#booking" onClick={close}>Записаться <ArrowRight size={15} /></a>
        </nav>
        <a className="header-phone" href={`tel:${business.phoneLink}`}><Phone size={15} /> {business.phoneDisplay}</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <img className="hero-image" src={photoUrl(photos.hero.id, 1600)} srcSet={photoSrcSet(photos.hero.id, [640, 960, 1280, 1600, 2000])} sizes="100vw" alt={photos.hero.alt} fetchPriority="high" decoding="async" />
      <div className="hero-shade" />
      <div className="hero-content container">
        {business.isDemo && <p className="demo-badge"><span aria-hidden="true" />Демонстрационная версия</p>}
        <p className="eyebrow hero-eyebrow"><span className="orange-line" /> СТУДИЯ АВТОМОБИЛЬНОГО УХОДА · {business.city.toUpperCase()}</p>
        <h1 id="hero-title">ФОРМА.<br /><span>БЛЕСК.</span><br />ХАРАКТЕР.</h1>
        <p className="hero-description">Возвращаем автомобилю выразительность.<br className="desktop-only" /> Бережный детейлинг, точность и результат, который видно.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#booking">Записаться на уход <ArrowRight size={17} /></a>
          <a className="button button-ghost" href="#services">Услуги студии <ArrowDownRight size={17} /></a>
        </div>
        <div className="hero-note"><span className="hero-note-dot" /> Внимание к каждой линии и поверхности</div>
      </div>
      <div className="hero-index" aria-hidden="true"><span>01</span><i /><small>BLACKLINE</small></div>
      <a className="hero-scroll" href="#services"><span>ЛИСТАЙТЕ ВНИЗ</span><ArrowDown size={15} /></a>
      <div className="hero-side-label">DETAILING · CARE · PROTECTION</div>
    </section>
  );
}

function IntroBand() {
  return (
    <div className="intro-band">
      <div className="container intro-inner">
        <p>BLACKLINE <span>—</span> ЧИСТАЯ ЭСТЕТИКА АВТОМОБИЛЯ</p>
        <div className="intro-stats"><span><b>01</b> ПРОФЕССИОНАЛЬНАЯ СТУДИЯ</span><span><b>02</b> ИНДИВИДУАЛЬНЫЙ ПОДХОД</span><span><b>03</b> РЕЗУЛЬТАТ С ХАРАКТЕРОМ</span></div>
      </div>
    </div>
  );
}

function SectionHeading({ index, label, title, description, light = false }) {
  return (
    <div className={`section-heading ${light ? 'heading-light' : ''}`}>
      <div className="section-heading-top"><span className="section-index">{index}</span><span className="eyebrow">{label}</span></div>
      <div className="section-heading-main"><h2>{title}</h2>{description && <p>{description}</p>}</div>
    </div>
  );
}

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <SectionHeading index="01 / SERVICES" label="УХОД БЕЗ КОМПРОМИССОВ" title={<>ЗАБОТА,<br /><span>КОТОРУЮ ВИДНО.</span></>} description="Подбираем точное решение под состояние автомобиля, ваши задачи и желаемый результат." />
        <div className="service-grid">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return <a className="service-card" href="#booking" key={service.number}>
              <div className="service-card-top"><span>{service.number}</span><Icon size={23} strokeWidth={1.5} /></div>
              <div><h3>{service.title}</h3><p>{service.detail}</p></div>
              <ArrowRight className="service-arrow" size={17} />
            </a>;
          })}
        </div>
        <a className="text-link" href="#booking">Подобрать услугу <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <SectionHeading index="02 / SIGNATURE CARE" label="ПОНЯТНЫЕ РЕШЕНИЯ" title={<>ПАКЕТЫ<br /><span>BLACKLINE.</span></>} description="Точная стоимость зависит от размера, состояния и материалов автомобиля. Финальную смету согласуем до начала работ." />
        <div className="pricing-grid">
          {packages.map((plan) => <article className={`price-card ${plan.featured ? 'price-featured' : ''}`} key={plan.name}>
            <div className="price-card-head"><span>{plan.label}</span>{plan.featured && <span className="popular-mark"><Star size={12} fill="currentColor" /> ПОПУЛЯРНОЕ</span>}</div>
            <h3>{plan.name}</h3><p className="price-description">{plan.description}</p>
            <div className="price-amount">{plan.price}</div>
            <a href="#booking" className={plan.featured ? 'button button-primary' : 'button button-outline'}>Выбрать пакет <ArrowRight size={15} /></a>
            <div className="price-divider" />
            <ul>{plan.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
          </article>)}
        </div>
        <p className="price-footnote">{business.isDemo ? 'Демонстрационные цены — замените их перед запуском. Итоговую стоимость подтвердит специалист после осмотра.' : 'Итоговая стоимость зависит от размера, состояния и материалов автомобиля и подтверждается специалистом после осмотра.'}</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="about-image-wrap"><img src={photoUrl(photos.about.id, 1200)} srcSet={photoSrcSet(photos.about.id)} sizes="(max-width: 760px) 100vw, 50vw" alt={photos.about.alt} loading="lazy" decoding="async" /><span className="image-caption">CARE IN EVERY DETAIL</span></div>
      <div className="about-copy">
        <div className="section-heading-top"><span className="section-index">03 / OUR APPROACH</span><span className="eyebrow">О СТУДИИ</span></div>
        <h2>НЕ ПРОСТО<br />ЧИСТО.<br /><span>БЕЗУПРЕЧНО.</span></h2>
        <p>Детейлинг начинается с понимания автомобиля. Мы внимательно оцениваем состояние поверхностей и выбираем методику, которая сохраняет материалы и подчёркивает их характер.</p>
        <p>Спокойная работа, правильный свет и продуманный уход — чтобы каждая поездка снова радовала.</p>
        <a className="text-link" href="#contacts">Познакомиться со студией <ArrowRight size={16} /></a>
        <div className="about-stamp"><span>B</span><small>BLACKLINE<br />DETAILING</small></div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="benefits-section">
      <div className="container">
        <SectionHeading index="04 / WHY BLACKLINE" label="СТАНДАРТ НАШЕЙ РАБОТЫ" title={<>УХОД, КОТОРОМУ<br /><span>МОЖНО ДОВЕРЯТЬ.</span></>} light />
        <div className="benefit-grid">{benefits.map((benefit) => <article className="benefit-card" key={benefit.number}><span>{benefit.number}</span><h3>{benefit.title}</h3><p>{benefit.text}</p></article>)}</div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section gallery-section" id="work">
      <div className="container">
        <SectionHeading index="05 / SELECTED WORK" label="РАБОТЫ СТУДИИ" title={<>КАЖДАЯ ДЕТАЛЬ<br /><span>ИМЕЕТ ЗНАЧЕНИЕ.</span></>} description={business.isDemo ? 'Фото — демонстрационные иллюстрации, а не документальные пары одного автомобиля до и после.' : 'Примеры выполненных работ студии.'} />
        <div className="gallery-grid">{gallery.map((item, index) => <article className={`gallery-card gallery-card-${index + 1}`} key={item.title}>
          <div className="gallery-photo" aria-label={`${item.title}: демонстрационный пример до и после ухода`}>
            <div className="gallery-half gallery-before"><img src={photoUrl(item.before, 640)} srcSet={photoSrcSet(item.before, [320, 480, 640, 800])} sizes="(max-width: 760px) 50vw, 25vw" alt={`Демонстрационное фото до ухода, кейс ${item.title}`} loading="lazy" decoding="async" /><span>ДО</span></div>
            <div className="gallery-half gallery-after"><img src={photoUrl(item.after, 640)} srcSet={photoSrcSet(item.after, [320, 480, 640, 800])} sizes="(max-width: 760px) 50vw, 25vw" alt={`Демонстрационное фото после ухода, кейс ${item.title}`} loading="lazy" decoding="async" /><span>ПОСЛЕ</span></div>
            <span className="gallery-tag">{business.isDemo ? 'ДЕМО-КЕЙС' : 'КЕЙС СТУДИИ'}</span><span className="gallery-counter">0{index + 1} / 03</span>
          </div>
          <div className="gallery-caption"><div><h3>{item.title}</h3><p>{item.service}</p></div><a href="#booking" aria-label={`Записаться на услугу для ${item.title}`}><ArrowUpRightIcon /></a></div>
          {business.isDemo && <p className="gallery-demo-note">Демонстрационные фото · замените реальными кадрами одного автомобиля</p>}
        </article>)}</div>
        <a className="text-link" href="#booking">Ваш автомобиль может быть следующим <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}

function ArrowUpRightIcon() {
  return <ArrowDownRight size={18} className="arrow-up-right" />;
}

function Reviews() {
  return (
    <section className="section reviews-section">
      <div className="container">
        <SectionHeading index="06 / CLIENT NOTES" label="СЛОВА КЛИЕНТОВ" title={<>ВПЕЧАТЛЕНИЯ<br /><span>ПОСЛЕ УХОДА.</span></>} description={business.isDemo ? 'На карточках — места для отзывов. Добавляйте реальные слова клиентов только с разрешения на публикацию.' : 'Отзывы клиентов, опубликованные с их согласия.'} />
        <div className="review-grid">{reviews.map((review) => <article className="review-card" key={review.service}>
          <span className="review-demo">{business.isDemo ? 'МЕСТО ДЛЯ ОТЗЫВА · ДЕМО' : 'ОТЗЫВ КЛИЕНТА'}</span>
          <blockquote>{review.text}</blockquote><div className="review-author"><div><strong>{review.service}</strong><span>{business.isDemo ? 'Добавьте отзыв после согласования с клиентом' : 'Отзыв публикуется с согласия клиента'}</span></div></div>
        </article>)}</div>
      </div>
    </section>
  );
}

function Booking() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const canSendLeads = Boolean(business.leadEndpoint) && !business.isDemo;

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const phoneInput = form.elements.phone;
    const digitCount = phoneInput.value.replace(/\D/g, '').length;
    phoneInput.setCustomValidity(digitCount < 10 || digitCount > 15 ? 'Введите номер, содержащий от 10 до 15 цифр.' : '');
    if (!form.reportValidity()) return;
    if (!canSendLeads) {
      setStatus({
        type: 'info',
        message: business.isDemo
          ? 'Демонстрационная версия: данные проверены, заявка не отправлена и не сохранена.'
          : 'Заявка не отправлена: подключите серверный обработчик в src/data.js.',
      });
      return;
    }
    setSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch(business.leadEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Не удалось отправить заявку');
      form.reset();
      phoneInput.setCustomValidity('');
      setStatus({ type: 'success', message: 'Заявка отправлена. Скоро свяжемся с вами для подтверждения записи.' });
    } catch {
      setStatus({ type: 'error', message: 'Не удалось отправить заявку. Позвоните нам или напишите в Telegram.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="booking-section" id="booking">
      <div className="booking-image"><img src={photoUrl(photos.booking.id, 1200)} srcSet={photoSrcSet(photos.booking.id)} sizes="(max-width: 760px) 100vw, 50vw" alt={photos.booking.alt} loading="lazy" decoding="async" /><span>BLACKLINE DETAILING · {business.city.toUpperCase()}</span></div>
      <div className="booking-content">
        <div className="section-heading-top"><span className="section-index">07 / APPOINTMENT</span><span className="eyebrow">ЗАПИСЬ В СТУДИЮ</span></div>
        <h2>ВАШ АВТОМОБИЛЬ<br /><span>ГОТОВ К ЛУЧШЕМУ.</span></h2>
        <p className="booking-intro">Оставьте контакты — подберём удобное время и подходящий уход.</p>
        <form className="booking-form" onSubmit={onSubmit}>
          <label>Ваше имя<input name="name" type="text" placeholder="Как к вам обращаться" autoComplete="name" minLength="2" required /></label>
          <label>Номер телефона<input name="phone" type="tel" placeholder="+7 (___) ___-__-__" autoComplete="tel" inputMode="tel" pattern="[+0-9()\s-]{10,25}" onInput={(event) => event.currentTarget.setCustomValidity('')} title="Введите российский номер телефона, например +7 (999) 123-45-67" required /></label>
          <label>Какая услуга вас интересует?<span className="select-wrap"><select name="service" defaultValue="" required><option value="" disabled>Выберите услугу</option>{services.map((service) => <option value={service.title} key={service.number}>{service.title}</option>)}<option value="Не знаю, нужна консультация">Нужна консультация</option></select><ChevronDown size={16} /></span></label>
          <button className="button button-primary form-submit" type="submit" disabled={submitting}>{submitting ? 'Отправляем…' : canSendLeads ? 'Запросить запись' : 'Проверить данные'} <ArrowRight size={17} /></button>
          <p className="form-note">{canSendLeads ? 'Контакты будут отправлены для связи по заявке.' : business.isDemo ? 'Демонстрационный режим: форма проверяет поля, но не отправляет и не сохраняет заявку.' : 'Форма не отправляет заявки: серверный обработчик не подключён.'}{business.privacyPolicyUrl ? <> Подробнее — <a href={business.privacyPolicyUrl} target="_blank" rel="noreferrer">в политике конфиденциальности</a>.</> : business.isDemo && ' Перед публикацией добавьте политику конфиденциальности и оформите согласие.'}</p>
          {status.message && <p className={`form-status status-${status.type}`} role="status" aria-live="polite">{status.message}</p>}
        </form>
        <div className="booking-direct"><span>НУЖНО БЫСТРО?</span><a href={`tel:${business.phoneLink}`}><Phone size={15} /> {business.phoneDisplay}</a></div>
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section className="section contacts-section" id="contacts">
      <div className="container">
        <SectionHeading index="08 / FIND US" label="БУДЕМ РАДЫ ВАС ВИДЕТЬ" title={<>НАВЕСТИТЕ<br /><span>БЛЕСК.</span></>} />
        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-line"><MapPin size={19} /><div><span>АДРЕС СТУДИИ</span><p>{business.address}</p>{business.isDemo && <small>Демонстрационный адрес — замените перед публикацией</small>}</div></div>
            <div className="contact-line"><Phone size={18} /><div><span>ТЕЛЕФОН</span><a href={`tel:${business.phoneLink}`}>{business.phoneDisplay}</a>{business.isDemo && <small>Демонстрационный номер — замените перед публикацией</small>}</div></div>
            <div className="contact-line"><Clock3 size={19} /><div><span>ГРАФИК РАБОТЫ</span><p>{business.hours}</p></div></div>
            <div className="contact-actions"><a className="button button-primary" href={`tel:${business.phoneLink}`}><Phone size={15} /> Позвонить</a>{business.telegram && <a className="button button-outline contact-telegram" href={business.telegram} target="_blank" rel="noreferrer">Telegram <ArrowRight size={16} /></a>}{business.instagram && <a className="social-link" href={business.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a>}</div>
          </div>
          <div className="map-frame"><iframe title={`Карта с примером расположения студии: ${business.city}`} src={business.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a className="map-note" href={business.mapLink} target="_blank" rel="noreferrer">{business.isDemo ? 'Пример карты · изменить точку студии' : 'Открыть карту'} <ArrowRight size={13} /></a></div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <a className="brand footer-brand" href="#top"><span className="brand-mark">B<span>.</span></span><span className="brand-copy"><strong>BLACKLINE</strong><small>DETAILING STUDIO</small></span></a>
        <p>Забота о форме.<br />Уважение к деталям.</p>
        <div className="footer-nav"><a href="#services">Услуги</a><a href="#pricing">Цены</a><a href="#work">Работы</a><a href="#contacts">Контакты</a></div>
        <div className="footer-contact"><a href={`tel:${business.phoneLink}`}>{business.phoneDisplay}</a><span>{business.hours}</span></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} BLACKLINE DETAILING</span>{business.isDemo && <span>Демонстрационный шаблон · замените контактные данные и материалы перед публикацией</span>}<a href="#top">НАВЕРХ <ArrowDown size={13} /></a></div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.documentElement.classList.add('reveal-ready');
    document.querySelectorAll('.section-heading, .service-card, .price-card, .benefit-card, .gallery-card, .review-card, .contact-line').forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('reveal-ready');
    };
  }, []);

  return <><Header /><main><Hero /><IntroBand /><Services /><Pricing /><About /><Benefits /><Gallery /><Reviews /><Booking /><Contacts /></main><Footer /></>;
}

export default App;
