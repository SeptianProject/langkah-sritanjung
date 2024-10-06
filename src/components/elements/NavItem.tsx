import { textNavbar } from '../../assets/asset'
import { Link, useLocation } from 'react-router-dom'

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
                              className={`font-poppins font-light text-sm tracking-wide
                              md:text-base md:font-normal text-slate-100
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