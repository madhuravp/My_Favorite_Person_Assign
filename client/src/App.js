// Top level component for react used for passing data between components
import React from "react";
import { useState, useEffect } from "react";
import { listFavPeople } from "./API";
import TableData from "./components/Table/TableData";
import styles from "./App.module.css";
import Modal from "./components/PersonEntryForm/modal.js";
import AddIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";

require("dotenv").config();

const App = () => {
  const [favPeople, setFavPeople] = useState([]);
  const [row, setRow] = useState({});
  const [flag, setFlag] = useState(false);
  let reqType = "";

  // Function to display the modal for the person entry form
  const showForm = (val, row) => {
    setRow(row);
    setFlag(val);
  };

  //Sends a GET request to the server
  const getFavPeople = async () => {
    const favPeople = await listFavPeople();
    setFavPeople(favPeople);
  };

  useEffect(() => {
    (async () => {
      getFavPeople();
    })();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Add your favourite people!</h1>
      <Button
        className={styles.button}
        onClick={() => {
          showForm(true, {});
        }}
      >
        <AddIcon color="secondary" fontSize="large" />
      </Button>
      <TableData
        favPeople={favPeople}
        getFavPeople={getFavPeople}
        showForm={showForm}
      />
      <Modal
        show={flag}
        getFavPeople={getFavPeople}
        row={row}
        handleClose={() => {
          showForm(false, {});
        }}
      >
        <p>Modal</p>
      </Modal>
    </div>
  );
};

export default App;
