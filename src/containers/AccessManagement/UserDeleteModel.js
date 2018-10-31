import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class UserDeleteModel extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData: this.props.formData,
            deleteMsg : ''
        }
}
onSubmitDeleteData(e){
    e.preventDefault();
    //console.log(this.state.formData.privilegeName);
    this.props.deleteHandler(this.state.formData.privilegeName, e);
}

render() {
    return (
        <div>
            <Modal show={this.props.showDeleteModel} onHide={this.props.handleCloseUserModel}>
            <form onSubmit={this.onSubmitDeleteData.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.mode}Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body><h5>Are you sure you want to delete this user? </h5></Modal.Body>
                <Modal.Footer>
                    <Button type="submit"  className="btn btn-primary">Yes</Button>
                    <Button className="btn " onClick={this.props.handleCloseUserModel}>Cancel</Button>
                </Modal.Footer>
            </form>
            </Modal>
        </div>
    );
  }
}

export default UserDeleteModel;