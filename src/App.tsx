import { SnowAccumulation } from "./components/SnowAccumulation";
import { SnowCanvas } from "./components/SnowCanvas";
import { SnowControls } from "./components/SnowControls";

export default function App() {
  return (
    <div className="bg-blue-900 min-h-screen">
      <SnowCanvas accumulationElements={[".card", "h1", "button"]} />
      <SnowAccumulation elementId="header" />
      <SnowControls />

      <h1 className="relative">Winter Wonderland</h1>
      <div>
        <div className="card relative">This is a card</div>
        <div className="card relative">Another card here</div>
        <div className="card-container">
          <div className="card relative">Card inside a container</div>
          <div className="card relative">And another one</div>
        </div>
      </div>
      <div className="card relative">Snow will accumulate here</div>
    </div>
  );
}
