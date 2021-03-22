import React from "react";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
import Fields from "./Fields";
import Modal from "./Modal";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      newEntry: true,
      isModalOpen: this.props.showModal,
    };
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  saveEntry = (data) => {
    this.setState({ data: data, newEntry: false });
    this.toggleModal();
  };

  onCancel = () => {
    if (this.state.newEntry) this.props.remove(this.props.id);
    this.toggleModal();

    // reset modal fields
    this.setState({ data: this.state.data });
  };

  render() {
    const { id, fields, remove, initialData, isGeneral } = this.props;
    const { data, isModalOpen } = this.state;

    return (
      <div className="entry mb-4">
        <Fields
          data={
            isGeneral && Object.entries(data).length === 0 ? initialData : data
          }
        />
        <div className="entry-controls">
          <EditBtn onClick={this.toggleModal} />
          <DeleteBtn id={id} onClick={remove} />
        </div>
        <Modal
          isOpen={isModalOpen}
          data={data}
          fields={fields}
          onSave={this.saveEntry}
          onCancel={this.onCancel}
          isGeneral={isGeneral}
        />
      </div>
    );
  }
}

export default Entry;
