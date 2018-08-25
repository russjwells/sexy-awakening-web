import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';
import { StyleSheet, css } from 'aphrodite';
import { auth } from '../firebase';
import Navigation from './Navigation';
import Header from './header'


const SignUpPage = ({history}) =>
  <div className={css(styles.container)}>
    <Header />
    <div className={css(styles.content)}>
        <h1>Sign Up</h1>
        <SignUpForm history={history} />
        <p><Link to={routes.SIGN_IN}>Sign In</Link></p>
    </div>
  </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
      const {
        username,
        email,
        passwordOne,
      } = this.state;
      
      const {
          history,
      } = this.props;

      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          this.setState({ ...INITIAL_STATE });
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
  
      event.preventDefault();
  }

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      //alignItems: 'center',
      flexDirection:'column',
      backgroundColor: '#fff'
    },
    content: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        backgroundColor: '#fff'
      },
    logo:{
        width: 80,
        height: 80,
    },
  });

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};