type Props = {
  id: string;
  title: string;
  img: string;
  date: string;
}
export const NewsItem = (props: Props) => {
  return (
    <div className="news-item">
      <h2>{props.title}</h2>
      <img src={props.img} alt={props.title} />
      <span>{new Date(props.date).toLocaleDateString()}</span>
    </div>
  )
}
export default NewsItem;