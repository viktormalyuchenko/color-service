"use client";
import { useState, useEffect } from "react";

export default function BackgroundDots() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="grid w-full h-full justify-center align-center"
        style={{
          gridTemplateColumns: "repeat(auto-fill, 24px)",
          gridTemplateRows: "repeat(auto-fill, 24px)",
        }}
      >
        {/* Генерируем много точек. 2500 штук хватит для большинства экранов */}
        {Array.from({ length: 2500 }).map((_, i) => (
          <Dot key={i} />
        ))}
      </div>
    </div>
  );
}

function Dot() {
  return (
    <div className="w-6 h-6 flex items-center justify-center pointer-events-auto group">
      <div
        className="w-[2px] h-[2px] rounded-full bg-gray-200 transition-all duration-500 ease-out 
        group-hover:w-[12px] group-hover:h-[12px] 
        group-hover:bg-gradient-to-br group-hover:from-orange-400 group-hover:to-blue-500 
        group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      />
    </div>
  );
}
