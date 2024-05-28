import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { Select } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/core/styles/Button.css";
function Program() {
  const [] = useState("");

  const form = useForm({
    initialValues: {
      progName: "",
      department: "",
      progStatus: "",
    },
    validate: {
      progName: (value) =>
        value.length == 0 ? "Name must not be empty!" : null,
      department: (value) =>
        value.length == 0 ? "Field Cannot be empty!" : null,
      progStatus: (value) =>
        value.length == 0 ? "Field Cannot be empty!" : null,
    },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => {
          console.log("values", values);
        })}
        style={{
          backgroundColor: "#1f2021",
          color: "White",
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
        <Select
          label="Department"
          placeholder="Select The Department"
          data={["ABC", "EFG", "HIJ", "LMN"]}
          key={form.key("department")}
          {...form.getInputProps("department")}
        />
        <TextInput
          label="Program Name"
          placeholder="Type The Name Here"
          key={form.key("progName")}
          {...form.getInputProps("progName")}
        />
        <Select
          label="Program Status"
          placeholder="Select Status of Program"
          data={["Completed", "Cancel", "Ongoing"]}
          key={form.key("progStats")}
          {...form.getInputProps("progStatus")}
        />
        <Button
          mt="sm"
          type="submit"
          variant="filled"
          color="#1c436b"
          style={{ color: "White" }}
        >
          Submit
        </Button>
      </form>
    </>
  );
}
export default Program;
