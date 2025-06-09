import SearchInput from '../elements/input/SearchInput'
import ButtonSearch from '../elements/button/ButtonSearch'
import { ChangeEvent, useEffect, useState } from 'react'
import { BounceInRight } from '../animation/BounceAnimate';
import { useQuery } from '@tanstack/react-query';
import { fetchResource } from '../../services/apiService';
import { Destination } from '../../types/common';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ButtonHeader = () => {
     const { data, isLoading, error } = useQuery<Destination[]>({
          queryKey: ['destinations'],
          queryFn: async () => await fetchResource('destinations'),
     });

     const [isDesktop, setIsDesktop] = useState<boolean>(false);
     const [searchTerm, setSearchTerm] = useState<string>('');
     const navigate = useNavigate();

     const handleResize = () => {
          setIsDesktop(window.innerWidth >= 1024);
     };

     useEffect(() => {
          handleResize();
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
     }, []);

     const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value);
     };

     const handleButtonSearch = (text: string) => {
          setSearchTerm(text);

          if (text && data) {
               const destination = data.find(dest => {
                    return dest.name.toLowerCase().includes(text.toLowerCase()) ||
                         (dest.name && dest.name.toLowerCase().includes(text.toLowerCase()));
               });

               if (destination) {
                    navigate(`/detail/${destination.slug}`);
               }
          }
     };

     const showErrorAlert = () => {
          Swal.fire({
               icon: 'error',
               title: 'Destinasi Tidak Ditemukan',
               text: 'Maaf, destinasi yang Anda cari belum tersedia',
               confirmButtonText: 'Tutup',
               confirmButtonColor: '#d33',
               showClass: {
                    popup: 'animate__animated animate__bounceIn',
                    backdrop: 'animate__animated animate__fadeIn'
               },
               hideClass: {
                    popup: 'animate__animated animate__bounceOut',
                    backdrop: 'animate__animated animate__fadeOut'
               }
          });
     };

     if (error) {
          showErrorAlert();
          console.error('Error fetching destinations:', error);
          return null;
     }

     return (
          <div>
               <SearchInput
                    placeholder="Cari destinasi..."
                    value={searchTerm}
                    onChange={handleSearch}
                    destinations={data}
               />
               <div className='mt-4 flex gap-x-4'>
                    {isLoading ? (
                         <>
                              {Array.from({ length: isDesktop ? 3 : 2 }).map((_, index) => (
                                   <BounceInRight key={index} delayVal={index ? index * 1 : 0.5}>
                                        <ButtonSearch
                                             onSearch={() => { }}
                                             text={''}
                                             clasName='px-[4.3rem] py-4'
                                        />
                                   </BounceInRight>
                              ))}
                         </>
                    ) : (
                         <>
                              {Array.isArray(data) ? data.slice(0, isDesktop ? 3 : 2).map((destination, index) => (
                                   <BounceInRight key={index} delayVal={index ? index * 1 : 0.5}>
                                        <ButtonSearch
                                             key={index}
                                             text={destination.name || ''}
                                             onSearch={handleButtonSearch}
                                             clasName='px-4 py-2'
                                        />
                                   </BounceInRight>
                              )) : (
                                   <></>
                              )}
                         </>
                    )}
               </div>
          </div>
     );
};

export default ButtonHeader;