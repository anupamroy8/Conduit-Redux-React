import React, { Component } from "react";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: "",
    };
  }

  handleInput = ({ target: { name, value } }) => {
    if (name === "tagList") {
      let arr = value.split(",");
      console.log(arr, "tagList..............");
      this.setState({ [name]: arr });
    }
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let url = "https://conduit.productionready.io/api/articles";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${localStorage.authToken}`,
      },
      body: JSON.stringify({ article: this.state }),
    }).then((res) => {
      if (res.status === 200) {
        this.props.history.push("/");
      }
      return res.json();
    });
  };

  render() {
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
            />
          </div>
          <button
            class="btn btn-lg pull-xs-right btn-success publish-btn"
            type="submit"
            onClick={this.handleSubmit}
          >
            Publish Article
          </button>
        </form>
      </div>
    );
  }
}

export default NewPost;
