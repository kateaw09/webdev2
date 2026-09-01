(function () {
    // 1. ฉีด CSS สำหรับ Splash Overlay (ดำล้วน) และ ปุ่ม Float Home
    const style = document.createElement("style");
    style.innerHTML = `
        /* --- Entry Splash Overlay (สีดำล้วน ไม่มีโลโก้) --- */
        #page-entry-splash {
            position: fixed;
            inset: 0;
            z-index: 9999;
            background-color: #000;
            opacity: 1;
            transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity;
            pointer-events: auto;
        }
        .splash-fade-out {
            opacity: 0 !important;
            pointer-events: none !important;
        }

        /* --- Modern Glassmorphism Float Home Button --- */
        .float-btn-home {
            position: fixed;
            bottom: 1.5rem;
            right: 1.5rem;
            z-index: 8000;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 52px;
            height: 52px;
            border-radius: 16px;
            background: rgba(15, 23, 42, 0.65);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(59, 130, 246, 0.35);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15);
            color: #60a5fa;
            text-decoration: none;
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            cursor: pointer;
        }

        .float-btn-home:hover {
            transform: translateY(-4px) scale(1.06);
            background: rgba(30, 58, 138, 0.8);
            border-color: rgba(96, 165, 250, 0.8);
            color: #ffffff;
            box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4), 0 0 20px rgba(59, 130, 246, 0.3);
        }

        .float-btn-home:active {
            transform: translateY(-1px) scale(0.96);
        }

        .float-btn-home svg {
            width: 24px;
            height: 24px;
            transition: transform 0.3s ease;
        }

        .float-btn-home:hover svg {
            transform: scale(1.1);
        }

        /* --- Glassmorphism Tooltip --- */
        .float-btn-home .tooltip-text {
            position: absolute;
            right: calc(100% + 12px);
            top: 50%;
            transform: translateY(-50%) translateX(8px);
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: #f8fafc;
            padding: 0.45rem 0.85rem;
            border-radius: 10px;
            font-size: 0.825rem;
            font-weight: 500;
            white-space: nowrap;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
            opacity: 0;
            pointer-events: none;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: 'Kanit', sans-serif;
        }

        .float-btn-home:hover .tooltip-text {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
        }
    `;
    document.head.appendChild(style);

    // 2. สร้างโครงสร้าง DOM สำหรับ Splash Overlay (ดำล้วน ไม่มีข้อความ/โลโก้)
    const splash = document.createElement("div");
    splash.id = "page-entry-splash";

    // 3. สร้างโครงสร้าง DOM สำหรับ Float Home Button
    const homeBtn = document.createElement("a");
    homeBtn.href = "https://kateaw09.github.io/webdev2/";
    homeBtn.className = "float-btn-home";
    homeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        <span class="tooltip-text">กลับหน้าหลัก</span>
    `;

    // ฉีด Element ลงใน body
    const injectElements = () => {
        if (!document.getElementById("page-entry-splash")) {
            document.body.appendChild(splash);
        }
        if (!document.querySelector(".float-btn-home")) {
            document.body.appendChild(homeBtn);
        }
    };

    if (document.body) {
        injectElements();
    } else {
        document.addEventListener("DOMContentLoaded", injectElements);
    }

    // ฟังก์ชันช่วยสำหรับการ Fade Out จอดำออก
    const startFadeOut = () => {
        setTimeout(() => {
            splash.classList.add("splash-fade-out");
        }, 150);
    };

    // 4. เมื่อโหลดหน้าเว็บ/DOM เสร็จ ให้เริ่ม Fade Out จอดำออก
    if (document.readyState === "interactive" || document.readyState === "complete") {
        startFadeOut();
    } else {
        document.addEventListener("DOMContentLoaded", startFadeOut);
    }

    // 5. รองรับการกดย้อนกลับ (Browser Back Navigation)
    window.addEventListener("pageshow", (event) => {
        injectElements();
        splash.classList.remove("splash-fade-out");
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                startFadeOut();
            });
        });
    });

    // 6. เมื่อกดปุ่ม Float Home ให้ค่อยๆ Fade In จอดำ แล้วย้อนกลับหน้าหลัก
    homeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetUrl = homeBtn.getAttribute("href");

        if (!document.getElementById("page-entry-splash")) {
            document.body.appendChild(splash);
        }
        splash.classList.add("splash-fade-out");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                splash.classList.remove("splash-fade-out");
            });
        });

        setTimeout(() => {
            window.location.href = targetUrl;
        }, 600);
    });
})();