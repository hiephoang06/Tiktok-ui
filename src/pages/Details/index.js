import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import InforUser from '~/components/InforUser';
import Comment from '~/components/Comment';
import ShowComment from '~/layouts/components/ShowComments';
import styles from './Details.module.scss';
import ReactPlayer from 'react-player';
import { Link, useNavigate, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function Details() {
    const navigate = useNavigate();


    // const videoRef = useRef(null);
    // const [playing, setPlaying] = useState(false);
    // const [videos, setVideos] = useState([]);
    const params = useParams();
    const [details, setDetails] = useState([{}]);
    // const [infor, setInfor] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`http://localhost:3001/api/video/${params.uniqueId}/${params.id}`)
                .then((res) => res.json())
                .then((details) => setDetails(details));
        };
        fetchData().catch(console.error);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('cancle')}>
                    <p>
                        {/* <Link to={'/'}> */}
                            <FontAwesomeIcon icon={faCircleXmark} style={{ fontSize: '35px', color: 'white' }} onClick={() => navigate(-1)} />
                        {/* </Link> */}
                    </p>
                </div>
                <div style={{ position: 'relative' }}>
                    <div className={cx('video')}>
                        <ReactPlayer
                            url={'http://localhost:3001/videos/' + details[0]?.videoUrl}
                            height="100%"
                            playing={true}
                            controls={true}
                        />
                    </div>
                </div>
            </div>

            <div>
                <VideoDetails data={details}/>
            </div>
            

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

 const VideoDetails = ({data})=>{
    const infor = data
    const user = infor[0]?.author
    const http = user?.avatarLarger.split(':')[0];
    console.log(data)
    return(<> 
        <div>
            <div className={cx('wrapper-user')}>
                <div style={{"display":"flex"}}>
                    <img
                        className={cx('avatar')}
                        src={http === 'https' ? user?.avatarLarger : 'http://localhost:3001/images/' + user?.avatarLarger}
                        alt="avatar"
                    />
                    <div style={{"marginLeft":"15px"}}>
                        <h3>{user?.uniqueId}</h3>
                        <p>{user?.nickName}</p>
                    </div>
                </div>
                <div> <p>{data[0].desc}</p> </div>
            </div>

        </div>
    </>)
}
export default Details;
