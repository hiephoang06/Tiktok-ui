import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import InforUser from '~/components/InforUser';
import styles from './ShowComments.module.scss';

const cx = classNames.bind(styles);

function ShowComment() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div>
                    <InforUser />
                </div>
                <div className={cx('comment')}>
                    vieset j dossssssssssssssssssssssssss
                    <div className={cx('text')}>
                        <FontAwesomeIcon icon={faHeart} />
                        <span>0</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowComment;
