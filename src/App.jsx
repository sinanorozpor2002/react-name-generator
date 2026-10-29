import FlyingButton from "./component/FlyingButton";
import Aurora from "./component/Aurora";
import "./App.css";
import Form from "./component/Form";
import { useState } from "react";

export default function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app">
      {" "}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Aurora
          colorStops={["#5227FF", "#7cff67", "#5227FF"]}
          amplitude={1}
          blend={0.5}
          height={1}
          speed={1}
          glow={0.6}
          scale={1}
          brightness={1}
          layers={1}
          direction="top"
          opacity={1}
          mouseInteraction
          intro
          lightMode={false}
        />
      </div>
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        {!showForm && (
          <FlyingButton
            theme="dark"
            size="medium"
            altitude={170}
            onClick={() => setShowForm(true)}
          >
            Take off
          </FlyingButton>
        )}

        {showForm && <Form onClose={() => setShowForm(false)} />}
      </div>
    </div>
  );
}
