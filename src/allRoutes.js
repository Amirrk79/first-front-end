import { Switch , BrowserRouter as Router } from 'react-router-dom';
import SignUp from './Components/SignUp/signUp';
import MainMenu from './Components/MainMenu/mainMenu';
import Dashboard from './Components/Dashboard/dashboard';
import Login from './Components/Login/login';
import Settings from './Components/Settings/settings';
import './App.css';
import { signUp , login , dashboard , settings } from './Components/routePaths';
import { UnProtectedRoute , ProtectedRoute } from './Components/protectRoutes';


function App() {
  return(
    <div>
      <Router>
        <Switch>
          <ProtectedRoute path={settings} component={Settings} />
        <ProtectedRoute path={dashboard} component={Dashboard} />
          <UnProtectedRoute path={signUp} component={SignUp} /> 
          <UnProtectedRoute path={login} component={Login} />
          <UnProtectedRoute path='/' component={MainMenu} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
