import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { observer } from "mobx-react-lite";
function App() {
  return <RouterProvider router={router} />;
}

export default observer(App);
