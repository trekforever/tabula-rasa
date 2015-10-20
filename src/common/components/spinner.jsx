import classNames from "classnames";
import React from "react/addons";

import './spinner.less'

var Spinner = React.createClass({

  propTypes: {
    isActive: React.PropTypes.bool.isRequired
  },

  render() {

    var cx = () => {
      return classNames({
        "active": this.props.isActive
      });
    };

    return (
       <span className={ "spinner " + cx() }></span>
    );

  }

});

export default Spinner;
