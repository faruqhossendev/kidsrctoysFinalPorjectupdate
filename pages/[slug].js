import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch'
import renderHTML from 'react-render-html'
import Axios from 'axios'
import Link from 'next/link'

const Relatedproduct = ({ post }) => {
  const [relatedproduct, setRelatedproduct] = useState([])
  const [postid, setPostid] = useState(post.categories[0])

  console.log('test post', post.categories[0])
  console.log('Posts', relatedproduct)

  useEffect(() => {
    Axios.get(`http://hometoos.com/kidsrctoys/wp-json/wp/v2/posts?categories=${postid}`)
      .then((allpost) => {
        setRelatedproduct(allpost.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <>
      {
        relatedproduct.map(products => {
          return (
            <div className="col-md-4 p-2" key={products.id}>
              <div className="card">
                <Link href='/[slug]' as={`/${products.slug}`} ><a className='text-decoration-none card-header text-body' target='_blank'><h6>{products.title.rendered}</h6></a></Link>
                <div className="card-body p-0">
                  <img src={products.better_featured_image.source_url} className="card-img-top" alt={products.better_featured_image.alt_text} />
                  <p className="card-text my-1 p-2 text-justify pro_desc">{products.acf.description}</p>
                  <div className='card-footer p-2'>
                    <p className='font-weight-bold text-secondary'>Price : $ {products.acf.price} </p>
                    <div className=''>
                      <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white' href={products.acf.aliexpress_link} target='blank'>Amazone</a>
                      <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white ml-3' href={products.acf.amazon_link} target='blank'>Ali Express</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}


const Post = ({ post, postadd }) => {
  return (
    <div className="container">
      <h3 className='post_title my-3'>{post.title.rendered}</h3>
      <div className="row">
        <div className="col-md-8 single_content">
          {renderHTML(post.content.rendered)}
          <div className='card-body'>
          <p className='font-weight-bold text-secondary'>Price : $ {post.acf.price} </p>
            <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white' href={post.acf.aliexpress_link} target='blank'>Amazone</a>
            <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white ml-3' href={post.acf.amazon_link} target='blank'>Ali Express</a>
          </div>
        </div>
        <div className="col-md-4 d-none d-md-block">
          <div>
            <a href={postadd.acf.banner_url} target='_blank'>
              <img className='post_banner_img' src={postadd.acf.banner_image.url} alt={postadd.acf.banner_image.alt} />
            </a>
          </div>
        </div>
      </div>
      <div className="row border-bottom">
        <h3 className="font-weight-bolder my-3">You may also enjoy throwing your hard earned cash away on...</h3>

      </div>
      <div className="row">
        <Relatedproduct post={post} />
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