import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Articles from "./Articles";
import Signin from "./Signin";
import Signup from "./Signup";
import Error from "./Error";
import Loader from "./Loader";
import NewPost from "./NewPost";
import SingleArticle from "./SingleArticle";
import { setUser } from "../store/actions";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

class App extends React.Component {
  componentDidMount() {
    if (localStorage.authToken) {
      let url = "https://conduit.productionready.io/api/user";
      fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Token ${localStorage.authToken}`,
        },
      })
        .then((res) => res.json())
        .then(({ user }) => this.props.dispatch(setUser(user)));
    }
  }

  // updateLoggedIn = (status) => {
  //   this.setState({ isLoggedIn: status });
  // };

  render() {
    let { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Loader />;
    }
    return (
      <>
        <Header />
        <Switch>
          <Route path="/" component={Articles} exact />
          <Route path="/login" component={Signin} exact />
          <Route path="/register" component={Signup} />
          <Route path="/newpost" component={NewPost} />
          <Route path="/article/:slug" component={SingleArticle} />
          <Route component={Error} />
        </Switch>
        <Footer />
      </>
    );
  }
}

function mapStateToProps({ userReducer }) {
  return { ...userReducer };
}
export default connect(mapStateToProps)(App);
