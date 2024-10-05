import { useEffect, useState } from 'react'
import { BiMenu, BiX } from 'react-icons/bi'
import { textNavbar } from '../../assets/asset'
import { Link } from 'react-router-dom'
import ButtonRounded from '../elements/button/ButtonRounded'

const Navbar = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(true)

    const handleMobileDisplay = () => {
        if (window.innerWidth <= 600) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        handleMobileDisplay()
        window.addEventListener('resize', handleMobileDisplay)
        return () => window.removeEventListener('resize', handleMobileDisplay)
    })

    const handleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className={`max-w-full h-10 flex items-center gap-x-6 p-10 md:px-14 md:py-12 lg:px-20 ${isMobile ? 'justify-between' : 'justify-start'}`}>
            {isMobile
                ?
                <div className=''>
                    {isOpen
                        ? <BiMenu
                            onClick={handleIsOpen}
                            className='size-10 text-white' />
                        : <BiX
                            onClick={handleIsOpen}
                            className='size-10 text-white' />
                    }
                </div>
                :
                <div className='flex gap-x-6'>
                    {textNavbar.map((item, index) => (
                        <Link
                            key={index}
                            to={item.link}
                            className={`text-white font-poppins font-light text-sm tracking-wide`}>
                            {item.text}
                        </Link>
                    ))}
                </div>
            }
            <ButtonRounded text='Masuk' className='font-poppins tracking-wide' />
        </nav>
    )
}

export default Navbar