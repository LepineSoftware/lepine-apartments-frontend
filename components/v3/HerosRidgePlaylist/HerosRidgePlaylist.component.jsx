import { useState, useEffect } from "react";

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import {  EffectFade, Pagination, Grid } from 'swiper';

const HerosRidgePlaylist = ({ playlist }) => {
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

    const parseTitle = (t) => t.replace(`Hero’s Ridge `, '').replace('– ', '').replace(/[0-9-–]/g, '').replace(/ +(?= )/g,'').replace(`Hero's Ridge `, '');
    const parseDate = (t) => t.replace(`Hero’s Ridge `, '').replace('– ', '').split(' ')[0];

    const [swiper, setSwiper] = useState(null);

        return (
            <div className="herosRidgePlaylist__container sp">
                <div className="contentWrapper" data-wrapper="xl">
                    <h2>Meet the Heroes</h2>
                </div>

                <div className="contentWrapper herosRidgePlaylist" data-wrapper="xl">
                    <div className="contentWrapper herosRidgePlaylist__embed" data-wrapper="xl">
                        <iframe src={`https://www.youtube.com/embed/${playlist.items[currentHeroIndex].contentDetails.videoId}`} frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        <h3>{parseTitle(playlist.items[currentHeroIndex].snippet.title)}</h3>
                        <p className="herosRidgePlaylist__description">{(playlist.items[currentHeroIndex].snippet.description)}</p>
                    </div>

                    <div className="herosRidgePlaylist__selector">
                        <Swiper
                            slidesPerView="auto"
                            spaceBetween={25}
                            pagination={{
                                clickable: true,
                                type: 'progressbar'
                            }}
                            onActiveIndexChange={(e) => console.log(e)}
                            slidesPerGroup={1}
                            modules={[Grid, Pagination]}
                            className="herosRidgePlaylist__swiper"
                            centerMode={true}
                            breakpoints={{
                                1280: {
                                    grid: {
                                        rows: 4,
                                        fill: 'column'
                                    },
                                    slidesPerView: 2,
                                    centerMode: false
                                },
                            }}
                        >
                                {playlist.items.map((video, i) => {
                                    if (video.status.privacyStatus !== "private") {
                                        const styles = {
                                            backgroundImage: `url('${video.snippet.thumbnails.high.url}')`,
                                            backgroundPosition: 'center',
                                            backgroundSize: '140%',
                                            backgroundRepeat: 'no-repeat'
                                        };
    
                                        const classes = ['herosRidgePlaylist__selector--item'];
                                        currentHeroIndex === i && classes.push('active');
        
                                        return (
                                            <SwiperSlide key={i}>
                                                <div className={classes.join(' ')} key={i} onClick={() => { setCurrentHeroIndex(i) }}>
                                                    <div className="herosRidgePlaylist__selector--overlay" style={styles} />
                                                    <div className="herosRidgePlaylist__selector--gradient" />
                                                    <p className="herosRidgePlaylist__selector--title">{parseTitle(video.snippet.title)}</p>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    }
                                })}
                        </Swiper>
                    </div>
                </div>
            </div>
        );
    }

export default HerosRidgePlaylist;