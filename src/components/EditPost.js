import React, { Component } from "react";
import { connect } from "react-redux";

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: "",
    };
  }
  componentDidMount() {
    const { title, body, description, tagList } = this.props.article;

    this.setState({ title, body, description, tagList });
  }

  handleInput = ({ target: { name, value } }) => {
    if (name === "tagList") {
      let arr = value.trim().split(",");
      this.setState({ [name]: arr });
    }
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    let { slug } = this.props.match.params;
    console.log(slug);
    e.preventDefault();
    let url = `https://conduit.productionready.io/api/articles/${slug}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ article: this.state }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.goBack();
      }
      return res.json();
    });
  };

  render() {
    let { description, title, tagList, body } = this.state;
    return (
      <div>
        <form className="formcontainer">
          <div className="form-group ">
            <input
              type="text"
              name="title"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Article Title"
              onChange={this.handleInput}
              value={title}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="description"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="What's this article about?"
              onChange={this.handleInput}
              value={description}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="body"
              id="exampleFormControlTextarea1"
              rows="5"
              placeholder="Write your article"
              onChange={this.handleInput}
              value={body}
            ></textarea>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="tagList"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter tags"
              onChange={this.handleInput}
              value={tagList}
            />
          </div>
          <button
            class="btn btn-lg pull-xs-right btn-success publish-btn"
            type="submit"
            onClick={(e) => this.handleSubmit(e)}
          >
            Edit Article
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    article: state.singleArticleReducer.article,
  };
}

export default connect(mapStateToProps)(EditPost);
