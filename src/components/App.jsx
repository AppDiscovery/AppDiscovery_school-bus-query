import React, { Component } from "react";
import axios from "axios";
import List from "./List";
import busData from "../busData";
import styles from "./App.less";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.title}>2333</div>
        <List className={styles.list} data={busData} />
      </div>
    );
  }
}

export default App;
