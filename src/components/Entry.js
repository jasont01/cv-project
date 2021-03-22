import React from "react";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
import Fields from "./Fields";
import Modal from "./Modal";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  saveEntry = (data) => {
    this.setState(data);
    this.toggleModal();
  };

  render() {
    const { id, fields, remove } = this.props;

    return (
      <div className="entry mb-4">
        <Fields data={this.state} />
        <div className="entry-controls">
          <EditBtn id={id} onClick={this.toggleModal} />
          <DeleteBtn id={id} onClick={remove} />
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          data={this.state}
          title="Edit Entry"
          fields={fields}
          onSave={this.saveEntry}
          onCancel={this.toggleModal}
        />
      </div>
    );
  }
}

export default Entry;
