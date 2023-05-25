import Video from '~/layouts/components/Video';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useMemo, useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const [videos, setVideos] = useState([]);
    const url = process.env.REACT_APP_LOCALHOST
    useEffect(() => {
        fetch(url+'/api/video')
            .then((res) => res.json())
            .then((data) => setVideos(data));
    }, []);

    return (
        <div className={cx('wrapper')}>
            {videos.map((video) => (
                <Video key={video.id} data={video} />
            ))}
        </div>
    );
}

export const useElementOnScreen = (options, targetRef) => {
    const [isVisibile, setIsVisible] = useState();
    const callbackFunction = (entries) => {
        const [entry] = entries; //const entry = entries[0]
        setIsVisible(entry.isIntersecting);
    };
    const optionsMemo = useMemo(() => {
        return options;
    }, [options]);
    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, optionsMemo);
        const currentTarget = targetRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [targetRef, optionsMemo]);
    return isVisibile;
};

export default Home;
