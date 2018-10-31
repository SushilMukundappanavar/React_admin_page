import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class EditPopUpPrivilege extends Component {
    constructor(props, context) {
        super(props, context);
            this.onChangPrivilege = this.onChangPrivilege.bind(this);
            this.onChangeDescription = this.onChangeDescription.bind(this);
            this.onChangeResource = this.onChangeResource.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            
            this.state = {
                formData: this.props.formData,
            }

            // console.log('this.props.formData',this.props.formData);
            // console.log(this.props.formData.resourceName)
    }
    
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
    }

    onChangPrivilege(e){
        this.setState({
            formData: {
                ...this.state.formData,
                privilegeName: e.target.value
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
    onChangeResource(e){
        this.setState({
            formData: {
                ...this.state.formData,
                selectedResource: e.target.value
            }
        })
    }    
    // resourceName = [];

    onSubmit(e) {
        e.preventDefault();
        if(this.props.mode === 'Edit') {
            const postData = {
                privilegeName: this.state.formData.privilegeName,
                description: this.state.formData.description,
                resourceName: this.state.formData.selectedResource
            }
            this.props.onEditSubmit(postData);
        } else {
            const postData = {
                privilegeName: this.state.formData.privilegeName,
                description: this.state.formData.description,
                resourceName: this.state.formData.selectedResource ? this.state.formData.selectedResource : this.props.formData.resourceList[0].resourceName
            }
            this.props.onAddSubmit(postData);
        }
    }
    render() {
        const resourceSelectForm = this.props.formData.resourceList.map(formDropdown => {
            return <option key={formDropdown.resourceName} value={formDropdown.resourceName}>{formDropdown.resourceName} </option>
        })

        return(
            <div className="clearfix">
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                <form onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.mode} Privilege</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="well margin-none">
                        <div className="clearfix ">
                            <div className="form-group">
                                <label>Privilege Name <i className="input-require">*</i></label>
                                <input type="text" name="privilegeName" className="form-control" placeholder="Privilege Name" required
                                    onChange={this.onChangPrivilege}
                                    value={this.state.formData.privilegeName}
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
                                <label>Resource</label>
                                <select name="selectedResource" className="form-control" placeholder="Resource"
                                    onChange={this.onChangeResource} 
                                    value={this.state.formData.selectedResource}>
                                    { resourceSelectForm }
                                </select>
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

export default EditPopUpPrivilege;