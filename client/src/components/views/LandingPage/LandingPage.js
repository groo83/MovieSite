import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL,API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';


function LandingPage() {
    const [Movies, setMovies] = useState([])

    const [MainMovieImage, setMainMovieImage] = useState(null)

    // movie api에서 데이터가져옴
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetch(endpoint)
            .then(response=>response.json()) //.json메소드를 이용해서 사용해야함
            .then(response =>{
                console.log(response)
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
                    <Row gutter={[16,16]}> {/* 사진사이여백 */}
                        {console.dir(Movies[0]) }{/* Movies가 Array lenth 1로되어있고 0번째에 20개 데이터 있어서 [0]으로 수정 */}
                        {Movies[0] && Movies[0].map((movie,index)=>(
                            <React.Fragment key={index}>
                                <GridCards  
                                    image={movie.poster_path ? 
                                        `${IMAGE_BASE_URL}w500${movie.poster_path}`: null }   
                                    movieId={movie.id}
                                    movieName={movie.original_title}
                                    
                                />

                            </React.Fragment>
                        ))}
                        
                    </Row>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button >Load More</button>
                </div>

            </div>


        </>
    )
}

export default LandingPage
