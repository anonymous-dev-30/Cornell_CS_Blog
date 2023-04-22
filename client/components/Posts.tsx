import React from 'react';
import { Post } from '../typings';
import Link from 'next/link';
import { urlBuilder } from '../sanity.config';

interface Props {
  posts: Post[];
}

function Posts({ posts }: Props) {
  return (<>
  { posts.map((post: Post) => {
    return post.mainImage && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6' key={post._id}>
      <Link key={post._id} href={`/post/${post.slug.current}`} >
        <div className='group cursor-pointer border rounded-lg overflow-hidden'>
          <img 
            className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
            src={urlBuilder(post.mainImage).url()}
          />
          <div className='flex justify-between'>
            <div>
              <p className='text-lg font-bold'>{post.title}</p>
              <p className='text-sm'>{post.description} by {post.author.name}</p>
            </div>
            <img 
              className='h-12 w-12 rounded-full'
              src={urlBuilder(post.author.image).url()}
            />
          </div>
        </div>
      </Link>
    </div>
  }) }
</>)
}

export default Posts;