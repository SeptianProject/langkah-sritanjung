/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'
import { BiMenu, BiX } from 'react-icons/bi'
import ButtonRounded from '../elements/button/ButtonRounded'
import NavItem from '../elements/NavItem'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const closeRef = useRef<HTMLDivElement>(null)
    const location = useLocation()

    const handleMobileDisplay = () => {
        if (window.innerWidth <= 640) {
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

    const handleClickOutside = (e: any) => {
        if (closeRef.current && !closeRef.current.contains(e.target)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        setIsOpen(false)
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [location.pathname])

    return (
        <nav ref={closeRef} className={`max-w-full w-full h-10 flex items-center gap-x-6 p-10 absolute z-50
        md:py-12 md:px-20 ${isMobile ? 'justify-between' : 'justify-start'}`}>
            {isMobile
                ?
                <div className=''>
                    {isOpen
                        ? <>
                            <BiX
                                onClick={handleIsOpen}
                                className='size-10 text-white' />
                            <div className='relative w-32 '>
                                <div className='absolute top-2 flex flex-col text-center w-full overflow-hidden bg-white shadow-lg shadow-secondary rounded-bl-xl rounded-tr-xl'>
                                    <NavItem className='text-xs font-medium hover:text-white hover:bg-secondary h-full py-3'
                                        select='bg-secondary text-white' unSelect='text-black' />
                                </div>
                            </div>
                        </>
                        : <BiMenu
                            onClick={handleIsOpen}
                            className='size-10 text-white' />
                    }
                </div>
                :
                <div className='flex gap-x-6'>
                    <NavItem />
                </div>
            }
            <ButtonRounded text='Masuk'
                className='font-poppins tracking-wide transition-all duration-300
                bg-secondary bg-opacity-90 hover:bg-opacity-100' />
        </nav>
    )
}

export default Navbar