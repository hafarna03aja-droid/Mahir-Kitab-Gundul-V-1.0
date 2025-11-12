export interface Book {
    title: string;
    description: string;
    content?: string; // Menambahkan field konten opsional
}

export interface Scholar {
    id: number;
    name: string;
    era: string;
    expertise: string;
    bio: string;
    imageUrl: string; // Placeholder, UI has fallback
    books: Book[];
}

export const scholarsData: Scholar[] = [
    // --- Kutubus Sittah ---
    {
        id: 1,
        name: "Imam Al-Bukhari",
        era: "810–870 M",
        expertise: "Hadis (Kutubus Sittah)",
        bio: "Nama lengkapnya adalah Abu Abdullah Muhammad bin Ismail bin Ibrahim al-Bukhari. Lahir pada 194 H di Bukhara, Uzbekistan, beliau telah menunjukkan kecerdasan dan kekuatan hafalan yang luar biasa sejak kecil. Beliau melakukan perjalanan (rihlah) ilmiah yang sangat luas ke berbagai pusat ilmu seperti Baghdad, Makkah, Madinah, Mesir, dan Syam untuk mengumpulkan hadis. Dikenal memiliki metodologi yang sangat ketat, Imam Bukhari menghabiskan 16 tahun untuk menyusun karyanya yang paling monumental, Sahih al-Bukhari. Beliau menyaring lebih dari 600.000 hadis yang dihafalnya menjadi sekitar 7.275 hadis (termasuk pengulangan) yang dianggapnya paling otentik. Sebelum menuliskan satu hadis pun, beliau akan melakukan salat istikharah dua rakaat. Karyanya ini dianggap oleh mayoritas Muslim Sunni sebagai kitab paling otentik kedua setelah Al-Qur'an. Beliau wafat pada tahun 256 H.",
        imageUrl: "/images/al-bukhari.jpg",
        books: [
            { 
                title: "Sahih al-Bukhari", 
                description: "Salah satu dari Kutubus Sittah, dianggap sebagai kitab paling shahih setelah Al-Qur'an.",
                content: "انما الاعمال بالنيات وانما لكل امرئ ما نوى فمن كانت هجرته الى دنيا يصيبها او الى امراة ينكحها فهجرته الى ما هاجر اليه"
            },
            { title: "Al-Adab al-Mufrad", description: "Kumpulan hadis-hadis yang berfokus pada akhlak dan etika Islam." },
        ]
    },
    {
        id: 2,
        name: "Imam Muslim",
        era: "821–875 M",
        expertise: "Hadis (Kutubus Sittah)",
        bio: "Abul Husain Muslim bin al-Hajjaj, dikenal sebagai Imam Muslim, adalah ulama hadis Persia dan penyusun Sahih Muslim. Karyanya dianggap sebagai koleksi hadis paling otentik kedua setelah Sahih al-Bukhari.",
        imageUrl: "/images/muslim.jpg",
        books: [
            { title: "Sahih Muslim", description: "Koleksi hadis otentik kedua setelah Sahih al-Bukhari, dikenal karena sistematika penyusunannya yang sangat baik." },
        ]
    },
    {
        id: 3,
        name: "Imam Abu Daud",
        era: "817–889 M",
        expertise: "Hadis (Kutubus Sittah)",
        bio: "Abu Dawud Sulaiman bin al-Asy'ats as-Sijistani adalah seorang ulama hadis terkemuka, terutama dikenal karena menyusun kitab Sunan Abi Daud, salah satu dari enam kitab hadis utama dalam Islam Sunni.",
        imageUrl: "/images/abu-daud.jpg",
        books: [
            { title: "Sunan Abi Daud", description: "Kumpulan hadis yang berfokus pada hadis-hadis hukum (fiqh), menjadi rujukan penting bagi para fuqaha (ahli fiqh)." },
        ]
    },
    {
        id: 4,
        name: "Imam At-Tirmidzi",
        era: "824–892 M",
        expertise: "Hadis (Kutubus Sittah)",
        bio: "Abu 'Isa Muhammad bin 'Isa at-Tirmidzi adalah seorang ulama hadis dari Tirmidz. Ia merupakan murid dari Imam Bukhari dan penyusun Jami' at-Tirmidzi, yang dikenal karena metodologi uniknya dalam menilai hadis.",
        imageUrl: "/images/tirmidzi.jpg",
        books: [
            { title: "Jami' at-Tirmidzi (Sunan at-Tirmidzi)", description: "Kitab hadis yang komprehensif, terkenal karena menyertakan penilaian status hadis (hasan, dha'if, dll.) dan pendapat para sahabat serta tabi'in." },
        ]
    },
    {
        id: 5,
        name: "Imam An-Nasa'i",
        era: "829–915 M",
        expertise: "Hadis (Kutubus Sittah)",
        bio: "Ahmad bin Syu'aib an-Nasa'i adalah seorang muhaddits terkemuka dari Khorasan. Kitabnya, Sunan an-Nasa'i (atau Al-Sunan al-Sughra), dianggap memiliki syarat paling ketat dalam seleksi hadis setelah Sahihain.",
        imageUrl: "/images/nasai.jpg",
        books: [
            { title: "Sunan an-Nasa'i (Al-Mujtaba)", description: "Dianggap sebagai salah satu kitab Sunan yang paling otentik, dengan kriteria seleksi perawi yang sangat ketat." },
        ]
    },
    {
        id: 6,
        name: "Imam Ibn Majah",
        era: "824–887 M",
        expertise: "Hadis (Kutubus Sittah)",
        bio: "Abu 'Abdullah Muhammad bin Yazid Ibnu Majah al-Qazwini adalah seorang ulama hadis dari Persia. Sunan Ibn Majah karyanya melengkapi daftar Kutubus Sittah, meskipun beberapa ulama memperdebatkan posisinya.",
        imageUrl: "/images/ibn-majah.jpg",
        books: [
            { title: "Sunan Ibn Majah", description: "Kitab keenam dari Kutubus Sittah, yang dikenal memiliki bab-bab fiqh yang sistematis namun juga memuat hadis-hadis yang tidak ditemukan di lima kitab lainnya." },
        ]
    },
    // --- 3 Imam Besar Lainnya ---
    {
        id: 7,
        name: "Imam Asy-Syafi'i",
        era: "767–820 M",
        expertise: "Fiqh, Ushul Fiqh",
        bio: "Abu Abdullah Muhammad bin Idris asy-Syafi'i adalah pendiri Mazhab Syafi'i dan perintis ilmu Ushul Fiqh. Karyanya meletakkan metodologi sistematis untuk yurisprudensi Islam.",
        imageUrl: "/images/al-shafii.jpg",
        books: [
            { title: "Ar-Risalah", description: "Karya perintis dalam Ushul Fiqh, menguraikan metodologi untuk menyimpulkan hukum dari Al-Qur'an dan Sunnah." },
            { title: "Al-Umm", description: "Kompilasi komprehensif dari fatwa dan pendapat hukumnya, rujukan utama dalam Mazhab Syafi'i." },
        ],
    },
    {
        id: 8,
        name: "Imam Al-Ghazali",
        era: "1058–1111 M",
        expertise: "Teologi, Tasawuf, Filsafat",
        bio: "Abu Hamid al-Ghazali, dijuluki 'Hujjatul Islam', adalah seorang teolog, filsuf, dan sufi yang sangat berpengaruh. Karyanya mendamaikan antara syariat dan tasawuf, meninggalkan warisan intelektual yang abadi.",
        imageUrl: "/images/al-ghazali.jpg",
        books: [
            { title: "Ihya' Ulumiddin", description: "Karya monumental tentang prinsip dan praktik Islam, mencakup ibadah, adat, dan spiritualitas." },
            { title: "Bidayatul Hidayah", description: "Panduan praktis untuk pemula dalam menempuh jalan spiritualitas dan ketaatan." },
        ],
    },
    {
        id: 9,
        name: "Imam An-Nawawi",
        era: "1233–1277 M",
        expertise: "Hadis, Fiqh Syafi'i",
        bio: "Abu Zakariya Yahya bin Syaraf an-Nawawi adalah ulama hadis dan fiqh terkemuka dari Suriah. Karya-karyanya sangat dihormati dan dipelajari secara luas, terutama dalam Mazhab Syafi'i.",
        imageUrl: "/images/al-nawawi.jpg",
        books: [
            { title: "Riyadhus Shalihin", description: "Kumpulan hadis tentang etika, akhlak, dan ibadah, menjadi salah satu buku Islam paling populer." },
            { title: "Al-Arba'in An-Nawawiyyah", description: "Kumpulan 42 hadis fundamental yang mencakup esensi ajaran Islam." },
        ]
    }
];