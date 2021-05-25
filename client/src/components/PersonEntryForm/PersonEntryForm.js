import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./PersonEntryForm.module.css";
import { editFavPeople, createFavPeople } from "../../API";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

//Form to enter the favourite person details
//This form is embedded within a modal.

const PersonEntryForm = ({ handleClose, row, getFavPeople }) => {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  //Check if the row/favPerson data is empty
  let isEmpty = Object.keys(row).length === 0;
  let buttonText = isEmpty ? "Create" : "Edit";
  let text = "Complete the fields below (*Optional)";

  //Convert the data sent over by Mongoose into a type compatible with the date field in the react form
  if (row.dateOfBirth) {
    const event = new Date(row.dateOfBirth);
    var date = event.toISOString().substr(0, 10);
  }

  //If row is empty that means we are posting new data. If row is populated we are editing the exiting data.
  const onSubmit = async (data) => {
    try {
      if (!isEmpty) {
        console.log(data);
        await editFavPeople(data, row._id);
      } else {
        await createFavPeople(data);
      }
      //Make a get request to the server to re render the page.
      await getFavPeople();

      //close the modal containing the form
      handleClose();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <div className={styles.popup}>
      <h3>{text} </h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.entryform}>
        {error ? <h3 className="error">{error}</h3> : null}
        <label htmlFor="First Name">First Name</label>
        <input
          name="firstName"
          required
          ref={register}
          defaultValue={row.firstName}
        ></input>
        <label htmlFor="Last Name">Last Name</label>
        <input
          name="lastName"
          required
          ref={register}
          defaultValue={row.lastName}
        ></input>
        <label htmlFor="Date of Birth">Date of Birth</label>
        <input
          name="dateOfBirth"
          type="date"
          required
          ref={register}
          defaultValue={date}
        />
        <label htmlFor="Phone Number">Phone Number</label>
        <input
          name="phoneNum"
          required
          ref={register}
          defaultValue={row.phoneNum}
          type="tel"
        />
        <label htmlFor="Address">Address</label>
        <textarea
          name="address"
          rows={2}
          required
          ref={register}
          defaultValue={row.address}
        ></textarea>
        <label htmlFor="Notes">*Notes</label>
        <textarea
          name="notes"
          rows={2}
          ref={register}
          defaultValue={row.notes}
        ></textarea>
        <button>{buttonText}</button>
      </form>
      <button type="button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

export default PersonEntryForm;
