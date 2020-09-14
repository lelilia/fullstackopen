import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const neutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const Header = ({ title }) => <h1>{title}</h1>


  const Statistics = () => {
    const total = store.getState().good + store.getState().ok + store.getState().bad
    if (total === 0) {
      return (
        <div>
          No feedback given
        </div>
      )
    }
    return (
      <>
      <div>all {(store.getState().good - store.getState().bad)/total}</div>
      <div>positive {store.getState().good / total * 100}%</div>
      </>
    )
  }

  return (
    <div>
      <Header title={'give Feedback'}/>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <Header title={'statistics'}/>
      <Statistics/>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
