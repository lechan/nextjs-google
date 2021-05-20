import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Search from '../components/search'
import LinkList from '../components/linkList'

export default function Home() {
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
