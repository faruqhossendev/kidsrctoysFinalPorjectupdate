import { useContext, useState, useEffect } from 'react'
import Axios from 'axios'
import Link from 'next/link'

import { KeywordContext } from '../pages/_app'



const SearchProducts = () => {
    const keyword = useContext(KeywordContext)
    const [loading, setLoading] = useState(true)
    // console.log('Search component = ', keyword)
    const [searchpost, setSearchposts] = useState([]);
    // console.log('data', searchpost)

    useEffect(() => {
        const link = `https://hometoos.com/kidsrctoys/wp-json/wp/v2/posts`

        Axios.get(link)
            .then((res) => {
                setSearchposts(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }, []);

    useEffect(()=>{
        Axios.get('https://hometoos.com/kidsrctoys/wp-json/wp/v2/posts')
            .then((posts)=>{
                const result = posts.data.filter((product) => {
                    return product.title.rendered.toLowerCase().includes(keyword)
                })
                setSearchposts(result)
                setLoading(false)
            })
    }, [keyword])
    return (
        <>
        {
          loading && "loading ....."
        }
        {
          searchpost.length == 0 && !loading && "No product found"
        }
            {
            searchpost.map(products => {
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
};

export default SearchProducts;