import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles/Button.css";
function Form() {
  const [] = useState("");

  const form = useForm({
    initialValues: {
      deptName: "",
      deptDescription: "",
    },
    validate: {
      deptName: (value) =>
        value.length == 0 ? "Name must not be empty!" : null,
      deptDescription: (value) =>
        value.length < 3 ? "Name must have at least 3 letters" : null,
    },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit(console.log)}
        style={{
          border: "5px solid #5C000E",
          position: "absolute",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          outlineStyle: "solid",
        }}
      >
        <TextInput
          label="Department Name"
          placeholder="Type The Name Here"
          key={form.key("deptName")}
          {...form.getInputProps("deptName")}
        />
        <TextInput
          label="Description"
          placeholder="Give a Description"
          mt="md"
          key={form.key("deptDescription")}
          {...form.getInputProps("deptDescription")}
        />
        <Button
          mt="sm"
          type="submit"
          variant="filled"
          color="#A10018"
          style={{ color: "White" }}
        >
          Submit
        </Button>
      </form>
    </>
  );
}
export default Form;
