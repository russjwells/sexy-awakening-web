import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import { StyleSheet, css } from 'aphrodite';
import Header from './header'


const SignUpPage = ({history}) =>
  <div className={css(styles.container)}>
    <Header />
    <div className={css(styles.content)}>
        <h1>Create your account...</h1>
        <SignUpForm history={history} />
        <p>Already have an account? <Link to={routes.SIGN_IN}>Sign In</Link></p>
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
        
        db.doCreateUser(authUser.user.uid, username, email)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            history.push(routes.LANDING);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
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
        <br />
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <br />
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <br />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <br />
        <button disabled={isInvalid} type="submit">
          I'm ready to begin...
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Are you new?
    {' '}
    <Link to={routes.SIGN_UP}>Join here</Link>
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