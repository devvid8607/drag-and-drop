import { ItemProp } from "./types";
import MainScreen from "./components/MainScreen";

function App() {
  const items: ItemProp[] = [
    { id: "1", name: "Save" },
    { id: "2", name: "Execute" },
    { id: "3", name: "Create" },
  ];
  return <MainScreen initialItems={items} />;
}

export default App;
