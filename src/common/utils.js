import _ from 'lodash'

_.mixin({
  parse_link_header(header) {
    // Given a valid link header, convert it to object
    // Example header: 
    // "<https://api.github.com/repositories/8514/issues?per_page=25&page=2>; rel="next", <https://api.github.com/repositories/8514/issues?per_page=25&page=36>; rel="last""
    
    if (!header || header.length === 0) {
        throw new Error("input must not be of zero length");
    }

    var parts = header.split(',');
    var links = {};
    // Parse each part into a named link
    for(var i=0; i<parts.length; i++) {
        var section = parts[i].split(';');
        if (section.length !== 2) {
            throw new Error("cannot split on semicolon");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    }
    return links;
  },
  getTotalPageCount(headerObj) {
    function getUrlQueryFromString(url) {
      var vars = [], hash;
      var hashes = url.slice(url.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++)
      {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
      return vars;
    }
    if(!headerObj.last) {
      return -1;
    }
    return getUrlQueryFromString(headerObj.last)['page'];
  },
  determineForegroundColor(hexString) {
    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
      } : null;
    }
    var rgb = hexToRgb(hexString);
    // formula: http://stackoverflow.com/questions/946544/good-text-foreground-color-for-a-given-background-color/946734#946734
    if(rgb.r*0.299 + rgb.g*0.587 + rgb.b*0.114 > 186) {
      return '#000000';
    } else {
      return '#FFFFFF';
    }
  },
  truncateTxt(string) {
    if(!string) {return ""}
    var length = string.length;
    // Shorten string to 140 characters (ending on a clean word or space)
    // substring it
    var truncated = string.substr(0,140);
    // re-truncate if it ends on a word
    truncated = truncated.substr(0, Math.min(truncated.length, truncated.lastIndexOf(" ")));
    // add dotdotdot
    return truncated + (length > 140 ? "..." : "");
  },
  formatNumber(string) {
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }
});

export default _;
  