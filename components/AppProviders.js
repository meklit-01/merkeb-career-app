"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
const AppContext = createContext(null);
const USERS_KEY = "merkeb_demo_users_v1";
const SESSION_KEY = "merkeb_demo_session_v1";
const PROGRESS_KEY = "merkeb_demo_progress_v1";
const TASKS_KEY = "merkeb_demo_tasks_v1";
const emptyProgress = () => ({
  savedCareerIds: [],
  completedTopics: {},
  notes: "",
  activity: [],
});
const userProgressKey = (email) => `${PROGRESS_KEY}:${email}`;
const userTasksKey = (email) => `${TASKS_KEY}:${email}`;
const seedTasks = [
  {
    id: "task-1",
    title: "Choose one target career",
    description:
      "Explore the career directory and save a career that interests you.",
    category: "Explore",
    minutes: 20,
  },
  {
    id: "task-2",
    title: "Study one beginner topic",
    description:
      "Complete a beginner topic from your saved career learning path.",
    category: "Learn",
    minutes: 30,
  },
  {
    id: "task-3",
    title: "Practice a useful skill",
    description: "Spend focused time practising one technical or soft skill.",
    category: "Practice",
    minutes: 45,
  },
  {
    id: "task-4",
    title: "Update your progress notes",
    description:
      "Write what you learned, what was difficult, and your next step.",
    category: "Reflect",
    minutes: 15,
  },
];
function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}
function getWeekKey(date = new Date()) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}
export function AppProviders({ children }) {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({
    savedCareerIds: [],
    completedTopics: {},
    notes: "",
    activity: [],
  });
  const [tasks, setTasks] = useState({});
  const [ready, setReady] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const session = readJson(SESSION_KEY, null);
    if (session?.email) {
      setUser(session);
      setProgress(readJson(userProgressKey(session.email), emptyProgress()));
      setTasks(readJson(userTasksKey(session.email), {}));
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready && user?.email)
      localStorage.setItem(
        userProgressKey(user.email),
        JSON.stringify(progress),
      );
  }, [progress, ready, user]);
  useEffect(() => {
    if (ready && user?.email)
      localStorage.setItem(userTasksKey(user.email), JSON.stringify(tasks));
  }, [tasks, ready, user]);
  const register = useCallback(({ name, email, password }) => {
    const normalized = email.trim().toLowerCase();
    const users = readJson(USERS_KEY, []);
    if (users.some((item) => item.email === normalized))
      return {
        ok: false,
        message: "An account with this email already exists. Please sign in.",
      };
    const nextUser = {
      name: name.trim(),
      email: normalized,
      createdAt: new Date().toISOString(),
    };
    const nextUsers = [...users, { ...nextUser, password }];
    localStorage.setItem(USERS_KEY, JSON.stringify(nextUsers));
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    setProgress(emptyProgress());
    setTasks({});
    localStorage.setItem(
      userProgressKey(normalized),
      JSON.stringify(emptyProgress()),
    );
    localStorage.setItem(userTasksKey(normalized), JSON.stringify({}));
    return { ok: true };
  }, []);
  const login = useCallback(({ email, password }) => {
    const normalized = email.trim().toLowerCase();
    const users = readJson(USERS_KEY, []);
    const found = users.find(
      (item) => item.email === normalized && item.password === password,
    );
    if (!found)
      return {
        ok: false,
        message:
          "Email or password is incorrect. If this is your first visit, create an account.",
      };
    const nextUser = {
      name: found.name,
      email: found.email,
      createdAt: found.createdAt,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    setProgress(readJson(userProgressKey(normalized), emptyProgress()));
    setTasks(readJson(userTasksKey(normalized), {}));
    return { ok: true };
  }, []);
  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
    router.push("/");
  }, [router]);
  const recordActivity = useCallback(
    (label) =>
      setProgress((old) => ({
        ...old,
        activity: [
          {
            id: `${Date.now()}-${Math.random()}`,
            label,
            at: new Date().toISOString(),
          },
          ...(old.activity || []),
        ].slice(0, 30),
      })),
    [],
  );
  const toggleSavedCareer = useCallback(
    (id) =>
      setProgress((old) => {
        const exists = old.savedCareerIds.includes(id);
        const savedCareerIds = exists
          ? old.savedCareerIds.filter((item) => item !== id)
          : [...old.savedCareerIds, id];
        return { ...old, savedCareerIds };
      }),
    [],
  );
  const toggleTopic = useCallback(
    (careerId, topic) => {
      setProgress((old) => {
        const completedTopics = { ...old.completedTopics };
        const careerTopics = new Set(completedTopics[careerId] || []);
        if (careerTopics.has(topic)) careerTopics.delete(topic);
        else careerTopics.add(topic);
        completedTopics[careerId] = [...careerTopics];
        return { ...old, completedTopics };
      });
      recordActivity(`Updated learning progress: ${topic}`);
    },
    [recordActivity],
  );
  const toggleTask = useCallback(
    (taskId) => {
      const week = getWeekKey();
      setTasks((old) => {
        const current = old[week] || [];
        return {
          ...old,
          [week]: current.includes(taskId)
            ? current.filter((id) => id !== taskId)
            : [...current, taskId],
        };
      });
      recordActivity("Updated weekly task checklist");
    },
    [recordActivity],
  );
  const saveNotes = useCallback(
    (notes) => {
      setProgress((old) => ({ ...old, notes }));
      recordActivity("Updated weekly reflection notes");
    },
    [recordActivity],
  );
  const value = useMemo(
    () => ({
      user,
      ready,
      progress,
      tasks,
      seedTasks,
      weekKey: getWeekKey(),
      register,
      login,
      logout,
      toggleSavedCareer,
      toggleTopic,
      toggleTask,
      saveNotes,
      recordActivity,
    }),
    [
      user,
      ready,
      progress,
      tasks,
      register,
      login,
      logout,
      toggleSavedCareer,
      toggleTopic,
      toggleTask,
      saveNotes,
      recordActivity,
    ],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useApp must be used inside AppProviders");
  return value;
}
export function RequireAuth({ children }) {
  const { user, ready } = useApp();
  const router = useRouter();
  useEffect(() => {
    if (ready && !user)
      router.replace(`/login?next=${encodeURIComponent("/dashboard")}`);
  }, [ready, user, router]);
  if (!ready || !user)
    return (
      <main className="standard-page">
        <div className="loading-panel">Preparing your personal workspace…</div>
      </main>
    );
  return children;
}
