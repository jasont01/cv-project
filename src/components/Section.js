import React from "react";
import { v4 as uuid } from "uuid";
import Entry from "./Entry";
import AddBtn from "./AddBtn";

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      isGeneral: this.props.id === 0,
    };
  }

  componentDidMount = () => {
    if (this.state.isGeneral) this.createEntry();
  };

  createEntry = () => {
    this.setState({
      entries: this.state.entries.concat(uuid()),
    });
  };

  deleteEntry = (id) => {
    const arr = this.state.entries;
    arr.splice(arr.indexOf(id), 1);
    if (this.state.isGeneral) arr.unshift(uuid());
    this.setState({ entries: arr });
  };

  formatState = (arr = this.props.fields) => {
    const obj = {};
    arr.forEach((field) => {
      if (typeof field === "object") {
        for (const key in field) {
          Object.assign(obj, { [key]: this.formatState(field[key]) });
        }
      } else {
        Object.assign(obj, {
          [field]: field,
        });
      }
    });
    return obj;
  };

  render() {
    const { fields, title } = this.props;
    const { entries, isGeneral } = this.state;

    return (
      <div className={title + " section mb-5"}>
        <h3 className="section-header">{title}</h3>
        <hr />
        {entries.map((entry) => {
          return (
            <Entry
              key={entry}
              id={entry}
              initialData={isGeneral ? this.formatState(fields) : {}}
              fields={fields}
              remove={this.deleteEntry}
              showModal={isGeneral ? false : true}
              isGeneral={isGeneral}
            />
          );
        })}
        <AddBtn onClick={this.createEntry} />
      </div>
    );
  }
}

export default Section;
