import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Circle,
  ListTodo,
  Plus,
  Smile,
  StickyNote,
  Trash2,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const STORAGE_KEY = "good-day-helper-state";

const moodOptions = [
  { value: "great", label: "Excelente", emoji: "😄" },
  { value: "good", label: "Bem", emoji: "🙂" },
  { value: "neutral", label: "Normal", emoji: "😐" },
  { value: "low", label: "Em baixo", emoji: "😕" },
];

function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as {
          tasks?: Task[];
          mood?: string;
          notes?: string;
          date?: string;
        };

        const today = new Date().toISOString().slice(0, 10);
        if (parsed.date === today) {
          setTasks(parsed.tasks ?? []);
          setMood(parsed.mood ?? "");
          setNotes(parsed.notes ?? "");
        }
      }
    } catch {
      // Ignore malformed local data and start with a clean day.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        date: new Date().toISOString().slice(0, 10),
        tasks,
        mood,
        notes,
      }),
    );
  }, [tasks, mood, notes, hydrated]);

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks],
  );

  const progress = tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  }, []);

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("pt-PT", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(new Date()),
    [],
  );

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = newTask.trim();
    if (!title) return;

    setTasks((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        title,
        completed: false,
      },
    ]);
    setNewTask("");
  }

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function resetDay() {
    setTasks([]);
    setMood("");
    setNotes("");
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-3xl bg-gradient-to-br from-slate-950 to-slate-800 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-slate-300">
                Good Day Helper
              </p>
              <h1 className="text-3xl font-bold sm:text-4xl">{greeting} 👋</h1>
              <p className="mt-2 capitalize text-slate-300">{formattedDate}</p>
            </div>

            <button
              type="button"
              onClick={resetDay}
              className="w-fit rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Reiniciar o dia
            </button>
          </div>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<ListTodo className="h-5 w-5" />}
            label="Tarefas"
            value={String(tasks.length)}
          />
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Concluídas"
            value={String(completedTasks)}
          />
          <StatCard
            icon={<Smile className="h-5 w-5" />}
            label="Progresso"
            value={`${progress}%`}
          />
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">As minhas tarefas</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Organiza as prioridades do teu dia.
                </p>
              </div>
              <ListTodo className="h-6 w-6 text-slate-400" />
            </div>

            <form onSubmit={addTask} className="mb-5 flex gap-2">
              <input
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                placeholder="Ex.: Estudar 30 minutos"
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Adicionar</span>
              </button>
            </form>

            <div className="mb-5">
              <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
                <span>Progresso diário</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              {tasks.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center">
                  <p className="text-sm font-medium text-slate-600">Ainda não há tarefas.</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Adiciona a primeira tarefa para começares o teu dia.
                  </p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                  >
                    <button
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      aria-label={task.completed ? "Marcar como pendente" : "Marcar como concluída"}
                      className="text-slate-600 transition hover:text-slate-950"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Circle className="h-5 w-5" />
                      )}
                    </button>
                    <span
                      className={`min-w-0 flex-1 text-sm ${
                        task.completed ? "text-slate-400 line-through" : "text-slate-700"
                      }`}
                    >
                      {task.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteTask(task.id)}
                      aria-label="Eliminar tarefa"
                      className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <Smile className="h-5 w-5 text-slate-500" />
                <h2 className="font-semibold">Como te sentes hoje?</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {moodOptions.map((option) => {
                  const selected = mood === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setMood(option.value)}
                      className={`rounded-2xl border p-3 text-left transition ${
                        selected
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                      }`}
                    >
                      <span className="block text-2xl">{option.emoji}</span>
                      <span className="mt-1 block text-xs font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <StickyNote className="h-5 w-5 text-slate-500" />
                <h2 className="font-semibold">Notas rápidas</h2>
              </div>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Escreve uma ideia, lembrete ou reflexão..."
                rows={7}
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
              />
              <p className="mt-2 text-xs text-slate-400">Guardado automaticamente neste dispositivo.</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
        {icon}
      </div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
