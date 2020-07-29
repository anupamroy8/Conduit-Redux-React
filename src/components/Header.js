import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    let {
      isLoggedIn,
      user: { username, image },
    } = this.props;

    return (
      <div className="header">
        <nav className="flex container">
          <h1>
            <Link to="/">conduit</Link>
          </h1>
          <ul>
            {isLoggedIn ? (
              <AuthHeader username={username} image={image} />
            ) : (
              <NonAuthHeader />
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

const AuthHeader = ({ username, image }) => {
  console.log(image);
  return (
    <>
      <NavLink to="/" exact>
        Home
      </NavLink>
      <NavLink to="/newpost" activeClassName="active">
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        New Post
      </NavLink>
      <NavLink to="/settings" activeClassName="active">
        <i class="fa fa-cog" aria-hidden="true"></i>
        Settings
      </NavLink>
      <img className="userImage" src={`${image}`} />
      <NavLink to="/register" activeClassName="active ">
        {username}
      </NavLink>
    </>
  );
};
const NonAuthHeader = () => (
  <>
    <NavLink to="/" exact>
      Home
    </NavLink>
    <NavLink to="/login" activeClassName="active">
      Sign in
    </NavLink>
    <NavLink to="/register" activeClassName="active">
      Sign up
    </NavLink>
  </>
);

function mapStateToProps({ userReducer }) {
  return { ...userReducer };
}

export default connect(mapStateToProps)(Header);
