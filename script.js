/**
 * VISHAL.DEV — Pure Vanilla JavaScript
 * Zero frameworks, zero external dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    highlightCurrentSection();
  }, { passive: true });

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      // Toggle hamburger / close icon
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }

  // 3. Highlight Current Section in Nav Links
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function highlightCurrentSection() {
    const scrollPos = window.scrollY + 220;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 4. Skills Category Filtering
  const skillBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-cat');

      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (category === 'All' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Currency Picker for International Clients
  const currBtns = document.querySelectorAll('.curr-btn');
  const starterPrice = document.getElementById('priceStarter');
  const proPrice = document.getElementById('pricePro');
  const currencyNotes = document.querySelectorAll('.curr-note');

  const rates = {
    USD: { symbol: '$', starter: '499+', pro: '799+' },
    EUR: { symbol: '€', starter: '460+', pro: '735+' },
    GBP: { symbol: '£', starter: '395+', pro: '630+' },
  };

  currBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const curr = btn.getAttribute('data-curr') || 'USD';
      const data = rates[curr] || rates.USD;

      if (starterPrice) starterPrice.textContent = `${data.symbol}${data.starter}`;
      if (proPrice) proPrice.textContent = `${data.symbol}${data.pro}`;
      currencyNotes.forEach(el => {
        el.textContent = `Starting baseline in ${curr}`;
      });
    });
  });

  // 6. FAQ Accordion
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      if (item) {
        const isOpen = item.classList.contains('open');
        // Close others for clean single-expanded view
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      }
    });
  });

  // 7. Interactive Project Demo Modal
  const demoModal = document.getElementById('projectDemoModal');
  const demoModalTitle = document.getElementById('demoModalTitle');
  const demoModalBody = document.getElementById('demoModalBody');
  const demoModalClose = document.getElementById('demoModalClose');

  const demoData = {
    hotel: {
      title: 'Sky Hotel & Resort — Interactive Demo Preview',
      html: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <p style="font-size:0.875rem; color:var(--text-secondary);">
            A premium hotel website concept featuring interactive room suite selection, rates, and booking simulator.
          </p>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem;">
            <div style="background:#131c30; border:1px solid #1e293b; padding:1rem; border-radius:8px;">
              <div style="font-weight:700; color:white; font-size:0.9rem;">Ocean Suite</div>
              <div style="color:var(--accent-cyan); font-weight:700; margin:0.25rem 0;">$380 / night</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">King Bed · Balcony · 42m²</div>
            </div>
            <div style="background:#131c30; border:1px solid #38bdf8; padding:1rem; border-radius:8px;">
              <div style="font-weight:700; color:white; font-size:0.9rem;">Cliffside Villa</div>
              <div style="color:var(--accent-cyan); font-weight:700; margin:0.25rem 0;">$620 / night</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">Plunge Pool · Butler · 85m²</div>
            </div>
            <div style="background:#131c30; border:1px solid #1e293b; padding:1rem; border-radius:8px;">
              <div style="font-weight:700; color:white; font-size:0.9rem;">Royal Penthouse</div>
              <div style="color:var(--accent-cyan); font-weight:700; margin:0.25rem 0;">$950 / night</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">Panoramic View · 150m²</div>
            </div>
          </div>
          <div style="background:#090d16; border:1px solid #1e293b; padding:1rem; border-radius:8px;">
            <span style="font-size:0.8rem; font-family:var(--font-mono); color:var(--accent-teal); display:block; margin-bottom:0.5rem;">
              Simulate Booking Enquiry Flow
            </span>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
              <input type="date" value="2026-10-15" style="background:#1e293b; border:1px solid #334155; color:white; padding:0.5rem; border-radius:6px; font-size:0.8rem;">
              <input type="date" value="2026-10-20" style="background:#1e293b; border:1px solid #334155; color:white; padding:0.5rem; border-radius:6px; font-size:0.8rem;">
              <button id="btnSimulateHotel" class="btn btn-primary btn-sm" style="margin-left:auto;">Test Booking Flow</button>
            </div>
            <div id="hotelSimResult" style="display:none; margin-top:0.75rem; padding:0.6rem; background:rgba(16,185,129,0.15); border:1px solid #10b981; border-radius:6px; color:#6ee7b7; font-size:0.8rem;">
              ✓ Booking enquiry simulated! Integrates with custom forms or Stripe/booking engines.
            </div>
          </div>
        </div>
      `,
    },
    gym: {
      title: 'Gym & Fitness Studio — Interactive Demo Preview',
      html: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <p style="font-size:0.875rem; color:var(--text-secondary);">
            A modern fitness studio website concept featuring class schedules, trainer profiles, and trial booking.
          </p>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; background:#131c30; border:1px solid #1e293b; padding:0.85rem 1rem; border-radius:8px;">
              <div>
                <strong style="color:white; font-size:0.875rem;">HIIT Athletic Conditioning</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">07:00 AM · Coach Alex</div>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="this.textContent='Spot Reserved!'; this.style.borderColor='var(--accent-emerald)';">Reserve Spot</button>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; background:#131c30; border:1px solid #1e293b; padding:0.85rem 1rem; border-radius:8px;">
              <div>
                <strong style="color:white; font-size:0.875rem;">Powerlifting & Strength</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">12:30 PM · Coach Marcus</div>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="this.textContent='Spot Reserved!'; this.style.borderColor='var(--accent-emerald)';">Reserve Spot</button>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; background:#131c30; border:1px solid #1e293b; padding:0.85rem 1rem; border-radius:8px;">
              <div>
                <strong style="color:white; font-size:0.875rem;">Reformer Pilates & Mobility</strong>
                <div style="font-size:0.75rem; color:var(--text-muted);">06:00 PM · Coach Elena</div>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="this.textContent='Spot Reserved!'; this.style.borderColor='var(--accent-emerald)';">Reserve Spot</button>
            </div>
          </div>
        </div>
      `,
    },
    devtools: {
      title: 'DevTools Hub — Live Interactive Client Utility',
      html: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <p style="font-size:0.875rem; color:var(--text-secondary);">
            A collection of useful web-based developer utilities and productivity tools right in vanilla JavaScript.
          </p>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <label style="font-size:0.75rem; font-family:var(--font-mono); color:var(--text-secondary);">Live JSON Formatter & Validator:</label>
            <textarea id="jsonInputBox" rows="4" style="background:#090d16; border:1px solid #1e293b; color:var(--accent-cyan); font-family:var(--font-mono); font-size:0.8rem; padding:0.6rem; border-radius:6px; resize:vertical;">{"project":"VISHAL.DEV","status":"active","rating":5}</textarea>
            <div style="display:flex; gap:0.5rem; align-items:center;">
              <button id="btnFormatJson" class="btn btn-primary btn-sm">Format & Validate</button>
              <span id="jsonMsg" style="font-size:0.75rem; font-family:var(--font-mono);"></span>
            </div>
          </div>
        </div>
      `,
    }
  };

  document.querySelectorAll('.open-demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-demo');
      const data = demoData[type];
      if (data && demoModal && demoModalTitle && demoModalBody) {
        demoModalTitle.textContent = data.title;
        demoModalBody.innerHTML = data.html;
        demoModal.classList.add('open');

        // Hook up sub-handlers
        const btnSim = document.getElementById('btnSimulateHotel');
        if (btnSim) {
          btnSim.addEventListener('click', () => {
            const res = document.getElementById('hotelSimResult');
            if (res) res.style.display = 'block';
          });
        }

        const btnJson = document.getElementById('btnFormatJson');
        if (btnJson) {
          btnJson.addEventListener('click', () => {
            const input = document.getElementById('jsonInputBox');
            const msg = document.getElementById('jsonMsg');
            try {
              const parsed = JSON.parse(input.value);
              input.value = JSON.stringify(parsed, null, 2);
              if (msg) {
                msg.textContent = '✓ Valid JSON';
                msg.style.color = '#10b981';
              }
            } catch (e) {
              if (msg) {
                msg.textContent = '✗ Invalid JSON syntax';
                msg.style.color = '#f43f5e';
              }
            }
          });
        }
      }
    });
  });

  if (demoModalClose && demoModal) {
    demoModalClose.addEventListener('click', () => demoModal.classList.remove('open'));
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) demoModal.classList.remove('open');
    });
  }

  // 8. Contact Form Validation & Submission
  const contactForm = document.getElementById('contactForm');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('vishalgaming993414@gmail.com').then(() => {
        const orig = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `<span>Copied!</span>`;
        setTimeout(() => { copyEmailBtn.innerHTML = orig; }, 2000);
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('formName')?.value.trim();
      const email = document.getElementById('formEmail')?.value.trim();
      const business = document.getElementById('formBusiness')?.value.trim();
      const projectType = document.getElementById('formType')?.value;
      const budget = document.getElementById('formBudget')?.value;
      const message = document.getElementById('formMessage')?.value.trim();

      let hasError = false;

      // Validate Name
      const errName = document.getElementById('errName');
      if (!name) {
        if (errName) errName.textContent = 'Please provide your name';
        hasError = true;
      } else if (errName) {
        errName.textContent = '';
      }

      // Validate Email
      const errEmail = document.getElementById('errEmail');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        if (errEmail) errEmail.textContent = 'Please provide a valid email address';
        hasError = true;
      } else if (errEmail) {
        errEmail.textContent = '';
      }

      // Validate Business
      const errBusiness = document.getElementById('errBusiness');
      if (!business) {
        if (errBusiness) errBusiness.textContent = 'Please enter your business or project name';
        hasError = true;
      } else if (errBusiness) {
        errBusiness.textContent = '';
      }

      // Validate Message
      const errMessage = document.getElementById('errMessage');
      if (!message) {
        if (errMessage) errMessage.textContent = 'Please describe your project requirements';
        hasError = true;
      } else if (errMessage) {
        errMessage.textContent = '';
      }

      if (hasError) return;

      // Prepare mailto trigger
      const subject = encodeURIComponent(`Project Inquiry: ${projectType} — ${business}`);
      const body = encodeURIComponent(
        `Hi Vishal,\n\nI would like to discuss a web project.\n\n` +
        `Name: ${name}\n` +
        `Business: ${business}\n` +
        `Email: ${email}\n` +
        `Project Type: ${projectType}\n` +
        `Budget: ${budget}\n\n` +
        `Project Details:\n${message}\n\n` +
        `Best regards,\n${name}`
      );

      // Open email client
      window.location.href = `mailto:vishalgaming993414@gmail.com?subject=${subject}&body=${body}`;

      // Show confirmation dialog / status
      const successBox = document.getElementById('formSuccessMessage');
      if (successBox) {
        successBox.style.display = 'block';
        contactForm.reset();
      }
    });
  }

  // Prepopulate form when "Inquire" button on service or pricing is clicked
  document.querySelectorAll('.inquire-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = btn.getAttribute('data-type');
      const budget = btn.getAttribute('data-budget');
      const selectType = document.getElementById('formType');
      const selectBudget = document.getElementById('formBudget');
      if (type && selectType) selectType.value = type;
      if (budget && selectBudget) selectBudget.value = budget;
      
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ESC key to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal) {
      demoModal.classList.remove('open');
    }
  });
});
