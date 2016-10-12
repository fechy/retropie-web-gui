import React, { Component } from 'react';
import { connect } from 'react-redux'
import Layout from '../../components/Layout';
import Upload from '../../components/Upload';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import * as actions from '../../actions/list';

import systems from '../../config/systems.json';

import s from './system.css';

const mapStateToProps = (state, ownProps) => {
  return {
    isUploading: state.upload.get('isUploading'),
    isFetching: state.list.get('isFetching'),
    listError: state.list.get('error'),
    fileList: state.list.get('list'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchList: system => dispatch(actions.list(system)),
  }
};

class Systems extends Component {
  constructor(...props) {
    super(...props);

    const found = systems.filter((sys) => {
      return sys.name == this.props.id;
    });

    this.state = {
      system: found[0],
    };

    this.onUploadDone = ::this.onUploadDone;
  }

  componentDidMount() {
    this.props.fetchList(this.state.system.name);
  }

  onUploadDone() {
    this.props.fetchList(this.state.system.name);
  }

  renderContent() {
    const { isFetching, fileList, listError } = this.props;
    if (isFetching || !fileList) {
      return (
        <div className={s.container}>
          fetching list...
        </div>
      )
    }

    return (
      <div className={s.container}>
        <h1>{this.state.system.title}</h1>
        <div><img src={this.state.system.image} /></div>
        <div>{listError}</div>
        <div className={s.column}>
          <h4>Files ({fileList.length}):</h4>
          <ul>
            {fileList.map(file => <li key={`system-file-${file}`}>{file}</li>)}
          </ul>
        </div>
        <div className={s.column}>
          <Upload system={this.state.system} onUploadDone={this.onUploadDone}/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Layout>
        <div className={s.root}>
          {this.renderContent()}
        </div>
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(s)(Systems));
