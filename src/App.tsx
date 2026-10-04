import { useState } from "react";
import ProductManagerBefore from "./pages/ProductManagerBefore";
import ProductManagerAfter from "./pages/ProductManagerAfter";

 const DEFAULT_MODE: "before" | "after" = "after"; 

function App() {
  const [mode, setMode] = useState<"before" | "after">(DEFAULT_MODE);

  return (
    <div>
      <div className="dev-toggle">
        <button onClick={() => setMode("before")} disabled={mode === "before"}>
          Xem bản Trước
        </button>
        <button onClick={() => setMode("after")} disabled={mode === "after"}>
          Xem bản Sau
        </button>
        <span className="dev-toggle__hint">
        </span>
      </div>

      {mode === "before" ? <ProductManagerBefore /> : <ProductManagerAfter />}
    </div>
  );
}

export default App;
