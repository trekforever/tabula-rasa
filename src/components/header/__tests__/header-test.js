var React = require('react/addons');
var TestUtils = require("react/lib/ReactTestUtils");
var API = require("common/api");
var Immutable = require('immutable');

// TEST consts
var repo_full_name = "rails/rails";
var repo_id = 8514;

describe('Header', () => {
  var Response, Header;

  beforeAll((done) => {
    API.retrieveRepo().then((resp) => {
      Response = Immutable.fromJS(resp.body);
      done();
    });
  });

  beforeEach(() => {
    Header = require('app/header');
  });

  it("Should have valid response", () => {
    expect(Response.get('full_name')).toBe(repo_full_name);
    expect(Response.get('id')).toBe(repo_id);
  });

  it("Header should have valid props", () => {
    var HeaderInstance = TestUtils.renderIntoDocument(<Header repo={Response}/>);
    expect(HeaderInstance.props.repo).toBe(Response);
  });

  it("Header should have valid view", () => {
    var HeaderInstance = TestUtils.renderIntoDocument(<Header repo={Response}/>);
    expect(HeaderInstance.getDOMNode().querySelector('.title').textContent).toBe("Github Issues - rails/rails");
  });

});