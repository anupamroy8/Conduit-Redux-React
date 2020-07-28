import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../store/actions";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let url = "https://conduit.productionready.io/api/users/login";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: this.state }),
    })
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("/");
        } else {
          this.setState({ error: "Something went wrong!" });
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.dispatch(setUser(user));
        user && localStorage.setItem("authToken", user.token);
      });
  };

  render() {
    let { email, password, error } = this.state;

    return (
      <>
        <div className="center signinform formcontainer">
          <h1>Sign In</h1>
          <Link to="/register" className="textcolor">
            Need an account?
          </Link>
          {/* <form className="signinform formcontainer" onClick={this.handleSubmit}> */}
          <input
            type="text"
            onChange={this.handleInput}
            name="email"
            className="form-control form-control-lg"
            placeholder="Email"
            value={email}
          />
          <br />
          <input
            type="text"
            name="password"
            onChange={this.handleInput}
            className="form-control form-control-lg"
            placeholder="Password"
            value={password}
          />
          <br />
          <p className="bg-warning">{error && error}</p>
          <input
            className="btn btn-success"
            type="submit"
            value="Sign In"
            onClick={this.handleSubmit}
          />
          {/* </form> */}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}
export default connect(mapStateToProps)(SignIn);
