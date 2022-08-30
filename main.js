function rotateTable(input_table_array)
{
   return table_is_valid(input_table_array)
}

function table_is_valid(input_table_array)
{
    if (Number.isInteger(Math.sqrt(input_table_array.length))) 
    {
        return true;
    } 
    else
    {
        return false;
    }
}

console.log(rotateTable([1,2,3,4]))