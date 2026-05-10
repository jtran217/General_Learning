import { useTimer } from "@/hook/useTimer";
import Timer from "./components/Timer";

export default function TimerPlayground() {
  
  const brainstormTimer = useTimer(60)
  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm">
    <p className="text-gray-300 text-sm text-center">
      "TIMER!!"
    </p>

    <Timer
      remaining={brainstormTimer.remaining}
      total={60}
      isRunning={brainstormTimer.isRunning}
    />

    <button
      onClick={brainstormTimer.start}
      className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition-colors"
    >
      Start
    </button>
    <button
      onClick={brainstormTimer.stop}
      className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition-colors"
    >
      Stop
    </button>
  </div>
  );
}

