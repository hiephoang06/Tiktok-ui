import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './InforUser.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function InforUser({ author }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const { avatarLarger, nickName, uniqueId } = author;
    const http = avatarLarger.split(':')[0];

    // console.log(http);

    const handleFollow = () => {
        setIsFollowing((current) => !current);
    };

    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src={http === 'https' ? avatarLarger : 'http://localhost:3001/images/' + avatarLarger}
                alt="avatar"
            />
            <div className={cx('infor')}>
                <div>
                    <Link to={'@' + author.uniqueId}>
                        <strong className={cx('name-user')}> {uniqueId}</strong>
                    </Link>

                    <a href="#"> {nickName}</a>
                </div>
            </div>
        </div>
    );
}

export default InforUser;
