import Home from "components/Home/index"
import SecurePage from "components/util/securePage"


const index = () => {
  return (
    <SecurePage>
      <Home />
    </SecurePage>
  )
}

export default index