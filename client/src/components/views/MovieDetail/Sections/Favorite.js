import React, { useEffect } from 'react'
import { Button } from 'antd'
import Axios from 'axios';
import { response } from 'express';
function Favorite(props) {

    const userFrom = props.userFrom
    const movieId = props.movieId
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    useEffect(() => {
        let variables={
            userFrom:userFrom,
            movieId:movieId
        }
        Axios.post('/api/favorite/favoriteNumber',)
            .then(response=>{
                if(response.data.success) {

                }else{
                    alert('Favorite 숫자를 가져오는데 실패했습니다.')
                }
            })
    }, [])

    return (
        <div>
            <Button >favorite</Button>
        </div>
    )
}

export default Favorite
