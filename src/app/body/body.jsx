import {Link} from 'react-router'
import React from 'react/addons'
import Reflux from 'reflux'
import classNames from 'classnames'
import moment from 'moment'
import Immutable from 'immutable'

import Spinner from 'common/components/spinner'
import _ from 'common/utils'


import './body.less'

var Body = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    
  },
  getInitialState() {
    return {
      
    };
  },
  componentDidMount() {
    
  },
  render() {
    return (
      <div className="content">
        <Link to="/body" className="button">This is Body</Link>
      </div>
    );
  }
});
export default Body;
