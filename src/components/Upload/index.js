import React, { Component } from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import LinearProgress from 'material-ui/LinearProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dropzone from 'react-dropzone';

import {upload} from '../../processors/upload';
import list from '../../processors/list';

import s from './Upload.css';

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

    const { onUploadDone } = this.props;

    this.setState({ isUploading: true });

    upload(this.props.platform, this.state.files)
    .then((result) => {
      if (result.error !== null) {
        alert(result.error);
        return;
      }

      this.setState({ isUploading: false, files: [] }, onUploadDone);
    });
  }

  render() {
    if (this.state.isUploading) {
      return (
        <LinearProgress />
      )
    }

    const { platform, } = this.props;

    return (
      <div className={s.container} >
        <div>
          <Dropzone className={s.dropzone}
                    activeClassName={s.dropzoneActive}
                    rejectClassName={s.dropzoneReject}
                    onDrop={this.onDrop}
                    accept={platform.extensions.join(',')}
                    disablePreview={true}
          >
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          <ul>
            {this.state.files.map( file => <li key={`upload-file-${file.name}`}>{file.name}</li> )}
          </ul>
        </div>
        <div className={s.centered}>
          <button onClick={this.handleOnUpload}>Upload</button>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(Upload);
