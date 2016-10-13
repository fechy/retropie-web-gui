import React, { Component } from 'react';
import { connect } from 'react-redux'
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import LinearProgress from 'material-ui/LinearProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dropzone from 'react-dropzone';

import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

import * as actions from '../../actions/upload';

import s from './Upload.css';

const mapStateToProps = (state) => {
  return {
    isUploading: state.upload.get('isUploading'),
    error: state.upload.get('error')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    upload: (config, files) => {
      return dispatch(actions.upload(config, files))
    },
  }
};

class Upload extends Component
{
  constructor(...props) {
    super(...props);

    this.state = {
      files: [],
      isFetching: false,
      isUploading: false,
    };

    this.handleOnUpload = ::this.handleOnUpload;
    this.onDrop = ::this.onDrop;
  }

  onDrop(files) {
    this.setState({
      files,
    });
  }

  handleOnUpload() {
    if (this.state.files.length === 0) {
      alert('Please add at least one file');
      return;
    }

    const { onUploadDone , upload } = this.props;

    upload(this.props.system, this.state.files).then(onUploadDone);
  }

  renderQueue() {
    if (this.state.files.length > 0) {
      return (
        <ListGroup>
          <ListGroupItem bsStyle="info">Files to upload</ListGroupItem>
          {this.state.files.map(file => <ListGroupItem key={`upload-file-${file.name}`}>{file.name}</ListGroupItem>)}
        </ListGroup>
      );
    }
  }

  render() {
    if (this.props.isUploading) {
      return (
        <LinearProgress />
      )
    }

    const { system, error, enabled } = this.props;

    return (
      <div className={s.container} >
        <div>
          <div>{error}</div>
          <Dropzone className={classnames(s.dropzone, !enabled ? s.disabled : '')}
                    activeClassName={s.dropzoneActive}
                    rejectClassName={s.dropzoneReject}
                    onDrop={enabled ? this.onDrop : null}
                    accept={system.extensions.join(',')}
                    disablePreview={true}
                    inputProps={{ disabled: !enabled }}
          >
            <div>
              <p>Try dropping some files here, or click to select files to upload.</p>
              <p>The allowed extensions are: {system.extensions.join(',')}</p>
            </div>
          </Dropzone>
          <br />
          {this.renderQueue()}
        </div>
        <div className={s.centered}>
          <Button bsStyle="danger" disabled={!enabled} onClick={this.handleOnUpload}>Upload</Button>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(s)(Upload));
