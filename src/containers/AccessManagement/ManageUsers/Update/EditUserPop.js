import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class EditUserPopUp extends Component {
    constructor(props, context) {
        super(props, context);
            this.onChangUserName = this.onChangUserName.bind(this);
            this.onChangeUserRole = this.onChangeUserRole.bind(this);
            this.UserManageSubmit = this.UserManageSubmit.bind(this);
            this.renderMultiSelect = this.renderMultiSelect.bind(this);
            this.onCheckboxChange = this.onCheckboxChange.bind(this);

            this.state = {
                formData: this.props.formData
            }
    }
    
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }

    onChangUserName(e){
        this.setState({
            formData: {
                ...this.state.formData,
                userName: e.target.value
            }
        });
    }
    onChangeUserRole(e){
        this.setState({
            formData: {
                ...this.state.formData,
                roles: e.target.value
            }
        });
    }
    onCheckboxChange(e) {
        const index = e.target.value;
        const tempArr = [...this.state.formData.selectedUserRoles];
        tempArr[index] = !tempArr[index];
        this.setState({
            formData: {
                ...this.state.formData,
                selectedUserRoles: tempArr,
            }
        });
    }

    UserManageSubmit(e) {
        e.preventDefault();
        if(this.props.mode === 'Edit') {
            let userrolesarr = []; 
            userrolesarr.push(this.state.formData.roles);
            const userPostData = {
                userName: this.state.formData.userName,
                roles: userrolesarr,
                roles: this.state.formData.roles.map((privilege, index) => {
                    if(this.state.formData.selectedUserRoles[index]) {
                        return privilege.roleName;
                    }
                }),
                
            }
            // console.log('edit' + userPostData.userName);
            this.props.EditUserSubmit(userPostData);
        } else {
            let userrolesarr = []; 
            userrolesarr.push(this.state.formData.roles);
            const userPostData = {
                userName: this.state.formData.userName,
                roles: userrolesarr,
                roles: this.state.formData.roles.map((roles, index) => {
                    if(this.state.formData.selectedUserRoles[index]) {
                        return roles.roleName;
                    }
                }),
            }
            // console.log('add' + userPostData.roles);
            this.props.AddUserSubmit(userPostData);
        }
    }

    renderMultiSelect() {
        const dropCategoryList = this.state.formData.roles.map( (arrPrevigs, index) => {
          return (
            <li key={arrPrevigs.roleName}>
              <input
                type="checkbox"
                value={index}
                checked={this.state.formData.selectedUserRoles[index]}
                onChange={this.onCheckboxChange}
              />
              { arrPrevigs.roleName }
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
                <form onSubmit={this.UserManageSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.mode} User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="well margin-none">
                        <div className="clearfix ">
                            <div className="form-group">
                            <label>User Name <i className="input-require">*</i></label>
                            <input type="text" name="username" className="form-control" placeholder="User Name" required
                                onChange={this.onChangUserName}
                                value={this.state.formData.userName}
                                disabled={this.props.mode === 'Edit'}
                                />
                            </div>
                            <div className="form-group">
                                <label>Roles</label>
                                { this.renderMultiSelect() }
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

export default EditUserPopUp;