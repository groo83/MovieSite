import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL,API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';


function LandingPage() {
    const [Movies, setMovies] = useState([])

    const [MainMovieImage, setMainMovieImage] = useState(null)

    // movie api에서 데이터가져옴
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetch(endpoint)
            .then(response=>response.json()) //.json메소드를 이용해서 사용해야함
            .then(response =>{
                setMovies([response.results])
                setMainMovieImage(response.results[0])
            })

    }, [])


    return (
        // <> === <React.Fragment>
        <>
            <div style={{ width: '100%', margin: '0' }}>
                {/* api 결과받아오기전에 페이지를 렌더링해서  backdrop_path받아오지못하는 null 오류로인해 추가*/}
                {MainMovieImage &&
                    <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                        title={MainMovieImage.original_title}
                        text={MainMovieImage.overview}
                    />
                }
                <div style={{ width: '85%', margin: '1rem auto' }}>
                    <h2> Movies by latest</h2>
                    <hr/>
                    {/*Movie Grid Cards */}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button >Load More</button>
                </div>

            </div>


        </>
    )
}

export default LandingPage
