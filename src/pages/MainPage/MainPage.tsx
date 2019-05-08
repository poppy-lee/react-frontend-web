import React, { useState } from "react"
import { withRouter } from "react-router"

const MainPage = withRouter(props => {
  const [pathname, setPathname] = useState(props.location.pathname)
  return (
    <div>
      <h1>{props.location.pathname}</h1>
      <input
        type="text"
        placeholder="pathname"
        value={pathname}
        onChange={event => setPathname(event.target.value)}
      />
      <button onClick={() => props.history.push(pathname)}>go</button>
    </div>
  )
})

export default MainPage
