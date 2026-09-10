import './ExperienceSection.css';
import { useState, useEffect, useRef } from 'react';
import { MessageSquare, FlaskConical, BarChart3, type LucideIcon } from 'lucide-react';

type ScreenType = 'chat' | 'testing' | 'analytics';

const screens: { type: ScreenType; label: string; icon: LucideIcon }[] = [
  { type: 'chat', label: 'Live Chat', icon: MessageSquare },
  { type: 'testing', label: 'Test Suite', icon: FlaskConical },
  { type: 'analytics', label: 'Analytics', icon: BarChart3 },
];

function ChatScreen() {
  const messages = [
    { from: 'user', text: 'I need to reschedule my appointment to next week' },
    { from: 'bot', text: 'Sure! I can see you\'re booked for Thursday at 2pm. Would Tuesday or Wednesday next week work?' },
    { from: 'user', text: 'Wednesday morning if possible' },
    { from: 'bot', text: 'Got it — Wednesday at 9:30am is available. Should I confirm that for you?' },
  ];

  return (
    <div className="p-5 space-y-3 h-full overflow-hidden">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`chat-bubble-in max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
              msg.from === 'user'
                ? 'bg-[var(--accent)] text-[var(--bg-primary)] rounded-br-md'
                : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] rounded-bl-md'
            }`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {msg.text}
          </div>
        </div>
      ))}
      <div className="flex justify-start">
        <div className="bg-[var(--bg-elevated)] rounded-2xl rounded-bl-md px-4 py-3">
          <div className="typing-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function TestingScreen() {
  const tests = [
    { name: 'Greeting flow', status: 'pass', time: '0.3s' },
    { name: 'Escalation path', status: 'pass', time: '0.5s' },
    { name: 'Ambiguous intent', status: 'pass', time: '0.8s' },
    { name: 'Multi-turn fallback', status: 'pass', time: '1.2s' },
    { name: 'Sentiment edge case', status: 'warn', time: '1.5s' },
    { name: 'API timeout recovery', status: 'pass', time: '0.9s' },
  ];

  return (
    <div className="p-5 h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-[var(--text-tertiary)] font-mono">echo/test_run_8421</span>
        <span className="text-xs text-[var(--accent)] font-mono">5 pass · 1 warn</span>
      </div>
      <div className="space-y-2">
        {tests.map((t, i) => (
          <div
            key={i}
            className="chat-bubble-in flex items-center justify-between bg-[var(--bg-elevated)] rounded-lg px-4 py-3"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${t.status === 'pass' ? 'bg-[var(--accent)]' : 'bg-[var(--warm)]'}`}
              />
              <span className="text-sm">{t.name}</span>
            </div>
            <span className="text-xs font-mono text-[var(--text-tertiary)]">{t.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsScreen() {
  const bars = [40, 65, 52, 78, 88, 72, 94];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="p-5 h-full">
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Conversations', value: '12.4K' },
          { label: 'Resolution', value: '94%' },
          { label: 'CSAT', value: '4.7' },
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--bg-elevated)] rounded-lg p-3">
            <p className="text-xs text-[var(--text-tertiary)]">{stat.label}</p>
            <p className="text-lg font-mono font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[var(--bg-elevated)] rounded-lg p-4">
        <p className="text-xs text-[var(--text-tertiary)] mb-3">Weekly volume</p>
        <div className="flex items-end justify-between gap-2 h-28">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t bg-gradient-to-t from-[var(--accent-dim)] to-[var(--accent)] transition-all duration-700"
                style={{ height: `${h}%` }}
              />
              <span className="text-xs text-[var(--text-tertiary)]">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const [active, setActive] = useState<ScreenType>('chat');
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActive((cur) => {
            const idx = screens.findIndex((s) => s.type === cur);
            return screens[(idx + 1) % screens.length].type;
          });
          return 0;
        }
        return p + 0.5;
      });
    }, 40);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active]);

  return (
    <section id="experience" className="relative py-24 lg:py-32 section-padding">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <MessageSquare className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-xs font-medium text-[var(--text-secondary)]">Interactive demo</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            See the full lifecycle in action.
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] text-lg">
            From live conversations to test results to analytics — all running
            on the same agent infrastructure.
          </p>
        </div>

        <div className="demo-window max-w-3xl mx-auto">
          <div className="demo-titlebar">
            <div className="demo-dot bg-[#ff5f57]" />
            <div className="demo-dot bg-[#febc2e]" />
            <div className="demo-dot bg-[#28c840]" />
            <div className="ml-3 flex gap-1">
              {screens.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.type}
                    onClick={() => { setActive(s.type); setProgress(0); }}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors ${
                      active === s.type
                        ? 'bg-[var(--bg-card)] text-[var(--text-primary)]'
                        : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="experience-frame" style={{ aspectRatio: '16 / 9' }}>
            <div className={`experience-screen ${active === 'chat' ? 'active' : ''}`}>
              <ChatScreen />
            </div>
            <div className={`experience-screen ${active === 'testing' ? 'active' : ''}`}>
              <TestingScreen />
            </div>
            <div className={`experience-screen ${active === 'analytics' ? 'active' : ''}`}>
              <AnalyticsScreen />
            </div>

            <div className="experience-progress" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          {screens.map((s) => (
            <button
              key={s.type}
              onClick={() => { setActive(s.type); setProgress(0); }}
              className={`experience-nav-dot ${active === s.type ? 'active' : ''}`}
              aria-label={s.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
