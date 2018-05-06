import React, { Component } from 'react';

export default function ({ onMenuClick }) {
  return (
    <div className="t-itle">
      <div className="group8">
        <div className="the-most-accurate-pr">The most accurate prediction always wins!</div>
        <div className="n-av">
          <div className="ducatur-logo">
            <img className="fill13" src="./images/mvp  newfill 1  2.png" />
            <img className="fill31" src="./images/mvp  newfill 11.png" />
            <img className="fill51" src="./images/mvp  newfill 5  1.png" />
            <img className="fill71" src="./images/mvp  newfill 7  1.png" />
            <img className="fill9" src="./images/mvp  newfill 9.png" />
            <img className="fill111" src="./images/mvp  newfill 11.png" />
            <img className="group15" src="./images/mvp  new group 15.png" />
            <img className="group181" src="./images/mvp  new group 18  1.png" />
          </div>
        </div>
        <img onClick={onMenuClick} className="menu-icon" src="./images/mvp  newmenu icon.png" />
      </div>
    </div>
  );
}
