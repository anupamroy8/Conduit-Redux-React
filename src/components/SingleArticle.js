import React, { Component } from "react";
import { connect } from "react-redux";
import { getSingleArticle } from "../store/actions";

class SingleArticle extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {};
  //   }
  componentDidMount() {
    let { slug } = this.props.match.params;
    fetch(`https://conduit.productionready.io/api/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => this.props.dispatch(getSingleArticle(data.article)));
    fetch(
      `https://conduit.productionready.io/api/articles/title-7krtlm/comments`
    )
      .then((res) => res.json())
      .then((data) => console.log(data, "comments"));
  }

  render() {
    let article = this.props.article;
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
                  <span>
                    <a
                      class="btn btn-outline-secondary btn-sm marginLeft"
                      href="#"
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                      Edit Article
                    </a>
                    <button class="btn btn-outline-danger btn-sm marginLeft">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                      Delete Article
                    </button>
                  </span>
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
  return { article: state.singleArticleReducer.article };
}

export default connect(mapStateToProps)(SingleArticle);
