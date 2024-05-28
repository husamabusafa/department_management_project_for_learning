import { useState } from "react";
import { AppShell, Burger, Text, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Form from "./Form";
import Program from "./Program";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

function BasicAppShell() {
  const [opened] = useState(false);
  const theme = useMantineTheme();

  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <Router>
      <AppShell
        style={{ backgroundcolor: "Black" }}
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <header style={{ backgroundColor: "#b8bbbf" }}>
            <Burger
              opened={opened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              color={theme.colors.gray[9]}
            />

            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontFamily: "Verdana",
                fontWeight: "bold",
                color: "#1f2021",
              }}
            >
              PROJECT TIME-LINE
            </div>
          </header>
        </AppShell.Header>

        <AppShell.Navbar>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "100",
              backgroundColor: "#161e26",
              width: "100%",
              height: "100%",
              color: "White",
            }}
          >
            <Text
              component={Link}
              variant="link"
              to="/form"
              style={{
                display: "inline-block",
                padding: "15px 30px",
                border: "2px solid White",
                backgroundColor: "#1c436b",
                textAlign: "center",
                fontFamily: "Verdana",
                fontSize: "15px",
              }}
            >
              Department Form
            </Text>
            <Text
              component={Link}
              variant="link"
              to="/program"
              style={{
                display: "inline-block",
                padding: "15px 30px",
                border: "2px solid White",
                backgroundColor: "#1c436b",
                textAlign: "center",
                fontFamily: "Verdana",
                fontSize: "15px",
              }}
            >
              Program Form
            </Text>
          </div>
        </AppShell.Navbar>
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/program" element={<Program />} />
        </Routes>
      </AppShell>
    </Router>
  );
}
export default BasicAppShell;
