import "./CardList.css"

import { useRef, useState, useMemo, useEffect, FunctionComponent } from "react"

const CardListItem: FunctionComponent = () => {
  const refLI = useRef<HTMLLIElement>(null)

  const [width, setWidth] = useState(0)

  const imageSeed = useMemo(() => Date.now(), [])
  const imageWidth = imageSeed % 2 ? 200 : 300
  const imageHeight = imageSeed % 2 ? 300 : 200
  const imageURL = `https://picsum.photos/${imageWidth}/${imageHeight}?nocache=${imageSeed}`

  useEffect(() => {
    const handleResize = () => {
      if (refLI.current instanceof HTMLElement) {
        const offsetWidth = refLI.current.offsetWidth
        if (width !== offsetWidth) {
          setWidth(offsetWidth)
        }
      }
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <li ref={refLI}>
      <img style={{ height: width }} src={imageURL} />
      <section>
        <h3>card title</h3>
        <p>card contents</p>
      </section>
      <hr />
      <section className="user">
        <h3>User info</h3>
        <div>
          <img src={imageURL} />
          <div>
            <h4>user name</h4>
            <p>(555) 555-5555</p>
          </div>
        </div>
      </section>
    </li>
  )
}

const CardList: FunctionComponent = () => (
  <ul>
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
    <CardListItem />
  </ul>
)

export default CardList
