import bgHome from './bg-home.svg'
import destImg1 from './dest1.svg'
import destImg2 from './dest2.svg'
import destImg3 from './dest3.svg'
import destImg4 from './dest4.svg'
import logo from './logo.svg'
import facebook from './facebook.svg'
import instagram from './instagram.svg'
import twitter from './twitter.svg'
import youtube from './youtube.svg'
import telegram from './telegram.svg'
import redCar from './redCar.jpeg'
import yellCar from './yellCar.jpeg'
import damri from './damri.jpeg'
import homeStay1 from './homeStay1.jpeg'
import homeStay2 from './homeStay2.jpeg'
import homeStay3 from './homeStay3.jpeg'
import gandrung from './gandrung.jpeg'
import mountOrange from './gunungOrange.jpeg'
import chatBot from './chatbot.png'
import markDestination from './Location.png'
import markOrigin from './MarkerIcon.png'
import tourLoading from './TourLoading.gif'
import userProfile from './userProfile.png'

export const assets = {
    bgHome, mountOrange, gandrung, redCar,
    chatBot, markDestination, markOrigin, tourLoading,
    userProfile
}

export const textNavbar = [
    {
        text: 'Beranda',
        link: 'beranda',
    },
    {
        text: 'Destinasi',
        link: 'destinasi',
    },
    {
        text: 'Tentang Kami',
        link: 'tentang-kami',
    },
]

export const textHeader = {
    headerHome: {
        title: 'Langkah Sritanjung.',
        description:
            'Nikmati pesona alam dan kekayaan kuliner kota Banyuwangi dengan mudah dan praktis bersama Langkah Sritanjung.'
    },
    headerDestinasi: {
        title: 'Kawah Ijen',
        description:
            'Nikmati pesona alam dan kekayaan kuliner kota Banyuwangi dengan mudah dan praktis bersama Langkah Sritanjung.'
    }
}

export const textListTime = [
    {
        title: 'Pukul 00:00 - 03:00 atau 04:00 - 06:00',
        desc: 'Waktu yang tepat untuk melihat blue fire atau menikmati sunrise di puncak ijen.'
    }, {
        title: 'Saat Cuaca cerah dan kering',
        desc: 'Cuaca cerah memungkinkan melihat Blue Fire dan kawah turquoise, serta pendakian lebih aman.'
    }, {
        title: 'Musim kemarau (April hingga Oktober)',
        desc: 'Periode paling ideal karena cuaca cenderung cerah dan curah hujan rendah.'
    }, {
        title: 'Hindari musim hujan (November - Maret)',
        desc: 'Curah hujan membuat jalur licin dan  pemandangan kawah tertutup kabut tebal.'
    }
]

export const inputAssets = {
    search: {
        placeholder: 'Cari tempat wisata....'
    }
}

export const textButton = {
    search: {
        kawahIjen: {
            path: 'kawah-ijen',
            text: 'Kawah Ijen'
        },
        pulauMerah: {
            path: 'pulau-merah',
            text: 'Pulau Merah'
        },
        tamanBaluran: {
            path: 'taman-nasional-baluran',
            text: 'Taman Nasional Baluran'
        },
        span: 'Jelajahi'
    }
}

export const textCardCategory = [
    {
        title: 'Pemandu Wisata',
        desc: 'Kami menyediakan layanan pemandu wisata berbasis AI yang siap melayani anda 24 jam.'
    },
    {
        title: 'Budaya',
        desc: 'Kami menyediakan berbagai rekomendasi budaya Banyuwangi yang menarik untuk dieksplorasi.'
    },
    {
        title: 'Wisata',
        desc: 'Kami menyediakan wisata Banyuwangi yang bisa kamu jelajahi dengan bantuan AI!'
    },
    {
        title: 'Kuliner',
        desc: 'Kami menyediakan berbagai rekomendasi kuliner Banyuwangi yang menarik untuk dieksplorasi.'
    },
]

export const destinationsCard = [
    {
        img: destImg1,
        title: 'Djawatan Banyuwangi',
    },
    {
        img: destImg2,
        title: 'Taman Nasional Baluran',
    },
    {
        img: destImg3,
        title: 'Taman Gandrung Terakota',
    },
    {
        img: destImg4,
        title: 'Kawah Ijen',
    }
]

export const destinationsCategory = {
    desTitle: 'Jelajahi Berbagai Destinasi Impianmu Disini!',
    description: 'Rasakan pesona Banyuwangi dengan keindahan alam dan budaya yang unik. Temukan pengalaman tak terlupakan di setiap sudutnya!',
    category: [
        { title: 'Pegunungan', },
        { title: 'Pantai', },
        { title: 'Air Terjun', },
        { title: 'Taman', },
        { title: 'Desa Wisata', },
    ]
}

export const footerAssets = {
    logo: logo,
    menu: {
        title: 'Menu',
        value: [
            { text: 'Beranda', link: '/' },
            { text: 'Destinasi', link: '/destinasi' },
            { text: 'Tentang Kami', link: '/tentang-kami' }
        ]
    },
    more: {
        title: 'Pelajari Selengkapnya',
        value: [
            { text: 'Pernyataaan Resmi', link: '/' },
            { text: 'Kebijakan Privasi', link: '/' }
        ]
    },
    contact: {
        title: 'Hubungi Kami',
        value: [
            {
                icon: facebook,
                link: 'https://www.facebook.com'
            },
            {
                icon: instagram,
                link: 'https://www.instagram.com'
            },
            {
                icon: twitter,
                link: 'https://www.twitter.com'
            },
            {
                icon: youtube,
                link: 'https://www.youtube.com'
            },
            {
                icon: telegram,
                link: 'https://www.telegram.com'
            }
        ]
    },
    textFooter: '2024Regedua | All rights reserved'
}

export const cardStackAssets = {
    cardTransport: {
        cardTitle: 'Rekomendasi Transportasi',
        value: [
            {
                img: redCar,
                title: 'Jeep AOKA 2456 Banyuwangi',
                price: 'Rp 250.000.'
            },
            {
                img: damri,
                title: 'Travel Damri Banyuwangi',
                price: 'Rp 150.000.'
            },
            {
                img: yellCar,
                title: 'Jeep KoiY8 Touring',
                price: 'Rp 210.000.'
            },
        ]
    },
    cardHomestay: {
        cardTitle: 'Rekomendasi Homestay',
        value: [
            {
                img: homeStay1,
                title: 'Homestay Banyuwangi',
                price: 'Rp 150.000.'
            },
            {
                img: homeStay2,
                title: 'Homestay Banyuwangi',
                price: 'Rp 150.000.'
            },
            {
                img: homeStay3,
                title: 'Homestay Banyuwangi',
                price: 'Rp 150.000.'
            }
        ]
    },
    cardCulinary: {
        cardTitle: 'Rekomendasi Kuliner',
        value: [
            {
                img: homeStay1,
                title: 'Homestay Banyuwangi',
                price: 'Rp 150.000.'
            },
            {
                img: homeStay2,
                title: 'Homestay Banyuwangi',
                price: 'Rp 150.000.'
            },
            {
                img: homeStay3,
                title: 'Homestay Banyuwangi',
                price: 'Rp 150.000.'
            }
        ]
    }
}

export const DetailDummy = {
    titleDetail: 'Cahaya Motor Rental.',
    deskripsi: {
        title: 'Deskripsi :',
        desc: 'We always offer curtains made from premium and high-quality materials. We always offer curtains made from premium and high-quality materials.'
    },
}