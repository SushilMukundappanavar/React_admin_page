import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ReactTable from "react-table";
import { API_ROOT } from '../../../../api-config';
import 'react-table/react-table.css'
import EditUserPopUp from './EditUserPop';
import UserDeleteModel from '../../UserDeleteModel';
import RolesListsPopUp from './RolesListsPopUp';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            username: '',
            roles: [],
            // privileges: [],
            selectDropCategory: [false, false, false, false],
            selectedUserRoles: [],
            userCreateSuccessMsg: '',
            userEditSuccessMsg: '',
            userDeleteMsg: '',

            mode: 'Create',
            show: false,
            formData: {}
        }
        this.fetchUser = this.fetchUser.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onEditClicked = this.onEditClicked.bind(this);
        this.onCreateClicked = this.onCreateClicked.bind(this);

        this.EditUserSubmit = this.EditUserSubmit.bind(this);
        this.AddUserSubmit = this.AddUserSubmit.bind(this);
        this.handleCloseUserModel = this.handleCloseUserModel.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.fetchUser();

        fetch(`${API_ROOT}/roles`)
        .then(res => res.json())
        .then(grid => {
            this.state.roles = grid;
            let tempArr = [];
            for( this.gridData of grid ){
            this.state.selectDropCategory.push(this.gridData.roleName)
            tempArr.push(this.gridData);
            this.forceUpdate();
            }
        })

    }
    fetchUser() {
        fetch(`${API_ROOT}/users`)
            .then(res => res.json())
            .then(updateGrid => {
                this.data = updateGrid;
            }, error => {
                console.log(error)
            })
            .then(roleres => this.setState({
                data: roleres
            }))
    }


    handleClose() {
        this.setState({ 
            show: false,
            showRolesExpandModel: false,
        });
    }

    onRolesExpand (rolesData, index) {
        this.setState({ 
            showRolesExpandModel: true,
            formData : {
                selectedUserRoles : rolesData.original.roles
            }
        });
    }
    
    onEditClicked(editData, index) {
        this.setState({
            show: true,
            mode: 'Edit',
            formData: {
                ...editData.original,
                selectedUserRoles: this.state.roles.map((roles) => {
                    if(editData.original.roles == null){
                        return
                    }else {
                        return editData.original.roles.includes(roles.roleName);
                    }
                }),
                roles: this.state.roles
            },
        });
    }

    openUserDeleteModel(deleteData, index) {
        this.setState({
            showDeleteModel : true,
            formData: {
                privilegeName: deleteData
            }
        })
    }
    handleCloseUserModel() {
        this.setState({
            showDeleteModel: false
        });
    }

    onCreateClicked(event) {
        this.setState({ 
            show: true,
            mode: 'Create',
            formData: {
                userName: "",
                roles: [],
                selectedUserRoles: [false,false,false,false],
                roles: this.state.roles
            },
        });
    }

    AddUserSubmit(userPostData){
        fetch(`${API_ROOT}/user`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userPostData)
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response)
            this.setState({
                userCreateSuccessMsg : response
            })
            setTimeout(() => {
                this.setState({
                    userCreateSuccessMsg: false
            });
            }, 5000)
            this.setState({ show: false });
            this.fetchUser();
            this.setState({
                username: ''
                // roles: []
            })
          }, error => {
            console.log('Error Messages', error);
        });
      }

      EditUserSubmit(userPostData){
        fetch(`${API_ROOT}/user`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userPostData)
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response);
            if(response.status === 'User added successfully'){
                this.state.userEditSuccessMsg = <p className="bg-success">User has been successfully updated</p>
            }else {
                this.state.userEditSuccessMsg = <p className="bg-danger">Error : Failed to update</p>
            }
            setTimeout(() => {
                this.setState({
                    userEditSuccessMsg: false
            });
            }, 5000)
            this.setState({ show: false });
            this.fetchUser();
          }, error => { 
            console.log('Error Messages', error);
        });
      } 



    deleteHandler(user, e) {
        e.preventDefault();
        return fetch(`${API_ROOT}/user?userName=` + user.original.userName, {
                method: 'DELETE'
            })
            .then(
                response => {
                    console.log(response)
                    if(response.status == 200){
                        this.state.userDeleteMsg = <p className="bg-success">User has been successfully deleted</p>
                        this.handleCloseUserModel();
                    }else {
                        this.state.userDeleteMsg = <p className="bg-danger">Error : Failed to delete</p>
                    }
                    setTimeout(() => {
                        this.setState({
                            userDeleteMsg: false
                    });
                    }, 5000)
                    this.fetchUser()
                },
                error => {
                    console.log(error)
                }
            );
    }

    data = []
    columns = [{
        Header: 'User Name',
        accessor: 'userName',
        filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
    }, {
        width: 300,
        Header: 'Roles',
        accessor: 'roles',
        filterable: false,
        Cell: (rolesData) => (
            <button onClick={this.onRolesExpand.bind(this, rolesData)} className="btn btn-link black">{ 'roles...'}</button>
            )
    }, {
        Header: 'Created Time (GMT)',
        accessor: 'createTime',
        filterable: false
    }, {
        Header: 'Modified Time (GMT)',
        accessor: 'modifiedTime',
        filterable: false
    }, {
        width: 40,
        id: 'Edit', 
        accessor: '[row identifier to be passed to button]',
        filterable: false,
        Cell: (editData) => (
            <div className="addrol-grid-btn">
                <span className="btn-tooltip">Edit</span>
                <button onClick={this.onEditClicked.bind(this, editData)} className="btn">
                    <i className="far fa-edit icons roll-edit-icon"></i>
                </button>
            </div>
            )
    }, {
        width: 40,
        id: 'DELETE',
        accessor: '[row identifier to be passed to button]',
        filterable: false,
        Cell: (userName) => ( <
            div className = "addrol-grid-btn" >
            <span className="btn-tooltip">Delete</span>
            <button onClick = {this.openUserDeleteModel.bind(this, userName)} className = "btn">
                <i className = "far fa-trash-alt roll-edit-icon"> </i> 
            </button>
        </div>
        )
    }]

    render() {
        return ( 
            <div className = "mid-right margin-top-5" >
                { this.state.showRolesExpandModel &&
                    <RolesListsPopUp
                        formData={this.state.formData}
                        showRolesExpandModel={this.state.showRolesExpandModel}
                        handleClose={this.handleClose}>
                    </RolesListsPopUp>
                }

                { this.state.show &&
                    <EditUserPopUp
                        mode={this.state.mode}
                        show={this.state.show}
                        formData={this.state.formData}
                        handleClose={this.handleClose}
                        EditUserSubmit={this.EditUserSubmit}
                        AddUserSubmit={this.AddUserSubmit}>
                    </EditUserPopUp>
                }

                { this.state.showDeleteModel &&
                    <UserDeleteModel
                        deleteHandler={this.deleteHandler}
                        formData={this.state.formData}
                        showDeleteModel={this.state.showDeleteModel}
                        handleCloseUserModel={this.handleCloseUserModel}>
                    </UserDeleteModel>
                }

                <div className="managerole-btns clearfix">
                    <button type="text" className="btn btn-primary" onClick={this.onCreateClicked} >Create User</button>
                </div>

                <div>
                    <p className={this.state.userCreateSuccessMsg.status === 'User added successfully' ? 'bg-success success-msg' : 'bg-danger success-msg'}>{ this.state.userCreateSuccessMsg.status } { this.state.userCreateSuccessMsg.error }</p>
                    <div className="success-msg">{ this.state.userEditSuccessMsg }</div>
                    <div className="success-msg">{ this.state.userDeleteMsg }</div>
                </div>

                <ReactTable 
                    data = {this.data} 
                    columns = {this.columns} 
                    defaultPageSize = {10} 
                    minRows = {2}
                    filterable
                    defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                />
            </div>
        );
    }
}
export default UsersList;