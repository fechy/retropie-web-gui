import React, { Component } from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import LinearProgress from 'material-ui/LinearProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dropzone from 'react-dropzone';

import upload from '../../processors/upload';
import list from '../../processors/list';

import s from './Platforms.css';

import platformConfigs from '../../config/platforms.json';

class Platforms extends Component
{
  constructor(...props) {
    super(...props);

    this.state = {
      selectedPlatform: platformConfigs[0].platform,
      platformConfig: platformConfigs[0],
      files: [],
      list: [],
      isFetching: false,
      isUploading: false,
    };

    this.handleOnChange = ::this.handleOnChange;
    this.handleFileOnChange = ::this.handleFileOnChange;
    this.handleOnUpload = ::this.handleOnUpload;
    this.onDrop = ::this.onDrop;
  }

  componentDidMount() {
    this.fetchList();
  }

  onDrop(files) {
    this.setState({
      files,
    });
  }

  fetchList() {
    this.setState({ isFetching: true });
    list(this.state.selectedPlatform, (response) => {
      this.setState({
        list: response.list,
        isFetching: false,
      });
    });
  }

  handleOnChange(event, index, value) {
    this.setState({
      selectedPlatform: value,
      platformConfig: platformConfigs[index],
    }, this.fetchList);
  }

  handleFileOnChange(event) {
    this.setState({
      files: event.target.files,
    });
  }

  handleOnUpload() {
    if (this.state.files.length === 0) {
      alert('Please select a platform and a file');
      return;
    }

    this.setState({ isUploading: true });
    upload(this.state.platformConfig, this.state.files, (result) => {
      if (!result.result) {
        alert(result.error);
      }

      this.setState({ isUploading: false, files: [] }, this.fetchList);
    });
  }

  renderList() {
    if (this.state.isFetching) {
      return (
        <LinearProgress />
      );
    }

    return (
      <div>
        <ul>
          {this.state.list.map((fileName) => {
            return (<li key={`uploaded-file-${fileName}`}>{fileName}</li>);
          })}
        </ul>
      </div>
    );
  }

  renderFileList() {
    return (
      <ul>
        {this.state.files.map((file) => {
          return (<li key={`to-upload-file-${file.name}`}>{file.name}</li>);
        })}
      </ul>
    )
  }

  renderForm() {
    if (this.state.isUploading) {
      return (
        <LinearProgress />
      )
    }

    return (
      <div className={s.container} >
        <div className={classnames(s.form, s.inline)}>
          <div>
            <label>Platform:</label><br/>
            <DropDownMenu value={this.state.selectedPlatform} onChange={this.handleOnChange} style={{ width: '100%', display: 'inline-block' }} autoWidth={false}>
              {platformConfigs.map((config) => {
                return (<MenuItem key={`platform-option-${config.platform}`} value={config.platform} primaryText={config.platform} />);
              })}
            </DropDownMenu>
          </div>
          <div>
            <Dropzone className={s.dropzone} onDrop={this.onDrop} accept={this.state.platformConfig.extensions.join(',')}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            {this.renderFileList()}
          </div>
          <div className={s.centered}>
            <button onClick={this.handleOnUpload}>Upload</button>
          </div>
        </div>
        <div className={classnames(s.fileInfo, s.inline)}>
          <div className={s.centered}>
            <img src={this.state.platformConfig.image} alt={this.state.platformConfig.label} />
          </div>
          {this.renderList()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    )
  }
}

export default withStyles(s)(Platforms);
