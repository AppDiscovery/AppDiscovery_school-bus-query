import React from "react";
import cx from "classnames";
import styles from "./ListItem.less";

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      missed: false,
      waitTime: "...",
      hour: 0,
      minute: 0
    };
  }

  getWaitTime() {
    const { hour, minute } = this.state;
    const currentTime = Date.now();
    const nowDate = new Date();
    const targetTime = new Date(
      nowDate.getFullYear(),
      nowDate.getMonth(),
      nowDate.getDate(),
      hour,
      minute,
      0,
      0
    ).getTime();

    if (currentTime > targetTime) {
      this.setState({ missed: true, waitTime: "" });
      return;
    }

    const [waitHourStr, waitMinuteStr] = new Date(targetTime - currentTime)
      .toLocaleTimeString("en-GB", {
        timeZone: "UTC"
      })
      .split(":");

    const waitHour = parseInt(waitHourStr, 10);
    const waitMinute = parseInt(waitMinuteStr, 10);
    let waitTime = waitHour > 0 ? `${waitHour}小时` : "";
    waitTime = waitTime + (waitMinute > 0 ? `${waitMinute}分钟` : "");

    this.setState({
      waitTime: waitTime === "" ? "不足1分钟" : waitTime
    });
  }

  componentDidMount() {
    const { time } = this.props;
    const [hour, minute] = time.split(":");

    this.setState({ hour, minute });

    setInterval(() => this.getWaitTime(), 1000);
  }

  render() {
    const { time, index } = this.props;
    const { missed, waitTime } = this.state;

    return (
      <div className={cx(styles.root, { [styles.greyBackground]: index % 2 })}>
        <div className={styles.time}>{time}</div>
        <div className={styles.info}>
          {missed ? (
            <span className={styles.missed}>该班次已发出</span>
          ) : (
            <span>
              距发车还有<span className={styles.wait}>{waitTime}</span>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default ListItem;
