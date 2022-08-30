const csv = require('fast-csv');
var csv_reader = require('csv-stream');
var fs = require('fs');

const csvStream = csv.format({ headers: true });
var stream = fs.createReadStream('input.csv');
var options = {
    delimiter : '\t', // default is ,
    endLine : '\n', // default is \n,
    columns : ['id', 'json'], // by default read the first line and use values found as columns
    columnOffset : 2, // default is 0
    escapeChar : '"', // default is an empty string
    enclosedChar : '"' // default is an empty string
}
var csvStream_reader = csv_reader.createStream(options);

stream.pipe(csvStream_reader)
    .on('error',function(err){
        //console.error(err);
    })
    .on('header', function(columns) {
        //console.log(columns);
    })
    .on('data',function(data){
        // outputs an object containing a set of key/value pair representing a line found in the csv file.
        console.log(data);
    })
    .on('column',function(key,value){
        // outputs the column name associated with the value found
       // console.log('#' + key + ' = ' + value);
    })

function rotateTable(input_table_array)
{
    
    var edge=Math.sqrt(input_table_array.length); // number of column and rows
    var top = 0;
    var bottom = edge-1;
    var left = 0;
    var right = edge-1;
    var curr,prev;
    var splited_rows= split_rows(input_table_array)
    while ((left < right) & (top < bottom))
        {
        // Store the first element of next row,
        // this element will replace first element of
        // current row
        prev = splited_rows[top+1][left];
 
        // Move elements of top row one step right
        for (var i=left;i<right+1;i++)
        {
            curr = splited_rows[top][i];
            splited_rows[top][i] = prev;
            prev = curr;
        }
 
        top++;
 
        // Move elements of rightmost column one step downwards
        for (var i=top;i<bottom+1;i++)
        {
            curr = splited_rows[i][right];
            splited_rows[i][right] = prev;
            prev = curr;
        }
        right--;
 
        // Move elements of bottom row one step left
        for (var i=right;i>left-1;i--)
        {
            curr = splited_rows[bottom][i];
            splited_rows[bottom][i] = prev;
            prev = curr;
        }
        bottom--;
 
        // Move elements of leftmost column one step upwards
        for(var i=bottom;i> top-1;i--)
        { 
            curr = splited_rows[i][left];
            splited_rows[i][left] = prev;
            prev = curr;
        }
 
        left++;
        }

   return  splited_rows.flat();
}

function table_is_valid(input_table_array)
{
    // this function check if the array is squre or not
    if (Number.isInteger(Math.sqrt(input_table_array.length))) 
    {
        return true;
    } 
    else
    {
        return false;
    }
}

function split_rows(input_table_array) 
{
   // this function convert a 1D array to a 2D array
   // return an array of rows 
   var splited_rows=[];
   var temp_row=[];
   var edge_counter=0;
   var input_array_length=input_table_array.length;
   var edge=Math.sqrt(input_array_length); // number of column and rows

   for(i=0;i<input_array_length;i++)
   {
      temp_row.push(input_table_array[i]);
      edge_counter++;
      if(edge_counter==edge)
      {
        edge_counter=0;
        splited_rows.push(temp_row);
        temp_row=[];
      }

   }
   return splited_rows
}

console.log(rotateTable([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,'']))