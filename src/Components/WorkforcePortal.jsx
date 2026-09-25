import { useState } from 'react';
import {
  Briefcase, Calendar, CheckCircle2, Clock, IndianRupee, Lock,
  LogOut, Plus, User, Users, AlertCircle,
} from 'lucide-react';

export const WORKFORCE_MEMBERS = [
  { id: 'staff-1', name: 'Aarav Das', role: 'Service Associate', shift: 'Morning · 9:00 AM–5:00 PM', days: 22, attendance: 95.6, duty: 'On Duty', basePay: 18000, overtime: 6 },
  { id: 'staff-2', name: 'Mira Patel', role: 'Barista', shift: 'Evening · 2:00 PM–10:00 PM', days: 21, attendance: 91.3, duty: 'On Duty', basePay: 19500, overtime: 4 },
  { id: 'staff-3', name: 'Kabir Mohanty', role: 'Kitchen Associate', shift: 'Morning · 9:00 AM–5:00 PM', days: 20, attendance: 87.0, duty: 'Off Duty', basePay: 21000, overtime: 9 },
  { id: 'staff-4', name: 'Nisha Rao', role: 'Floor Lead', shift: 'Evening · 2:00 PM–10:00 PM', days: 23, attendance: 100, duty: 'On Duty', basePay: 24000, overtime: 3 },
];

export const INITIAL_WORKFORCE_TASKS = [
  { id: 'task-1', employeeId: 'staff-1', description: 'Set up the outdoor garden tables', priority: 'High', targetTime: '10:00 AM', status: 'Pending' },
  { id: 'task-2', employeeId: 'staff-1', description: 'Restock takeaway cups and napkins', priority: 'Medium', targetTime: '12:00 PM', status: 'Completed' },
  { id: 'task-3', employeeId: 'staff-2', description: 'Calibrate espresso grinder', priority: 'High', targetTime: '3:00 PM', status: 'Pending' },
];

const initialCredentials = { username: '', pin: '' };
const money = (value) => `₹${value.toLocaleString('en-IN')}`;
const payFor = (member) => member.basePay + member.overtime * 150;

function MetricCard({ icon: Icon, label, value, detail }) {
  return (
    <article className="rounded-2xl border border-stone-800 bg-stone-900 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-stone-400">{label}</p>
        <Icon className="h-5 w-5 text-amber-400" aria-hidden="true" />
      </div>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-stone-500">{detail}</p>
    </article>
  );
}

function StatusBadge({ status }) {
  const style = status === 'Completed'
    ? 'border-green-800 bg-green-950/70 text-green-300'
    : status === 'On Duty'
      ? 'border-amber-800 bg-amber-950/60 text-amber-300'
      : 'border-stone-700 bg-stone-800 text-stone-300';
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${style}`}>{status}</span>;
}

function TaskList({ tasks, onToggle, showEmployee = false }) {
  return (
    <div className="divide-y divide-stone-800">
      {tasks.length === 0 ? <p className="py-6 text-sm text-stone-500">No tasks have been assigned yet.</p> : tasks.map((task) => {
        const employee = WORKFORCE_MEMBERS.find((member) => member.id === task.employeeId);
        return (
          <article key={task.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${task.status === 'Completed' ? 'text-green-400' : 'text-stone-600'}`} />
              <div className="min-w-0">
                <p className={`font-medium ${task.status === 'Completed' ? 'text-stone-500 line-through' : 'text-stone-100'}`}>{task.description}</p>
                <p className="mt-1 text-xs text-stone-500">
                  {showEmployee && employee ? `${employee.name} · ` : ''}{task.priority} priority · Due {task.targetTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:shrink-0">
              <StatusBadge status={task.status} />
              {onToggle && <button type="button" onClick={() => onToggle(task.id)} className="rounded-lg border border-stone-700 px-3 py-2 text-xs font-medium text-stone-200 hover:border-amber-500 hover:text-amber-300" aria-label={`Mark task ${task.status === 'Completed' ? 'pending' : 'completed'}`}>
                Mark {task.status === 'Completed' ? 'Pending' : 'Completed'}
              </button>}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function WorkforcePortal({ authRole, setAuthRole, tasks = INITIAL_WORKFORCE_TASKS, setTasks }) {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [loginError, setLoginError] = useState('');
  const [assignedTo, setAssignedTo] = useState(WORKFORCE_MEMBERS[0].id);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [targetTime, setTargetTime] = useState('');
  const [assignmentNotice, setAssignmentNotice] = useState('');

  const staffMember = WORKFORCE_MEMBERS[0];
  const staffTasks = tasks.filter((task) => task.employeeId === staffMember.id);
  const completedCount = staffTasks.filter((task) => task.status === 'Completed').length;
  const staffSalary = payFor(staffMember);

  const handleLogin = (event) => {
    event.preventDefault();
    const username = credentials.username.trim().toLowerCase();
    const role = username === 'staff' && credentials.pin === '1010'
      ? 'staff'
      : username === 'manager' && credentials.pin === '1616'
        ? 'manager'
        : null;
    if (!role) {
      setLoginError('Those details do not match. Check your username and PIN.');
      return;
    }
    setLoginError('');
    setCredentials(initialCredentials);
    setAuthRole(role);
  };

  const toggleTask = (taskId) => {
    setTasks((current) => current.map((task) => task.id === taskId
      ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' }
      : task));
  };

  const submitAssignment = (event) => {
    event.preventDefault();
    const cleanDescription = description.trim();
    if (!cleanDescription || !targetTime) return;
    setTasks((current) => [{
      id: `task-${Date.now()}`,
      employeeId: assignedTo,
      description: cleanDescription,
      priority,
      targetTime,
      status: 'Pending',
    }, ...current]);
    const assignedMember = WORKFORCE_MEMBERS.find((member) => member.id === assignedTo);
    setAssignmentNotice(`Task assigned to ${assignedMember?.name || 'staff member'}.`);
    setDescription('');
    setTargetTime('');
  };

  if (!authRole) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-stone-800 bg-stone-900 p-6 shadow-2xl sm:p-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400">
            <Lock className="h-7 w-7" />
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Cafe 16 · Team Access</p>
            <h1 className="mt-2 font-serif text-3xl font-bold text-white">Workforce Portal</h1>
            <p className="mt-2 text-sm text-stone-400">Sign in to view your shift duties and team operations.</p>
          </div>
          <form className="mt-7 space-y-4" onSubmit={handleLogin}>
            <label className="block text-sm font-medium text-stone-300" htmlFor="workforce-username">Username
              <span className="relative mt-2 block"><User className="absolute left-3 top-3 h-4 w-4 text-stone-500" /><input id="workforce-username" autoComplete="username" required value={credentials.username} onChange={(event) => setCredentials({ ...credentials, username: event.target.value })} className="w-full rounded-xl border border-stone-700 bg-stone-950 py-2.5 pl-10 pr-3 text-white outline-none focus:border-amber-500" placeholder="Enter username" /></span>
            </label>
            <label className="block text-sm font-medium text-stone-300" htmlFor="workforce-pin">PIN
              <span className="relative mt-2 block"><Lock className="absolute left-3 top-3 h-4 w-4 text-stone-500" /><input id="workforce-pin" type="password" inputMode="numeric" autoComplete="current-password" required value={credentials.pin} onChange={(event) => setCredentials({ ...credentials, pin: event.target.value })} className="w-full rounded-xl border border-stone-700 bg-stone-950 py-2.5 pl-10 pr-3 text-white outline-none focus:border-amber-500" placeholder="Enter PIN" /></span>
            </label>
            {loginError && <p role="alert" className="flex items-center gap-2 text-sm text-red-300"><AlertCircle className="h-4 w-4 shrink-0" />{loginError}</p>}
            <button className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-stone-950 transition hover:bg-amber-400" type="submit">Sign in</button>
          </form>
        </div>
      </section>
    );
  }

  const isManager = authRole === 'manager';
  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 py-10 lg:px-8">
      <header className="flex flex-col gap-4 border-b border-stone-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Cafe 16 · Workforce</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">{isManager ? 'Manager Dashboard' : `Welcome, ${staffMember.name.split(' ')[0]}`}</h1>
          <p className="mt-2 text-sm text-stone-400">{isManager ? 'Assign duties and review the team’s daily operations.' : `${staffMember.role} · ${staffMember.shift}`}</p>
        </div>
        <button type="button" onClick={() => setAuthRole(null)} className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-stone-700 px-4 py-2.5 text-sm font-medium text-stone-200 hover:border-amber-500 hover:text-amber-300 sm:self-auto"><LogOut className="h-4 w-4" />Log out</button>
      </header>

      {isManager ? (
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard icon={Users} label="Team Members" value={WORKFORCE_MEMBERS.length} detail="Active roster" />
            <MetricCard icon={Briefcase} label="On Duty" value={WORKFORCE_MEMBERS.filter((member) => member.duty === 'On Duty').length} detail="Across current shifts" />
            <MetricCard icon={CheckCircle2} label="Open Duties" value={tasks.filter((task) => task.status === 'Pending').length} detail="Tasks still pending" />
            <MetricCard icon={IndianRupee} label="Monthly Payroll" value={money(WORKFORCE_MEMBERS.reduce((sum, member) => sum + payFor(member), 0))} detail="Base pay + overtime estimates" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <section className="h-fit rounded-2xl border border-stone-800 bg-stone-900 p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3"><span className="rounded-xl bg-amber-500/10 p-2.5 text-amber-400"><Plus className="h-5 w-5" /></span><div><h2 className="font-serif text-xl font-bold text-white">Assign a Duty</h2><p className="text-xs text-stone-500">Add a task to the live team tracker.</p></div></div>
              <form onSubmit={submitAssignment} className="space-y-4">
                <label className="block text-sm text-stone-300">Assign to<select value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)} className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 px-3 py-2.5 text-white focus:border-amber-500 focus:outline-none">{WORKFORCE_MEMBERS.map((member) => <option key={member.id} value={member.id}>{member.name} · {member.role}</option>)}</select></label>
                <label className="block text-sm text-stone-300">Task description<input required maxLength={140} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="e.g. Prepare the garden seating area" className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 px-3 py-2.5 text-white placeholder:text-stone-600 focus:border-amber-500 focus:outline-none" /></label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm text-stone-300">Priority<select value={priority} onChange={(event) => setPriority(event.target.value)} className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 px-3 py-2.5 text-white focus:border-amber-500 focus:outline-none">{['High', 'Medium', 'Low'].map((value) => <option key={value}>{value}</option>)}</select></label>
                  <label className="block text-sm text-stone-300">Target time<input required type="time" value={targetTime} onChange={(event) => setTargetTime(event.target.value)} className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 px-3 py-2.5 text-white focus:border-amber-500 focus:outline-none" /></label>
                </div>
                {assignmentNotice && <p role="status" className="text-sm text-green-300">{assignmentNotice}</p>}
                <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 font-semibold text-stone-950 hover:bg-amber-400"><Plus className="h-4 w-4" />Assign task</button>
              </form>
            </section>

            <section className="rounded-2xl border border-stone-800 bg-stone-900 p-5 sm:p-6">
              <div className="mb-2"><h2 className="font-serif text-xl font-bold text-white">Live Duty Tracker</h2><p className="text-xs text-stone-500">All tasks assigned across the team.</p></div>
              <TaskList tasks={tasks} showEmployee />
            </section>
          </div>

          <section className="rounded-2xl border border-stone-800 bg-stone-900 p-5 sm:p-6">
            <div className="mb-5"><h2 className="font-serif text-xl font-bold text-white">Employee Roster & Payroll</h2><p className="text-xs text-stone-500">Monthly estimates include base pay and overtime at ₹150/hour.</p></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse text-left text-sm">
                <thead><tr className="border-b border-stone-700 text-xs uppercase tracking-wide text-stone-500">{['Employee', 'Role', 'Shift', 'Days', 'Attendance', 'Duty', 'Payroll'].map((heading) => <th key={heading} className="px-3 py-3 font-medium">{heading}</th>)}</tr></thead>
                <tbody>{WORKFORCE_MEMBERS.map((member) => <tr key={member.id} className="border-b border-stone-800 last:border-0"><td className="px-3 py-4 font-medium text-white">{member.name}</td><td className="px-3 py-4 text-stone-300">{member.role}</td><td className="px-3 py-4 text-stone-400">{member.shift}</td><td className="px-3 py-4 text-stone-300">{member.days}</td><td className="px-3 py-4 text-stone-300">{member.attendance}%</td><td className="px-3 py-4"><StatusBadge status={member.duty} /></td><td className="px-3 py-4 font-semibold text-amber-300">{money(payFor(member))}</td></tr>)}</tbody>
              </table>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard icon={Calendar} label="Days Worked" value={`${staffMember.days} days`} detail="Current month" />
            <MetricCard icon={CheckCircle2} label="Attendance" value={`${staffMember.attendance}%`} detail="Current month" />
            <MetricCard icon={Clock} label="Current Shift" value="Morning" detail="9:00 AM–5:00 PM" />
            <MetricCard icon={IndianRupee} label="Estimated Monthly Pay" value={money(staffSalary)} detail={`${money(staffMember.basePay)} base + ${staffMember.overtime} overtime hours`} />
          </div>
          <section className="rounded-2xl border border-stone-800 bg-stone-900 p-5 sm:p-6">
            <div className="mb-2"><h2 className="font-serif text-xl font-bold text-white">My Shift Duties</h2><p className="text-xs text-stone-500">Tap a task to update its completion status.</p></div>
            <TaskList tasks={staffTasks} onToggle={toggleTask} />
            <p className="mt-4 text-xs text-stone-500">{completedCount} of {staffTasks.length} assigned duties completed.</p>
          </section>
        </div>
      )}
    </section>
  );
}
