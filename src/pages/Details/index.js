import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import InforUser from '~/components/InforUser';
import Comment from '~/components/Comment';
import ShowComment from '~/layouts/components/ShowComments';
import styles from './Details.module.scss';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Details() {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [videos, setVideos] = useState([]);
    const params = useParams();
    const [details, setDetails] = useState([{}]);
    const [infor, setInfor] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`http://localhost:3001/api/video/${params.uniqueId}/${params.id}`)
                .then((res) => res.json())
                .then((details) => setDetails(details));
        };
        const fetchdata = async () => {
            const data = await fetch(`http://localhost:3001/api/profile/details/${params.uniqueId}`)
                .then((res) => res.json())
                .then((infor) => setInfor(infor));
        };
        fetchData().catch(console.error);
        fetchdata().catch(console.error);
    }, []);

    // console.log(details);

    console.log(infor);

    // const http = infor.avatarLarger.split(':')[0];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('cancel')}>
                    <p>
                        <Link to={'/'}>
                            <FontAwesomeIcon icon={faCircleXmark} style={{ fontSize: '35px', color: 'white' }} />
                        </Link>
                    </p>
                </div>
                <div style={{ position: 'relative' }}>
                    <div className={cx('video')}>
                        <ReactPlayer
                            url={'http://localhost:3001/videos/' + details[0].videoUrl}
                            height="100%"
                            playing={true}
                            controls={true}
                        />
                    </div>
                </div>
            </div>

            <div className={cx('wrapper-user')}>
                <div className={cx('user')}>
                    <img
                        className={cx('avatar')}
                        src={
                            'http://localhost:3000/images/' + infor.profile.avatarLarger
                            // http === 'https'
                            //     ? details[0].author.avatarLarger
                            //     : 'http://localhost:3000/images/' + details[0].author.avatarLarger
                        }
                        alt="avatar"
                    />
                    <p>{infor.profile.nickName}</p>
                </div>
            </div>

            <div> {details[0].desc} </div>

            {/* <div>
                <ShowComment />
                <ShowComment />
                <ShowComment />
            </div>
            <div>
                <Comment />
            </div> */}
            {/* </div> */}
        </div>
    );
}

export default Details;
