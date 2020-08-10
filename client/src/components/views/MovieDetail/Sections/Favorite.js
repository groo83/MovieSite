import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import Axios from 'axios';

function Favorite(props) {

    const userFrom = props.userFrom
    const movieId = props.movieId
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)


    useEffect(() => {
        let variables={
            userFrom:userFrom,
            movieId:movieId
        }
        Axios.post('/api/favorite/favoriteNumber',variables)
            .then(response=>{
                if(response.data.success) {
                    //console.log(response.data)
                    setFavoriteNumber(response.data.favoriteNumber)
                }else{
                    alert('Favorite 숫자를 가져오는데 실패했습니다.')
                }
            })

        Axios.post('/api/favorite/favorited',variables)
        .then(response=>{
            if(response.data.success) {
                //console.log(response.data)
                setFavorited(response.data.favorited)
            }else{
                alert('정보를 가져오는데 실패했습니다.')
            }
        })
    }, [])

    return (
        <div>
            <Button > {Favorited ? "Not Favorite" :"Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
