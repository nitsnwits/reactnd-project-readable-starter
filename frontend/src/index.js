import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/Home'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { logger } from 'redux-logger'
import { Route, BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import Header from './components/Header';
import ListPostsByCategory from './components/ListPostsByCategory';
import PostEdit from './components/PostEdit';
import PostDetail from './components/PostDetail';
import CommentEdit from './components/CommentEdit';
import PostCreate from './components/PostCreate';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger),
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <div className="app-header">
          <Header/>
        </div>
        <Route exact path="/" component={Home}/>
        <Route exact path="/:category" component={ListPostsByCategory}/>
        <Route exact path="/posts/:post/edit" component={PostEdit}/>
        <Route exact path="/posts/:post" component={PostDetail}/>
        <Route exact path="/comments/:comment/edit" component={CommentEdit}/>
        <Route exact path="/new/post" component={PostCreate}/>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
