"use strict";

/**
 * Drawer menu
 */
const ACTIVE_MENU = "active";
const menuBtn = document.querySelector(".menu-btn");
const headerMenu = document.querySelector(".header__menu");

const navItems = document.querySelectorAll(".header__nav-item a");
const headerMenuLogo = document.querySelector(".header__menu-logo a");
// menu開いた際のボタン色変更
const menuBtnBefore = document.querySelector(".menu-btn--before");
const menuBtnAfter = document.querySelector(".menu-btn--after");

const addActiveMenu = () => {
  const toggleActive = headerMenu.classList.toggle(ACTIVE_MENU);
  if (toggleActive) {
    menuBtn.classList.add(ACTIVE_MENU);
    menuBtnBefore.style.backgroundColor = "var(--color-secondary)";
    menuBtnAfter.style.backgroundColor = "var(--color-secondary)";
  } else {
    menuBtn.classList.remove(ACTIVE_MENU);
  }
};

menuBtn.addEventListener("click", addActiveMenu);
navItems.forEach((navItem) => {
  navItem.addEventListener("click", addActiveMenu);
});
headerMenuLogo.addEventListener("click", addActiveMenu);

/**
 * Change header color
 */
document.addEventListener("DOMContentLoaded", () => {
  const headerLogo = document.querySelector(".header__logo--img");
  const youtube = document.querySelector(".youtube");
  const instagram = document.querySelector(".instagram");
  const tiktok = document.querySelector(".tiktok");

  // 監視対象セクション
  const sections = [
    { el: document.querySelector(".fv"), color: "white" },
    { el: document.querySelector("#about"), color: "black" },
    { el: document.querySelector(".page-hero"), color: "black" },
    { el: document.querySelector(".about__thought"), color: "white" },
    { el: document.querySelector(".about__message"), color: "black" },
    { el: document.querySelector(".farm__list"), color: "white" },
    { el: document.querySelector(".swiper"), color: "black" },
    { el: document.querySelector("#shop"), color: "white" },
    { el: document.querySelector("#access"), color: "black" },
    { el: document.querySelector(".footer"), color: "white" },
  ].filter((seciton) => seciton.el); // 不要セクションは除外
  // 白黒選定
  const setHeaderColor = (color) => {
    if (color === "white") {
      headerLogo.src = "./assets/images/naiviva-logo-white.svg";
      youtube.src = "./assets/images/youtube-logo-white.svg";
      instagram.src = "./assets/images/instagram-logo-white.svg";
      tiktok.src = "./assets/images/tiktok-logo-white.svg";
      menuBtnBefore.style.backgroundColor = "var(--color-secondary)";
      menuBtnAfter.style.backgroundColor = "var(--color-secondary)";
    } else if (color === "black") {
      headerLogo.src = "./assets/images/naiviva-logo-black.svg";
      youtube.src = "./assets/images/youtube-logo-black.svg";
      instagram.src = "./assets/images/instagram-logo-black.svg";
      tiktok.src = "./assets/images/tiktok-logo-black.svg";
      menuBtnBefore.style.backgroundColor = "var(--color-primary)";
      menuBtnAfter.style.backgroundColor = "var(--color-primary)";
    }
  };
  // 色変え処理
  const changeHeaderColor = () => {
    const scrollY = window.scrollY;
    for (let section of sections) {
      const sectionTop = section.el.offsetTop;
      const ADJUST_COLOR_CHANGE = -80;
      if (scrollY > sectionTop + ADJUST_COLOR_CHANGE) {
        setHeaderColor(section.color);
      }
    }
  };

  window.addEventListener("scroll", changeHeaderColor);
});

/**
 * fadein
 */
// 監視対象物の動作実行
const fadeAnimation = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      switch (true) {
        // 左から右スライド
        case target.classList.contains("fadein--ltr"):
          target.animate(
            {
              opacity: [0, 1],
              filter: ["blur(.4rem)", "blur(0)"],
              translate: ["-50px 0", 0],
            },
            {
              duration: 1000,
              easing: "ease",
              fill: "forwards",
            }
          );
          break;
        // 右から左スライド
        case target.classList.contains("fadein--rtl"):
          target.animate(
            {
              opacity: [0, 1],
              filter: ["blur(.4rem)", "blur(0)"],
              translate: ["50px 0", 0],
            },
            {
              duration: 1000,
              easing: "ease",
              fill: "forwards",
            }
          );
          break;
        // 下から上スライド
        case target.classList.contains("fadein"):
          target.animate(
            {
              opacity: [0, 1],
              filter: ["blur(.4rem)", "blur(0)"],
              translate: ["0 50px", 0],
            },
            {
              duration: 1000,
              easing: "ease",
              fill: "forwards",
            }
          );
          break;
      }
      obs.unobserve(target);
    }
  });
};
// 監視設定
const fadeObserver = new IntersectionObserver(fadeAnimation);
const fadeElementsLtR = document.querySelectorAll(".fadein--ltr");
const fadeElementsRtL = document.querySelectorAll(".fadein--rtl");
const fadeElements = document.querySelectorAll(".fadein");

fadeElements.forEach((fadeElement) => {
  fadeObserver.observe(fadeElement);
});
fadeElementsLtR.forEach((fadeElement) => {
  fadeObserver.observe(fadeElement);
});
fadeElementsRtL.forEach((fadeElement) => {
  fadeObserver.observe(fadeElement);
});

/**
 * Swiper
 */
const checkSwiper = document.querySelector(".swiper");
window.addEventListener("load", () => {
  if (checkSwiper) {
    const swiper = new Swiper(".swiper", {
      speed: 12000,
      slidesPerView: "auto",
      loop: true,
      centeredSlides: true,
      preventInteractionOnTransition: true,
      disableOnInteraction: false,
      loopAdditionalSlides: 1,
      autoplay: {
        delay: 0, // 0にすることで流れ続けるようになる
      },
    });
  }
});

/**
 * Shop parallax
 */
const shopSliders = document.querySelectorAll(".shop-slide__list");
if (shopSliders.length) {
  const shopParallax = () => {
    const shopSection = document.querySelector(".section--shop");
    // topからshopセクションまでの長さ測定
    const topToshop = shopSection.offsetTop;
    // スクロール量
    const scrollY = window.scrollY;
    // スクロール方向
    const DIR_TtB = 1;
    const DIR_BtT = -1;
    // spの場合の制御
    const isSp = window.innerWidth <= 768;

    shopSliders.forEach((shopSlider) => {
      const SPEED = 0.08; // paralluxスピード指定
      // 方向転換
      let direction = DIR_TtB; // デフォルトは下方向
      const slideTtB = shopSlider.classList.contains("slide-ttb");
      const slideBtT = shopSlider.classList.contains("slide-btt");
      if (slideBtT) {
        direction = DIR_BtT;
      } else if (slideTtB) {
        direction = DIR_TtB;
      }

      if (isSp) {
        // shopSliderの長さ測定（横にはみ出る要素も含む）
        const shopSliderWidth = shopSlider.scrollWidth;
        // shopセクションの長さ測定
        const shopWidth = shopSection.offsetWidth;
        // slider真ん中配置
        const initialOffsetX = (shopWidth - shopSliderWidth) / 2;
        // parallax動作制御
        const moveX =
          initialOffsetX + (scrollY - topToshop) * SPEED * direction;
        // parallaxのslider表示
        shopSlider.style.transform = `translate3d(${moveX}px, 0, 0)`;
      } else {
        // shopSliderの長さ測定
        const shopSliderHeight = shopSlider.offsetHeight;
        // shopセクションの長さ測定
        const shopHeight = shopSection.offsetHeight;
        // slider真ん中配置
        const initialOffsetY = (shopHeight - shopSliderHeight) / 2;
        // parallax動作制御
        const moveY =
          initialOffsetY + (scrollY - topToshop) * SPEED * direction;
        // parallaxのslider表示
        shopSlider.style.transform = `translate3d(0, ${moveY}px, 0)`;
      }
    });
  };
  window.addEventListener("scroll", shopParallax);
}
