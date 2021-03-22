import React from "react";

class Fields extends React.Component {
  render() {
    const fields = [];
    for (const field in this.props.data) {
      fields.push(field);
    }

    return fields.map((field, idx) => {
      return (
        <div key={idx} className={field}>
          {typeof this.props.data[field] == "object" ? (
            <Fields data={this.props.data[field]} />
          ) : (
            this.props.data[field]
          )}
        </div>
      );
    });
  }
}

export default Fields;
