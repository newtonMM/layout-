import React, { useState } from "react";
import {
  Select,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import BlueCTAButton from "../../Components/Buttons/BlueCTA";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import request from "superagent";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { ReactComponent as CancelIcon } from "../../Assets/icons/cancel.svg";
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    display: "flex",
    justifyContent: "center",
    background: "#FFFFFF",
    padding: "0 5%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formPreview: {
    width: "50%",
  },
  addForm: {
    background: "rgba(196, 196, 196, 0.2)",
    width: "50%",
  },
  button: {
    margin: theme.spacing(1),
  },
  addedForm: {
    background: "#FFFFFF",
  },
  formGrid: {
    display: "flex",
  },
}));
// hconst apiUrl = process.env.REACT_APP_API_URL;
const apiUrl = `${process.env.REACT_APP_API_URL}/contact-form`;
const Contact = () => {
  const classes = useStyles();
  const history = useHistory();
  const [inputField, setInputFields] = useState([]);

  const addToArray = (input) => {
    const fields = [...inputField];
    fields.push(input);
    setInputFields(fields);
  };

  const createField = (values, actions) => {
    actions.setSubmitting(true);
    addToArray({
      label: values.label,
      label_type: values.label_type,
      label_value:values.label_value,
      icon_url:values.icon_url,

    });
  };
  const saveHandler = () => {
    console.log("***data**", inputField)
    if (!!inputField.length) {
      Promise.all(
        inputField.map(
          async (value) =>
            await request
              .post(apiUrl)
              .send(value)
              .then((response) => {
                //  console.log(response);
                if (
                  response.body.affectedRows === 1 &&
                  response.status === 200
                ) {
                  alert("updated succesfully ");
                  return history.push("/admin/dashboard");
                }
              })
              .catch((err) => {
                console.log("***data trying to send**", value)
                console.log(err);
                return alert("couldnt send data ");
              })
        )
      );
    }
  };
  const deleteHandler = (index) => {
    const inputs = [...inputField];
    inputs.splice(index, 1);
    setInputFields(inputs);
  };
  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <h2>Contact Page</h2>
        </Grid>
        <Grid item xs={12}>
          <BlueCTAButton text="Build Contact Form" icon />
        </Grid>
        <Grid item xs={12} className={classes.addForm}>
          <Formik
            initialValues={{
              label: "",
              label_type: "",
              label_value:"",
              icon_url:""
            }}
            validationSchema={Yup.object({
              label: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              label_type: Yup.string()
                .oneOf(["text", "textArea"], "Invalid Input Type")
                .required("Required"),
            })}
            onSubmit={createField}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              isSubmitting,
              errors,
              values,
            }) => (
              <>
                <Form onSubmit={handleSubmit}>
                  <Grid item xs={12}>
                    <TextField
                      id="standard-basic"
                      label="Form Label"
                      name="label"
                      onChange={handleChange}
                      value={values.label}
                      //  error={errors.label}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Field Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="label_type"
                        value={values.label_type}
                        error={errors.label_type}
                        onChange={handleChange}
                      >
                        <MenuItem value="text">Text Field</MenuItem>
                        <MenuItem value="textArea">Text Area</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<AddIcon />}
                      type="submit"
                      // disabled={isSubmitting}
                      onClick={handleSubmit}
                    >
                      Add
                    </Button>
                  </Grid>
                </Form>
              </>
            )}
          </Formik>
        </Grid>
        {!!inputField.length && (
          <Grid item xs={12} className={classes.addedForm}>
            {inputField.map((el, index) => (
              <form key={`${index}-label`}>
                {el.label_type === "text" ? (
                  <Grid item xs={12}>
                    {console.log("**index**", index)}
                    <TextField
                      label={el.label}
                      variant="filled"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CancelIcon onClick={deleteHandler} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={6}>
                    <TextField
                      id="filled-name"
                      label={el.label}
                      variant="filled"
                      size="large"
                      multiline={true}
                      rows={8}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <CancelIcon onClick={deleteHandler} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                )}
              </form>
            ))}
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={saveHandler}
            >
              Save
            </Button>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default Contact;
