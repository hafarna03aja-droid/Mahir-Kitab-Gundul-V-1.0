export interface Book {
    title: string;
    description: string;
    content?: string; // Menambahkan field konten opsional
}

export interface Scholar {
    id: number;
    name: string;
    era: string;
    birthPlace?: string; // Tempat lahir (opsional)
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
        name: "Imam Nawawi",
        era: "631 H - 676 H / 1233 M - 1277 M",
        birthPlace: "Nawa, Damaskus, Suriah",
        expertise: "Fiqih Syafi'i, Hadits, Tasawuf, Ushul Fiqh",
        imageUrl: "/images/al-nawawi.jpg",
        bio: `Imam Muhyiddin Abu Zakaria Yahya bin Syaraf An-Nawawi adalah salah satu ulama besar madzhab Syafi'i yang sangat berpengaruh dalam sejarah Islam. Beliau lahir di desa Nawa, dekat Damaskus pada tahun 631 H (1233 M) dan wafat di usia muda 45 tahun pada 676 H (1277 M).

**Masa Kecil dan Pendidikan:**
Sejak kecil, Imam Nawawi dikenal memiliki kecerdasan luar biasa dan kecintaan mendalam terhadap ilmu. Pada usia 10 tahun, beliau sudah hafal Al-Qur'an. Di usia 18 tahun, beliau pindah ke Damaskus untuk menuntut ilmu dan menetap di Madrasah Ar-Rawahiyyah. Di sana beliau belajar dengan sangat tekun, konon beliau hanya tidur beberapa jam setiap hari dan menghabiskan seluruh waktunya untuk belajar dan menulis.

**Guru-Guru Beliau:**
Imam Nawawi berguru kepada lebih dari 20 ulama besar, di antaranya:
- Syaikh Abu Ibrahim Ishaq bin Ahmad Al-Maghribi (Fiqih)
- Syaikh Abdul Rahman bin Ibrahim bin Sabba' Al-Fazari (Fiqih)
- Abu Muhammad Abdurrahman bin Abi Umar (Hadits)
- Syaikh Abu Ishaq Ibrahim bin Isa Al-Muradi (Ushul Fiqh)
- Radiyuddin Abu Ishaq Ibrahim bin Abu Hafsh Umar (Hadits)

**Sifat dan Akhlak:**
Beliau terkenal dengan kezuhudan, wara', keberanian menyampaikan kebenaran, dan keteguhan dalam menegakkan amar ma'ruf nahi munkar. Imam Nawawi berani mengkritik penguasa yang zalim meskipun harus menghadapi ancaman. Beliau hidup sangat sederhana, tidak menikah, dan mengabdikan seluruh hidupnya untuk ilmu dan ibadah.

**Kontribusi dalam Keilmuan Islam:**
1. **Hadits**: Mensyarah Shahih Muslim yang menjadi rujukan utama hingga kini
2. **Fiqih**: Menyusun kitab-kitab fiqih yang menjadi pegangan madzhab Syafi'i
3. **Akhlak dan Tasawuf**: Menulis kitab Riyadhus Shalihin yang dibaca di seluruh dunia Islam
4. **Ushul Fiqh**: Memberikan kontribusi penting dalam metodologi hukum Islam

**Keistimewaan:**
- Menulis lebih dari 40 kitab meskipun usia pendek
- Kitab-kitabnya menjadi rujukan utama di berbagai pesantren dan universitas Islam
- Dikenal sebagai Muhyiddin (penghidup agama) karena kontribusinya yang luar biasa
- Hafal ratusan ribu hadits beserta sanad dan ilalnya
- Menjadi imam dan mufti madzhab Syafi'i di masanya

**Warisan Intelektual:**
Karya-karya Imam Nawawi tetap hidup hingga hari ini dan dipelajari oleh jutaan Muslim di seluruh dunia. Beliau berhasil menyederhanakan ilmu-ilmu agama yang kompleks menjadi mudah dipahami tanpa mengurangi kedalaman ilmiahnya. Metode pensyarahan hadits beliau menjadi standar dalam dunia keilmuan Islam.

Imam Nawawi wafat di kampung halamannya, Nawa, pada tahun 676 H dalam usia 45 tahun. Meskipun hidupnya singkat, warisan ilmiahnya tetap abadi dan terus memberikan manfaat bagi umat Islam hingga akhir zaman.`,
        books: [
            {
                title: "Riyadhus Shalihin", 
                description: "Kumpulan hadits pilihan tentang akhlak, adab, dan amalan sehari-hari. Kitab ini terdiri dari 372 bab yang disusun secara tematik, mencakup berbagai aspek kehidupan Muslim mulai dari keikhlasan, taubat, sabar, jujur, hingga adab makan dan tidur. Setiap bab diawali dengan ayat Al-Qur'an yang relevan kemudian diikuti hadits-hadits shahih. Kitab ini menjadi salah satu kitab hadits paling populer dan paling banyak dipelajari di seluruh dunia Islam karena kemudahan bahasa dan praktikalitas isinya.",
                content: "انما الاعمال بالنيات وانما لكل امرئ ما نوى فمن كانت هجرته الى دنيا يصيبها او الى امراة ينكحها فهجرته الى ما هاجر اليه"
            },
            { title: "Al-Adzkar", description: "Himpunan doa dan zikir untuk berbagai waktu dan kondisi. Kitab komprehensif yang memuat doa-doa dari Al-Qur'an dan Sunnah untuk setiap situasi kehidupan Muslim: bangun tidur, masuk masjid, bepergian, makan, berpakaian, dan lainnya. Imam Nawawi menyusunnya dengan sangat sistematis dan mencantumkan derajat setiap hadits. Kitab ini menjadi rujukan utama untuk amaliyah harian seorang Muslim." },
            { title: "Al-Arba'in An-Nawawiyyah", description: "42 hadits pilihan yang mencakup inti ajaran Islam. Setiap hadits dalam kitab ini adalah hadits shahih yang menjadi pokok (ummul hadits) bagi berbagai bab dalam agama. Imam Nawawi memilihnya dengan sangat selektif sehingga 42 hadits ini mencakup akidah, syariah, dan akhlak secara menyeluruh. Kitab ini sangat populer karena ringkas namun padat makna, dan menjadi kurikulum wajib di banyak lembaga pendidikan Islam." },
            { title: "Al-Minhaj Syarh Shahih Muslim", description: "Syarah lengkap Shahih Muslim yang sangat mendalam dan komprehensif. Karya monumental ini menjelaskan setiap hadits dalam Shahih Muslim dengan sangat detail, mencakup penjelasan kata sulit, fiqih hadits, manfaat dan hikmah, serta bantahan terhadap pemahaman yang keliru. Syarah ini menjadi rujukan utama para ulama dan peneliti hadits hingga kini. Kedalaman ilmu dan kemudahan penyampaian Imam Nawawi membuat syarah ini menjadi standar dalam ilmu hadits." },
            { title: "Minhajut Thalibin", description: "Ringkasan fiqih madzhab Syafi'i yang sistematis dan lengkap. Kitab ini merangkum Muharrar karya Imam Ar-Rafi'i dengan bahasa yang lebih ringkas dan mudah dipahami. Mencakup seluruh bab fiqih dari thaharah hingga miras (warisan), disusun secara sistematis dan menjadi salah satu matan terpenting dalam madzhab Syafi'i. Banyak ulama kemudian mensyarah kitab ini, menunjukkan betapa pentingnya dalam khazanah fiqih Syafi'i." },
            { title: "Raudhatut Thalibin", description: "Ensiklopedi fiqih Syafi'i yang sangat lengkap dan detail. Kitab ini merupakan ringkasan dari kitab besar Syarhul Kabir karya Imam Ar-Rafi'i. Meskipun disebut 'ringkasan', kitab ini tetap sangat voluminous dan mencakup pembahasan mendalam tentang seluruh aspek fiqih dengan menyebutkan berbagai pendapat dalam madzhab Syafi'i beserta dalil-dalilnya. Menjadi rujukan utama para mufti dan hakim Syafi'i." },
            { title: "At-Tibyan fi Adabi Hamalatil Quran", description: "Panduan lengkap adab bagi penghafal dan pengajar Al-Qur'an. Kitab ini membahas secara detail tentang keutamaan Al-Qur'an, adab membaca dan mengajarkannya, etika penghafal Qur'an, dan berbagai hal yang berkaitan dengan Al-Qur'an. Imam Nawawi menyusunnya dengan sangat sistematis dan menjadi pedoman utama para huffazh dan guru Qur'an hingga sekarang." },
            { title: "Al-Majmu' Syarh Al-Muhadzdzab", description: "Syarah monumental terhadap kitab Al-Muhadzdzab dalam fiqih Syafi'i. Meskipun Imam Nawawi tidak sempat menyelesaikannya (berhenti di kitab riba), karya ini menunjukkan keluasan ilmu dan kedalaman analisa beliau. Syarah ini sangat detail, mencakup dalil-dalil, pendapat ulama, dan analisa mendalam. Para ulama setelahnya melanjutkan penulisan kitab ini karena pentingnya sebagai rujukan." },
            { title: "At-Taqrib wat Taysir", description: "Pengantar ilmu Musthalah Hadits (ilmu tentang metodologi hadits). Kitab ringkas namun komprehensif yang menjelaskan berbagai istilah dan klasifikasi hadits dari shahih, hasan, dhaif, hingga maudhu'. Imam Nawawi menyusunnya untuk memudahkan pemula memahami ilmu hadits. Banyak ulama mensyarah kitab ini karena pentingnya sebagai dasar memahami hadits." },
            { title: "Tahdzibul Asma' wal Lughat", description: "Ensiklopedi biografi perawi hadits dan ulama, serta penjelasan istilah-istilah bahasa Arab yang penting. Kitab ini sangat bermanfaat untuk mengenal para perawi hadits dan memahami istilah-istilah dalam kitab-kitab klasik. Menunjukkan keluasan ilmu Imam Nawawi tidak hanya dalam fiqih dan hadits, tetapi juga dalam ilmu rijal dan bahasa." }
        ]
    }
];