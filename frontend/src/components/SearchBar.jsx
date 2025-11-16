import Form from "react-bootstrap/Form";

const SearchBar = ({ value, onChange }) => {
  return (
    <Form.Control
      type="text"
      placeholder="Search..."
      className="w-50"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
