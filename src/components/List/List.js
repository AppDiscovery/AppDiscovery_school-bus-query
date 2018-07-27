import React from "react";
import cx from "classnames";
import ListItem from "./ListItem";
import styles from "./List.less";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { className, data } = this.props;
    const { title, from: fromPos, to: toPos, time } = data;
    return (
      <div className={cx(className, styles.root)}>
        <div className={styles.title}>{title}</div>
        <div className={styles.title}>{`${fromPos} -> ${toPos}`}</div>
        {time.map((item, index) => (
          <ListItem key={`key-${item}`} time={item} index={index} />
        ))}
      </div>
    );
  }
}

export default List;
