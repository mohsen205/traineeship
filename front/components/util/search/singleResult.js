import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'
const SingleResult = ({ symbol, name, exchDisp }) => {
    const router = useRouter()
    const linkParam = `${exchDisp.toUpperCase()}:${symbol.toUpperCase()}?name=${name}`
    return (
        <Link href={'/client/equites/' + linkParam} passHref>
            <tr style={{ cursor: "pointer" }}>
                <th scope="row">{symbol}</th>
                <td colSpan="2">{name}</td>
                <td>{exchDisp}</td>
            </tr>
        </Link>
    )
}

SingleResult.propTypes = {
    symbol: PropTypes.string,
    name: PropTypes.string,
    exchDiscp: PropTypes.string
}

export default SingleResult
