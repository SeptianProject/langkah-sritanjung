import CardStack from '../../fragments/cards/CardStack'

interface CardStackProps {
     cardStackItems: {
          item: {
               value: {
                    id: string
                    img: string
                    title: string
                    price: string
               }[]
          }
     }
}


const CardHomeDestination = ({ cardStackItems }: CardStackProps) => {

     return (
          <div className='flex flex-col gap-y-10'>
               <CardStack cardStackItems={cardStackItems} />
               <button className='text-white bg-primary w-32 mx-auto py-2 rounded-lg'>
                    Lainnya
               </button>
          </div>
     )
}

export default CardHomeDestination