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

export const assets = {
    bgHome
}

export const textNavbar = [
    {
        text: 'Beranda',
        link: '/',
        select: false
    },
    {
        text: 'Destinasi',
        link: '/destinasi',
        select: false
    },
    {
        text: 'Tentang Kami',
        link: '/tentang-kami',
        select: false
    },
]

export const textGroup = {
    headerHome: {
        title: 'Langkah Sritanjung.',
        description:
            'Nikmati pesona alam dan kekayaan kuliner kota Banyuwangi dengan mudah dan praktis bersama Langkah Sritanjung.'
    }
}

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
