gsap.registerPlugin(ScrollTrigger);

const navPanel = document.querySelector("[data-nav-panel]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuIcon = menuToggle?.querySelector("i");
const navLinks = navPanel?.querySelectorAll("a");

const closeMenu = () => {
    if (!navPanel) return;
    navPanel.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuIcon) menuIcon.className = "ri-menu-fill";
};

menuToggle?.addEventListener("click", () => {
    if (!navPanel) return;
    const isOpen = navPanel.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    if (menuIcon) menuIcon.className = isOpen ? "ri-close-line" : "ri-menu-fill";
});

navLinks?.forEach(link =>
    link.addEventListener("click", () => {
        if (window.innerWidth <= 900) closeMenu();
    })
);

window.matchMedia("(min-width: 901px)").addEventListener("change", e => {
    if (e.matches) closeMenu();
});

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const heroTl = gsap.timeline({
    defaults: { duration: 0.8, ease: "power3.out" }
});

heroTl
    .from("nav img", { opacity: 0, y: -30 })
    .from("nav .center-nav a", { opacity: 0, y: -10, stagger: 0.05 }, "<0.2")
    .from(".hero-copy .eyebrow", { opacity: 0, y: 20 }, "-=0.2")
    .from(".hero-copy h1", { opacity: 0, y: 40 }, "-=0.2")
    .from(".hero-copy .lede", { opacity: 0, y: 40 })
    .from(".hero-btns button", { opacity: 0, y: 20, stagger: 0.1 }, "-=0.3")
    .from(".hero-stats div", { opacity: 0, y: 30, stagger: 0.08 }, "-=0.4")
    .from(["#sprite", "#lemon-cut", "#lemon"], { opacity: 0, y: 120, stagger: 0.15 }, "-=0.4");

const mm = gsap.matchMedia();

const bottleScroll = config => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".two",
            start: "top bottom",
            end: "70% center",
            scrub: true
        }
    });

    tl.to("#sprite", { top: config.spriteTop, left: config.spriteLeft, width: config.spriteWidth }, "lemon");
    tl.to("#lemon-cut", { top: config.cutTop, left: config.cutLeft, width: config.cutWidth }, "lemon");
    tl.to("#lemon", { top: config.lemonTop, right: config.lemonRight, width: config.lemonWidth }, "lemon");
    tl.to("#leaf", { top: config.leafTop, left: config.leafLeft, rotate: config.leafRotate }, "lemon");
    tl.to("#leaf2", { top: config.leaf2Top, left: config.leaf2Left, rotate: config.leaf2Rotate }, "lemon");
    return tl;
};

const cardScroll = config => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".three",
            start: "top 85%",
            end: "center 40%",
            scrub: true
        }
    });

    tl.from(".lemon1", { rotate: config.l1Rotate, left: config.l1Left, top: config.l1Top }, "cards")
      .from("#cocacola", { rotate: config.cokeRotate, left: config.cokeLeft, top: config.cokeTop }, "cards")
      .from(".lemon2", { rotate: config.l2Rotate, left: config.l2Left, top: config.l2Top }, "cards")
      .from("#pepsi", { rotate: config.pepsiRotate, left: config.pepsiLeft, top: config.pepsiTop }, "cards")
      .to("#lemon-cut", { width: config.cutWidth, left: config.cutLeft, top: config.cutTop }, "cards")
      .to("#sprite", { width: config.spriteWidth, top: config.spriteTop, left: config.spriteLeft }, "cards");

    return tl;
};

mm.add("(min-width: 901px)", () => {
    const tlHero = bottleScroll({
        spriteTop: "120%",
        spriteLeft: "5%",
        spriteWidth: "35%",
        cutTop: "150%",
        cutLeft: "35%",
        cutWidth: "16%",
        lemonTop: "150%",
        lemonRight: "20%",
        lemonWidth: "13%",
        leafTop: "110%",
        leafLeft: "70%",
        leafRotate: "130deg",
        leaf2Top: "110%",
        leaf2Left: "-5%",
        leaf2Rotate: "130deg"
    });

    const tlCards = cardScroll({
        l1Rotate: "-90deg",
        l1Left: "-120%",
        l1Top: "120%",
        cokeRotate: "-90deg",
        cokeLeft: "-120%",
        cokeTop: "120%",
        l2Rotate: "90deg",
        l2Left: "120%",
        l2Top: "120%",
        pepsiRotate: "90deg",
        pepsiLeft: "120%",
        pepsiTop: "120%",
        cutWidth: "18%",
        cutLeft: "42%",
        cutTop: "204%",
        spriteWidth: "32%",
        spriteTop: "210%",
        spriteLeft: "33%"
    });

    return () => {
        tlHero.kill();
        tlCards.kill();
    };
});

mm.add("(max-width: 900px)", () => {
    const tlHero = bottleScroll({
        spriteTop: "140%",
        spriteLeft: "18%",
        spriteWidth: "60%",
        cutTop: "160%",
        cutLeft: "32%",
        cutWidth: "28%",
        lemonTop: "170%",
        lemonRight: "10%",
        lemonWidth: "28%",
        leafTop: "140%",
        leafLeft: "10%",
        leafRotate: "80deg",
        leaf2Top: "150%",
        leaf2Left: "-10%",
        leaf2Rotate: "100deg"
    });

    const tlCards = cardScroll({
        l1Rotate: "-45deg",
        l1Left: "-80%",
        l1Top: "110%",
        cokeRotate: "-45deg",
        cokeLeft: "-80%",
        cokeTop: "110%",
        l2Rotate: "45deg",
        l2Left: "80%",
        l2Top: "110%",
        pepsiRotate: "45deg",
        pepsiLeft: "80%",
        pepsiTop: "110%",
        cutWidth: "28%",
        cutLeft: "40%",
        cutTop: "240%",
        spriteWidth: "55%",
        spriteTop: "240%",
        spriteLeft: "22%"
    });

    return () => {
        tlHero.kill();
        tlCards.kill();
    };
});

const newsletterForm = document.querySelector(".newsletter-form");
newsletterForm?.addEventListener("submit", e => {
    e.preventDefault();
    const input = newsletterForm.querySelector("input");
    if (!input?.value) return;
    input.value = "";
    const button = newsletterForm.querySelector("button");
    const prevText = button.textContent;
    button.textContent = "Added!";
    setTimeout(() => {
        button.textContent = prevText;
    }, 1600);
});