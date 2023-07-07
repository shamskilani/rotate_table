const csv_writer = require('fast-csv');
const csv_reader = require('csv-stream');
const fs = require('fs');

/////////////////// Initialization
const csvStream_writer = csv_writer.format({ headers: true });
csvStream_writer.pipe(process.stdout).on('end', () => process.exit());

const options = {
  delimiter: ',', // default is ,
  endLine: '\n', // default is \n,
  columns: ['id', 'json'], // by default read the first line and use values found as columns
  columnOffset: 1, // default is 0
  escapeChar: '"', // default is an empty string
  enclosedChar: '"' // default is an empty string
};

const csvStream_reader = csv_reader.createStream(options);

////////////////////////////////////

if (process.argv.length !== 3) {
  console.log("Invalid file name!");
  process.exit();
}

const input_stream = fs.createReadStream(process.argv[2]); // open file

input_stream.pipe(csvStream_reader)
  .on('error', function (err) {
    console.error(err);
  })
  .on('data', function (data) {
    const input_table_array = JSON.parse(data.json); // parse JSON string to an array
    if (!table_is_valid(input_table_array)) {
      csvStream_writer.write({ id: data.id, json: '[]', is_valid: 'false' });
    } else {
      const rotatedArray = rotateTable(input_table_array);
      csvStream_writer.write({ id: data.id, json: JSON.stringify(rotatedArray), is_valid: 'true' });
    }
  })
  .on('EOF', function (EOF) { // when the stream reaches the end of the file, close it
    csvStream_writer.end();
  });

function rotateTable(input_table_array) {
  const edge = Math.sqrt(input_table_array.length); // number of columns and rows
  const splited_rows = split_rows(input_table_array);
  let top = 0;
  let bottom = edge - 1;
  let left = 0;
  let right = edge - 1;
  let curr, prev;

  while ((left < right) & (top < bottom)) {
    // Store the first element of the next row,
    // this element will replace the first element of the current row
    prev = splited_rows[top + 1][left];

    // Move elements of the top row one step right
    for (let i = left; i < right + 1; i++) {
      curr = splited_rows[top][i];
      splited_rows[top][i] = prev;
      prev = curr;
    }

    top++;

    // Move elements of the rightmost column one step downwards
    for (let i = top; i < bottom + 1; i++) {
      curr = splited_rows[i][right];
      splited_rows[i][right] = prev;
      prev = curr;
    }

    right--;

    // Move elements of the bottom row one step left
    for (let i = right; i > left - 1; i--) {
      curr = splited_rows[bottom][i];
      splited_rows[bottom][i] = prev;
      prev = curr;
    }

    bottom--;

    // Move elements of the leftmost column one step upwards
    for (let i = bottom; i > top - 1; i--) {
      curr = splited_rows[i][left];
      splited_rows[i][left] = prev;
      prev = curr;
    }

    left++;
  }

  return splited_rows.flat(); // convert 2D array to 1D
}

function table_is_valid(input_table_array) {
  // This function checks if the array is square or not
  return Number.isInteger(Math.sqrt(input_table_array.length));
}

function split_rows(input_table_array) {
  // This function converts a 1D array to a 2D array (array of rows)
  const splited_rows = [];
  const edge = Math.sqrt(input_table_array.length); // number of columns and rows

  for (let i = 0; i < input_table_array.length; i += edge) {
    splited_rows.push(input_table_array.slice(i, i + edge));
  }

  return splited_rows;
}
