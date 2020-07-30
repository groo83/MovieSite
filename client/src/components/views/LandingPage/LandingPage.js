import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL,API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';


function LandingPage() {
    const [Movies, setMovies] = useState([])

    const [MainMovieImage, setMainMovieImage] = useState(null)

    const [CurrentPage, setCurrentPage] = useState(0)
    // movie api에서 데이터가져옴
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetchMovies(endpoint)
    }, [])

    const fetchMovies =(endpoint)=>{

        fetch(endpoint)
            .then(response=>response.json()) //.json메소드를 이용해서 사용해야함
            .then(response =>{
                console.log(response)
                // ◇ ...response.results vs response.results
                setMovies([ ...Movies,...response.results]) // LoadMore버튼 클릭시 다음페이지 덮지않고 이어서 보기위해 ...Movies추가 
                setMainMovieImage(response.results[0])
                setCurrentPage(response.page)
            })
    }

    const LoadMoreItems = () =>{

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`;

        fetchMovies(endpoint)
    }

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
                        {console.dir(Movies) }{/* Movies가 Array lenth 1로되어있고 0번째에 20개 데이터 있어서 [0]으로 수정 */}
                        {Movies && Movies.map((movie,index)=>(
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
                    <button onClick={LoadMoreItems}>Load More</button>
                </div>

            </div>


        </>
    )
}

export default LandingPage
