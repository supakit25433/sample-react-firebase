import React from 'react'
import auth from '../firebase'

class RegisterForm extends React.Component {

  logout = e => {
    e.preventDefault()
    auth.signOut().then(response => {
      this.setState({
        currentUser: null
      })
    })
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user
        })
      }
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      currentUser: null
    }

  }

  onChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => { }).then((u) => { console.log(u) }).catch((error) => {
      console.log(error);
    })
  }

  render() {
    const { message, currentUser } = this.state

    if (currentUser) {
      return (
        <div>
          <p>Hello {currentUser.email}</p>
          <button onClick={this.logout}>Logout</button>
        </div>
      )
    }

    return (
      <section className="section container">
        <div className="colums is-centered">
          <div className="column is-half">
            <form onSubmit={this.onSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input className="input" type="email" name="email" onChange={this.onChange} />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input" type="password" name="password" onChange={this.onChange} />
                </div>
              </div>

              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input className="input" type="text" name="firstName" onChange={this.onChange} />
                </div>
              </div>

              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input className="input" type="text" name="lastName" onChange={this.onChange} />
                </div>
              </div>

              {message ? <p className="help is-danger">{message}</p> : null}

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link">Sign up</button>
                </div>
                <div className="control">
                  <button className="button is-text">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default RegisterForm