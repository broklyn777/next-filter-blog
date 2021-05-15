
import Select from 'react-select'
import {useQuery, useQueryClient} from 'react-query'
import {useState} from 'react'

const { NEXT_PUBLIC_API_URL } = process.env

const getMovies = async(key) => {
    console.log(key)
    const genreId = key.queryKey[1].genre
    const actorsIds = key.queryKey[2].actors.map(id => `actors.id=${id}`)
    console.log(actorsIds)

    const actorsQueryString = actorsIds.join('&')
    console.log(actorsQueryString)

    if(genreId && actorsQueryString) {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/movies?genre.id=${genreId}&${actorsQueryString}`)
        return res.json()
    }

    if(genreId) {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/movies?genre.id=${genreId}`)
        return res.json()
    }

    if(actorsQueryString) {
        const res = await fetch(`${NEXT_PUBLIC_API_URL}/movies?${actorsQueryString}`)
        return res.json()
    }

    const res = await fetch(`${NEXT_PUBLIC_API_URL}/movies`)
    return res.json()
}

const FilterMovies = ({ movies, actors, genres }) => {
    const queryClient = useQueryClient()
    const [genreId, setGenreId] = useState(null)
    const [actorsIds, setActors] = useState([])
    const {data, status} = useQuery(['movies', {genre: genreId}, {actors: actorsIds}], getMovies, {initialData: movies})
return (
        <>
            <div variant="container">
                <div as="h2" my={40}>Filter movies</div>
    
                <div mb={100}>
                    <div width={200} mr={20}>
                        <Select
                            getOptionLabel={option => `${option.First_name} ${option.Last_name}`}
                            getOptionValue={option => option.id}
                            options={actors}
                            instanceId="actors"
                            isMulti
                            placeholder="Filter by Actors"
                            onChange={values => setActors(values.map(actor => actor.id))}
                        />
                        <br />
                        <Select 
                            getOptionLabel={option => option.title} 
                            getOptionValue={option => option.id} 
                            options={genres} 
                            instanceId="genres" 
                            placeholder="Filter by Genres"
                            isClearable
                            onChange={value => setGenreId(value ? value.id : null)}
                        />
                    </div>
                    <div>
                        {status === 'loading' && <div>I'm loading your movies</div>}
                        {status === 'error' && <div>Something went wrong</div>}

                        {status === 'success' && data.map(movie => (
                            <div key={movie.id} p={10}>
                                <strong>{movie.title}</strong> - {movie.genre ? movie.genre.title : null}<br />

                                {movie.actors.length > 0 && movie.actors.map(actor => (
                                    <small key={actor.id}>{actor.First_name} {actor.Last_name} &nbsp;</small>  
                                ))}

                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </>
    )
   
}


export async function getServerSideProps() {
    const { NEXT_PUBLIC_API_URL } = process.env

    const res = await fetch(`${NEXT_PUBLIC_API_URL}/movies`)
    const moviesData = await res.json()


    const resActors = await fetch(`${NEXT_PUBLIC_API_URL}/actors`)
    const actorsData = await resActors.json()

    const resGenres = await fetch(`${NEXT_PUBLIC_API_URL}/genres`)
    const genresData = await resGenres.json()

    // const resBolags = await fetch(`${NEXT_PUBLIC_API_URL}/bolags`)
    // const bolagsData = await resBolags.json()

    return {
        props: {
            movies: moviesData,
            actors: actorsData,
            genres: genresData,
            // bolags: bolagsData
        },
    }
}

export default FilterMovies




