import React from "react";

export default function Quote() {
  return (
    <div className="bg-slate-200 h-screen flex justify-center item-center flex-col px-24">
      <div className="flex justify center text-3xl font-bold">
        "The customer service I received was exceptional. The support team went
        above and beyond to address my concerns."
      </div>
      <div className="py-2">
        <div className="text-xl font-semibold">Jules Winnifield</div>
        <div className="font-light font-semibold text-slate-400">CEO, Acme Inc</div>
      </div>
    </div>
  );
}
