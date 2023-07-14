import React, {useState, useRef} from "react"
import PropTypes from "prop-types"
import LoadedImageUrl from "components/utils/loaded-image-url"

import "components/slideshow/slideshow.scss"

const Slideshow = ({images = [], imageURLs}) => {
    let [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    let [fullScreenMode, setFullScreenMode] = useState(false)

    const btnFullScreenRef = useRef(null)
    const btnCloseRef = useRef(null)
    const slideshowRef = useRef(null)

    const decrementSlide = () => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1)
        } else {
            setCurrentSlideIndex(images.length - 1)
        }
    }
    const incrementSlide = () => {
        if (currentSlideIndex < images.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1)
        } else {
            setCurrentSlideIndex(0)
        }
    }
    const changeSlide = (index) => {
        setCurrentSlideIndex(index)
    }
    const enterFullScreen = () => {
        setFullScreenMode(true)
        slideshowRef.current.focus()
    }
    const closeFullScreen = () => {
        setFullScreenMode(false)
    }
    const handleScreenClick = (event) => {
        if (!slideshowRef.current.contains(event.target)) {
            setFullScreenMode(false)
            btnFullScreenRef.current.focus()
        }
    }
    const handleKeyUp = (event) => {
        if (event.key === 'Escape') {
            setFullScreenMode(false)
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            incrementSlide()
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            decrementSlide()
        }
    }

    return (
        <>
            <button
                className="btn-slideshow-fullscreen"
                onClick={enterFullScreen}
                ref={btnFullScreenRef}
                aria-label="Enter Fullscreen"
                title="Enter Fullscreen"
            >
                <span className="icon"></span>
            </button>
            <div
                className={`inspiration-slideshow ${fullScreenMode ? 'fullscreen' : ''}`}
                onClick={(event)=>handleScreenClick(event)}
                onKeyUp={(event)=>handleKeyUp(event)}
            >
                <button
                    className="btn-slideshow-close"
                    onClick={closeFullScreen}
                    ref={btnCloseRef}
                    aria-label="Close Fullscreen"
                    title="Close Fullscreen"
                >
                    <span className="icon" aria-hidden="true"></span>
                </button>
                <div className="slideshow-container" ref={slideshowRef} aria-live="polite" aria-role={fullScreenMode ? 'application' : 'region'} aria-roledescription="Image slideshow" tabindex="-1">
                    {images.map((image, index) => {
                        const imageUrl = imageURLs ? LoadedImageUrl(imageURLs, image.src) : image.src
                        return (
                            <div className={`slide fade ${currentSlideIndex === index ? 'active' : ''}`} key={index}>
                                <div className="numbertext">{index + 1} / {images.length}</div>
                                <img src={imageUrl} alt={image.alt} style={{width: "100%"}} />
                                <div className="text">{image.caption}</div>
                            </div>
                        )
                    })}

                    <button className="prev" onClick={()=>decrementSlide()} aria-label="Previous" title="Previous">&#10094;</button>
                    <button className="next" onClick={()=>incrementSlide()} aria-label="Next" title="Next">&#10095;</button>
                </div>
                <br />

                <ul className="dots">
                    {images.map((image, index) => (
                    <li key={index}>
                        <button
                            className={`dot ${currentSlideIndex === index ? 'active' : ''}`}
                            onClick={()=>changeSlide(index)}
                            aria-label={`Go to slide ${index+1}`}
                            title={`Go to slide ${index+1}`}
                        >
                        </button>
                    </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

Slideshow.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        caption: PropTypes.string
    })),
    imageURLs: PropTypes.object
}

export default Slideshow
