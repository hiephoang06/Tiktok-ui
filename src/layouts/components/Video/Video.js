import { faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useRef, useState, useEffect } from 'react';
import styles from './Video.module.scss';
import { useElementOnScreen } from '~/pages/Home';
import { Link } from 'react-router-dom';
import InforUser from '~/components/InforUser';
import FollowBtn from '~/components/FollowBtn';
// import PropTypes from 'prop-types';

import ReactPlayer from 'react-player';

const cx = classNames.bind(styles);

const VideoContent = ({ videoUrl, likeCount, commentCount, author, desc, _id }) => {
    const videoRef = useRef();
    const [playing, setPlaying] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const [like, setLike] = useState(Number(likeCount));

    const handleLike = () => {
        setIsLike((current) => !current);
        isLike ? setLike((prev) => prev - 1) : setLike((prev) => prev + 1);
    };

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    };
    const isVisibile = useElementOnScreen(options, videoRef);

    useEffect(() => {
        if (isVisibile) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisibile]);

    return (
        <div>
            <div>{desc}</div>
            <div className={cx('Video-content')}>
                <div>
                    {/* <ReactPlayer
                        ref={videoRef}
                        url={'http://localhost:3000/videos/' + videoUrl}
                        width="500px"
                        height="560px"
                        playing={true}
                        controls={true}
                        loop={true}
                    /> */}
                    <video
                        className={cx('video')}
                        src={'http://localhost:3001/videos/' + videoUrl}
                        ref={videoRef}
                        controls={true}
                        loop={true}
                    />
                </div>
                <div className={cx('icon')}>
                    <div className={cx('text')}>
                        <div className={cx('around')} onClick={handleLike}>
                            {isLike ? (
                                <FontAwesomeIcon icon={faHeart} className={cx('heart')} />
                            ) : (
                                <FontAwesomeIcon icon={faHeart} />
                            )}
                        </div>
                        <span>{like}</span>
                    </div>
                    <div className={cx('text')}>
                        <div className={cx('around')}>
                            <Link to={'/details/' + author._id + '/' + _id}>
                                <FontAwesomeIcon icon={faCommentDots} />
                            </Link>
                        </div>
                        <span>{commentCount}</span>
                    </div>
                    <div className={cx('text')}>
                        <div className={cx('around')}>
                            <FontAwesomeIcon icon={faShare} />
                        </div>
                        <span>0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Video({ data }) {
    return (
        <div className={cx('video-wrapper')}>
            <div className={cx('info')}>
                <InforUser {...data} />
                <FollowBtn />
            </div>

            <VideoContent {...data} />
        </div>
    );
}

// Video.propTypes = {
//     data: PropTypes.object.isRequired,
// };

export default Video;
