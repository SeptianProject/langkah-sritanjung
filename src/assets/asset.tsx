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

export const assets = {
    bgHome, mountOrange, gandrung
}

export const textNavbar = [
    {
        text: 'Beranda',
        link: '/'
    },
    {
        text: 'Destinasi',
        link: '/destinasi',
    },
    {
        text: 'Tentang Kami',
        link: '/tentang-kami',
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
        search1: 'Kawah Ijen',
        search2: 'Pulau Merah',
        search3: 'Taman Nasional Baluran',
        span: 'Jelajahi'
    }
}

export const textCardCategory = [
    {
        title: 'Tour Guide',
        desc: 'We always offer curtains made from premium and high-quality materials.'
    },
    {
        title: 'Budaya',
        desc: 'We always offer curtains made from premium and high-quality materials.'
    },
    {
        title: 'Wisata',
        desc: 'We always offer curtains made from premium and high-quality materials.'
    },
    {
        title: 'Kuliner',
        desc: 'We always offer curtains made from premium and high-quality materials.'
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
    description: 'We always offer curtains made from premium and high-quality materials.We always offer curtains made from premium and high-quality materials.',
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
    }
}