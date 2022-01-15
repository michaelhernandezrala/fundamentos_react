import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/sections/Login/Login';
import AdvertsPage from './components/sections/AdvertsPage/AdvertsPage';
import AdvertPage from './components/sections/AdvertPage/AdvertPage';
import NewAdvertPage from './components/sections/NewAdvertPage/NewAdvertPage';
import { useState } from 'react';
import { AuthContextProvider } from './utils/context';
import PrivateRoute from './utils/PrivateRoute';

function App({ isInitiallyLogged }) {

  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false)
  }

  return (
    <Router>
      <AuthContextProvider value={{ isLogged, handleLogin, handleLogout }}>
        <div className="App">
          <Switch>
            <Route path='/login'>
              {routeProps => <Login {...routeProps}/>}
            </Route>
            <PrivateRoute path='/adverts/new'>
              <NewAdvertPage/>
            </PrivateRoute>
            <Route path='/adverts/:advertId'>
              {routeProps => (
                <AdvertPage {...routeProps}/>
              )}
            </Route>
            <Route path='/adverts' component={AdvertsPage}/>
            <Route exact path='/'>
              <Redirect to='/adverts'/>
            </Route>
            <Route path="/404">
              <div>404 | Not Found Page</div>
            </Route>
            <Route>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
