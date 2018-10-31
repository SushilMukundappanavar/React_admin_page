import React, { Component } from 'react';
// import { Button, Modal } from 'react-bootstrap';
import ReactTable from "react-table";
import { API_ROOT } from '../../../../api-config';
import 'react-table/react-table.css'

import EditPopUpPrivilege from './EditPopupPrivilege';
import UserDeleteModel from '../../UserDeleteModel';

class PrivilegesList extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            data: [],
            privilegeName: '',
            description: '',
            resourceName: [],

            privilegeCreateSuccessMsg: '',
            privilegeDeleteMsg: '',
            privilegeEditSuccessMsg: '',

            mode: 'Create',
            show: false,
            showDeleteModel: false,
            formData: {},
            deleteMsg: ''
        }
        this.fetchPrivileges = this.fetchPrivileges.bind(this);
        this.fetchresourceName = this.fetchresourceName.bind(this);
        this.onChange = this.onChange.bind(this);

        this.handleClose = this.handleClose.bind(this);
        this.handleCloseUserModel = this.handleCloseUserModel.bind(this);
        this.onEditClicked = this.onEditClicked.bind(this);
        this.onCreateClicked = this.onCreateClicked.bind(this);
        
        this.onAddSubmit = this.onAddSubmit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);

        this.fetchresourceName();
        this.fetchPrivileges();
    }

    fetchPrivileges(){
        fetch(`${API_ROOT}/privileges`)
            .then(res => res.json())
            .then(grid => this.data = grid )
            .then(privileges => this.setState({ data : privileges }))
    }
    
    fetchresourceName() {
        fetch(`${API_ROOT}/resources`)
            .then(res => res.json())
            .then(resourceData => {
                this.setState({ resourceName : resourceData})
                // this.state.resourceName = resourceData;
                // console.log(resourceData);
            })
            // .then(resourceNameList => this.setState({ resourceName : resourceNameList}))
    }

    handleClose() {
        this.setState({
            show: false
        });
    }
    
    onEditClicked(editData, index) {
        // console.log('editData',editData);
        this.setState({ 
            show: true,
            mode: 'Edit',
            formData: {
                // ...editData.original
                privilegeName: editData.original.privilegeName,
                description: editData.original.description,
                selectedResource: editData.original.resourceName,
                resourceList: this.state.resourceName,
            },
        });
    }

    onCreateClicked(event) {
        this.setState({ 
            show: true,
            mode: 'Create',
            formData: {
                privilegeName: '',
                description: '',
                selectedResource: '',
                resourceList: this.state.resourceName,
            },
        });
    }

    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onAddSubmit(postData){
        fetch(`${API_ROOT}/privilege`, {
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
                privilegeCreateSuccessMsg : response
            })
            setTimeout(() => {
                this.setState({
                    privilegeCreateSuccessMsg: false
            });
            }, 5000)
            this.setState({ show: false });
            this.fetchPrivileges();
            this.setState({
                privilegeName: '',
                description: '',
                resourceList: this.state.resourceName
            })
          }, error => {
            console.log('Error Messages', error);
        });
      }

    onEditSubmit(postData){
        fetch(`${API_ROOT}/privilege`, {
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
            if(response.status === 'Privilege added successfully'){
                this.state.privilegeEditSuccessMsg = <p className="bg-success">Privilege has been successfully updated</p>
            }else {
                this.state.privilegeEditSuccessMsg = <p className="bg-danger">Error : Failed to update</p>
            }
            setTimeout(() => {
                this.setState({
                    privilegeEditSuccessMsg: false
            });
            }, 5000)
            this.setState({ show: false });
            this.fetchPrivileges();
          }, error => { 
            console.log('Error Messages', error);
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

    deleteHandler(privilege, e) {
        e.preventDefault();
        //console.log(privilege.original.privilegeName);
        return fetch(`${API_ROOT}/privilege?privilegeName=` + privilege.original.privilegeName, {
          method: 'DELETE'
        })
        .then(
            response => {
                if(response.status == 200){
                    this.state.deleteMsg = <p className="bg-success">Privilege has been successfully deleted</p>
                    this.handleCloseUserModel();
                }else {
                    this.state.deleteMsg = <p className="bg-danger">Error : Failed to delete</p>
                }
                setTimeout(() => {
                    this.setState({
                        deleteMsg: false
                })
                }, 5000)
                this.fetchPrivileges();
            },
            error => { 
                console.log(error);
            }
        );
      }
    
    data = []   
    columns = [{
        Header: 'Privilege Name',
        accessor: 'privilegeName',
        filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
    }, {
        Header: 'Description',
        accessor: 'description',
        filterMethod: (filter, row) => row[filter.id].startsWith(filter.value)
        // Cell: props => <span className='number'>{props.value}</span> 
    }, {
        Header: 'Resource',
        accessor: 'resourceName',
        filterable: false,
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
        Cell: (privilegeName) => (
            <div className="addrol-grid-btn">
            <span className="btn-tooltip">Delete</span>
                <button onClick={this.openUserDeleteModel.bind(this, privilegeName)} className="btn"><i className="far fa-trash-alt roll-edit-icon"></i></button>
            </div>
            )
      }]
    
    // Render view
    render() {
        
        return (
            <div className="mid-right margin-top-5">
                { this.state.show &&
                    <EditPopUpPrivilege
                        mode={this.state.mode}
                        show={this.state.show}
                        formData={this.state.formData}
                        handleClose={this.handleClose}
                        onEditSubmit={this.onEditSubmit}
                        onAddSubmit={this.onAddSubmit}>
                    </EditPopUpPrivilege>
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
                    <button type="text" className="btn btn-primary" onClick={this.onCreateClicked} >Create Privilege</button>
                </div>
                <div>
                    <p className={this.state.privilegeCreateSuccessMsg.status === 'Privilege added successfully' ? 'bg-success success-msg' : 'bg-danger success-msg'}>{ this.state.privilegeCreateSuccessMsg.status } { this.state.privilegeCreateSuccessMsg.error }</p>
                    <div className="success-msg">{ this.state.privilegeEditSuccessMsg }</div>
                    <div className="success-msg">{ this.state.deleteMsg }</div>
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
export default PrivilegesList;
