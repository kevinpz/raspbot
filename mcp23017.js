var i2c = require('i2c-bus'),
i2c1 = i2c.openSync(1);

MCP23017_ADDRESS= 0x20;

MCP23017_IODIRA = 0x00
MCP23017_OLATA = 0x12

MCP23017_IODIRB = 0x01
MCP23017_OLATB = 0x15

HIGH=0x1
LOW=0x0

writeRegister=function(regAddr,regValue){
  i2c1.writeByteSync(MCP23017_ADDRESS, regAddr, regValue);
}

readRegister=function(regAddr) {
  regValue=i2c1.readByteSync(MCP23017_ADDRESS,regAddr);
  return regValue;
}

var MCP23017 = function() {
  // all inputs on port A
  writeRegister(MCP23017_IODIRA,0x00);
  // all output on port B
  writeRegister(MCP23017_IODIRB,0xff);
}

bitSet=function(value, bit) {
  value |= 1 << bit
  return value
}

bitClear=function(value, bit) {
  value &= ~(1 << bit)
  return value
}

bitWrite=function(value, bit, bitvalue){
  value= bitvalue ? bitSet(value, bit) : bitClear(value, bit)
  return value
}

updateRegisterBit=function(pin,value) {
  regValue=readRegister(MCP23017_OLATA);
  regValue=bitWrite(regValue,pin,value);
  writeRegister(MCP23017_OLATA,regValue);
}

MCP23017.prototype.setHigh=function(pin) {
  updateRegisterBit(pin,HIGH);
}

MCP23017.prototype.setLow=function(pin) {
  updateRegisterBit(pin,LOW);
}

module.exports = MCP23017;
