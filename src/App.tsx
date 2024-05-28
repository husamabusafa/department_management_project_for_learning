import "./App.css";

import { MantineProvider, Paper } from "@mantine/core";
import BasicAppShell from "./pages/BasicAppShell";

function App() {
  return (
    <div>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        //@ts-ignore
        theme={{
          fontFamily: "IBM Plex Sans Arabic",
          primaryColor: "color1",
          // colorScheme: theme ? theme : "light",
          dir: "ltr",
          colors: {
            color1: [
              "#f5ecfe",
              "#e6d3f9",
              "#cba2f4",
              "#b06ef1",
              "#9944ee",
              "#8a2aec",
              "#841eed",
              "#7114d3",
              "#650fbc",
              "#5708a6",
            ],
            color2: [
              "#e1fef8",
              "#d3f8ef",
              "#aaeddd",
              "#80e2ca",
              "#5cd9b9",
              "#44d3af",
              "#34d0aa",
              "#20b994",
              "#0ca483",
              "#008f6f",
            ],
            color3: [
              "#fff9e1",
              "#fff0cc",
              "#ffe09b",
              "#ffce64",
              "#ffc038",
              "#ffb61c",
              "#ffb209",
              "#e39c00",
              "#ca8a00",
              "#af7600",
            ],
            color4: [
              "#ffeae6",
              "#ffd3d0",
              "#fca49f",
              "#f8736b",
              "#f54a3f",
              "#f43023",
              "#f42114",
              "#da1309",
              "#c30a06",
              "#ab0001",
            ],
          },
        }}
      >
        <Paper>
          <BasicAppShell />
        </Paper>
      </MantineProvider>
    </div>
  );
}

export default App;
