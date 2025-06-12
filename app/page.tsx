import { Suspense } from "react";
import Home from "./pages/Home";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <Home />
    </Suspense>
  );
}
