import { GetStaticProps } from 'next';

import Prismic from '@prismicio/client'

import { getPrismicClient } from '../services/prismic';

import { FiCalendar, FiUser } from 'react-icons/fi'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { RichText } from 'prismic-dom';

import { format } from 'date-fns'
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';
import { pt } from 'date-fns/locale';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ posts }) {

  console.log(posts)
  // TODO
  return (
      <div className={commonStyles.container}>
        <main className={commonStyles.content}>
          <img src="/logo.svg" alt="logo" />
            {
              posts.map(post => (
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

            <a href="#" className={commonStyles.loadMore}>Carregar mais posts</a>
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
    pageSize: 20
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
      pagination: {
        nextPage: response.next_page,
        prevPage: response.prev_page
      }
    }
  }
};
