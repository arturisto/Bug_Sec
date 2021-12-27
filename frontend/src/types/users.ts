export interface userType {
    _id: string,
    email: string,
    location: {
        city: string,
        coordinates?: {
            latitude?: string,
            longitude?: string
        },
        country?: string,
        postcode?: number,
        state?: string,
        street?: {
            name?: string,
            number?: number
        },
        timezone?: {
            description?: string,
            offset?: string
        },
    },
    name: {
        first: string,
        last:string,
        title?:string
    },
    picture?: {
        large?: string,
        medium?: string,
        thumbnail?: string
    },
    registered: {
        age?: number,
        date: string
    },
    permissions: string
}

