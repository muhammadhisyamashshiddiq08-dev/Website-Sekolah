// ====================================
// AOS INITIALIZATION
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50
    });
});

// ====================================
// NAVBAR SCROLL EFFECT
// ====================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ====================================
// HAMBURGER MENU
// ====================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ====================================
// HERO SLIDER
// ====================================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
}

function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
}

if (nextBtn) {
    nextBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        nextSlide();
        startAutoSlide();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        prevSlide();
        startAutoSlide();
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        clearInterval(slideInterval);
        goToSlide(index);
        startAutoSlide();
    });
});

function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

if (slides.length > 0) {
    startAutoSlide();
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        hero.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
}

// ====================================
// STAT COUNTER ANIMATION
// ====================================
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    const hasAnimated = sessionStorage.getItem('statsAnimated');
    if (hasAnimated) return;

    stats.forEach(stat => {
        const text = stat.textContent;
        const num = parseInt(text.replace(/[^0-9]/g, ''));
        if (isNaN(num)) return;

        const suffix = text.replace(/[0-9]/g, '').trim();
        let current = 0;
        const increment = Math.ceil(num / 60);

        const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
                current = num;
                clearInterval(timer);
            }
            if (suffix) {
                stat.textContent = current + ' ' + suffix;
            } else {
                stat.textContent = current + '+';
            }
        }, 30);
    });

    sessionStorage.setItem('statsAnimated', 'true');
}

if ('IntersectionObserver' in window) {
    const heroStats = document.querySelector('.hero-stats-container');
    if (heroStats) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(heroStats);
    }
} else {
    setTimeout(animateCounters, 500);
}

// ====================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================================
// ACTIVE NAV LINK
// ====================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// ====================================
// GALLERY FILTER
// ====================================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ====================================
// PPDB FORM - KIRIM KE WHATSAPP
// ====================================
const ppdbForm = document.getElementById('ppdbForm');

if (ppdbForm) {
    // ========================================
    // GANTI DENGAN NOMOR WHATSAPP ANDA
    // Format: 62xxxxxxxxxxx (tanpa 0 di depan)
    // ========================================
    const WHATSAPP_NUMBER = '6288219687504'; // GANTI DENGAN NOMOR ANDA

    const dateInput = document.getElementById('tanggalLahir');
    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dateInput.max = `${year}-${month}-${day}`;
        const defaultYear = year - 10;
        dateInput.value = `${defaultYear}-${month}-${day}`;
    }

    ppdbForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nama = document.getElementById('namaLengkap').value.trim();
        const nik = document.getElementById('nik').value.trim();
        const tempatLahir = document.getElementById('tempatLahir').value.trim();
        const tanggalLahir = document.getElementById('tanggalLahir').value;
        const jenisKelamin = document.getElementById('jenisKelamin').value;
        const alamat = document.getElementById('alamat').value.trim();
        const telepon = document.getElementById('telepon').value.trim();
        const email = document.getElementById('email').value.trim();
        const jurusan = document.getElementById('jurusan').value;
        const asalSekolah = document.getElementById('asalSekolah').value.trim();
        const berkas = document.getElementById('berkas').files[0];

        if (!nama || !nik || !tempatLahir || !tanggalLahir || !jenisKelamin ||
            !alamat || !telepon || !jurusan || !asalSekolah || !berkas) {
            alert('❌ Semua field wajib diisi!');
            return;
        }

        if (!/^\d{16}$/.test(nik)) {
            alert('❌ NIK harus 16 digit angka!');
            document.getElementById('nik').focus();
            return;
        }

        if (!/^[0-9+\-()\s]{10,15}$/.test(telepon)) {
            alert('❌ Nomor telepon tidak valid!');
            document.getElementById('telepon').focus();
            return;
        }

        if (dateInput && dateInput.value) {
            const selectedDate = new Date(dateInput.value);
            const today = new Date();
            if (selectedDate > today) {
                alert('❌ Tanggal lahir tidak boleh lebih dari hari ini!');
                dateInput.focus();
                dateInput.style.borderColor = '#e74c3c';
                setTimeout(() => { dateInput.style.borderColor = ''; }, 2000);
                return;
            }
        }

        const dateParts = tanggalLahir.split('-');
        const tglFormatted = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

        const now = new Date();
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                       'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const tglSekarang = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
        const jamSekarang = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const message = `📋 *DATA PENDAFTARAN PPDB SMK GAMA*
━━━━━━━━━━━━━━━━━━━━━━

👤 *Nama Lengkap:* ${nama}
🆔 *NIK:* ${nik}
📍 *Tempat Lahir:* ${tempatLahir}
📅 *Tanggal Lahir:* ${tglFormatted}
⚧ *Jenis Kelamin:* ${jenisKelamin}
🏠 *Alamat:* ${alamat}
📱 *No. Telepon/WA:* ${telepon}
📧 *Email:* ${email || '-'}
🎓 *Jurusan:* ${jurusan}
🏫 *Asal Sekolah:* ${asalSekolah}
📎 *Berkas:* ${berkas.name}

━━━━━━━━━━━━━━━━━━━━━━
📌 *Status:* Menunggu Verifikasi
📅 *Tanggal Daftar:* ${tglSekarang}
🕐 *Jam Daftar:* ${jamSekarang}
━━━━━━━━━━━━━━━━━━━━━━
*Terima kasih telah mendaftar!* 🎉
*Admin akan segera menghubungi Anda.*`;

        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(waUrl, '_blank');

        alert('✅ Pendaftaran berhasil! Data akan dikirim ke WhatsApp Admin.\n\nSilakan klik "Kirim" di WhatsApp untuk mengirim data pendaftaran.');
        this.reset();

        if (dateInput) {
            const today = new Date();
            const year = today.getFullYear() - 10;
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            dateInput.value = `${year}-${month}-${day}`;
        }
    });

    ppdbForm.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e74c3c';
            } else if (this.id === 'nik' && this.value.trim() && !/^\d{16}$/.test(this.value.trim())) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#2ecc71';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#1a5a8c';
        });

        if (input.id === 'nik') {
            input.addEventListener('input', function() {
                this.value = this.value.replace(/\D/g, '').slice(0, 16);
            });
        }
    });
}

// ====================================
// PARALLAX EFFECT FOR PAGE BANNERS
// ====================================
window.addEventListener('scroll', function() {
    const banners = document.querySelectorAll('.page-banner');
    banners.forEach(banner => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        banner.style.backgroundPositionY = `${rate}px`;
    });

    const sectionBgs = document.querySelectorAll('.section-bg');
    sectionBgs.forEach(section => {
        const rect = section.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const offset = rect.top + scrolled;
        const rate = (scrolled - offset) * 0.2;
        section.style.transform = `translateY(${rate}px)`;
    });
});

// ====================================
// ADD FADE IN ANIMATION FOR GALLERY
// ====================================
const styleElement = document.createElement('style');
styleElement.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(styleElement);

// ====================================
// BACK TO TOP BUTTON
// ====================================
if (!document.querySelector('.back-to-top')) {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        z-index: 999;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--secondary, #f39c12);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        box-shadow: 0 4px 15px rgba(243, 156, 18, 0.4);
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
            backToTop.style.transform = 'translateY(20px)';
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 25px rgba(243, 156, 18, 0.6)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(243, 156, 18, 0.4)';
    });
}

// ====================================
// LAZY LOADING FOR IMAGES
// ====================================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ====================================
// RESPONSIVE MENU CLOSE ON RESIZE
// ====================================
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ====================================
// PREVENT DOUBLE SUBMIT PPDB FORM
// ====================================
if (ppdbForm) {
    let isSubmitting = false;

    ppdbForm.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        isSubmitting = true;
        setTimeout(() => {
            isSubmitting = false;
        }, 3000);
    });
}

// ====================================
// CONSOLE LOG
// ====================================
console.log('🚀 SMK GAMA Website Loaded Successfully!');
console.log('📱 Responsive | ✨ Animated | 🎨 Professional Design');
console.log('📸 Hero Slider Active | 💬 WhatsApp Widget on Homepage Only');
console.log('📋 PPDB Form: Data akan dikirim ke WhatsApp');
console.log('📌 Back to Top Button Active');
console.log('🎯 Parallax Effect Active');
console.log('🖼️ Background Page Banner: https://i.imgur.com/T2M24fm.png');

// ====================================
// PERFOMANCE - DEBOUNCE SCROLL EVENT
// ====================================
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function() {
        // Scroll events are handled here
    });
});

// ====================================
// KEYBOARD ACCESSIBILITY - ESCAPE KEY
// ====================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ====================================
// FORM AUTO-FOCUS - PPDB FORM
// ====================================
if (ppdbForm) {
    const firstInput = ppdbForm.querySelector('input:not([type="file"]), select, textarea');
    if (firstInput) {
        firstInput.focus();
    }
}

// ====================================
// SMOOTH REVEAL FOR SECTION
// ====================================
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
});

if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
} else {
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });
}