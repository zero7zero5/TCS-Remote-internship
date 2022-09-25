import React, { Component } from "react";
import { getProjects, deleteProject } from "../services/projects";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
class Home extends Component {
  state = {
    data: [],
  };
  async componentDidMount() {
    let { data } = await getProjects();
    this.setState({ data });
  }
  handleDelete = async (id) => {
    let s = [...this.state.data];
    let data = s.filter((i) => i._id !== id);
    this.setState({ data });
    await deleteProject(id);
    toast.success("Project Deleted", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };
  render() {
    return (
      <div className="container">
        {!this.props.user && (
          <h3 className="my-3 text-center">Login To See Projects</h3>
        )}
        {this.props.user && (
          <React.Fragment>
            <h3 className="my-3 text-center">Available Projects</h3>
            <Link to="/new">
              <button className="btn btn-primary">New Project</button>
            </Link>
            {this.state.data.map((item) => (
              <div className="card text-center m-3">
                <div className="card-header">SWON NO :{item.swon}</div>
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <button className="btn btn-success">Edit</button>
                  <button className="btn btn-warning mx-2">
                    Genrate Report
                  </button>
                  <button
                    onClick={() => this.handleDelete(item._id)}
                    className="btn btn-danger "
                  >
                    Delete
                  </button>
                </div>
                <div className="card-footer">
                  <p>
                    Budget :{" "}
                    <span className="text-primary font-weight-bold">
                      $ {item.budget}
                    </span>
                  </p>
                  <p>
                    Status :{" "}
                    <span className="text-danger font-weight-bold">
                      {item.status.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Home;
