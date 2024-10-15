import { textNavbar } from '../../assets/asset'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-scroll'

type NavItemProps = {
     className?: string
     select?: string
     unSelect?: string
}

const NavItem = ({ className, select, unSelect }: NavItemProps) => {
     const location = useLocation()

     return (
          <>
               {
                    textNavbar.map((item, index) => (
                         <Link
                              key={index}
                              to={item.link}
                              smooth={true}
                              duration={
                                   item.link === 'beranda' ? 500 :
                                        item.link === 'destinasi' ? 1000 :
                                             item.link === 'tentang-kami' ? 1500 : 500
                              }
                              offset={-50}
                              className={`font-poppins font-light text-sm tracking-wide
                              md:text-base md:font-normal text-slate-100 cursor-pointer
                              hover:text-white transition-all duration-500
                              ${className} ${location.pathname === item.link ? [select] : unSelect}`}>
                              {item.text}
                         </Link>
                    ))
               }
          </>
     )
}

export default NavItem