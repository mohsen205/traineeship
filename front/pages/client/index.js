import SideBar from 'components/SideBar'
import MarketOverview from 'components/homeClients/MarketOverview'
import News from 'components/homeClients/News';

const index = ({ news }) => {
    return (
        <SideBar pageName='Home'>
            <div className="d-flex w-100 justify-content-between">
                <div className="rounded-1 bg-white p-2 w-75 me-1">
                    <News data={news} />
                </div>
                <div className="widgets">
                    <MarketOverview />
                </div>
            </div>
        </SideBar>
    )
}

export default index

export async function getStaticProps() {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=70&apiKey=${process.env.API_KEY_NEWSAPI}`)
    const data = await response.json()
    return {
        props: {
            news: data.articles
        }
    }
}