const fs = require('fs');
const path = require('path');

module.exports = function (contractAddresses) {
  console.log('Executed');
  const filePath = path.join(
    __dirname + '/cryptozombies-frontend',
    'contractAddresses.json'
  );
  fs.writeFileSync(
    filePath,
    JSON.stringify(contractAddresses, null, 2),
    'utf-8'
  );
  console.log('Contract addresses have been written to:', filePath);
};
