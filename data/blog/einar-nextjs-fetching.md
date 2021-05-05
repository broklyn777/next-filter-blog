---
title: Next JS Fetching Data
date: '2021-03-10'
tags: ['next js', 'guide']
draft: false
summary: 'Next.js-handledning använder vi getStaticProps-funktionen för att nå ut och hämta data som vi sedan kan använda.'
images: ['/static/images/project/data-fox.jpg']
---


## Introduktion


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















#### Tre unika Next JS funktioner

Vi pratar om de tre unika Next.js-funktionerna som du kan använda för att hämta data för förrendering:

- `getStaticProps` (Static Generation): Hämta/Fetch data vid byggtiden.
- `getStaticPaths` (Static Generation): Ange dynamiska rutter för att för-rendera (pre-render) sidor baserat på data.
- `getServerSideProps` (Server-rendering): Hämta/Fetch data **på begäran**.

Dessutom kommer vi att tala kortfattat om hur man **Fetching** data på klientsidan.

