import './App.css';
import React from "react";
import { Route ,Switch } from "react-router-dom";
import { Login } from '../src/Views/Login/Login';
import { Contact } from './Views/Contact/Contact';
import { Menu } from '../src/Views/Menu/Menu';

function App() {
  return (
    <Switch >

<Route path="/Menu" component={Menu} />

    <Route path="/Contact" component={Contact} />
    <Route path="/" component={Login} />

    </Switch >

  );
}

export default App;
