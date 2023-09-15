import { FC, CSSProperties } from "react";

import "./style.scss";

interface IUserTyping {
  name: string;
  style?: CSSProperties;
}

const UserTyping: FC<IUserTyping> = ({ name, style }) => {
  return (
    <div className="typing" style={style}>
      <span className="typing__label">{name} is typing</span>
      <div className="typing__dots">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </div>
  );
};

export default UserTyping;
