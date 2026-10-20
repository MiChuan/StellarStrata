import { useMemo, useState } from "react";
import { Calendar, Sparkles } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  onDateSelect: (date: Date) => void;
}

const MONTH_LABELS = [
  "一月", "二月", "三月", "四月", "五月", "六月",
  "七月", "八月", "九月", "十月", "十一月", "十二月",
];

const MIN_DATE = new Date(1900, 0, 1);

export default function CustomDatePicker({ onDateSelect }: DatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const today = useMemo(() => new Date(), []);
  // 年份列表跟随当前年份生成，不再写死到某一年
  const years = useMemo(
    () => Array.from({ length: today.getFullYear() - MIN_DATE.getFullYear() + 1 }, (_, i) => today.getFullYear() - i),
    [today],
  );

  const commit = (date: Date | null) => {
    if (date) onDateSelect(date);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="text-center animate-fade-up">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 mb-4">
          StellarStrata
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">探索你生日那天的星空与历史</p>
        <div className="flex flex-col items-center justify-center gap-1 mt-3 text-amber-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm italic">The sky above your birthday, the relics beneath it.</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-sm text-slate-400">抬头是那一日的星空，低头是沉眠千年的遗存。</span>
        </div>
      </div>

      <div className="relative w-full max-w-md animate-fade-up-slow">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-2xl blur-xl opacity-25 animate-pulse" />
        <div className="relative bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl">
          <div className="flex items-center gap-3 mb-5">
            <Calendar className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">选择你的出生日期</h2>
          </div>

          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            onSelect={(date: Date | null) => {
              // 点选日期后立即可探索，点「回车」同样生效
              if (date) {
                setStartDate(date);
                onDateSelect(date);
              }
            }}
            dateFormat="yyyy年MM月dd日"
            placeholderText="点击选择日期"
            minDate={MIN_DATE}
            maxDate={today}
            showPopperArrow={false}
            monthsShown={1}
            onKeyDown={(event) => {
              // 手动输入日期后按回车直接进入结果页
              if (event.key === "Enter" && startDate) {
                event.preventDefault();
                onDateSelect(startDate);
              }
            }}
            className="w-full px-5 py-3.5 bg-slate-800/60 border border-purple-500/30 rounded-xl text-white text-base placeholder:text-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all cursor-pointer"
            calendarClassName="stellar-calendar"
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex items-center justify-between gap-2 mb-3 px-1">
                <button
                  type="button"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  aria-label="上一个月"
                  className="p-2 rounded-lg text-purple-300 hover:bg-slate-700/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center gap-1.5">
                  <select
                    value={date.getFullYear()}
                    onChange={(e) => changeYear(parseInt(e.target.value, 10))}
                    aria-label="年份"
                    className="px-2 py-1.5 text-sm bg-slate-700/70 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-400"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year} 年
                      </option>
                    ))}
                  </select>
                  <select
                    value={date.getMonth()}
                    onChange={(e) => changeMonth(parseInt(e.target.value, 10))}
                    aria-label="月份"
                    className="px-2 py-1.5 text-sm bg-slate-700/70 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-400"
                  >
                    {MONTH_LABELS.map((month, i) => (
                      <option key={month} value={i}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  aria-label="下一个月"
                  className="p-2 rounded-lg text-purple-300 hover:bg-slate-700/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          />

          <button
            type="button"
            onClick={() => commit(startDate)}
            disabled={!startDate}
            className="mt-5 w-full px-6 py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 rounded-xl text-white font-semibold text-base hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-100 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {startDate ? "探索星图与文物" : "请先选择一个日期"}
          </button>
        </div>
      </div>
    </div>
  );
}
