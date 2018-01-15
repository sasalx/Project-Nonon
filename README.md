# Project-Nonon
Philips Hue colour control system via voice input. 


## Based on:
- [Huejay](https://github.com/sqmk/huejay) for bridge/lamb control.
- [Webpack](https://webpack.js.org/) for bundling.
- [Chrome-dgram](https://github.com/feross/chrome-dgram) for `DGRAM` on browser(Chrome)

### How to Install

Project is still not finished so you shouldn't download it in this state.

#### 0- Install packages
```
npm install
```

#### 1- Learn the bridge IP
```
cd setup
node bridge
```
This will automatically update the db.json.

#### 2- Create a user for your usage
!!! Click the button in the bridge.
```
node client
```
This will automatically update the db.json.

#### 3- Necessary changes in HueJay
Go to `./node_modules/huejay/lib`
a) In *Client.js* line 266 change it as:
```js
let Transport = require('./Transport');
```
b) In */DiscoveryStrategy/Upnp.js* line 3 change it as:
```js
let dgram = require('chrome-dgram');
```
Now we are done with the hard part.

#### 4- Inıt webpack
```
npx webpack --config webpack.config.js
```

#### 5- Done
You are ready to use `index.html`. Any kind of live server works. 



