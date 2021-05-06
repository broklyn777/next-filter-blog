import { useEffect, useState } from 'react'

import Post from '../../components/post'

const client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
})

function Lek() {
  async function fetchEntries() {
    const entries = await client.getEntries()
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
  }

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries()
      setPosts([...allPosts])
    }
    getPosts()
  }, [])

  return (
    
    <>
       
      {posts.length > 0
        ? posts.map((p) => (
            <Post
             title={p.fields.title}
              slug={p.fields.slug}
              date={p.fields.date}
         namn={p.fields.namn}
              image={p.fields.image}
          
             
            />
          ))
        : null}
    </>
 
  )
}

export default Lek






// import styles from '../../styles/Lekar.module.css'
// import Link from 'next/link'


// export const getStaticProps = async () => {
//   const res = await fetch('https://jsonplaceholder.typicode.com/users');
//   const data = await res.json();

//   return {
//     props: { lekar: data }
//   }
// }

// const Lekar = ({lekar})  => {
//     return (
//         <div>
//             <h1 className="text-3xl" >Alla Lekar</h1>
//             {lekar.map(lek => (
       
//         <Link href={`/lekar/` + lek.id}  key={lek.id}>
// <a className={styles.single}> <h3>{lek.name}</h3>

// </a>
//         </Link>
//             ))}
//         </div>
//     )
// }

// export default Lekar