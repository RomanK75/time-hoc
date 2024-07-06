import moment from 'moment';
import React, {useState,useMemo} from 'react';

type VideoItem = {
    url: string,
    date: string
}
type VideoListProps = {
    list: VideoItem[]
}

type DateTimeProps = {
    date: string
}

// HOC withPrettyDate
const withPrettyDate = (WrappedComponent: React.FC<DateTimeProps>) => {
  return (props: DateTimeProps) => {
    const { date } = props;
    const now = moment();
    const dateTime = moment(date, 'YYYY-MM-DD HH:mm:ss');
    const diffMinutes = now.diff(dateTime, 'minutes');

    const timeStamp = useMemo(() => {
      if (diffMinutes < 60) {
        return `${diffMinutes} минут назад`;
      } else if (diffMinutes < 24 * 60) {
        return `${Math.floor(diffMinutes / 60)} часов назад`;
      } else {
        return `${dateTime.diff(now, 'days')} дней назад`;
      }
    }, [diffMinutes, dateTime, now]);
    const prettyDate = timeStamp.replace('-','')
    const propsWithPrettyDate = { ...props, date: prettyDate };

    return <WrappedComponent {...propsWithPrettyDate} />;
  };
};

// Компонент DateTime
const DateTime: React.FC<DateTimeProps> = ({ date }) => (
  <p className="date">{date}</p>
);

// Обернутый компонент DateTimePretty
const DateTimePretty = withPrettyDate(DateTime);


// Компонент Video
function Video(props:VideoItem) {
  return (
    <div className="video">
      <iframe src={props.url} allow="autoplay; encrypted-media; fullscreen"></iframe>
      <DateTimePretty date={props.date} />
    </div>
  );
}

function VideoList(props:VideoListProps) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/lyh2kAjcmSY?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2020-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}