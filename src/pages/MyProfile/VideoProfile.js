import classNames from "classnames/bind";
import style from "./myProfile.module.scss"
import { Link } from "react-router-dom";

const cx = classNames.bind(style)

function VideoProfile({data}) {
    console.log(data)
    return ( <>
    <Link to={'/details/' + data.author._id + '/' + data._id}>
        <video
            className={cx('video')}
            src={'http://localhost:3001/videos/' + data.videoUrl}
            controls={true}
            loop={true}
        />
    </Link>
    </> );
}

export default VideoProfile;