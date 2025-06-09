import { useEffect, useState, useMemo } from 'react'
import TextGroup from '../../elements/text/TextGroup'
import DropdownButton from '../../fragments/dropdowns/DropdownButton'
import Loading from 'react-loading'
import BentoGridDestinations from '../../fragments/cards/BentoGridDestinations'
import { BounceInBottom } from '../../animation/BounceAnimate'
import CardStackHome from '../cards/CardStackHome'
import { Category, Destination } from '../../../types/common'

interface HomeDestinationProps {
     destinations: Destination[]
     categories: Category[]
     isLoading: {
          destinations: boolean;
          destinationPerCategory: boolean;
     }
     clickDetail: (slug: string) => void;
     clickTour: (slug: string) => void;
     onSelectCategory?: (slug: string) => void;
     selectedCategory?: string;
}

const HomeDestination: React.FC<HomeDestinationProps> = ({
     categories,
     destinations,
     isLoading,
     clickDetail,
     clickTour,
     onSelectCategory,
     selectedCategory,
}) => {
     const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768)
     const [showAll, setShowAll] = useState<boolean>(false)
     const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

     const displayedItems = useMemo(() => {
          return isDesktop && !showAll ? destinations.slice(0, 3) : destinations;
     }, [isDesktop, showAll, destinations]);

     useEffect(() => {
          const handleResize = () => setIsDesktop(window.innerWidth >= 768)
          window.addEventListener('resize', handleResize)
          return () => {
               window.removeEventListener('resize', handleResize)
          }
     }, [])

     const handleShowAll = () => {
          setShowAll(!showAll)
     }

     const handleDropdown = () => {
          setDropdownOpen(!dropdownOpen)
     }

     const handleSelectCategory = (slug: string) => {
          if (onSelectCategory) {
               onSelectCategory(slug);
          }
     };

     const titleClass = 'text-xl xs:text-2xl font-bold w-80 xs:w-96 text-center md:text-3xl md:w-96 lg:text-3xl lg:w-[30rem] text-tertiary text-opacity-90';
     const loadingContainerClass = 'text-center w-full mx-auto';

     return (
          <div id='destinasi' className='flex flex-col gap-y-20'>
               {/* Card Bento grid */}
               <div className='flex flex-col gap-y-14 items-center lg:min-h-screen'>
                    <BounceInBottom delayVal={0.5}>
                         <h1 className={titleClass}>
                              Destinasi Wisata Terfavorit Bulan Ini
                         </h1>
                    </BounceInBottom>
                    <BentoGridDestinations
                         destinations={destinations}
                         clickDetail={clickDetail}
                         clickTour={clickTour}
                         isLoading={isLoading.destinations} />
               </div>
               {/* Cardtext blue Dropdown */}
               <div id='dropdown-card' className='lg:min-h-full lg:w-full px-10 lg:mt-10'>
                    <div className='relative bg-blueCard bg-opacity-20 w-full h-60 lg:h-80 rounded-2xl py-5 px-2 sm:px-5'>
                         <TextGroup />
                         <DropdownButton
                              onSelectCategory={handleSelectCategory}
                              categories={categories || []}
                              dropdownOpen={dropdownOpen}
                              handleDropdownOpen={handleDropdown}
                              selectedCategory={selectedCategory}
                         />
                    </div>
               </div>
               {/* Card */}
               <div className={`px-10 lg:mt-5 ${dropdownOpen ? 'mt-60' : 'mt-0'} transition-all duration-300`}>
                    {isLoading.destinationPerCategory ? (
                         <Loading
                              className={loadingContainerClass}
                              color="#EA8104"
                              height={50}
                              width={50}
                              type="cylon"
                         />
                    ) : (
                         <div className='flex flex-col gap-y-10'>
                              {destinations.length > 0 || destinations.length > 0 ? (
                                   <>
                                        <CardStackHome
                                             handleDetailClick={clickDetail}
                                             cardStackItems={displayedItems}
                                             handleClickTour={clickTour}
                                        />
                                        <BounceInBottom delayVal={0}>
                                             {isDesktop && destinations.length > 3 && (
                                                  <button
                                                       onClick={handleShowAll}
                                                       className='text-white bg-primary w-32 mx-auto flex justify-center py-2 rounded-lg'>
                                                       {showAll ? 'Sembunyikan' : 'Lihat Semua'}
                                                  </button>
                                             )}
                                        </BounceInBottom>
                                   </>
                              ) : null}
                         </div>
                    )}
               </div>
          </div>
     )
}

export default HomeDestination