"use client"
import { ArrowRightLeft } from 'lucide-react';

export const LanguageOption = ({ value, label }) => (
  <div className="flex items-center">
    <input
      type="radio"
      name="options"
      value={value}
      id={value}
      className="hidden peer"
      checked={options === value}
      onChange={(e) => setOptions(e.target.value)}
    />
    <label
      htmlFor={value}
      className="cursor-pointer rounded-full py-2 px-8 text-gray-600 transition-colors duration-200 peer-checked:bg-[#f79d9c] peer-checked:text-white"
    >
      {label}
    </label>
  </div>
);

export const SwapIcon = () => (
  <div
    className="flex items-center justify-center px-2 cursor-pointer"
    onClick={swapLanguages}
  >
    <ArrowRightLeft className="w-5 h-5 text-gray-600" />
  </div>
);
