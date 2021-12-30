import React from "react";
import "../navbar/Topbar.scss";
import { InputText } from "primereact/inputtext";

class Searchbar extends React.Component {
  state = { term: "" };

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.term);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              type="text"
              value={this.state.term}
              onChange={(e) => this.setState({ term: e.target.value })}
              placeholder="Search"
              className="nav-search"
            />
          </span>
        </form>
      </div>
    );
  }
}

export default Searchbar;
