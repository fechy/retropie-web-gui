import React, { Component } from 'react';
import classnames from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LinearProgress from 'material-ui/LinearProgress';
import history from '../../core/history';
import Link from '../../components/Link/Link';
import Image from '../../components/Image';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';

import s from './SystemsList.css';

import configs from '../../config/systems.json';

const System = ({name, title, image, available, visible, onClick}) => {
  const classNames = classnames(s.availabilityCheckIcon, "fa", available ? 'fa-check' : 'fa-close', available ? s.available : s.unavailable);
  return (
    <div key={`system-${name}`}
         className={classnames(s.system, !visible ? s.hidden : s.show )}
         onClick={() => onClick(`/system/${name}`)}
    >
        <Image src={image} alt={title} />
        <div className={s.systemTitle}>{title}</div>
        <i className={classNames} />
    </div>
  )
};

class Systems extends Component
{
  constructor(...props) {
    super(...props);

    this.state = {
      show: 'available'
    };

    this.onHandleClick = ::this.onHandleClick;
    this.filter = ::this.filter;
  }

  onHandleClick(url) {
    history.push(url);
  }

  filter(system) {
    const { checkList } = this.props;
    if (this.state.show == 'all') {
      return true;
    } else if (this.state.show == 'available' && checkList[system.name]) {
      return true;
    } else if (this.state.show == 'not_available' && !checkList[system.name]) {
      return true;
    }

    return false;
  }

  setFilter(filter) {
    this.setState({ show: filter });
  }

  renderSystems() {
    const { isChecking, checkList } = this.props;

    if (isChecking || checkList == undefined) {
      return (<LinearProgress />);
    }

    return (
      <Row className={s.list}>
        <Col xs={12} md={8}>
          {
            configs.map((system) => {
              const isAvailable = checkList[system.name];
              const isVisible = this.filter(system);
              return (
                <System key={`emu-${system.name}`} {...system}
                        available={isAvailable}
                        visible={isVisible}
                        onClick={this.onHandleClick}
                />
              )
            })
          }
        </Col>
        <Col xs={6} md={3}>
          <AutoAffix viewportOffsetTop={15} container={this}>
            <ListGroup>
              <ListGroupItem onClick={this.setFilter.bind(this, 'available')}
                             active={this.state.show == 'available'}
              >
                Show only available systems
              </ListGroupItem>
              <ListGroupItem onClick={this.setFilter.bind(this, 'not_available')}
                             active={this.state.show == 'not_available'}
              >
                Show only not available systems
              </ListGroupItem>
              <ListGroupItem onClick={this.setFilter.bind(this, 'all')}
                             active={this.state.show == 'all'}
              >
                Show all systems
              </ListGroupItem>
            </ListGroup>
          </AutoAffix>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <div className={s.container}>
        <h1>Systems</h1>
        <Grid>
          {this.renderSystems()}
        </Grid>
      </div>
    )
  }
}

export default withStyles(s)(Systems);
