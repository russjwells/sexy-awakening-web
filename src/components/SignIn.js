import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { StyleSheet, css } from 'aphrodite';

import Header from './header'
import phoenixred from './phoenix_red.svg';

const SignInPage = ({ history }) =>
<div className={css(styles.container)}>
    <div className={css(styles.content)}>
        <img src={phoenixred} className={css(styles.logo)} alt="logo" />
        <h1>Sexy Awakening</h1>
        <p>Explore sacred sexuality and conscious relationships in an intentional transformational space.<br/>
        Sexy Awakening is the best place online to meet new romantic interests, lovers, and friends.</p>
        <SignInForm history={history} />
        <SignUpLink />
        <PasswordForgetLink />
    </div>
</div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.LANDING);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <label>Username: </label>
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <br />
        <label>Password: </label>
        <input
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <br />
        <button disabled={isInvalid} type="submit">
          Login
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

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

export default withRouter(SignInPage);

export {
  SignInForm,
};