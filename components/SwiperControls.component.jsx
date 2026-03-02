import { Fragment } from "react";

const SwiperControls = ({ swiperName, orientation }) => {
    return (
        <Fragment>
            <div className={`swiper__prev themeSVGLight ${swiperName}Prev ${orientation}`}>
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.13 19.62">
                    <g isolation="isolate">
                        <path d="m11.57,1.31c.43.43.42,1.12-.02,1.54l-5.41,5.16h12.91c.6,0,1.08.48,1.08,1.08v1.44c0,.6-.48,1.08-1.08,1.08H6.14s5.41,5.16,5.41,5.16c.44.42.44,1.11.02,1.54l-1,1c-.42.42-1.1.42-1.52,0L.32,10.57c-.42-.42-.42-1.1,0-1.52L9.05.32c.42-.42,1.1-.42,1.52,0l1,1Z" fill="#5e514d"/>
                    </g>
                </svg>
            </div>
            
            <div className={`swiper__next themeSVGLight ${swiperName}Next ${orientation}`}>
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.13 19.62">
                    <g isolation="isolate">
                        <path d="m8.56,18.3c-.43-.43-.42-1.12.02-1.54l5.41-5.16H1.08c-.6,0-1.08-.48-1.08-1.08v-1.44c0-.6.48-1.08,1.08-1.08h12.91l-5.41-5.16c-.44-.42-.44-1.11-.02-1.54l1-1c.42-.42,1.1-.42,1.52,0l8.73,8.73c.42.42.42,1.1,0,1.52l-8.73,8.73c-.42.42-1.1.42-1.52,0l-1-1Z" fill="#5e514d"/>
                    </g>
                </svg>
            </div>
        </Fragment>
    )
}

export default SwiperControls;

