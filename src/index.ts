// https://babeljs.io/docs/en/babel-polyfill (🚨 As of Babel 7.4.0. babel-polyfill has been deprecated)
// https://github.com/zloirock/core-js (ECMAScript features)
// https://github.com/facebook/regenerator (to transpile generator functions)
import "core-js"
import "regenerator-runtime/runtime"

import React from "react"
import ReactDOM from "react-dom"

import App from "./App"
import CardList from "./CardList"

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
  ReactDOM.render(React.createElement(CardList), appContainer)
}

renderApp("react-app")
