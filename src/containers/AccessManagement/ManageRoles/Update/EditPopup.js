import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class EditPopUp extends Component {
    constructor(props, context) {
        super(props, context);
            this.onChangRoleName = this.onChangRoleName.bind(this);
            this.onChangeDescription = this.onChangeDescription.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.renderMultiSelect = this.renderMultiSelect.bind(this);
            this.onCheckboxChange = this.onCheckboxChange.bind(this);

            this.state = {
                formData: this.props.formData,
            }
    }
    
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }

    onChangRoleName(e){
        this.setState({
            formData: {
                ...this.state.formData,
                roleName: e.target.value
            }
        });
    }
    onChangeDescription(e){
        this.setState({
            formData: {
                ...this.state.formData,
                description: e.target.value
            }
        });
    }
    onCheckboxChange(e) {
        const index = e.target.value;
        const tempArr = [...this.state.formData.selectedPrevileges];
        tempArr[index] = !tempArr[index];
        this.setState({
            formData: {
                ...this.state.formData,
                selectedPrevileges: tempArr,
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.props.mode === 'Edit') {
            const postData = {
                roleName: this.state.formData.roleName,
                description: this.state.formData.description,
                privileges: this.state.formData.privileges.map((privilege, index) => {
                    if(this.state.formData.selectedPrevileges[index]) {
                        return privilege.privilegeName;
                    }
                }),
            }
            this.props.onEditSubmit(postData);
        } else {
            const postData = {
                roleName: this.state.formData.roleName,
                description: this.state.formData.description,
                privileges: this.state.formData.privileges.map((privilege, index) => {
                    if(this.state.formData.selectedPrevileges[index]) {
                        return privilege.privilegeName;
                    }
                }),
            }
            this.props.onAddSubmit(postData);
        }
    }

    renderMultiSelect() {
        const dropCategoryList = this.state.formData.privileges.map( (arrPrevigs, index) => {
          return (
            <li key={arrPrevigs.privilegeName}>
              <input
                type="checkbox"
                value={index}
                checked={this.state.formData.selectedPrevileges[index]}
                onChange={this.onCheckboxChange}
              />
              { arrPrevigs.privilegeName }
            </li>
          );
        })
        return (
          <ul className="addrole-selectdrop">
            { dropCategoryList }
          </ul>
        );
      }

    render() {
        return(
            <div className="clearfix">
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                <form onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.mode} Role</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="well margin-none">
                        <div className="clearfix ">
                        <div className="form-group">
                            <label>Role Name <i className="input-require">*</i></label>
                            <input type="text" name="rolename" className="form-control" placeholder="Role Name" required
                                onChange={this.onChangRoleName}
                                value={this.state.formData.roleName}
                                disabled={this.props.mode === 'Edit'}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" name="description" className="form-control" placeholder="Description"
                                onChange={this.onChangeDescription} 
                                value={this.state.formData.description}
                                />
                        </div>

                        <div className="form-group">
                            <label>Privileges</label>
                            { this.renderMultiSelect() }
                        </div>
                        
                        <div className="managerole-btns clearfix">
                        </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" className="btn btn-primary">Submit</Button>
                        <Button className="btn " onClick={this.props.handleClose}>Cancel</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default EditPopUp;