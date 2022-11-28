import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { PostsProvider } from "./providers/PostsContext";
import * as Routes from "./routes/index";
import "./styles/global.scss";
function App() {
  return (
    <PostsProvider>
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to={"home"} />
            </Route>

            <Route exact path="/home">
              <Routes.Home />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    </PostsProvider>
  );
}

export default App;
