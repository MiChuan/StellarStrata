import React, { useState } from "react";
import { Calendar, Sparkles } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  onDateSelect: (date: Date) => void;
}

export default function CustomDatePicker({ onDateSelect }: DatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
      onDateSelect(date);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 mb-4">
          StellarStrata
        </h1>
        <p className="text-gray-400 text-lg">
          探索你生日那天的星空与历史
        </p>
        <div className="flex flex-col items-center justify-center gap-1 mt-3 text-amber-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm italic">The sky above your birthday, the relics beneath it.</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-sm text-gray-300">抬头是那一日的星空，低头是沉眠千年的遗存。</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-2xl blur-xl opacity-30 animate-pulse" />
        <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md rounded-2xl p-8 border border-purple-500/30 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">选择你的出生日期</h2>
          </div>
          
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="yyyy年MM月dd日"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            minDate={new Date("1900-01-01")}
            maxDate={new Date()}
            className="w-full px-6 py-4 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white text-lg focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all"
            renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="p-2 rounded-lg hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  <select
                    value={date.getFullYear()}
                    onChange={(e) => changeYear(parseInt(e.target.value))}
                    className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-400"
                  >
                    {Array.from({ length: 125 }, (_, i) => 2025 - i).map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <select
                    value={date.getMonth()}
                    onChange={(e) => changeMonth(parseInt(e.target.value))}
                    className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-400"
                  >
                    {["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"].map((month, i) => (
                      <option key={i} value={i}>{month}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="p-2 rounded-lg hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
            dayClassName={(date) => {
              if (date.getDay() === 0 || date.getDay() === 6) {
                return "text-purple-400";
              }
              return "text-white";
            }}
          />
          
          {startDate && (
            <div className="mt-6 text-center">
              <button
                onClick={() => startDate && onDateSelect(startDate)}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300"
              >
                探索星图与文物
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
