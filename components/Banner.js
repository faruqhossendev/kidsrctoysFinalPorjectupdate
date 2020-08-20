

const Banner = ({banner}) => {
    return (
        <div className='container'>
            <div className='banner_photo'>
                <a href={banner.acf.banner_url} target='_blank'><img src={banner.acf.banner_image.url} alt={banner.acf.banner_image.alt} /></a>
            </div>
        </div>
    );
};

export default Banner;