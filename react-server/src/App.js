import AdminPanel from "./AdminPanel";
import PrivateRouter from "./Containers/PrivateRouter";

function App() {
  return (
    <div className="App">
      <PrivateRouter>
        <AdminPanel />
      </PrivateRouter>
    </div>
  );
}

//Private Router authorizeyi kontrol ediyor !
export default App;
