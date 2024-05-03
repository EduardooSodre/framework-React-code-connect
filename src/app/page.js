import { CardPost } from "@/components/CardPost"
import logger from "@/logger"

import styles from './page.module.css'

async function getAllPosts (page) {
  const response = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=6`)
  if (!response.ok) {
    logger.error('Ops, alguma coisa correu mal')
    return []
  }
  logger.info('Posts obtidos com sucesso')
  return response.json()
}

import Link from "next/link"

export default async function Home({searchParams}) {
  const currentPage = searchParams?.page || 1
  const { data: posts, prev, next } = await getAllPosts(currentPage)
  return (
    <main className={styles.grid}>
      {posts.map(post =>  <CardPost key={post.id} post={post} />)}
      {prev && <Link href={`/?page=${prev}`}>Pagina anterior</Link>}
      {next && <Link href={`/?page=${next}`}>Proxima pagina</Link>}
    </main>
  )
}
