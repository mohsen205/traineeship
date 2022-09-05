import New from './New'
const Posts = ({ data }) => {
    return (
        <div className="row">
            {
                data.map((d, number) => {
                    return (
                        <New key={number} title={d.title}
                            image={d.urlToImage}
                            source={d.source.name}
                            url={d.url} />
                    )
                })
            }
        </div>
    )
}
export default Posts