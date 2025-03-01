import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import '../../App.css';
import ReactCardFlip from "react-card-flip";

// eslint-disable-next-line react/prop-types
const Card = ({frontContent, backContent}) => {
    const frontRef = useRef(null);
    const backRef = useRef(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };
    const [maxHeight, setMaxHeight] = useState(0);
    const updateMaxHeight = () => {
        const frontHeight = frontRef.current ? frontRef.current.scrollHeight : 0;
        const backHeight = backRef.current ? backRef.current.scrollHeight : 0;
        setMaxHeight(Math.max(frontHeight, backHeight));
    };
    useLayoutEffect(() => {
        updateMaxHeight();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            updateMaxHeight();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        updateMaxHeight();
    }, [frontContent, backContent]);
    return (<ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            {/* front */}
            <div
                className="card card-front d-flex justify-content-center align-items-center card-min-height "
                onClick={handleClick}
                ref={frontRef}
                style={{height: maxHeight}}
            >
                {frontContent}
            </div>
            {/* back */}
            <div
                className="card card-back d-flex justify-content-center align-items-center card-min-height"
                onClick={handleClick}
                ref={backRef}
                style={{height: maxHeight}}
            >
                {backContent}
            </div>
        </ReactCardFlip>);
};

export default Card;
