import React from "react"
import ReactDOM from "react-dom"

import App from "./App"

function createContainerElement(containerId: string): HTMLElement {
  const oldContainerElement = document.getElementById(containerId)
  if (oldContainerElement) {
    document.body.removeChild(oldContainerElement)
  }
  const containerElement = document.createElement("div")
  containerElement.id = containerId
  document.body.appendChild(containerElement)
  return containerElement
}

function renderApp(containerId: string) {
  const appContainer = createContainerElement(containerId)
  ReactDOM.render(React.createElement(App), appContainer)
}

renderApp("react-app")
