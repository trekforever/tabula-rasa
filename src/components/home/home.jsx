/* Library Dependencies */
import React, {PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classnames from 'classnames'
import { connect } from 'react-redux'
import shallowEqual from 'react-redux/lib/utils/shallowEqual'

/* Actions */
import * as RepoActions from "common/actions/repo"

const parseFullName = (username, repo) => {
  return username + "/" + repo;
}
const getUsername = (fullName) => {
  return fullName.split('/')[0];
}
const getRepoName = (fullName) => {
  return fullName.split('/')[1];
}

const mapStateToProps = (state) => {
  const {
    selectedUser, selectedRepo, isLoading, repo
  } = state.repo;

  const userRepo = `${selectedUser}/${selectedRepo}`;

  return {
    userRepo,
    selectedUser,
    selectedRepo,
    isLoading,
    repo
  };
}

@connect(mapStateToProps, RepoActions)

export default class Home extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    selectedRepo: PropTypes.string,
    selectedUser: PropTypes.string,
    isLoading: PropTypes.bool,
    dispatch: PropTypes.func
  }
  constructor (props, context) {
    super(props, context)
    
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleGoClick = this.handleGoClick.bind(this)
    this.getInputValue = this.getInputValue.bind(this)

    this.state = {
      userRepo: parseFullName(props.selectedUser, props.selectedRepo)
    }
  }
  componentWillMount() {
    // Initial Fetch
    this.props.fetchRepoDetails(this.props.selectedUser, this.props.selectedRepo);
  }
  componentWillReceiveProps (nextProps) {
    if (!shallowEqual(this.props.selectedUser, nextProps.selectedUser) || !shallowEqual(this.props.selectedRepo, nextProps.selectedRepo))
      this.setState({
        userRepo: parseFullName(nextProps.selectedUser, nextProps.selectedRepo)
      })
  }
  handleKeyUp(e) {
     if (e.keyCode === 13){
      this.handleGoClick()
    }
  }
  handleGoClick() {
    // add some validation and error checking
    // @todo
    const username = getUsername(this.state.userRepo), repoName = getRepoName(this.state.userRepo);
    this.props.fetchRepoDetails(username, repoName);
  }
  getInputValue() {
    return findDOMNode(this.refs.userRepo).value
  }
  handleOnChange() {
     this.setState({
      userRepo: this.getInputValue()
    })
  }
  renderRepoDetails() {
    if(this.props.isLoading) {
      return <div>LOADING...</div>
    }
    if(!this.props.repo.has('full_name')) {
      return <div>NO DATA</div>
    }
    return (
      <div>
        <p>Full_Name: {this.props.repo.get('full_name')}</p>
        <p>Stars: {this.props.repo.get('stargazers_count')}</p>
        <p>Watchers: {this.props.repo.get('subscribers_count')}</p>
        <p>Fork(s): {this.props.repo.get('forks_count')}</p>
      </div>
    );
  }
  render() {
    return (
      <div className="main">
        <input type="text" value={this.state.userRepo} ref="userRepo" onChange={this.handleOnChange} onKeyUp={this.handleKeyUp} />
        { this.renderRepoDetails() }
      </div>
    );
  }
}