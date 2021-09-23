import React from "react";
import ReactDOM from "react-dom";

function Video(props) {
  const handleMute = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };

  const handleAutoScroll = (e) => {
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling;

    if (next) {
      next.scrollIntoView({ behaviour: "smooth" });
      e.target.muted = true;
    }
  };

  return (
    <>
      <video
        onEnded={handleAutoScroll}
        src={props.source}
        className="video-styles"
        onClick={handleMute}
        muted="muted"
        type="video/mp4"
        style={{
          width: "100%",
          height: "80vh",
          scrollSnapAlign: "start",
        }}
      />
    </>
  );
}

export default Video;
