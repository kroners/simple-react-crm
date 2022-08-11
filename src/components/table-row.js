const TableRow = ({ data, onValidate }) => {
  // Get the values from the object to create an array to populate the row
  const array = Object.keys(data).map(function (key) {
    return data[key];
  });
  return (
    <tr>
      {array.map((item) => {
        return <td key={item}>{item}</td>;
      })}
      <td>
        <button onClick={() => onValidate(data.nin)}>Validate</button>
      </td>
    </tr>
  );
};

export default TableRow;
