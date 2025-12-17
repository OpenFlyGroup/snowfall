import { SnowAccumulation } from "./components/SnowAccumulation";
import { SnowCanvas } from "./components/SnowCanvas";
import { SnowControls } from "./components/SnowControls";

export default function App() {
  return (
    <>
      <SnowCanvas accumulationElements={[".card", "h1", "button"]} />
      <SnowAccumulation elementId="header" />
      <SnowControls />

      <h1 className="relative">Winter Wonderland</h1>
      <div className="card relative">Snow will accumulate here</div>
    </>
  );
}
