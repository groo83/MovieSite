import React from 'react'
import {Col} from 'antd';
function GridCards(props) {

    if(props.landingPage){
        return (
            <Col lg={6} md={8} xs={24}>{/*  key={key} width 24 large*4 medium*3  small*1 */}
                <div style={{ position: 'relative' }}>
                    <a href ={`/movie/${props.movieId}`}>
                        <img style={{ width: '100%', height: '320px' }} alt={props.movieName} src={props.image} />
                    </a>
                </div>
            </Col>
        )
    }else{
        return (
            <Col lg={6} md={8} xs={24}>{/*  key={key} width 24 large*4 medium*3  small*1 */}
                <div style={{ position: 'relative' }}>

                        <img style={{ width: '100%', height: '320px' }} alt={props.characterName} src={props.image} />

                </div>
            </Col>
        )
    }
    
}

export default GridCards
