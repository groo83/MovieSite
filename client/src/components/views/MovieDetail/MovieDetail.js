import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import { Button, Row } from 'antd';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';


function MovieDetail(props) {

    //console.log(props)
    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([])

    const [Cast, setCast] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        // DOM이 로딩되면 실행할 동작

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        fetch(endpointInfo)
            .then(response=> response.json())
            .then(response=>{
                //console.log(response)
                setMovie(response)
            })

        fetch(endpointCrew)
            .then(response=> response.json())
            .then(response=>{
                //console.log(response)
                setCast(response.cast)
            })
    }, [])


    const toggleActorView = ()=>{
        setActorToggle(!ActorToggle)
    }
    return (
        <div>
        {/* Header */}
        {/* {!LoadingForMovie ?
            <MainImage
                image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />
            :
            <div>loading...</div>
        } */
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />

        }


        {/* Body */}
        <div style={{ width: '85%', margin: '1rem auto' }}>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
            </div> 

            {/* Movie Info */}
            <MovieInfo movie={Movie} />
            {/* {!LoadingForMovie ?
                <MovieInfo movie={Movie} />
                :
                <div>loading...</div>
            } */}

            <br />
            {/* Actors Grid*/}

            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                <Button onClick={toggleActorView}>Toggle Actor View </Button>
            </div>
            {ActorToggle &&
                <Row gutter={[16,16]}> {/* 사진사이여백 */}
                    
                    {Cast && Cast.map((cast,index)=>(
                        <React.Fragment key={index}>
                            <GridCards  
                                image={cast.profile_path ? 
                                    `${IMAGE_BASE_URL}w500${cast.profile_path}`: null }  
                                characterName={cast.name}
                                
                            />

                        </React.Fragment>
                    ))}
                    
                </Row>
            }
            <br />

            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
            </div> */}

            {/* Comments */}
            {/* <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} /> */}

        </div>

    </div>
    )
}

export default MovieDetail
