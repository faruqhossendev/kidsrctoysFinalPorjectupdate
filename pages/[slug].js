import React from 'react';
import fetch from 'node-fetch'
import renderHTML from 'react-render-html'

const Post = ({ post, postadd }) => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9">
          <h3 className='post_title'>{post.title.rendered}</h3>
          {renderHTML(post.content.rendered)}
        </div>
        <div className="col-sm-3">
          <div>
            <a href={postadd.acf.banner_url} target='_blank'>
              <img className='post_banner_img' src={postadd.acf.banner_image.url} alt={postadd.acf.banner_image.alt} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// For get all post
export async function getPost() {
  const res = await fetch('http://hometoos.com/kidsrctoys/wp-json/wp/v2/posts')
  const data = await res.json()
  return data
}


// For get adds 
export async function getAdds() {
  const res = await fetch('http://hometoos.com/kidsrctoys/wp-json/wp/v2/adds_post')
  const adds = await res.json()
  return adds
}

// For get single post
export async function getStaticProps(context) {
  const allpost = await getPost()
  const singlepost = allpost.find(({ slug }) => slug === context.params.slug)

  const postadds = await getAdds()

  return {
    props: {
      post: singlepost,
      postadd: postadds[0]
    }
  }
}

export async function getStaticPaths() {
  const posts = await getPost()
  const paths = posts.map(post => ({ params: { slug: post.slug } }))

  return {
    paths,
    fallback: false
  }
}

export default Post;