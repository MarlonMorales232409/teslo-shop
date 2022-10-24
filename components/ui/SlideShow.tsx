import { FC } from "react"
import { Slide } from "react-slideshow-image"
import 'react-slideshow-image/dist/styles.css';

interface Props {
    images: string[]
}

export const SlideShow: FC<Props> = ({ images }) => {
    return (
        <Slide
            easing="ease"
            indicators
            duration={700}
        >
            {
                images.map(image => {
                    const url = `/products/${image}`

                    return (
                        <div className="each-slide-effect" key={image}>
                            <div style={{ 'backgroundImage': `url(${url})` }}>
                            </div>
                        </div>
                    )
                })
            }
        </Slide>
    )
}
