import request from './request'

var owner   = "rails";
var repo    = "rails";
var apiURL  = `https://api.github.com/repos/${owner}/${repo}`;

//personal oauth token to increase rate, only allows public-repo
request.set('Authorization', 'token 6098928519ee784bd5318aaac4dc7f510b7eb172');
    

var API = {
  retrieveList(size = 25, offset = 1, type = "open") {
    return request('GET', `${apiURL}/issues?state=${type}&per_page=${size}&page=${offset}`)
    .set({accept: 'application/vnd.github.v3.text+json'})
  },
  retrieveIssue(issueId) {
    return request('GET', `${apiURL}/issues/${issueId}`)
    .set({accept: 'application/vnd.github.v3.html+json'})
  },
  retrieveComments(issueId) {
    return request('GET', `${apiURL}/issues/${issueId}/comments`)
    .set({accept: 'application/vnd.github.v3.html+json'})
  },
  retrieveRepo() {
    return request('GET', `${apiURL}`)
  }
};

export default API;