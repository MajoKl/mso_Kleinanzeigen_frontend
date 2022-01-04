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
      <form onSubmit={this.onFormSubmit}>
        <span className="p-input-icon-left navbar-search-span">
          <i className="pi pi-search" />
          <InputText
            type="text"
            value={this.state.term}
            onChange={(e) => this.setState({ term: e.target.value })}
            placeholder="Suchen"
            className="navbar-search-input"
          />
        </span>
      </form>
    );
  }
}

export default Searchbar;
