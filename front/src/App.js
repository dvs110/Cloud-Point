import { Route, Routes, BrowserRouter } from "react-router-dom";

import Out from "./components/Out/Out";
import FormSec from "./components/Form/FormSec";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormSec />} />
        <Route path="/out" element={<Out />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
