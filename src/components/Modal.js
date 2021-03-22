import React from "react";
import Modal from "react-bootstrap/Modal";

class entryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.data };
  }

  getFields = (arr) => {
    return arr
      .map((item) => {
        if (typeof item === "object") {
          for (const key in item) {
            return this.getFields(item[key]);
          }
        }
        return item;
      })
      .flat();
  };

  getModalBody = () => {
    const fields = this.getFields(this.props.fields);
    return fields.map((field, idx) => {
      return (
        <div key={idx} className="form-floating mb-3">
          <input
            name={field}
            type="text"
            className="form-control"
            defaultValue={this.state[field]}
            onChange={this.handleChange}
          />
          <label htmlFor={field}>{field}</label>
        </div>
      );
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
          [field]: this.state[field],
        });
      }
    });
    return obj;
  };

  render() {
    return (
      <Modal
        show={this.props.isOpen}
        centered="true"
        onHide={this.props.onCancel}
      >
        <Modal.Header>
          <Modal.Title>
            {Object.keys(this.props.data).length === 0
              ? "Add New Entry"
              : "Edit Entry"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.getModalBody()}</Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={this.props.onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.props.onSave(this.formatState())}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default entryModal;
