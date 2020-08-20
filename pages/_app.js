import fetch from 'isomorphic-unfetch'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'

function MyApp({ Component, pageProps, allmenu, pages, catagorys, banner }) {
  // console.log('deki', allmenu)
  // console.log('deki page', pages)
  // console.log('deki catagoyr', catagorys)
  console.log('banner', banner)
  return (
    <>
      <Banner banner={banner} />
      <Navbar allmenu={allmenu} pages={pages} catagorys={catagorys} />
      <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async () => {

  const res = await fetch('https://hometoos.com/kidsrctoys/wp-json/menus/v1/menus/mainMenu')
  const menus = await res.json()
  const allmenus = await menus.items

  const res1 = await fetch('https://hometoos.com/kidsrctoys/wp-json/wp/v2/pages')
  const pages1 = await res1.json()

  const res2 = await fetch('https://hometoos.com/kidsrctoys/wp-json/wp/v2/categories')
  const catagory2 = await res2.json()

  const res3 = await fetch('https://hometoos.com/kidsrctoys/wp-json/wp/v2/adds_header')
  const banner3 = await res3.json()

  return {
    allmenu: allmenus,
    pages: pages1,
    catagorys: catagory2,
    banner: banner3[0]
  }

}


export default MyApp
