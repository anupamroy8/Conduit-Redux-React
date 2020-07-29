import React, { Component } from "react";
import { connect } from "react-redux";
import { getSingleArticle, getSingleArticleComments } from "../store/actions";
import { NavLink } from "react-router-dom";

class SingleArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
    };
  }
  componentDidMount() {
    let { slug } = this.props.match.params;
    fetch(`https://conduit.productionready.io/api/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => this.props.dispatch(getSingleArticle(data.article)));
    fetch(`https://conduit.productionready.io/api/articles/${slug}/comments`)
      .then((res) => res.json())
      .then((data) =>
        this.props.dispatch(getSingleArticleComments(data.comments))
      );
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmitComment = (e) => {
    let { slug } = this.props.match.params;
    e.preventDefault();
    let url = `https://conduit.productionready.io/api/articles/${slug}/comments`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ comment: this.state }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.go();
      }
      return res.json();
    });
  };

  handleDelete = () => {
    let { slug } = this.props.match.params;
    let url = `https://conduit.productionready.io/api/articles/${slug}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/");
      }
      return res.json();
    });
  };

  handleDeleteComment = (id) => {
    let { slug } = this.props.match.params;
    let url = `https://conduit.productionready.io/api/articles/${slug}/comments/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.go();
      }
      return res.json();
    });
  };

  render() {
    let { article, comments, user } = this.props;
    let { slug } = this.props.match.params;
    return (
      <>
        {article.author ? (
          <div>
            <section className="singleArticle">
              <div className="container left">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <div className="flexNospace">
                  <img className="userImage" src={`${article.author.image}`} />
                  <div>
                    <a className="author" href="#">
                      {article.author.username}
                    </a>
                    <div className="date">
                      {new Date(article.updatedAt).toDateString()}
                    </div>
                  </div>
                  {user.username === article.author.username ? (
                    <span>
                      <NavLink
                        class="btn btn-outline-secondary btn-sm marginLeft"
                        to={`/editor/${slug}`}
                      >
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        Edit Article
                      </NavLink>
                      <button
                        onClick={this.handleDelete}
                        class="btn btn-outline-danger btn-sm marginLeft"
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                        Delete Article
                      </button>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>
            <section className="container page">
              <div className="row article-content">
                <div className="col-xs-12">
                  <div>
                    <p>{article.body}</p>
                  </div>
                  <ul className="tag-list">
                    {article.tagList
                      ? article.tagList.map((tag) => {
                          return <li>tag</li>;
                        })
                      : ""}
                  </ul>
                </div>
              </div>
              <hr />
              {/* comments section */}
              <div className="row">
                <div className="col-xs-12 col-md-8 offset-md-2">
                  <h3 className="left">Comments:</h3>
                  <div>
                    {user ? (
                      <form className="card comment-form">
                        <textarea
                          className="form-control"
                          placeholder="Write a comment..."
                          rows="3"
                          name="body"
                          onChange={this.handleInput}
                        ></textarea>
                        <div className="card-footer flex">
                          <img
                            src={`${user.image}`}
                            className="comment-author-img userImage"
                          />
                          <button
                            className="btn btn-sm btn-primary"
                            type="submit"
                            onClick={(e) => this.handleSubmitComment(e)}
                          >
                            Post Comment
                          </button>
                        </div>
                      </form>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {comments
                      ? comments.map((comment) => (
                          <div className="card">
                            <div className="card-block">
                              <div className="card-text leftWithMargin">
                                {comment.body}
                              </div>
                            </div>
                            <div className="card-footer flex">
                              <div>
                                <a class="comment-author" href="#">
                                  <img
                                    src={`${comment.author.image}`}
                                    className="comment-author-img userImage"
                                  />
                                </a>
                                <a className="comment-author " href="#">
                                  {comment.author.username}
                                </a>
                                <span className="date-posted marginLeft">
                                  {new Date(comment.updatedAt).toDateString()}
                                </span>
                              </div>
                              {user.username === comment.author.username ? (
                                <div>
                                  <a
                                    className="mod-options"
                                    onClick={() =>
                                      this.handleDeleteComment(comment.id)
                                    }
                                  >
                                    <i
                                      className="fa fa-trash black"
                                      aria-hidden="true"
                                    ></i>
                                  </a>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          "...Loading"
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    article: state.singleArticleReducer.article,
    comments: state.singleArticleReducer.comments,
    user: state.userReducer.user,
  };
}

export default connect(mapStateToProps)(SingleArticle);
