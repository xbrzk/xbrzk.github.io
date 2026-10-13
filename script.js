// ----- Ganti tema -----
const tombolTema = document.getElementById("tema");
try {
    if (localStorage.getItem("tema") === "gelap") {
        document.body.classList.add("dark");
        tombolTema.textContent = "🌙";
    }
} catch (e) {}

tombolTema.addEventListener("click", () => {
    const gelap = document.body.classList.toggle("dark");
    tombolTema.textContent = gelap ? "🌙" : "☀";
    try { localStorage.setItem("tema", gelap ? "gelap" : "terang"); } catch (e) {}
});

// ----- Efek ketik lalu hapus satu per satu -----
const kata = ["Frontend Developer", "Web Developer", "UI Designer"];
const el = document.getElementById("ketik");
let k = 0, h = 0, hapus = false;

function ketik() {
    const t = kata[k];
    el.textContent = t.substring(0, h);

    if (!hapus) {
        h++;
        if (h > t.length) { hapus = true; return setTimeout(ketik, 1500); }
    } else {
        h--;
        if (h < 0) { hapus = false; h = 0; k = (k + 1) % kata.length; }
    }
    setTimeout(ketik, hapus ? 50 : 100);
}

// ----- Loading screen + animasi muncul -----
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
        document.body.classList.add("loaded");

        const observer = new IntersectionObserver((items) => {
            items.forEach((item) => {
                if (item.isIntersecting) item.target.classList.add("tampil");
            });
        }, { threshold: 0.2 });
        document.querySelectorAll(".muncul").forEach((e) => observer.observe(e));

        ketik();
    }, 3200);
});
// ===== ASISTEN AI =====
const jawaban = [
    { kunci: ["halo", "hai", "hi", "hello"],
      balas: "Halo! Saya asisten Rizki. Silakan tanya soal skill, kontak, atau portofolionya." },
    { kunci: ["siapa", "tentang", "about"],
      balas: "Rizki adalah web developer pemula yang suka ngoding dan bereksperimen dengan ide-ide baru." },
    { kunci: ["skill", "bisa", "bahasa", "teknologi", "keahlian"],
      balas: "Rizki sedang mendalami HTML, CSS, dan JavaScript, dengan fokus ke frontend." },
    { kunci: ["wa", "whatsapp", "nomor", "kontak", "hubungi"],
      balas: 'Hubungi lewat WhatsApp: <a href="https://wa.me/62895408104500" target="_blank">klik di sini</a>.' },
    { kunci: ["instagram", "ig"],
      balas: 'Instagram: <a href="https://www.instagram.com/xb.rzki" target="_blank">@xb.rzki</a>' },
    { kunci: ["tiktok"],
      balas: 'TikTok: <a href="https://www.tiktok.com/@labs" target="_blank">@labs</a>' },
    { kunci: ["cv", "resume"],
      balas: "CV belum tersedia saat ini, tapi segera ditambahkan." },
    { kunci: ["proyek", "project", "karya", "portofolio"],
      balas: "Bagian Projects sedang disiapkan. Nantikan karya terbaru Rizki ya!" }
];
const bawaan = "Maaf, saya belum paham pertanyaannya. Coba tanya soal skill, kontak, atau media sosial Rizki.";

const aiBtn = document.getElementById("ai-btn");
const aiPanel = document.getElementById("ai-panel");
const aiPesan = document.getElementById("ai-pesan");
const aiForm = document.getElementById("ai-form");
const aiInput = document.getElementById("ai-input");

function tambahPesan(teks, jenis, html) {
    const d = document.createElement("div");
    d.className = "ai-msg " + jenis;
    if (html) d.innerHTML = teks; else d.textContent = teks;
    aiPesan.appendChild(d);
    aiPesan.scrollTop = aiPesan.scrollHeight;
}

aiBtn.addEventListener("click", () => {
    aiPanel.classList.toggle("buka");
    if (aiPanel.classList.contains("buka") && !aiPesan.children.length) {
        tambahPesan("Halo! Saya asisten Rizki. Mau tanya apa?", "bot");
    }
});
document.getElementById("ai-tutup").addEventListener("click", () => {
    aiPanel.classList.remove("buka");
});

aiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const tanya = aiInput.value.trim();
    if (!tanya) return;
    tambahPesan(tanya, "user");
    aiInput.value = "";

    const q = tanya.toLowerCase();
    const cocok = jawaban.find(j => j.kunci.some(k => q.includes(k)));
    setTimeout(() => tambahPesan(cocok ? cocok.balas : bawaan, "bot", true), 500);
});