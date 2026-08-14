(function () {
'use strict';

// ============================================
// ⚙️ تنظیمات EmailJS
// ============================================
const EMAILJS_CONFIG = {
    publicKey: 'ALMONrlwHj5VyojJv',
    serviceId: 'service_yiqptf2',
    templateId: 'template_byq6qsq',
    enabled: true
};

const toFa = (n) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

// ============================================
// 🌐 زبان
// ============================================
function initLanguage() {
    const toggle = document.getElementById('langToggle');
    const langText = document.querySelector('.lang-text');
    const html = document.documentElement;
    const typingWords = {
        fa: ['توسعه‌دهنده‌ی فرانت‌اند', 'طراح رابط کاربری', 'عاشق کد تمیز', 'خالق تجربه‌ی دیجیتال'],
        en: ['Frontend Developer', 'UI Designer', 'Clean Code Lover', 'Digital Experience Creator']
    };
    const savedLang = localStorage.getItem('resume-lang');
    if (savedLang) switchLanguage(savedLang, false);
    toggle.addEventListener('click', () => {
        const current = html.getAttribute('lang');
        const next = current === 'fa' ? 'en' : 'fa';
        switchLanguage(next, true);
    });
    window.switchLanguage = switchLanguage;
    window.typingWords = typingWords;
    function switchLanguage(lang, notify) {
        const isEn = lang === 'en';
        html.setAttribute('lang', isEn ? 'en' : 'fa');
        html.setAttribute('dir', isEn ? 'ltr' : 'rtl');
        document.title = isEn ? 'Sadegh Hajizadeh | Resume' : 'صادق حاجی‌زاده | رزومه';
        document.querySelectorAll('[data-fa][data-en]').forEach((el) => {
            el.textContent = el.getAttribute(isEn ? 'data-en' : 'data-fa');
        });
        if (langText) langText.textContent = isEn ? 'فا' : 'EN';
        localStorage.setItem('resume-lang', lang);
        if (window.resetTyping) window.resetTyping();
        if (notify) showToast(isEn ? '🌐 Switched to English' : '🌐 فارسی فعال شد', 'info');
    }
}

// ============================================
// 🎨 تم
// ============================================
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const saved = localStorage.getItem('resume-theme');
    if (saved) root.setAttribute('data-theme', saved);
    toggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('resume-theme', next);
        const isEn = root.getAttribute('lang') === 'en';
        showToast(
            isEn
                ? (next === 'dark' ? ' Dark mode enabled' : '☀️ Light mode enabled')
                : (next === 'dark' ? '🌙 حالت شب فعال شد' : '☀️ حالت روز فعال شد'),
            'info'
        );
    });
}

// ============================================
// ⌨️ تایپ
// ============================================
function initTyping() {
    const el = document.getElementById('typedText');
    if (!el) return;
    let wIndex = 0, cIndex = 0, deleting = false, timer = null;
    function getWords() {
        const lang = document.documentElement.getAttribute('lang');
        return (window.typingWords && window.typingWords[lang]) || window.typingWords.fa;
    }
    function type() {
        const words = getWords();
        const word = words[wIndex % words.length];
        if (deleting) {
            el.textContent = word.substring(0, cIndex--);
            if (cIndex < 0) { deleting = false; wIndex++; timer = setTimeout(type, 500); return; }
            timer = setTimeout(type, 50);
        } else {
            el.textContent = word.substring(0, cIndex++);
            if (cIndex > word.length) { deleting = true; timer = setTimeout(type, 1800); return; }
            timer = setTimeout(type, 100);
        }
    }
    type();
    window.resetTyping = () => {
        clearTimeout(timer); wIndex = 0; cIndex = 0; deleting = false;
        el.textContent = ''; type();
    };
}

// ============================================
// 🧭 نوبار
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        let current = '';
        const y = window.pageYOffset;
        sections.forEach((s) => { if (y >= s.offsetTop - 100) current = s.getAttribute('id'); });
        links.forEach((l) => { l.classList.toggle('active', l.getAttribute('href') === '#' + current); });
    });
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    links.forEach((l) => l.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
    }));
}

// ============================================
// ⬆️ دکمه بالا
// ============================================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => btn.classList.toggle('show', window.scrollY > 500));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============================================
// ✨ Reveal
// ============================================
function initReveal() {
    const items = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('active'), i * 80);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    items.forEach((el) => obs.observe(el));
}

// ============================================
// 📊 نوار مهارت
// ============================================
function initSkillBars() {
    const items = document.querySelectorAll('.skill-item');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.querySelector('.skill-fill').style.width = e.target.dataset.percent + '%';
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.4 });
    items.forEach((i) => obs.observe(i));
}

// ============================================
// ⭕ دایره‌های مهارت نرم
// ============================================
function initSoftCircles() {
    const circles = document.querySelectorAll('.soft-circle');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                const el = e.target;
                const p = el.dataset.percent;
                el.style.background = `conic-gradient(var(--accent-1) ${p * 3.6}deg, var(--bg-secondary) ${p * 3.6}deg)`;
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.4 });
    circles.forEach((c) => obs.observe(c));
}

// ============================================
// 🔢 شمارنده
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = +el.dataset.target;
                const duration = 2000;
                const start = performance.now();
                function step(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 4);
                    const value = Math.floor(eased * target);
                    const lang = document.documentElement.getAttribute('lang');
                    el.textContent = lang === 'en' ? value + (progress === 1 ? '+' : '') : toFa(value) + (progress === 1 ? '+' : '');
                    if (progress < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach((c) => obs.observe(c));
}

// ============================================
// 📧 EmailJS - راه‌اندازی
// ============================================
function initEmailJS() {
    if (!EMAILJS_CONFIG.enabled) return;
    if (typeof emailjs === 'undefined') {
        console.warn('⚠️ EmailJS SDK لود نشده است');
        return;
    }
    try {
        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
        console.log('✅ EmailJS با موفقیت راه‌اندازی شد');
    } catch (err) {
        console.error('❌ خطا در راه‌اندازی EmailJS:', err);
    }
}

async function sendEmail(params) {
    if (!EMAILJS_CONFIG.enabled || typeof emailjs === 'undefined') {
        return { success: false, error: 'EmailJS غیرفعال است' };
    }
    try {
        const result = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            params
        );
        console.log('✅ ایمیل ارسال شد:', result.text);
        return { success: true };
    } catch (err) {
        console.error('❌ خطا در ارسال ایمیل:', err);
        return { success: false, error: err.text || err.message };
    }
}

// ============================================
// 📨 فرم تماس (ایمیل + تلگرام)
// ============================================
function initForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const lang = document.documentElement.getAttribute('lang');
        const isEn = lang === 'en';

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const subject = form.querySelector('#subject').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !subject || !message) {
            showToast(isEn ? 'Please fill all fields ✏️' : 'لطفاً همه فیلدها را پر کنید ✏️', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast(isEn ? 'Invalid email address ❌' : 'ایمیل معتبر نیست ❌', 'error');
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${isEn ? 'Sending...' : 'در حال ارسال...'}`;
        btn.disabled = true;

        const emailParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            reply_to: email
        };

        const tgMessage = `📩 پیام جدید از فرم رزومه:\n\n👤 نام: ${name}\n📧 ایمیل: ${email}\n📋 موضوع: ${subject}\n\n💬 پیام:\n${message}`;
        const tgUrl = `https://t.me/Namdarex?text=${encodeURIComponent(tgMessage)}`;

        try {
            const [emailResult] = await Promise.all([
                sendEmail(emailParams),
                new Promise(resolve => {
                    setTimeout(() => {
                        window.open(tgUrl, '_blank');
                        resolve(true);
                    }, 500);
                })
            ]);

            if (emailResult.success) {
                showToast(isEn ? '✅ Message sent successfully!' : '✅ پیام با موفقیت ارسال شد!', 'success');
                form.reset();
            } else {
                showToast(isEn ? '⚠️ Telegram opened, but email failed' : '⚠️ تلگرام باز شد، اما ایمیل ارسال نشد', 'error');
            }
        } catch (err) {
            console.error('خطا:', err);
            showToast(isEn ? '❌ An error occurred' : '❌ خطایی رخ داد', 'error');
        } finally {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }
    });
}

// ============================================
// 🔔 Toast
// ============================================
let toastTimer;
function showToast(msg, type = 'success') {
    document.querySelectorAll('.toast').forEach((t) => t.remove());
    clearTimeout(toastTimer);
    const colors = {
        success: { bg: '#10b981' },
        error: { bg: '#ef4444' },
        info: { bg: '#a855f7' }
    };
    const bg = (colors[type] || colors.success).bg;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    const lang = document.documentElement.getAttribute('lang');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px; ${lang === 'en' ? 'left: 50%;' : 'right: 50%;'}
        transform: translateX(${lang === 'en' ? '-50%' : '50%'}) translateY(100px);
        background: ${bg};
        color: #fff;
        padding: 14px 28px;
        border-radius: 12px;
        font-weight: 600;
        font-family: ${lang === 'en' ? "system-ui, sans-serif" : "'Vazirmatn', sans-serif"};
        box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        z-index: 9999;
        opacity: 0;
        transition: all 0.4s ease;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = `translateX(${lang === 'en' ? '-50%' : '50%'}) translateY(0)`;
    });
    toastTimer = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = `translateX(${lang === 'en' ? '-50%' : '50%'}) translateY(100px)`;
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ============================================
// 🚀 شروع
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initTheme();
    initTyping();
    initNavbar();
    initBackToTop();
    initReveal();
    initSkillBars();
    initSoftCircles();
    initCounters();
    initEmailJS();
    initForm();
    console.log('%c رزومه صادق حاجی‌زاده — FA/EN + EmailJS بارگذاری شد!', 'color: #a855f7; font-size: 16px; font-weight: bold;');
});
})();
