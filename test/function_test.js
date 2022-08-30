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
   return splited_rows;
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

module.exports = {
    split_rows: split_rows,
    table_is_valid:table_is_valid
};
