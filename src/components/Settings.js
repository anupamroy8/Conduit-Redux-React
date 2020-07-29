import React, { Component } from "react";
import { connect } from "react-redux";

class Settings extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       bio: "",
  //       image: "",
  //       email: "",
  //       username: "",
  //     };
  //   }

  //   componentDidMount() {
  //     const { bio, image, username, email } = this.props.user;
  //     this.setState({ bio, image, username, email });
  //   }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleLogOut = () => {
    localStorage.clear();
    this.props.history.push("/");
  };

  render() {
    // let { bio, image, username, email } = this.state;
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Your Settings</h1>
              <form>
                {/* <div>
                  <div className="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="URL of profile picture"
                      name="image"
                      value={image}
                      onChange={this.handleInput}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={this.handleInput}
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      class="form-control form-control-lg"
                      rows="8"
                      placeholder="Short bio about you"
                      name="bio"
                      value={bio}
                      onChange={this.handleInput}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={this.handleInput}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="New Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleInput}
                    />
                  </div>
                  <button
                    className="btn btn-lg pull-xs-right btn-success publish-btn right"
                    type="submit"
                    // onClick={this.handleSubmit()}
                  >
                    Update Settings
                  </button>
                </div> */}
              </form>
              <hr />
              <button
                className="btn btn-outline-danger left"
                onClick={this.handleLogOut()}
              >
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
  };
}

export default connect(mapStateToProps)(Settings);
