[33mcommit abf73acca18196f858f87530d3f72b1347c31fbb[m[33m ([m[1;36mHEAD -> [m[1;32mmaster[m[33m, [m[1;31morigin/master[m[33m)[m
Author: unknown <faruqhossen30@gmail.com>
Date:   Wed Oct 28 09:35:32 2020 +0600

    project start again

[1mdiff --git a/pages/products/[slug].js b/pages/products/[slug].js[m
[1mindex 8f5de8b..42ac167 100644[m
[1m--- a/pages/products/[slug].js[m
[1m+++ b/pages/products/[slug].js[m
[36m@@ -1,55 +1,89 @@[m
[32m+[m[32mimport React, {useState, useEffect} from 'react'[m
 import fetch from 'node-fetch'[m
 import Link from 'next/link';[m
 [m
 const Product = ({ allcatagory, catagorypost }) => {[m
[32m+[m[32m    const [sortdata, setSortdata] = useState('')[m
[32m+[m[32m    const [allproduct, setAllproduct] = useState(catagorypost)[m
[32m+[m[32m    const sortHandler = (e)=>{[m
[32m+[m[32m        e.preventDefault()[m
[32m+[m[32m        setSortdata(e.target.value)[m
[32m+[m[32m    }[m
[32m+[m[32m    // console.log('sort value', sortdata)[m
[32m+[m[41m    [m
[32m+[m[32m        useEffect(()=>{[m
[32m+[m[32m            if(sortdata === 'low'){[m
[32m+[m[32m            const lowData = allproduct.sort((a,b)=>{[m
[32m+[m[32m                return parseInt(a.acf.price) - parseInt(b.acf.price)[m
[32m+[m[32m            })[m
[32m+[m[32m            setAllproduct(lowData)[m
[32m+[m[32m        }[m
[32m+[m[41m           [m
[32m+[m[32m        }, [sortdata])[m
[32m+[m[41m    [m
[32m+[m
[32m+[m[32m    console.log('sorted data', allproduct)[m
 [m
     return ([m
[31m-            <div className='container'>[m
[31m-                <div className="row">[m
[31m-                    <div className="col-md-3 border-right d-sm-none d-md-block">[m
[31m-                        <ul className="list-group list-group-flush hover-color">[m
[31m-                            {[m
[31m-                                allcatagory.map((catagory) => {[m
[31m-                                    return ([m
[31m-                                        <li key={catagory.id} className='list-group-item list-group-item-action'>[m
[31m-                                            <Link href='/products/[slug]' as={`/products/${catagory.slug}`} ><a className='text-decoration-none font-weight-bold text-secondary'>{catagory.name}</a></Link>[m
[31m-                                        </li>[m
[31m-                                    )[m
[31m-                                })[m
[31m-                            }[m
[31m-                        </ul>[m
[32m+[m[32m        <div className='container'>[m
[32m+[m[32m            <div className="row">[m
[32m+[m[32m                <div className="col-md-3 border-right d-sm-none d-md-block">[m
[32m+[m[32m                    <ul className="list-group list-group-flush hover-color">[m
[32m+[m[32m                        {[m
[32m+[m[32m                            allcatagory.map((catagory) => {[m
[32m+[m[32m                                return ([m
[32m+[m[32m                                    <li key={catagory.id} className='list-group-item list-group-item-action'>[m
[32m+[m[32m                                        <Link href='/products/[slug]' as={`/products/${catagory.slug}`} ><a className='text-decoration-none font-weight-bold text-secondary'>{catagory.name}</a></Link>[m
[32m+[m[32m                                    </li>[m
[32m+[m[32m                                )[m
[32m+[m[32m                            })[m
[32m+[m[32m                        }[m
[32m+[m[32m                    </ul>[m
[32m+[m[32m                </div>[m
[32m+[m[32m                <div className="col-md-9">[m
[32m+[m[32m                    <div className='row'>[m
[32m+[m[32m                        <div className='col'>[m
[32m+[m[32m                            <form className="form-inline float-right">[m
[32m+[m[32m                                <div className="form-group">[m
[32m+[m[32m                                    <label className='mr-2' htmlFor="inlineFormCustomSelect">Sort By</label>[m
[32m+[m[32m                                    <select onChange={sortHandler} className="custom-select" id="inlineFormCustomSelect">[m
[32m+[m[32m                                        <option value='' >Select</option>[m
[32m+[m[32m                                        <option value="low">Low To High</option>[m
[32m+[m[32m                                        <option value="high">High To Low</option>[m
[32m+[m[32m                                    </select>[m
[32m+[m[32m                                </div>[m
[32m+[m[32m                            </form>[m
[32m+[m[32m                        </div>[m
                     </div>[m
[31m-                    <div className="col-md-9">[m
[31m-                        <div className="row">[m
[31m-                            {[m
[31m-                                catagorypost.map((post) => {[m
[31m-                                    return ([m
[31m-                                        <div className="col-md-4 p-2" key={post.id}>[m
[31m-                                            <div className="card">[m
[31m-                                                <Link href='/[slug]' as={`/${post.slug}`}><a className='text-decoration-none card-header text-body'><h6 >{post.title.rendered}</h6></a></Link>[m
[31m-                                                <div className="card-body p-0">[m
[31m-                                                    <img src={post.better_featured_image.source_url} className="card-img-top" alt={post.better_featured_image.alt_text} />[m
[31m-                                                    <p className="card-text my-1 p-2 text-justify pro_desc">{post.acf.description}</p>[m
[31m-                                                    <div className='card-footer p-2'>[m
[31m-                                                        <p className='font-weight-bold text-secondary'>Price : ${post.acf.price} </p>[m
[31m-                                                        <div className=''>[m
[31m-                                                            <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white' href={post.acf.aliexpress_link} target='blank'>Amazone</a>[m
[31m-                                                            <a className='border_none font-weight-bold btn-sm btn btn-warning text-uppercase text-white ml-3' href={post.acf.amazon_link} target='blank'>Ali Express</a>[m
[31m-                                                        </div>[m
[32m+[m[32m                    <div className="row">[m
[32m+[m[32m                        {[m
[32m+[m[32m                            allproduct.map((post) => {[m
[32m+[m[32m                                return ([m
[32m+[m[32m                                    <div className="col-md-4 p-2" key={post.id}>[m
[32m+[m[32m                                        <div className="card">[m
[32m+[m[32m                                            <Link href='/[slug]' as={`/${post.slug}`}><a className='text-decoration-none card-header text-body'><h6 >{post.title.rendered}</h6></a></Link>[m
[32m+[m[32m                                            <div className="card-body p-0">[m
[32m+[m[32m                                                <img src={post.better_featured_image.source_url} className="card-img-top" alt={post.better_featured_image.alt_text} />[m
[32m+[m[32m                                                <p className="card-text my-1 p-2 text-justify pro_desc">{post.acf.description}</p>[m
[32m+[m[32m                                                <div className='card-footer p-2'>[m
[32m+[m[32m                                                    <p className='font-weight-bold text-secondary'>Price : ${post.acf.price} </p>[m
[32m+[m[32m                                                    <div className=''>[m
[32m+[m[32m                                                        <a