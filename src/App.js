import { BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Provider } from "react-redux";
import store from "./store";
import Layout from './hocs/Layout';
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import ResetPassword from "./pages/ResetPassword";
import Activate from "./pages/Activate";
import Main from './pages/Main';
import "./index.css"
import Id from './pages/Id';
import Profile from './pages/Profile';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter history={useHistory}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/main/profile" component={Profile} />
            <Route exact path="/main/list/:id" component={Id} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm} />
            <Route exact path="/activate/:uid/:token" component={Activate} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
