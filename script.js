
/* =========================================
   MENUKITA - SCRIPT.JS
   Mengatur data menu dan interaksi website
   ========================================= */


/* =========================================
   1. DATA MENU
   ========================================= */

// Data contoh untuk keperluan pengembangan website.
// Ganti nama, harga, deskripsi, dan foto dengan data
// yang sudah dikonfirmasi oleh pemilik kafe.

const daftarMenu = [
    {
        id: 1,
        nama: "Nasi Goreng Spesial",
        harga: 18000,
        kategori: "makanan",
        deskripsi: "Nasi goreng dengan telur dan sayuran.",
        gambar: "https://placehold.co/600x400/e7f5ec/176b45?text=Nasi+Goreng",
        tersedia: true
    },
    {
        id: 2,
        nama: "Mie Goreng",
        harga: 15000,
        kategori: "makanan",
        deskripsi: "Mie goreng dengan sayuran dan bumbu pilihan.",
        gambar: "https://placehold.co/600x400/e7f5ec/176b45?text=Mie+Goreng",
        tersedia: true
    },
    {
        id: 3,
        nama: "Ayam Geprek",
        harga: 20000,
        kategori: "makanan",
        deskripsi: "Ayam crispy dengan sambal sesuai selera.",
        gambar: "https://placehold.co/600x400/e7f5ec/176b45?text=Ayam+Geprek",
        tersedia: true
    },
    {
        id: 4,
        nama: "Es Teh Manis",
        harga: 5000,
        kategori: "minuman",
        deskripsi: "Teh segar yang disajikan dingin.",
        gambar: "https://placehold.co/600x400/e7f5ec/176b45?text=Es+Teh",
        tersedia: true
    },
    {
        id: 5,
        nama: "Kopi Susu",
        harga: 12000,
        kategori: "minuman",
        deskripsi: "Perpaduan kopi dan susu yang nikmat.",
        gambar: "https://placehold.co/600x400/e7f5ec/176b45?text=Kopi+Susu",
        tersedia: true
    },
    {
        id: 6,
        nama: "Jus Alpukat",
        harga: 13000,
        kategori: "minuman",
        deskripsi: "Minuman alpukat yang lembut dan menyegarkan.",
        gambar: "https://placehold.co/600x400/e7f5ec/176b45?text=Jus+Alpukat",
        tersedia: true
    },
    {
        id: 7,
        nama: "Kentang Goreng",
        harga: 10000,
        kategori: "camilan",
        deskripsi: "Kentang goreng renyah untuk teman bersantai.",
        gambar: "https://placehold.co/600x400/e7f5ec/176b45?text=Kentang+Goreng",
        tersedia: true
    },
    {
        id: 8,
        nama: "Roti Bakar",
        harga: 12000,
        kategori: "camilan",
        deskripsi: "Roti bakar dengan pilihan topping.",
        gambar: "https://placehold.co/600x400/e7f5ec/176b45?text=Roti+Bakar",
        tersedia: false
    }
];


/* =========================================
   2. MENGAMBIL ELEMEN HTML
   ========================================= */

// Mengambil elemen HTML berdasarkan ID-nya.

const menuList = document.getElementById("menu-list");
const searchInput = document.getElementById("search-input");
const tombolKategori = document.querySelectorAll(".category-button");
const emptyMessage = document.getElementById("empty-message");
const currentYear = document.getElementById("current-year");

// Menyimpan kategori yang sedang dipilih.
// Nilai awal "semua" berarti semua kategori ditampilkan.
let kategoriAktif = "semua";


/* =========================================
   3. FORMAT HARGA RUPIAH
   ========================================= */

// Mengubah angka, misalnya 18000, menjadi Rp18.000.

function formatRupiah(harga) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(harga);
}


/* =========================================
   4. MEMBUAT KARTU MENU
   ========================================= */

// Fungsi ini menerima satu data produk,
// lalu membuat elemen HTML untuk kartu menu tersebut.

function buatKartuMenu(menu) {
    const kartu = document.createElement("article");
    kartu.className = "menu-card";

    // Membuat gambar produk.
    const gambar = document.createElement("img");
    gambar.src = menu.gambar;
    gambar.alt = `Foto ${menu.nama}`;
    gambar.loading = "lazy";

    // Jika gambar gagal dimuat, gunakan gambar pengganti.
    gambar.addEventListener("error", function () {
        gambar.removeAttribute("src");
        gambar.alt = `Gambar ${menu.nama} tidak tersedia`;
    }, { once: true });

    // Bagian yang berisi teks dan tombol.
    const konten = document.createElement("div");
    konten.className = "menu-card-content";

    // Label kategori.
    const kategori = document.createElement("span");
    kategori.className = "menu-category";
    kategori.textContent = menu.kategori;

    // Nama produk.
    const nama = document.createElement("h3");
    nama.textContent = menu.nama;

    // Deskripsi produk.
    const deskripsi = document.createElement("p");
    deskripsi.textContent = menu.deskripsi;

    // Harga produk.
    const harga = document.createElement("div");
    harga.className = "menu-price";
    harga.textContent = formatRupiah(menu.harga);

    // Informasi ketersediaan.
    const status = document.createElement("p");
    status.textContent = menu.tersedia
        ? "Tersedia"
        : "Sedang habis";
    status.className = "menu-status";

    // Tombol untuk melihat detail produk.
    const tombolDetail = document.createElement("button");
    tombolDetail.type = "button";
    tombolDetail.className = "menu-detail-button";
    tombolDetail.textContent = "Lihat Detail";

    // Ketika tombol diklik, tampilkan detail produk.
    tombolDetail.addEventListener("click", function () {
        tampilkanDetail(menu);
    });

    // Jika produk sedang habis, tampilkan statusnya
    // dan nonaktifkan tombol detail untuk pemesanan lanjutan.
    // Tombol ini hanya untuk melihat detail, bukan memesan.
    if (!menu.tersedia) {
        status.classList.add("unavailable");
    }

    // Menyusun elemen ke dalam kartu.
    konten.append(
        kategori,
        nama,
        deskripsi,
        harga,
        status,
        tombolDetail
    );

    kartu.append(gambar, konten);

    return kartu;
}


/* =========================================
   5. MENAMPILKAN DAFTAR MENU
   ========================================= */

// Menampilkan semua produk yang lolos filter.

function tampilkanMenu(dataMenu) {
    // Menghapus kartu lama sebelum menampilkan hasil baru.
    menuList.replaceChildren();

    // Menyembunyikan pesan jika belum ada hasil.
    emptyMessage.hidden = dataMenu.length !== 0;

    // Membuat kartu untuk setiap produk yang cocok.
    dataMenu.forEach(function (menu) {
        const kartu = buatKartuMenu(menu);
        menuList.appendChild(kartu);
    });
}


/* =========================================
   6. PENCARIAN DAN FILTER KATEGORI
   ========================================= */

// Menggabungkan pencarian dengan kategori yang dipilih.

function filterMenu() {
    // Mengambil kata kunci dan mengubahnya menjadi
    // huruf kecil agar pencarian tidak membedakan
    // huruf besar dan huruf kecil.
    const kataKunci = searchInput.value
        .trim()
        .toLowerCase();

    // Memilih produk yang sesuai dengan pencarian
    // dan kategori aktif.
    const hasilFilter = daftarMenu.filter(function (menu) {
        const cocokNama = menu.nama
            .toLowerCase()
            .includes(kataKunci);

        const cocokDeskripsi = menu.deskripsi
            .toLowerCase()
            .includes(kataKunci);

        const cocokKategori =
            kategoriAktif === "semua" ||
            menu.kategori === kategoriAktif;

        // Produk muncul jika nama atau deskripsi cocok
        // dan kategorinya sesuai dengan pilihan.
        return (
            (cocokNama || cocokDeskripsi) &&
            cocokKategori
        );
    });

    // Tampilkan hasil pencarian.
    tampilkanMenu(hasilFilter);
}


/* =========================================
   7. TOMBOL KATEGORI
   ========================================= */

// Menambahkan fungsi klik pada setiap tombol kategori.

tombolKategori.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
        // Menyimpan kategori dari atribut data-category.
        kategoriAktif = tombol.dataset.category;

        // Menghapus status aktif dari semua tombol.
        tombolKategori.forEach(function (item) {
            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");
        });

        // Memberikan status aktif pada tombol terpilih.
        tombol.classList.add("active");
        tombol.setAttribute("aria-pressed", "true");

        // Memperbarui hasil menu.
        filterMenu();
    });
});


/* =========================================
   8. KOLOM PENCARIAN
   ========================================= */

// Setiap kali pengguna mengetik, menu akan difilter.

searchInput.addEventListener("input", filterMenu);


/* =========================================
   9. DETAIL PRODUK
   ========================================= */

// Menampilkan detail produk yang dipilih.
// Versi sederhana ini menggunakan kotak dialog browser.

function tampilkanDetail(menu) {
    const informasi =
        `Nama: ${menu.nama}\n` +
        `Kategori: ${menu.kategori}\n` +
        `Harga: ${formatRupiah(menu.harga)}\n` +
        `Deskripsi: ${menu.deskripsi}\n` +
        `Status: ${menu.tersedia ? "Tersedia" : "Sedang habis"}`;

    window.alert(informasi);
}


/* =========================================
   10. TAHUN PADA FOOTER
   ========================================= */

// Memperbarui tahun secara otomatis sesuai tahun perangkat.

currentYear.textContent = new Date().getFullYear();


/* =========================================
   11. MENJALANKAN WEBSITE
   ========================================= */

// Menampilkan daftar menu saat halaman pertama kali dibuka.

filterMenu();


/* =========================================
   AKHIR SCRIPT.JS
   ========================================= */
