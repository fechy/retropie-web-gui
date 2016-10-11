import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Upload from '../../components/Upload';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {list} from '../../processors/list';

import platforms from '../../config/platforms.json';

import s from './platform.css';

class Platform extends Component {
  constructor(...props) {
    super(...props);

    const found = platforms.filter((plt) => {
      return plt.name == this.props.id;
    });

    this.state = {
      platform: found[0],
      fileList: this.props.list || [],
    };

    this.onUploadDone = ::this.onUploadDone;
  }

  onUploadDone() {
    list(this.state.platform.name)
      .then((result) => {
        this.setState({
          fileList: result.list
        });
      });
  }

  render() {
    return (
      <Layout>
        <div className={s.root}>
          <div className={s.container}>
            <h1>{this.state.platform.title}</h1>
            <div><img src={this.state.platform.image} /></div>
            <div className={s.column}>
              <h4>Files ({this.state.fileList.length}):</h4>
              <ul>
                {this.state.fileList.map(file => <li key={`platform-file-${file}`}>{file}</li>)}
              </ul>
            </div>
            <div className={s.column}>
              <Upload platform={this.state.platform} onUploadDone={this.onUploadDone}/>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withStyles(s)(Platform);
