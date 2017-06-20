const ml = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR;
const readline = require('readline');

const csvFilePath = 'Advertising.csv';
let csvData = [],
    X = [],
    y = [];
let regressionModel;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pFloat = (s) => {
  return parseFloat(s);
};

const dressData = () => {
  csvData.forEach((row) => {
    X.push(pFloat(row.Radio));
    y.push(pFloat(row.Sales));
  });
};

const performRegression = () => {
  regressionModel = new SLR(X, y);
  console.log(regressionModel.toString(3));
  predictOutput();
};

const predictOutput = () => {
  rl.question('Enter input X for prediction (Press CTRL+C to ecit : ', (answer) => {
    console.log(`At X = ${answer}, y = ${regressionModel.predict(parseFloat(answer))}`);
    predictOutput();
  })
};

csv()
  .fromFile(csvFilePath)
  .on('json', (json) => {
    csvData.push(json)
  })
  .on('done', () => {
    dressData();
    performRegression();
  });

