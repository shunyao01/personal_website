(function () {
  function runWhenIdle(callback) {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(callback, { timeout: 2200 });
    } else {
      window.setTimeout(callback, 400);
    }
  }

  function pauseOffscreenAnimations() {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    document.querySelectorAll(".qubit, .stack-marquee").forEach(function (target) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            target.classList.toggle("is-paused", !entry.isIntersecting);
          });
        },
        { rootMargin: "80px 0px", threshold: 0 }
      );

      observer.observe(target);
    });
  }

  runWhenIdle(pauseOffscreenAnimations);

  const canvas = document.getElementById("starfield");

  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobileQuery = window.matchMedia("(max-width: 720px)");
  const colors = [
    { core: "rgba(244, 247, 248,", glow: "rgba(244, 247, 248," },
    { core: "rgba(86, 216, 230,", glow: "rgba(86, 216, 230," },
    { core: "rgba(214, 188, 122,", glow: "rgba(214, 188, 122," }
  ];

  let width = 0;
  let height = 0;
  let dpr = 1;
  let stars = [];
  let shootingStars = [];
  let rafId = null;
  let lastScrollY = window.scrollY || 0;
  let scrollVelocity = 0;
  let time = Math.random() * 1000;
  let nextShootAt = 20;
  let lastFrameAt = 0;
  const frameInterval = mobileQuery.matches ? 36 : 24;
  const simpleStars = mobileQuery.matches;

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function isTabActive() {
    return !document.hidden && !reducedMotion;
  }

  function scrollLimit() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function shouldDrawFrame() {
    const limit = scrollLimit();

    if (limit <= 0) {
      return true;
    }

    // Run through all four sections (hero → writing/footer)
    return window.scrollY <= limit;
  }

  function shouldSpawnShootingStars() {
    return shouldDrawFrame();
  }

  function crossScreenFrames(x, y, vx, vy) {
    const pad = 140;
    let frames = Infinity;

    if (vx > 0) {
      frames = Math.min(frames, (width + pad - x) / vx);
    } else if (vx < 0) {
      frames = Math.min(frames, (-pad - x) / vx);
    }

    if (vy > 0) {
      frames = Math.min(frames, (height + pad - y) / vy);
    } else if (vy < 0) {
      frames = Math.min(frames, (-pad - y) / vy);
    }

    return Math.ceil(frames) + 24;
  }

  function makeStar() {
    const colorRoll = Math.random();
    const color = colorRoll > 0.92 ? colors[2] : colorRoll > 0.56 ? colors[1] : colors[0];

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: rand(0.38, 1.12),
      alpha: rand(0.28, 0.8),
      drift: rand(0.08, 0.48),
      twinkle: rand(0.006, 0.02),
      phase: Math.random() * Math.PI * 2,
      scrollPull: rand(0.018, 0.075),
      color: color
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const density = mobileQuery.matches ? 0.000052 : 0.000078;
    const count = Math.max(34, Math.round(width * height * density));
    stars = Array.from({ length: count }, makeStar);
    shootingStars = [];
    nextShootAt = time + rand(6, 18);
  }

  function drawStar(star, pulse) {
    const alpha = Math.max(0.1, Math.min(star.alpha + pulse, 0.95));

    if (simpleStars) {
      ctx.fillStyle = star.color.core + alpha + ")";
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    const glowRadius = star.radius * 4.8;

    ctx.beginPath();
    ctx.fillStyle = star.color.glow + alpha * 0.14 + ")";
    ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = star.color.core + alpha + ")";
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  function makeShootingStar() {
    const fromLeft = Math.random() > 0.5;
    const fromTop = Math.random() > 0.42;
    const x = fromLeft ? rand(-80, width * 0.24) : rand(width * 0.76, width + 80);
    const y = fromTop ? rand(-60, height * 0.52) : rand(height * 0.48, height + 60);
    const angle = fromLeft ? rand(0.36, 0.92) : rand(2.22, 2.78);
    const speed = mobileQuery.matches ? rand(8, 12) : rand(10, 16);
    const color = Math.random() > 0.78 ? colors[2] : colors[1];
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    return {
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      life: 0,
      maxLife: crossScreenFrames(x, y, vx, vy),
      length: rand(220, 360),
      width: rand(1.8, 3.1),
      color: color
    };
  }

  function shootingAlpha(progress) {
    const peak = 0.74;
    const floor = 0.26;

    if (progress < 0.08) {
      return (progress / 0.08) * peak;
    }
    if (progress < 0.45) {
      return peak;
    }

    const fade = (progress - 0.45) / 0.55;
    return peak - (peak - floor) * fade * fade;
  }

  function drawShootingStar(star) {
    const progress = star.life / star.maxLife;
    const alpha = shootingAlpha(progress);
    const angle = Math.atan2(star.vy, star.vx);
    const tailX = star.x - Math.cos(angle) * star.length;
    const tailY = star.y - Math.sin(angle) * star.length;
    const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);

    gradient.addColorStop(0, star.color.core + alpha + ")");
    gradient.addColorStop(0.16, star.color.glow + alpha * 0.82 + ")");
    gradient.addColorStop(0.58, star.color.glow + alpha * 0.32 + ")");
    gradient.addColorStop(1, star.color.glow + "0)");

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = star.width;
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();

    ctx.shadowColor = star.color.core + "0.55)";
    ctx.shadowBlur = 16;
    ctx.fillStyle = star.color.core + alpha + ")";
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.width * 1.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function haltLoop() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function render(frameTime) {
    if (!isTabActive()) {
      haltLoop();
      return;
    }

    if (frameTime - lastFrameAt < frameInterval) {
      rafId = window.requestAnimationFrame(render);
      return;
    }

    lastFrameAt = frameTime;

    const nextScrollY = window.scrollY || 0;

    if (!shouldDrawFrame()) {
      lastScrollY = nextScrollY;
      haltLoop();
      return;
    }

    scrollVelocity += (nextScrollY - lastScrollY - scrollVelocity) * 0.08;
    lastScrollY = nextScrollY;
    time += 1;

    ctx.clearRect(0, 0, width, height);

    stars.forEach(function (star) {
      const pulse = Math.sin(time * star.twinkle + star.phase) * 0.2;

      star.y += star.drift + scrollVelocity * star.scrollPull;
      star.x += Math.sin(time * 0.006 + star.phase) * 0.045;

      if (star.y > height + 16) {
        star.y = -16;
        star.x = Math.random() * width;
      } else if (star.y < -16) {
        star.y = height + 16;
        star.x = Math.random() * width;
      }

      drawStar(star, pulse);
    });

    if (shouldSpawnShootingStars() && time > nextShootAt) {
      shootingStars.push(makeShootingStar());

      if (Math.random() > 0.7 && !mobileQuery.matches) {
        shootingStars.push(makeShootingStar());
      }

      nextShootAt = time + rand(42, 95);
    }

    shootingStars = shootingStars.filter(function (star) {
      star.x += star.vx;
      star.y += star.vy + scrollVelocity * 0.012;
      star.life += 1;
      drawShootingStar(star);

      return star.life < star.maxLife;
    });

    rafId = window.requestAnimationFrame(render);
  }

  function startRender() {
    if (rafId === null && isTabActive()) {
      render();
    }
  }

  function bootStarfield() {
    resize();

    if (reducedMotion) {
      stars.forEach(function (star) {
        drawStar(star, 0);
      });
    } else {
      startRender();
    }

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", startRender, { passive: true });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        haltLoop();
      } else {
        startRender();
      }
    });
  }

  runWhenIdle(bootStarfield);
})();

(function () {
  function runWhenIdle(callback) {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(callback, { timeout: 2200 });
    } else {
      window.setTimeout(callback, 400);
    }
  }

  const qubitEl = document.getElementById("qubit");

  if (!qubitEl) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (reducedMotion || !finePointer) {
    return;
  }

  runWhenIdle(function () {
    let rafId = null;
    let pointerX = window.innerWidth * 0.5;
    let pointerY = window.innerHeight * 0.5;

    function tiltQubit() {
      const nx = (window.innerWidth * 0.5 - pointerX) / 140;
      const ny = (window.innerHeight * 0.5 - pointerY) / 140;
      qubitEl.style.transform = `rotateY(${nx}deg) rotateX(${-ny}deg)`;
      rafId = null;
    }

    window.addEventListener(
      "mousemove",
      function (event) {
        pointerX = event.clientX;
        pointerY = event.clientY;

        if (rafId === null) {
          rafId = window.requestAnimationFrame(tiltQubit);
        }
      },
      { passive: true }
    );
  });
})();

(function () {
  const menuBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const revealEls = document.querySelectorAll(".reveal");
  const pageSections = [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "stack", label: "Stack" },
    { id: "writing", label: "Writing" }
  ];
  const intent = document.querySelector(".scroll-intent");
  const intentLabel = document.querySelector(".intent-label");
  const intentCurrent = document.querySelector(".intent-current");
  const intentProgress = document.querySelector(".intent-progress");
  const intentDots = document.querySelectorAll(".intent-dot");
  const navAnchors = document.querySelectorAll(".nav-links a");

  document.querySelectorAll(".tech-pill[data-tech]").forEach(function (pill) {
    pill.setAttribute("aria-label", pill.getAttribute("data-tech"));
  });

  document.querySelectorAll(".project-card").forEach(function (card) {
    const summary = card.querySelector("summary");

    function syncExpanded() {
      const expanded = card.open;
      card.setAttribute("aria-expanded", String(expanded));

      if (summary) {
        summary.setAttribute("aria-expanded", String(expanded));
      }
    }

    card.addEventListener("toggle", syncExpanded);
    syncExpanded();
  });

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    function observeReveal(el) {
      revealObserver.observe(el);
    }

    revealEls.forEach(observeReveal);

    // Observe dynamically-added .reveal elements (client-side navigation)
    if ("MutationObserver" in window) {
      var mutationObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
              if (node.classList.contains("reveal")) {
                observeReveal(node);
              }
              node.querySelectorAll && node.querySelectorAll(".reveal").forEach(observeReveal);
            }
          });
        });
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  if (menuBtn && navLinks) {
    function closeMenu() {
      menuBtn.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
    }

    menuBtn.addEventListener("click", function () {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  if (intent) {
    function resolveSectionEls() {
      return pageSections
        .map(function (section) {
          const target = document.getElementById(section.id);
          const measureEl = target ? target.closest(".page-section") || target : null;
          return Object.assign({}, section, { el: measureEl });
        })
        .filter(function (section) {
          return section.el;
        });
    }

    function setActiveSection(activeIndex) {
      var sectionEls = resolveSectionEls();
      var activeSection = sectionEls[activeIndex];

      if (!activeSection) {
        return;
      }

      var label = document.querySelector(".intent-label");
      var current = document.querySelector(".intent-current");
      var dots = document.querySelectorAll(".intent-dot");
      var anchors = document.querySelectorAll(".nav-links a");

      if (label) {
        label.textContent = activeSection.label;
      }

      if (current) {
        current.textContent = String(activeIndex + 1).padStart(2, "0");
      }

      dots.forEach(function (dot, index) {
        dot.classList.toggle("is-active", index === activeIndex);
      });

      anchors.forEach(function (anchor) {
        anchor.classList.toggle("is-active", anchor.getAttribute("href") === "#" + activeSection.id);
      });
    }

    function updateScrollIntent() {
      if (!document.querySelector(".scroll-intent")) {
        return;
      }

      var sectionEls = resolveSectionEls();

      if (sectionEls.length === 0) {
        return;
      }

      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      var progress = scrollMax > 0 ? Math.min(scrollTop / scrollMax, 1) : 0;
      var viewportCenter = window.innerHeight / 2;
      var activeIndex = 0;
      var closestDistance = Infinity;

      sectionEls.forEach(function (section, index) {
        var rect = section.el.getBoundingClientRect();
        var sectionCenter = rect.top + rect.height / 2;
        var distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          activeIndex = index;
        }
      });

      if (scrollTop <= 1) {
        activeIndex = 0;
      } else if (scrollMax - scrollTop <= 1) {
        activeIndex = sectionEls.length - 1;
      }

      var intentProgress = document.querySelector(".intent-progress");

      if (intentProgress) {
        intentProgress.style.height = Math.round(progress * 100) + "%";
      }

      setActiveSection(activeIndex);
    }

    let scrollRaf = null;

    function scheduleScrollIntent() {
      if (scrollRaf !== null) {
        return;
      }

      scrollRaf = window.requestAnimationFrame(function () {
        updateScrollIntent();
        scrollRaf = null;
      });
    }

    updateScrollIntent();
    window.addEventListener("scroll", scheduleScrollIntent, { passive: true });
    window.addEventListener("resize", scheduleScrollIntent);
  }
})();

(function () {
  function runWhenIdle(callback) {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(callback, { timeout: 2200 });
    } else {
      window.setTimeout(callback, 400);
    }
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (reducedMotion || !finePointer) {
    return;
  }

  runWhenIdle(function () {
    let rafId = null;
    let cx = window.innerWidth * 0.5;
    let cy = window.innerHeight * 0.42;

    function isFirstPage() {
      return window.scrollY < window.innerHeight * 0.92;
    }

    function updateGlow() {
      document.body.style.setProperty("--gx", cx + "px");
      document.body.style.setProperty("--gy", cy + "px");
      document.body.classList.toggle("page-glow-active", isFirstPage());
      rafId = null;
    }

    function scheduleGlow() {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateGlow);
      }
    }

    window.addEventListener(
      "mousemove",
      function (event) {
        cx = event.clientX;
        cy = event.clientY;
        scheduleGlow();
      },
      { passive: true }
    );

    window.addEventListener("scroll", scheduleGlow, { passive: true });
    window.addEventListener("resize", scheduleGlow);

    updateGlow();
  });
})();

(function () {
  function runWhenIdle(callback) {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(callback, { timeout: 2200 });
    } else {
      window.setTimeout(callback, 400);
    }
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (reducedMotion || !finePointer) {
    return;
  }

  runWhenIdle(function () {
  document.querySelectorAll(".project-card, .project-index-card").forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.classList.add("is-tilting");
      card.style.transform =
        "perspective(600px) rotateY(" +
        x * 8 +
        "deg) rotateX(" +
        -y * 8 +
        "deg) translateY(-3px)";
    });

    card.addEventListener("mouseleave", function () {
      card.classList.remove("is-tilting");
      card.style.transform = "";
    });
  });
  });
})();
