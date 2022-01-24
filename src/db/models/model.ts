
// Film
export type Film = {
    title: string
    episode_id: number
    opening_crawl: string
    characters: string
    character_count: number
    characters_url: string
    comments?: string
    comment_count: number
    director: string
    producer: string
    release_date: string
    created: Date
}

// Comment
export type Comment = {
    episode_id: number
    author_name: string
    message: string
    IPAddress: string
    created: string
}

// Planet
export type Planet = {
    id: number
    name: string
    rotation_period: string
    orbital_period: string
    diameter: string
    climate: string
    gravity: string
    terrain: string
    surface_water: string
    population: string
}

// People
export type People = {
    id: number
    name: string
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string
}
