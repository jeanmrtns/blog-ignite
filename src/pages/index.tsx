import { GetStaticProps } from 'next';

import Prismic from '@prismicio/client'

import { getPrismicClient } from '../services/prismic';

import { FiCalendar, FiUser } from 'react-icons/fi'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import { format } from 'date-fns'
import { pt } from 'date-fns/locale';
import { useState } from 'react';

interface Posts {
  uid: string,
  title: string,
  subtitle: string,
  author: string,
  banner: {},
  content: {},
  publicationDate: Date
}
interface HomeProps {
  posts: Posts[];
  prevPage: string;
  nextPage: string;
}


export default function Home({ posts, nextPage, prevPage } : HomeProps) {

  const [ pagePosts, setPagePosts ] = useState<Posts[]>(posts)
  const [ pagination, setpagination ] = useState({nextPage, prevPage})

  async function handleLoadPosts(nextPage) {

    if(pagination.nextPage) {
      const response = await fetch(nextPage)
      const data = await response.json()
      const newPosts = data.results

      const pagination = {
        nextPage: data.next_page,
        prevPage: data.prev_page
      }
      setpagination(pagination)

      const postsFormatted = newPosts.map(post => {
        return {
          uid: post.uid,
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
          banner: post.data.banner,
          content: post.data.content,
          publicationDate: format(new Date(post.first_publication_date), "d MMM yyyy", {
            locale: pt
          }),
        }
      })

      setPagePosts([...pagePosts, ...postsFormatted])
    }

  }

  return (
      <div className={commonStyles.container}>
        <main className={commonStyles.content}>
          <img src="/logo.svg" alt="logo" />
            {
              pagePosts.map(post => (
                <div key={post.uid} className={commonStyles.post}>
                  <h1>{post.title}</h1>
                  <p>{post.subtitle}</p>
                  <div className={commonStyles.info}>
                    <time><FiCalendar/> {post.publicationDate}</time>
                    <span><FiUser/> {post.author}</span>
                  </div>
                </div>
              ))
            }

            <button onClick={() => handleLoadPosts(pagination.nextPage)} className={commonStyles.loadMore}>Carregar mais posts</button>
        </main>
      </div>

  )
}

export const getStaticProps : GetStaticProps = async () => {
  const prismic = getPrismicClient()
  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'posts'),
  ], {
    fetch: ['posts.title', 'posts.subtitle', 'posts.author', 'posts.banner', 'posts.content'],
    pageSize: 1
  })

  const posts = response.results.map(post => {
    return {
      uid: post.uid,
      title: post.data.title,
      subtitle: post.data.subtitle,
      author: post.data.author,
      banner: post.data.banner,
      content: post.data.content,
      publicationDate: format(new Date(post.first_publication_date), "d MMM yyyy", {
        locale: pt
      }),
    }
  })

  return {
    props: {
      posts,
      nextPage: response.next_page,
      prevPage: response.prev_page
    }
  }
};
