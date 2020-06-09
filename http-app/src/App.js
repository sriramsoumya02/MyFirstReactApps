import React, { Component } from 'react';
//import { ToastContainer } from 'react-toastify';
import HttpService from './services/httpService';
import config from './config.json';
import './App.css';

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await HttpService.get(config.apiBackend);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await HttpService.post(config.apiBackend, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = 'Updated';
    await HttpService.put(config.apiBackend + '/' + post.id, post);
    //HttpService.patch(config.apiBackend+'/'+post.id,{title:post.title});
    console.log('Update', post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = post;
    this.setState({ posts });
  };

  //optimistic updtae
  handleDelete = async (post) => {
    const originalposts = this.state.posts;
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
    try {
      // await HttpService.delete(config.apiBackend + '/' + post.id);
      //await HttpService.delete(config.apiBackend + '/999' + post.id);
      await HttpService.delete('s' + config.apiBackend + '/' + post.id);
      throw new Error('');
    } catch (ex) {
      //expected error 404-not fount 400- bad request -->CLIENT SIDE Errors
      //-Display a specific error
      //unexpected error(network down,server down, db down,bug)
      //-log them
      //-display a generic or friendly error message
      //ex.request,ex.response
      console.log('handle DElete catch block');
      if (ex.response && ex.response.status === 404)
        alert('This post is already deleted');
      /*else {
        console.log('logging error', ex);
        alert('An unexpected error occured');
      }*/
      this.setState({ posts: originalposts });
    }
    console.log('Delete', post);
  };

  render() {
    return (
      <React.Fragment>
        {/* <ToastContainer /> */}
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
