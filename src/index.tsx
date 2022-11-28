import ReactDOM from "react-dom/client";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { PostsProvider } from "./providers/PostsContext";
import * as Routes from "./routes/index";
//scss global
import "./styles/global.scss";

const Root = () => {
  return (
    <PostsProvider>
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
    </PostsProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<Root />);
