import { Button, TextField } from "@mui/material";
import { useState } from "react";

const ProductForm = ({ addProduct }: any) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (name: any, value: any) => {
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addProduct(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        name="title"
        required
        type="text"
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      ></TextField>
      <TextField
        label="Description"
        name="description"
        required
        multiline
        type="text"
        onChange={(event) =>
          handleChange(event.target.name, event.target.value)
        }
      ></TextField>
      <TextField
        label="Price"
        name="price"
        required
        type="number"
        inputProps={{ step: "0.01" }}
        onChange={(event) =>
          handleChange(event.target.name, parseFloat(event.target.value))
        }
      ></TextField>
      <TextField
        label="Discount"
        name="discountPercentage"
        required
        type="number"
        inputProps={{ step: "0.01" }}
        onChange={(event) =>
          handleChange(event.target.name, parseFloat(event.target.value))
        }
      ></TextField>
      <TextField
        label="Rating"
        name="rating"
        required
        type="number"
        inputProps={{ step: "0.01" }}
        onChange={(event) =>
          handleChange(event.target.name, parseFloat(event.target.value))
        }
      ></TextField>
      <TextField
        label="Stock"
        name="stock"
        required
        type="number"
        onChange={(event) =>
          handleChange(event.target.name, parseInt(event.target.value))
        }
      ></TextField>
      <Button type="submit">Add to List</Button>
    </form>
  );
};

export default ProductForm;
