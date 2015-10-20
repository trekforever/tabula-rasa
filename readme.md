Tabula Rasa - Boilerplate 
=============

"It's a Blank Slate"

Technology
------------

| On The Server | On The Client  | Development |
| ------------- | -------------- | ----------- |
| Express.js    | React          | Webpack     |
| SuperAgent    | Skeleton (Grid)| Babel       |
| Bluebird      | Immutable.js   | Karma       |
|               | Reflux         | Jasmine     |
|               | react-router   |             |
|               | Moment.js      |             |


Installation
------------
Tabula Rasa is built with the [Express](http://expressjs.com/) Framework

```bash
$ npm install
```

Make sure you have [Node](https://nodejs.org/) installed. You may also need to install globally for `webpack` and `karma`

```bash
$ npm install -g karma
$ npm install -g webpack
```

Testing
------------
Tabula Rasa uses [Karma](http://karma-runner.github.io/) for testing environment, using [Jasmine](http://jasmine.github.io/) and [PhantomJS](https://github.com/ariya/phantomjs/) for frameworks and browser. Tests are written in the `__tests__` folder of each main component.

```
$ npm run test
```
Initial tests will be run on PhantomJS. You may also test it via browser by going to `http://localhost:9876/` 

Running the App
------------
For Development Environment: 
```
$ npm run start
```

This will start the webpack process as well as starting the node server. Once the webpack bundle has finished building (it will show `webpack: bundle is now VALID.` in the console), start your browser and navigate to `localhost:8964`

For Production Environment:
```
$ npm run build
$ NODE_ENV='prod' npm run start
```

This will optimize the code, put all the styles into a separated stylesheet, creating a [commons chunk](http://webpack.github.io/docs/code-splitting.html#commons-chunk), minify everything with hash caching. Navigate to `localhost:8964`
