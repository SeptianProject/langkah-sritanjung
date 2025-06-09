export type DetailType = 'culinary' | 'transportation' | 'homestay'

type BaseEntity = {
     id: number
     name: string
     slug: string
}

type Detail = {
     description: string
     address: string
     telephone: string
     price: string
     url: string
     image: string
}

export interface Destination extends BaseEntity {
     categoryId: number
     image: string
     location: {
          lat: number
          lng: number
     }
     actions: string[]
     timelist: {
          title: string
          description: string
     }[]
     destinations_transportations: {
          transportation: Transportation
     }[]
     destinations_culinaries: {
          culinary: Culinary
     }[]
     destinations_homestays: {
          homestay: HomeStay

     }[]
}

export interface Category extends BaseEntity {
     destination: Destination[]
}
export interface Culinary extends BaseEntity, Detail { }
export interface Transportation extends BaseEntity, Detail { }
export interface HomeStay extends BaseEntity, Detail { }