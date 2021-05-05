import '@/css/tailwind.css'
import {QueryClientProvider, QueryClient } from 'react-query'
import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import { SEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import MDXComponents from '@/components/MDXComponents'

const queryClient = new QueryClient()


export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <MDXProvider components={MDXComponents}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <DefaultSeo {...SEO} />
        <LayoutWrapper>
         
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
             
        </LayoutWrapper>
      </MDXProvider>
    </ThemeProvider>
  )
}



// import Header from 'components/Header'
// import { ThemeProvider } from 'emotion-theming'
// import GlobalStyles from 'components/GlobalStyles/GlobalStyles'
// import theme from '../theme/theme.js'
// import getConfig from 'next/config'
// import fetch from 'isomorphic-unfetch'
// import { DefaultSeo } from 'next-seo'
// import ContextWrapper from 'components/ContextWrapper'
// // import { appWithTranslation } from '../i18n'
// // import Router from 'next/router'
// // import { parseCookies  } from 'nookies'
// import {QueryClientProvider, QueryClient } from 'react-query'

// const queryClient = new QueryClient()


// import SEO from '../next-seo.config'

// function MyApp({ Component, pageProps, navigation }) {
//     console.log(navigation)

//     return (
//         <>
//          <DefaultSeo {...SEO} />
//             <ThemeProvider theme={theme}>
//                 <GlobalStyles />
//                  <ContextWrapper navigation={navigation}>
//                     <Header />
//                 </ContextWrapper>
//                 <QueryClientProvider client={queryClient}>
//                     <Component {...pageProps} />
//                 </QueryClientProvider>
//             </ThemeProvider>
//         </>
      
//     )
// }

// const { publicRuntimeConfig } = getConfig()

// MyApp.getInitialProps = async () => {
//     const res = await fetch(`${publicRuntimeConfig.API_URL}/navigations`)
//     const navigation = await res.json()

//     return { navigation }
// }

// export default MyApp
