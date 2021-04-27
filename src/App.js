import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Home from './pages/Home'
import Auth from './pages/Auth'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import SearchPage from './pages/SearchPage'
import FollowPage from './pages/FollowPage'
import BookmarksPage from './pages/BookmarksPage'
import OtherUserPage from './pages/OtherUserPage'
import TweetPage from './pages/TweetPage'
import { useContext } from 'react'
import { AuthContext } from './contexts/AuthContextProvider'

const privateRoutes = [ 
  {
    path: '/',
    component: Home
  },
  {
    path: '/tweet',
    component: TweetPage
  },
  {
    path: '/search',
    component: SearchPage
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/follow',
    component: FollowPage
  },
  {
    path: '/bookmarks',
    component: BookmarksPage
  },
  {
    path: '/other-user-page',
    component: OtherUserPage
  }
]

const publicRoutes = [ 
  {
    path: '/',
    component: Auth
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegisterPage
  }
]

function App() {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div className="App">
      <BrowserRouter>
            <Switch>
                {/* <Route path="/design-system" component={DesignSystemPage}></Route> */}
                {isAuthenticated && 
                privateRoutes.map(el => <Route exact path={el.path} component={el.component} />)}

                {!isAuthenticated && 
                publicRoutes.map(el => <Route exact path={el.path} component={el.component} />)}

                <Redirect to="/" />

                {/* <Route exact path="/" component={Auth}></Route>
                <Route exact path="/home" component={Home}></Route>
                <Route exact path="/login" component={LoginPage}></Route> */}
            </Switch>
          </BrowserRouter>
    </div>
  );
}

export default App;
