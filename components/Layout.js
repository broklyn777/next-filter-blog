import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
          
            <h2>Spread The Joy</h2>
          </a>
        </Link>
           <Link href="/filter">
          <p>Filter</p>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2021 Just Add Marmite</p>
      </footer>
    </div>
  )
}