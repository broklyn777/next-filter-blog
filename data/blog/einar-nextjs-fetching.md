---
title: Next JS Fetching Data
date: '2021-03-10'
tags: ['next js', 'guide']
draft: false
summary: 'Next.js-handledning använder vi getStaticProps-funktionen för att nå ut och hämta data som vi sedan kan använda.'
images: ['/static/images/project/data-fox.jpg']
---


## Introduktion

## Filter kod!

```javascript
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





```



**Exempel**: Om du skapar `pages/ninjas.js` enligt nedan, kommer den att exportera en React-komponent, den kommer att finnas tillgänglig på` /ninjas`.


```javascript
//Denna kod Fetchar ninjorna på skärmdumpen nedan.
export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return {
    props: { ninjas: data }
  }
}

const Ninjas = ({ninjas})  => {
    return (
        <div>
            <h1>All Ninjas</h1>
            {ninjas.map(ninja => (
       
        <div key={ninja.id}>
<a> 
<h3>{ninja.name}</h3>
</a>
        </div>
            ))}
        </div>
    )
}

export default Ninjas
```
### Så här blir resultatet från koden ovan.

![All ninjas](/static/images/project/allninjas-bl.jpg)
Format: ![Alt Text](url)




### Dynamic Routes

Skapa en dynamisk route `/ninjas/[id].js`, - istället för att skapa massor av sidor som tex. /ninjas/1, /ninjas/2, /ninjas/25.

```javascript
const Details = () => {

  return (
    <div>
      <h1>Detta är en Details Page!</h1>
    </div>
  )
}

export default Details
```
Pröva sedan `ninjas/1 ninjas/2 ninjas/25` och även `ninjas/5872` eller `ninjas/hrtyu` märk väl att de alla blir renderade likt nedan. 

![Details](/static/images/project/details-page-1.jpg)
Format: ![Alt Text](url)

## Skapa länkar till dessa

```javascript
import styles from '../../styles/Ninjas.module.css'
import Link from 'next/link'


export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  return {
    props: { ninjas: data }
  }
}

const Ninjas = ({ninjas})  => {
    return (
        <div>
            <h1 className="text-3xl" >All Ninjas</h1>
            {ninjas.map(ninja => (
       
        <Link href={'/ninjas/'+ ninja.id}   key={ninja.id}>
<a className={styles.single}> <h3>{ninja.name}</h3>

</a>
        </Link>
        // *** Tidigare kod xx****
//  <div key={ninja.id}>
// <a> 
// <h3>{ninja.name}</h3>
// </a>
//  </div>
            ))}
        </div>
    )
}

export default Ninjas
```


## getStaticPaths

Vi gör det i `ninjas/[id].js`

```javascript
export const getStaticPaths = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();

  // map data to an array of path objects with params (id)
  const paths = data.map(ninja => {
    return {
      params: { id: ninja.id.toString() }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
  const data = await res.json();

  return {
    props: { ninja: data }
  }
}

const Details = ({ ninja }) => {
  return (
    <div>
      <h1>{ ninja.name }</h1>
      <p>{ ninja.email }</p>
      <p>{ ninja.website }</p>
      <p>{ ninja.address.city }</p>
    </div>
  );
}

export default Details;
```





## se youtube-länk nedan

```javascript
import Select from 'react-select'
import {useQuery, useQueryClient} from 'react-query'
// import {useState} from 'react'
// const { API_URL } = process.env
// const getMovies = async(key) => {
//     console.log(key)
//     const genreId = key.queryKey[1].genre
//     const actorsIds = key.queryKey[2].actors.map(id => `actors.id=${id}`)
//     const actorsQueryString = actorsIds.join('&')
//     console.log(actorsQueryString)
//     if(genreId && actorsQueryString) {
//         const res = await fetch(`${API_URL}/movies?genre.id=${genreId}&${actorsQueryString}`)
//         return res.json()
//     }
//     if(genreId) {
//         const res = await fetch(`${API_URL}/movies?genre.id=${genreId}`)
//         return res.json()
//     }
//     if(actorsQueryString) {
//         const res = await fetch(`${API_URL}/movies?${actorsQueryString}`)
//         return res.json()
//     }
//     const res = await fetch(`${API_URL}/movies`)
//     return res.json()
// }

const { API_URL } = process.env
 

const getMovies = async() => {
  const res = await fetch(`${API_URL}/movies`)
   return res.json()
}
const FilterMovies = ({ movies, actors, genres, bolags }) => {
    //  console.log(movies)
    const queryClient = useQueryClient()
    //useQueryHook needed
      const {data, status} = useQuery('movies', getMovies, {initialData: movies})


     const handleActors = values => {
         console.log(values)
         }

            const handleGenre = value => {
         console.log(value)
     }
    
    // const [genreId, setGenreId] = useState(null)
    // const [actorsIds, setActors] = useState([])
    // const {data, status} = useQuery(['movies', {genre: genreId}, {actors: actorsIds}], getMovies, {initialData: movies})

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
                   onChange={values => handleActors(values.map(actor => actor.id))}
                    // http://localhost:1337/movies?actors.id=7  (id=7 test ex.)
                   />
                         <br />
                        <Select 
                            getOptionLabel={option => option.title} 
                            getOptionValue={option => option.id} 
                            options={genres} 
                            instanceId="genres" 
                            placeholder="Filter by Genres"
                            // isClearable
                            onChange={value => handleGenre (value)}
                            //no ismMulti här genre endast ett val
                        />

                         {data.map(movie => (
                            <div key={movie.id}>
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
    const { API_URL } = process.env

    const res = await fetch(`${API_URL}/movies`)
    const moviesData = await res.json()


    const resActors = await fetch(`${API_URL}/actors`)
    const actorsData = await resActors.json()

    const resGenres = await fetch(`${API_URL}/genres`)
    const genresData = await resGenres.json()

    const resBolags = await fetch(`${API_URL}/bolags`)
    const bolagsData = await resBolags.json()

    return {
        props: {
            movies: moviesData,
            actors: actorsData,
            genres: genresData,
            bolags: bolagsData
        },
    }
}

export default FilterMovies



```



 för att få den att filtrera så behövs react-query...

[react-query-hooks]( https://youtu.be/1GLQROeWoC4?t=1093) **viktigt!!!**

för att få den att filtrera så behövs react-query...

[react-query-hooks]( https://youtu.be/1GLQROeWoC4?t=1241) **viktigt från koden ovan!!!**




#### Tre unika Next JS funktioner

Vi pratar om de tre unika Next.js-funktionerna som du kan använda för att hämta data för förrendering:

- `getStaticProps` (Static Generation): Hämta/Fetch data vid byggtiden.
- `getStaticPaths` (Static Generation): Ange dynamiska rutter för att för-rendera (pre-render) sidor baserat på data.
- `getServerSideProps` (Server-rendering): Hämta/Fetch data **på begäran**.

Dessutom kommer vi att tala kortfattat om hur man **Fetching** data på klientsidan.

