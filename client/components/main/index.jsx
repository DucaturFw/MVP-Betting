import React, { Component } from 'react';

export default function({ children }) {
  return (
    <div className="mvp-new">
      <div className="main">
        <img className="b-g" src="./images/mvp  newbg.png" />
        <img className="oval" src="./images/mvp  newoval.png" />
        <img className="map" src="./images/mvp  newmap.png" />

        <div className="bull-and-bear">
          <img className="page1" src="./images/mvp  newpage 1.png" />
          <div className="page1-copy">
            <img className="fill1" src="./images/mvp  newfill 1.png" />
            <div className="group42">
              <img className="group4" src="./images/mvp  new group 4.png" />
              <img className="fill5" src="./images/mvp  newfill 5.png" />
              <img className="fill7" src="./images/mvp  newfill 7.png" />
              <img className="group11" src="./images/mvp  new group 11.png" />
              <img className="fill12" src="./images/mvp  newfill 12.png" />
              <img className="fill14" src="./images/mvp  newfill 14.png" />
              <img className="group18" src="./images/mvp  new group 18.png" />
              <img className="fill19" src="./images/mvp  newfill 19.png" />
              <img className="fill21" src="./images/mvp  newfill 21.png" />
              <img className="fill23" src="./images/mvp  newfill 14.png" />
              <img className="fill25" src="./images/mvp  newfill 25.png" />
              <img className="group29" src="./images/mvp  new group 29.png" />
              <img className="fill30" src="./images/mvp  newfill 30.png" />
              <img className="fill32" src="./images/mvp  newfill 32.png" />
              <img className="group36" src="./images/mvp  new group 36.png" />
              <img className="fill37" src="./images/mvp  newfill 37.png" />
              <img className="group41" src="./images/mvp  new group 41.png" />
            </div>
          </div>
          <img className="bull2" src="./images/mvp  newbull2.png" />
          <img className="bear" src="./images/mvp  newbear.png" />
          <div className="page11">
            <img className="fill11" src="./images/mvp  newfill 1  1.png" />
            <img className="fill3" src="./images/mvp  newfill 3.png" />
            <img className="group7" src="./images/mvp  new group 7.png" />
            <img className="fill8" src="./images/mvp  newfill 8.png" />
            <img className="fill10" src="./images/mvp  newfill 10.png" />
            <img className="fill121" src="./images/mvp  newfill 12  1.png" />
            <img className="fill141" src="./images/mvp  newfill 14  1.png" />
            <img className="fill16" src="./images/mvp  newfill 16.png" />
            <img className="fill18" src="./images/mvp  newfill 18.png" />
            <img className="fill20" src="./images/mvp  newfill 20.png" />
            <img className="fill251" src="./images/mvp  newfill 25  1.png" />
            <img className="fill27" src="./images/mvp  newfill 27.png" />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
