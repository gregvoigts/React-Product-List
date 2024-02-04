import "./App.css";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import { IProduct } from "./product";
import ProductDetails from "./product_item";
import ProductForm from "./product_form";
import { Container, ListItem, ListItemIcon, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function App() {
  const [data, setData] = useState<IProduct[] | null>(null);
  const [orgData, setOrgData] = useState<IProduct[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [searchText, setSearch] = useState("");

  const search = (searchString: string) => {
    setSearch(searchString);
    if (orgData) {
      if (searchString.length === 0) {
        setData(orgData);
        return;
      }

      setData(
        orgData.filter((product) => {
          if (product.title.search(searchString) > 0) {
            return true;
          }
          if (product.description.search(searchString) > 0) {
            return true;
          }
          return false;
        })
      );
    }
  };

  const addProduct = (product: IProduct) => {
    if (orgData) {
      setOrgData([product, ...orgData]);
    } else {
      setOrgData([product]);
    }
    setAdding(false);
  };

  useEffect(() => {
    setSearch("");
    setData(orgData);
  }, [orgData]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Error fetching the API. Code: ${response.status}`);
      })
      .then((data) => {
        setData(data.products);
        setOrgData(data.products);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      <Container maxWidth="sm">
        <h1>Products</h1>
        <TextField
          value={searchText}
          id="outlined-basic"
          label="Search"
          variant="outlined"
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const searchString = event.target.value;
            search(searchString);
          }}
        />
        {loading && <div>Loading...</div>}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <List>
          {adding ? (
            <ListItem key={-2}>
              <ProductForm addProduct={addProduct}></ProductForm>
            </ListItem>
          ) : (
            <ListItem key={-1}>
              <ListItemIcon onClick={() => setAdding(true)}>
                <AddIcon color="primary" style={{ fontSize: 40 }} />
              </ListItemIcon>
            </ListItem>
          )}

          {data &&
            data.map((product) => (
              <ProductDetails product={product}></ProductDetails>
            ))}
        </List>
      </Container>
    </div>
  );
}

export default App;
