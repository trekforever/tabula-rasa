import * as constants from '../constants'
import 'whatwg-fetch'

export function fetchRepoDetails(owner, repo) {
  var url  = `https://api.github.com/repos/${owner}/${repo}`;
   return dispatch => {
    dispatch({
      type: constants.FETCH_REPO,
      isLoading: true
    })
    return fetch(url)
      .then(req => req.json())
      .then(json => dispatch({
        type: constants.FETCH_REPO_SUCCESS,
        selectedUser: owner,
        selectedRepo: repo,
        repo: json
      }));
  };
  
}