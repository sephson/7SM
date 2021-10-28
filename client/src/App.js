import "./App.css";
import { Gallery } from "./pages/Gallery/Gallery";
import { Home } from "./pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/gallery">
            <Gallery />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

//color pallete
//ffffff
// f5f3f4
// d3d3d3
// b1a7a6
// e5383b
// ba181b
// a4161a
// 660708
// 161a1d
// 0b090a
