import { useState, useRef } from "react";
import "./styles.css";
import domtoimage from "dom-to-image";

const colours1 = ["#227c9d", "#17c3b2", "#ffcb77", "#fef9ef", "#fe6d73"];
const colours2 = ["#38a3a5", "#57cc99", "#80ed99", "#c7f9cc", "#0fa3b1"];
const colours3 = ["#48cae4", "#8d99ae", "#edf2f4", "#fb6f92", "#ef233c"];
const numbers = new Array(10).fill(1).map((_, index) => index);
const colours = [colours1, colours2, colours3];

export default function App() {
  const [colourPalette, setColourPalette] = useState(colours2);
  const [rowStarts, setRowStarts] = useState([0, 0]);
  const [rowEnds, setRowEnds] = useState([0, 0]);
  const [columnStarts, setColumnStarts] = useState([0, 0]);
  const [columnEnds, setColumnEnds] = useState([0, 0]);
  const downloadRef = useRef();

  const generate = () => {
    setColourPalette(colours[Math.floor(Math.random() * 3)]);
    setRowStarts(numbers.map(() => Math.floor(Math.random() * 10)));
    setRowEnds(numbers.map(() => Math.floor(Math.random() * 20)));
    setColumnStarts(numbers.map(() => Math.floor(Math.random() * 10)));
    setColumnEnds(numbers.map(() => Math.floor(Math.random() * 20)));
  };
  // const download = () => {
  //   domtoimage.toBlob(document.getElementById("my-node")).then(function (blob) {
  //     window.saveAs(blob, "my-node.png");
  //   });
  // };

  const download = () => {
    const targetEl = downloadRef.current;
    domtoimage.toJpeg(targetEl, { quality: 0.95 }).then((dataUrl) => {
      let link = document.createElement("a");
      link.download = "profile banner.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <span className="logo" aria-label="Ract Art logo">
          <span>R🇪ct</span>
          <span>🇦rt</span>
        </span>
        <button className="btn-generate" onClick={generate}>
          Generate
        </button>
        <button className="btn-generate" onClick={download}>
          Download
        </button>
      </header>
      <div className="box-wrapper" ref={downloadRef}>
        <div className="box">
          {numbers.map((number) => {
            return (
              <div
                id={number}
                key={`${colourPalette[number % 5]}-${number}`}
                className="gridItem"
                style={{
                  backgroundColor: colourPalette[number % 5],
                  gridRowStart: rowStarts[number],
                  gridRowEnd: rowEnds[number],
                  gridColumnStart: columnStarts[number],
                  gridColumnEnd: columnEnds[number]
                }}
              />
            );
          })}
          <div key="profile" className="gridItem profile">
            ♥<span>ﻌ</span>♥
          </div>
        </div>
        <div className="box content">
          {numbers.map((number) => {
            return (
              <div
                id={number}
                key={`${colourPalette[number % 5]}-${number}`}
                className="gridItem"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
