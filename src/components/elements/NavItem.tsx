import { useEffect, useState } from 'react'
import { textNavbar } from '../../assets/asset'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'

type NavItemProps = {
     className?: string
     select?: string
     unSelect?: string
}

const NavItem = ({ className, select, unSelect }: NavItemProps) => {
     const location = useLocation()
     const navigate = useNavigate()
     const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 640)

     useEffect(() => {
          const handleResize = () => setIsDesktop(window.innerWidth >= 640)
          window.addEventListener('resize', handleResize)
          return () => {
               window.removeEventListener('resize', handleResize)
          }
     }, [])

     const handleNavClick = (link: string) => {
          if (location.pathname !== '/') {
               navigate('/')
               setTimeout(() => {
                    const element = document.getElementById(link)
                    if (element) {
                         element.scrollIntoView({ behavior: 'smooth' })
                    }
               }, 500)
          }
     }

     return (
          <>
               {textNavbar.map((item, index) => (
                    location.pathname === '/' ? (
                         <ScrollLink
                              key={index}
                              to={item.link}
                              smooth={true}
                              duration={
                                   item.link === 'beranda' ? 500 :
                                        item.link === 'destinasi' ? 1000 :
                                             item.link === 'tentang-kami' ? 1500 : 500
                              }
                              offset={
                                   item.link === 'beranda' ? -100 : -50}
                              className={`font-poppins font-light text-sm tracking-wide transform transla
                              md:text-base md:font-normal cursor-pointer text-opacity-90
                              hover:text-white transition-all duration-500
                              ${isDesktop ? 'text-white' : 'text-secondary hover:bg-secondary'}
                              ${className} ${location.pathname === item.link ? { select } : { unSelect }}`}>
                              {item.text}
                         </ScrollLink>
                    ) : (<RouterLink key={index} to={'/'}
                         onClick={() => handleNavClick(item.link)}
                         className={`font-poppins font-light text-sm tracking-wide transform transla
                              md:text-base md:font-normal cursor-pointer text-opacity-90
                              hover:text-white transition-all duration-500
                              ${isDesktop ? 'text-white' : 'text-secondary hover:bg-secondary'}
                              ${className} ${location.pathname === item.link ? { select } : { unSelect }}`}>
                         {item.text}
                    </RouterLink>
                    )
               ))}
          </>
     )
}

export default NavItem