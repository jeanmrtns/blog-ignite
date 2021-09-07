import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import { FiCalendar, FiUser } from 'react-icons/fi'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

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

export default function Home() {
  // TODO
  return (
      <div className={commonStyles.container}>
        <main className={commonStyles.content}>
          <img src="/logo.svg" alt="logo" />
            <div className={commonStyles.post}>
              <h1>Como utilizar Hooks</h1>
              <p>Pensando em sincronização em vez de ciclos de vida.</p>
              <div className={commonStyles.info}>
                <time><FiCalendar />15 Mar 2021</time>
                <span><FiUser />Joseph Oliveira</span>
              </div>
            </div>

            <div className={commonStyles.post}>
              <h1>Como utilizar Hooks</h1>
              <p>Pensando em sincronização em vez de ciclos de vida.</p>
              <div className={commonStyles.info}>
                <time><FiCalendar />15 Mar 2021</time>
                <span><FiUser />Joseph Oliveira</span>
              </div>
            </div>


            <div className={commonStyles.post}>
              <h1>Como utilizar Hooks</h1>
              <p>Pensando em sincronização em vez de ciclos de vida.</p>
              <div className={commonStyles.info}>
                <time><FiCalendar />15 Mar 2021</time>
                <span><FiUser />Joseph Oliveira</span>
              </div>
            </div>

            <div className={commonStyles.post}>
              <h1>Como utilizar Hooks</h1>
              <p>Pensando em sincronização em vez de ciclos de vida.</p>
              <div className={commonStyles.info}>
                <time><FiCalendar />15 Mar 2021</time>
                <span><FiUser />Joseph Oliveira</span>
              </div>
            </div>

            <a href="#" className={commonStyles.loadMore}>Carregar mais posts</a>
        </main>
      </div>

  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
