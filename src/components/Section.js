import React from "react";
import { v4 as uuid } from "uuid";
import Entry from "./Entry";
import AddBtn from "./AddBtn";

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
    };
  }

  createEntry = (data) => {
    this.setState({
      entries: this.state.entries.concat(uuid()),
    });
  };

  deleteEntry = (id) => {
    const arr = this.state.entries;
    arr.splice(arr.indexOf(id), 1);
    this.setState({ entries: arr });
  };

  render() {
    return (
      <div className={this.props.title + " section mb-5"}>
        <h3 className="section-header">{this.props.title}</h3>
        <hr />
        {this.state.entries.map((entry) => {
          return (
            <Entry
              key={entry}
              id={entry}
              fields={this.props.fields}
              remove={this.deleteEntry}
            />
          );
        })}
        <AddBtn onClick={this.createEntry} />
      </div>
    );
  }
}

export default Section;
