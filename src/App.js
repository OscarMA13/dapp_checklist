import { useEthers } from "@usedapp/core";
import Checklist from "./Checklist";

function App() {
  const { library, account } = useEthers();

  if (!library || !account) {
    return <div>Loading...</div>;
  }

  return <Checklist signer={library.getSigner()} />;
}

export default App;
