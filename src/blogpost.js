// src/components/OnePost.js

import React, { useEffect, useState } from 'react';
import sanityClient from './client.js';
import BlockContent from '@sanity/block-content-to-react';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function OnePost({ slug }) {
  /**
   * @type any
   */
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
        title,
        slug,
        mainImage{
          asset->{
          _id,
          url
        }
      }
    }`
      )
      .then((data) => {
        console.log('all posts', data);
      })
      .catch(console.error);
  }, []);

  console.log(sanityClient);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
          title,
          slug,
          mainImage{
            asset->{
              _id,
              url
             }
           },
         body,
        "name": author->name,
        "authorImage": author->image
       }`,
        { slug }
      )
      .then((data) => {
        console.log('data!!!', data, slug);
        setPostData(data[0]);
      })
      .catch(console.error);
  }, [slug]);

  if (!postData) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h2>{postData.title}</h2>
        <div>
          {postData.authorImage && (
            <img
              src={urlFor(postData.authorImage).width(100).url()}
              alt="Author is Kap"
            />
          )}

          <h4>{postData.name}</h4>
        </div>
      </div>
      {postData.mainImage && (
        <img src={urlFor(postData.mainImage).width(200).url()} alt="" />
      )}
      <div>
        <BlockContent
          blocks={postData.body}
          projectId={'ybq0h7ve'}
          dataset={'production'}
        />
      </div>
    </div>
  );
}
