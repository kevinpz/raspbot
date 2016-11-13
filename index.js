var mcp23017 = require('./mcp23017.js');
var mcp = new mcp23017();


var xbox = require('xbox-controller-node');

xbox.on('leftstickUp', function () {
  mcp.setHigh(6);
  mcp.setHigh(5);
  console.log('Up');
});

xbox.on('leftstickUp:release', function () {
  mcp.setLow(6);
  mcp.setLow(5);
  console.log('Up release');
})

xbox.on('leftstickDown', function () {
  mcp.setHigh(7);
  mcp.setHigh(4);
  console.log('Down');
});

xbox.on('leftstickDown:release', function () {
  mcp.setLow(7);
  mcp.setLow(4);
  console.log('Down release');
})


/*xbox.on('a', function () {
  mcp.on();
});

xbox.on('a:release', function () {
  mcp.off();
});*/
