import { useEffect, useState } from 'react'
import { textNavbar } from '../../assets/asset'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'

type NavItemProps = {
     className?: string
     select?: string
     unSelect?: string
     selectedItem?: string
     setSelectedItem: (item: string) => void
     isMobile: boolean
     setIsOpen: (open: boolean) => void
}

const NavItem = ({ className, select, unSelect,
     isMobile, selectedItem, setSelectedItem, setIsOpen }: NavItemProps) => {
     const location = useLocation()
     const navigate = useNavigate()
     const [isDesktop, setIsDesktop] = useState(true)

     useEffect(() => {
          const handleResize = () => setIsDesktop(window.innerWidth >= 640)
          handleResize()
          window.addEventListener('resize', handleResize)
          return () => {
               window.removeEventListener('resize', handleResize)
          }
     }, [])

     const handleNavClick = (link: string) => {
          if (selectedItem !== link) {
               setSelectedItem(link)
          }
          if (location.pathname !== '/') {
               navigate('/')
               setTimeout(() => {
                    const element = document.getElementById(link)
                    if (element) {
                         element.scrollIntoView({ behavior: 'smooth' })
                    }
               }, 500)
          }
          if (isMobile) {
               setTimeout(() => setIsOpen(false), 100);
          }
     }

     return (
          <>
               {textNavbar.map((item, index) => {
                    const isSelected = selectedItem === item.link
                    const isDisabled = isMobile && isSelected

                    const commonProps = {
                         className: `font-poppins font-light text-sm tracking-wide 
                              transition-all duration-500 md:text-base md:font-normal
                              cursor-pointer text-opacity-90 px-3 ${className} 
                              ${isDesktop ? 'text-white' : 'text-secondary hover:bg-secondary'}
                              ${location.pathname === item.link ? select : unSelect}
                              ${isDisabled ? '' : 'hover:text-white'}`,
                         onClick: isDisabled ? undefined : () => handleNavClick(item.link)
                    }

                    return location.pathname === '/' ? (
                         <ScrollLink
                              key={index}
                              {...commonProps}
                              to={item.link}
                              smooth={true}
                              offset={item.link === 'beranda' ? -100 : -50}
                              duration={
                                   item.link === 'beranda' ? 500 :
                                        item.link === 'destinasi' ? 1000 :
                                             item.link === 'tentang-kami' ? 1500 : 500}>
                              {item.text}
                         </ScrollLink>
                    ) : (<RouterLink key={index} {...commonProps} to={`/`}>
                         {item.text}
                    </RouterLink>)
               })}
          </>
     )
}

export default NavItem