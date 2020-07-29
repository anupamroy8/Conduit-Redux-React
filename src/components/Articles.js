import React from "react";
import Tags from "./Tags";
import uuid from "react-uuid";
import Hero from "./Hero";
import { getArticles, getTags } from "../store/actions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagName: "all",
    };
  }
  componentDidMount() {
    fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=0`)
      .then((res) => res.json())
      .then((data) => this.props.dispatch(getArticles(data.articles)))
      .catch((err) => console.log(err));
    fetch(`https://conduit.productionready.io/api/tags`)
      .then((res) => res.json())
      .then((data) => this.props.dispatch(getTags(data.tags)))
      .catch((err) => console.log(err));
  }
  handleTags = (tagName) => {
    console.log(tagName);
    if (tagName === "all") {
      this.setState({ tagName: "all" });
      fetch(`https://conduit.productionready.io/api/articles?limit=10&offset=0`)
        .then((res) => res.json())
        .then((data) => this.props.dispatch(getArticles(data.articles)))
        .catch((err) => console.log(err));
    } else {
      this.setState({ tagName });
      fetch(
        `https://conduit.productionready.io/api/articles?tag=${tagName}&limit=10&offset=0`
      )
        .then((res) => res.json())
        .then((data) => this.props.dispatch(getArticles(data.articles)))
        .catch((err) => console.log(err));
    }
  };

  // handleLike = () => {
  //   url = `https://conduit.productionready.io/api/articles/test-1-cypress-oi65qz/favorite`;
  // };

  render() {
    return (
      <>
        <Hero />
        <section className="main container">
          <div className="row">
            <article className="articles">
              <ul className="tagflex">
                <h3
                  className="globalfeed"
                  onClick={() => this.handleTags("all")}
                >
                  Global Feed
                </h3>
                {this.state.tagName !== "all" ? (
                  <h3
                    className="tagfeed"
                    onClick={() => this.handleTags(this.state.tagName)}
                  >
                    {this.state.tagName}
                  </h3>
                ) : (
                  ""
                )}
              </ul>
              <hr />

              {this.props.articles
                ? this.props.articles.map((data) => {
                    return (
                      <div key={uuid()}>
                        <div className="article-meta">
                          <div className="info">
                            <a className="imgresponsive">
                              <img
                                className="imgauthor"
                                src={data.author.image}
                                alt={data.author.username}
                              />
                            </a>
                            <div className="margin">
                              <a>
                                <div>{data.author.username}</div>
                              </a>
                              <div>{data.updatedAt}</div>
                            </div>
                          </div>
                          <div className="likes">
                            <button
                              className="likeBtn btn btn-light"
                              // onClick={this.handleLike}
                            >
                              {" "}
                              ❤️ {data.favoritesCount}
                            </button>
                          </div>
                        </div>
                        <div className="article-preview">
                          <h1>
                            <NavLink to={`/article/${data.slug}`}>
                              {data.title}
                            </NavLink>
                          </h1>
                          <p>{data.body}</p>
                          <NavLink to={`/article/${data.slug}`}>
                            Readmore...
                          </NavLink>
                          <ul className="taglist">
                            {data.tagList
                              ? data.tagList.map((tag) => {
                                  return (
                                    <a href="#" key={uuid()} className="tag">
                                      {tag}
                                    </a>
                                  );
                                })
                              : ""}
                          </ul>
                          <hr />
                        </div>
                      </div>
                    );
                  })
                : ""}
            </article>

            <Tags
              tags={this.props.tags}
              tagChange={(tag) => this.handleTags(tag)}
            />
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = ({ articleReducer, tagReducer, userReducer }) => {
  return {
    articles: articleReducer.articles,
    tags: tagReducer.tags,
    user: userReducer.user,
  };
};

export default connect(mapStateToProps)(Articles);
