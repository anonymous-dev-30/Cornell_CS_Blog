import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import PortableText from 'react-portable-text';
import CommentFrom from '../../../components/CommentFrom';
import Header from '../../../components/Header';
import CommentList from '../../../components/CommentList';
import { client, urlBuilder } from '../../../sanity.config';
import { Post } from '../../../typings';


export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
    _id,
    slug,
  }`;

  const posts: Post[] = await client.fetch(query);

  const paths  = posts.map((post: Post) => ({
      params: {
        slug: post.slug.current
      }
    })
  );

  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
     title,
     description,
     slug,
      body,
     mainImage,
      author -> {
        name,
        image
      },
   'comments': *[
     _type == 'comment' && 
     post._ref == ^._id
   ]
 }`;

  const post: Post = await client.fetch(query, {
    slug: params?.slug
  });
  
  if(!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    }
  }
}

interface Props {
  post: Post;
}

function Post({ post }: Props) {

  const [submitted, setSubmitted] = useState<boolean>(false);

  return (
    <>
      <main>
        <Header />

        <img 
          src={urlBuilder(post.mainImage).url()}
          className='w-full h-40 object-cover'
        />
      </main>
      <article className='max-w-3xl mx-auto p-5'>
        <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
        <h2 className='text-xl font-light: text-gray-500 mb-2'>{post.description}</h2>
        <div>
          <img 
            src={urlBuilder(post.author.image).url()}
            className='h-10 w-10 rounded-full'
            alt="author-image"
          />
          <p className='font-extralight text-sm'> by{" "} 
            <span className='text-green-600'>{post.author.name}</span>
            - published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <PortableText 
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          content={post.body}
        />
      </article>

      <hr></hr>

       { submitted ? <CommentFrom post={post} setSubmitted={setSubmitted} /> : <div
        className='flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto'
       >
        <h3 className='text-3xl font-bold'>Thank you for submitting your comment!</h3>
        <p>Once it will be approved it will be shown!</p>
       </div> }

       <CommentList comment={post.comment} />
    </>
  )
}

export default Post;
