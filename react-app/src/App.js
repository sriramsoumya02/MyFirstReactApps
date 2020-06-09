import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import auth from './services/authService';
import NavbarMovies from './components/navbarMovies';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import Login from './components/login';
import Register from './components/register';
import NewMovie from './components/newMovie';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';
class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    console.log(user);
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <NavbarMovies user={user} />
        <div className="content mt-5">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            {/* <Route path="/movies/new" component={NewMovie} /> */}
            {/* <Route
              path="/movies/:_id"
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                return <NewMovie {...props} />;
              }}
            /> */}
            <ProtectedRoute path="/movies/:_id" component={NewMovie} />
            <Route
              path="/movies"
              exact
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
