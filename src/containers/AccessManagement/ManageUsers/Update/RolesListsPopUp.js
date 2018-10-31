import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class RolesListsPopUp extends Component {
    constructor(props, context) {
        super(props, context);
            this.renderMultiSelect = this.renderMultiSelect.bind(this);
            this.state = {
                formData: this.props.formData,
            }
    }

    renderMultiSelect() {
        //console.log(this.state.formData.selectedPrevileges);
        const rolesLists = this.state.formData.selectedUserRoles.map((preLists) => {
            return (
                <li key={preLists}> { preLists } </li>
            )
        })
        return (
          <ul className="previlege-selected-list">
            { rolesLists }
          </ul>
        );
      }

    render() {
        return(
            <div className="clearfix">
                <Modal show={this.props.showRolesExpandModel} onHide={this.props.handleClose}>
                <form onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Roles</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="well margin-none">
                        <div className="clearfix ">
                            <div className="form-group">
                                { this.renderMultiSelect() }
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn " onClick={this.props.handleClose}>Cancel</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}
export default RolesListsPopUp;