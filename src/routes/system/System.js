import React, { Component } from 'react';
import { connect } from 'react-redux'
import Layout from '../../components/Layout';
import Upload from '../../components/Upload';
import Image from '../../components/Image';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Grid, Row, Col, ListGroup, ListGroupItem, Media, Badge, Alert } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';

import * as actions from '../../actions/list';

import systems from '../../config/systems.json';

import s from './system.css';

const mapStateToProps = (state, ownProps) => {
  return {
    isUploading: state.upload.get('isUploading'),
    isFetching: state.list.get('isFetching'),
    systemAvailable: state.list.get('available'),
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

  renderListError() {
    const { listError } = this.props;
    if (listError) {
      return (
        <Alert bsStyle="danger">
          <h4>Oh snap! You got an error!</h4>
          <p>{listError}</p>
        </Alert>
      );
    }
  }

  renderFileList() {
    const { isFetching, fileList } = this.props;

    const list = [];
    if (isFetching) {
      list.push(<ListGroupItem bsStyle="success" key={`loading`}>Loading..</ListGroupItem>)
    } else if (!fileList.length) {
      list.push(<ListGroupItem bsStyle="danger" key={`loading`}>Empty directory</ListGroupItem>)
    } else {
      fileList.map(file => {
        list.push(
          <ListGroupItem key={`system-file-${file}`}>{file}</ListGroupItem>
        )
      });
    }

    return (
      <ListGroup>
        <ListGroupItem bsStyle="info">
          Files in directory <Badge>{fileList.length}</Badge>
        </ListGroupItem>
        {list}
      </ListGroup>
    )
  }

  renderContent() {
    const { systemAvailable } = this.props;
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8}>
            {this.renderListError()}
            {this.renderFileList()}
          </Col>
          <Col xs={6} md={4}>
            <AutoAffix viewportOffsetTop={15} container={this}>
              <div>
                <Upload system={this.state.system}
                        enabled={systemAvailable}
                        onUploadDone={this.onUploadDone}
                />
              </div>
            </AutoAffix>
          </Col>
        </Row>
      </Grid>
    )
  }

  render() {
    const { system } = this.state;

    const imageSrc = system && system.image ? `/${system.image}` : null;

    return (
      <Layout>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.heading}>
              <Media>
                <Media.Left align="middle">
                  <Image width={64} height={64} src={imageSrc} alt="Image"/>
                </Media.Left>
                <Media.Body>
                  <Media.Heading>{this.state.system.title}</Media.Heading>
                  <p>{this.state.system.description}</p>
                </Media.Body>
              </Media>
            </div>
            {this.renderContent()}
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(s)(Systems));
