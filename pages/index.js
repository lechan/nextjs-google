import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Search from '../components/search'
import LinkList from '../components/linkList'
import { readFile } from 'fs'
import { promisify } from 'util'
import { join } from 'path'

const read = promisify(readFile)

export default function Home({ data }) {
  console.log(data)
  return (
    <div>
      <Head>
        <title>Google</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div className={styles.logo}></div>
        <Search />
        <LinkList />
      </div>
      
    </div>
  )
}

export async function getStaticProps () {
  const data = await read(join(process.cwd(), 'pages', '_app.js'), 'utf-8')
  // function fetchFavicon(url) {
  //   return new Promise(async(resolve, reject) => {
  //     const imageUrl = `chrome://favicon2/?size=24&scale_factor=1x&show_fallback_monogram=&page_url=${url}`
  //     const data = await fetch(imageUrl)
  //     const canvas = document.createElement("canvas");
  //     canvas.width = 24
  //     canvas.height = 24
  //     const ctx = canvas.getContext("2d");
  //     ctx.drawImage(canvas, 0, 0);
  //     const dataURL = canvas.toDataURL("image/png");
  //     resolve(dataURL)
  //   });
  // }

  // const url = await fetchFavicon('https://www.baidu.com')
  // console.log(url)

  return {
    props: {
      data: url
    }
  }
}
