import React, { Component } from 'react';
// import { Button, Modal } from 'react-bootstrap';
import ReactTable from "react-table";
import { API_ROOT } from '../../../../api-config';
import 'react-table/react-table.css'

import EditPopup from './EditPopup';
import UserDeleteModel from '../../UserDeleteModel';
import PrivilegesListsPopUp from './PrivilegesListPopup';

class RolesList extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            data: [],
            rolename: '',
            description: '',
            privileges: [],
            roleCreateSuccessMsg: '',
            roleDeleteMsg: '',
            roleEditSuccessMsg: '',
            selectDropCategory: [false, false, false, false],
            selectedPrevileges: [],

            mode: 'Create',
            // mode: 'PrivilegesExpand',
            show: false,
            formData: {}
        }
        this.fetchRole = this.fetchRole.bind(this);
        this.onChange = this.onChange.bind(this);

        this.handleClose = this.handleClose.bind(this);
        this.onEditClicked = this.onEditClicked.bind(this);
        this.onCreateClicked = this.onCreateClicked.bind(this);
        
        this.onAddSubmit = this.onAddSubmit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.handleCloseUserModel = this.handleCloseUserModel.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.fetchRole();

        fetch(`${API_ROOT}/privileges`)
        .then(res => res.json())
        .then(grid => {
            this.state.privileges = grid;
            let tempArr = [];
            for( this.gridData of grid ){
            this.state.selectDropCategory.push(this.gridData.privilegeName)
            tempArr.push(this.gridData);
            this.forceUpdate();
            }
        })
    }
    fetchRole(){
        fetch(`${API_ROOT}/roles`)
            .then(res => res.json())
            .then(grid => this.data = grid )
            .then(roleres => this.setState({ data : roleres }))
    }

    handleClose() {
        this.setState({ 
            show: false,
            showPrivilegeExpandModel: false
        });
    }
    
    onPrivilegesExpand (editData, index) {
        this.setState({ 
            showPrivilegeExpandModel: true,
            formData : {
                selectedPrevileges : editData.original.privileges
            }
        });
    }
    
    onEditClicked(editData, index) {
        this.setState({ 
            show: true,
            mode: 'Edit',
            formData: {
                ...editData.original,
                selectedPrevileges: this.state.privileges.map((privilege) => {
                    if(editData.original.privileges == null){
                        return
                    }else {
                        return editData.original.privileges.includes(privilege.privilegeName);
                    }
                }),
                privileges: this.state.privileges
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
                roleName: "",
                description: "",
                selectedPrevileges: [false,false,false,false],
                privileges: this.state.privileges,
            },
        });
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onAddSubmit(postData){
        fetch(`${API_ROOT}/role`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            //console.log('Successed:', response)
            this.setState({
                roleCreateSuccessMsg : response
            })
            setTimeout(() => {
                this.setState({
                    roleCreateSuccessMsg: false
            });
            }, 5000)
            this.setState({ show: false });
            this.fetchRole();
            this.setState({
              rolename: '',
              description: ''
            })
          }, error => {
            console.log('Error Messages', error);
        });
      }

    onEditSubmit(postData){
        fetch(`${API_ROOT}/role`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            //console.log('Success:', response);
            if(response.status === 'Role added successfully'){
                this.state.roleEditSuccessMsg = <p className="bg-success">Role has been successfully updated</p>
            }else {
                this.state.roleEditSuccessMsg = <p className="bg-danger">Error : Failed to update</p>
            }
            setTimeout(() => {
                this.setState({
                    roleEditSuccessMsg: false
            });
            }, 5000)
            this.setState({ show: false });
            this.fetchRole();
          }, error => { 
            console.log('Error Messages', error);
        });
      } 
    

    deleteHandler(role, e) {
        e.preventDefault();
        return fetch(`${API_ROOT}/role?roleName=` + role.original.roleName, {
          method: 'DELETE'
        })
        .then(
            response => {
                //console.log(response);
                if(response.status == 200){
                    this.state.roleDeleteMsg = <p className="bg-success">Role has been successfully deleted</p>
                    this.handleCloseUserModel();
                }else {
                    this.state.roleDeleteMsg = <p className="bg-danger">Error : Failed to delete</p>
                }
                setTimeout(() => {
                    this.setState({
                        roleDeleteMsg: false
                });
                }, 5000)
                this.fetchRole();
            },
            error => { 
                console.log(error);
            }
        );
      }
    
    data = []   
    columns = [{
        Header: 'Role Name',
        accessor: 'roleName',
        filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
    }, {
        Header: 'Description',
        accessor: 'description',
        filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
        // Cell: props => <span className='number'>{props.value}</span> 
    }, {
        // width: 250,
        width: 150,
        Header: 'Privileges',
        accessor: 'privileges',
        filterable: false,
        Cell: (editData) => (
            <button onClick={this.onPrivilegesExpand.bind(this, editData)} className="btn btn-link black">{ 'privileges...'}</button>
            )
    }, {
        Header: 'Created Time (GMT)',
        accessor: 'createTime',
        filterable: false,
    }, {
        Header: 'Modified Time (GMT)',
        accessor: 'modifiedTime',
        filterable: false,
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
        Cell: (roleName) => (
            <div className="addrol-grid-btn">
                <span className="btn-tooltip">Delete</span>
                <button onClick={this.openUserDeleteModel.bind(this, roleName)} className="btn"><i className="far fa-trash-alt roll-edit-icon"></i></button>
            </div>
            )
      }]
    
    // Render view
    render() {
        
        return (
            <div className="mid-right margin-top-5">
                { this.state.showPrivilegeExpandModel &&
                    <PrivilegesListsPopUp
                        formData={this.state.formData}
                        showPrivilegeExpandModel={this.state.showPrivilegeExpandModel}
                        handleClose={this.handleClose}>
                    </PrivilegesListsPopUp>
                }

                { this.state.show &&
                    <EditPopup
                        mode={this.state.mode}
                        show={this.state.show}
                        formData={this.state.formData}
                        handleClose={this.handleClose}
                        onEditSubmit={this.onEditSubmit}
                        onAddSubmit={this.onAddSubmit}>
                    </EditPopup>
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
                    <button type="text" className="btn btn-primary" onClick={this.onCreateClicked} >Create Role</button>
                </div>

                <div>
                    <p className={this.state.roleCreateSuccessMsg.status === 'Role added successfully' ? 'bg-success success-msg' : 'bg-danger success-msg'}>{ this.state.roleCreateSuccessMsg.status } { this.state.roleCreateSuccessMsg.error }</p>
                    <div className="success-msg">{ this.state.roleEditSuccessMsg }</div>
                    <div className="success-msg">{ this.state.roleDeleteMsg }</div>
                </div>

                <ReactTable
                    data={this.data} 
                    columns={this.columns} 
                    defaultPageSize = {10} 
                    minRows = {2} 
                    filterable
                    defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                />
            </div>
        );

    }
}
export default RolesList;
