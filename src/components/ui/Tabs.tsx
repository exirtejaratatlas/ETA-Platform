import { createContext, useContext, useId, useRef, type KeyboardEvent, type ReactNode } from "react";

interface Tab {
  value: string;
  label: string;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  children?: ReactNode;
}

interface TabsContextValue {
  baseId: string;
  activeValue: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export function Tabs({ tabs, value, onChange, className = "", children }: TabsProps) {
  const baseId = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const enabled = tabs.filter((t) => !t.disabled);
  const focusTab = (v: string) => tabRefs.current[v]?.focus();

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const currentEnabledIndex = enabled.findIndex((t) => t.value === tabs[index].value);
    if (currentEnabledIndex === -1) return;

    // The browser already fires ArrowLeft/ArrowRight based on physical key position;
    // flipping the step direction under dir="rtl" is what makes "next tab" consistently
    // map to the reading-order-forward key in both directions.
    const dir = document.documentElement.dir === "rtl" ? -1 : 1;
    let nextIndex = currentEnabledIndex;

    if (e.key === "ArrowRight") nextIndex = (currentEnabledIndex + dir + enabled.length) % enabled.length;
    else if (e.key === "ArrowLeft") nextIndex = (currentEnabledIndex - dir + enabled.length) % enabled.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = enabled.length - 1;
    else return;

    e.preventDefault();
    const next = enabled[nextIndex];
    onChange(next.value);
    focusTab(next.value);
  };

  return (
    <TabsContext.Provider value={{ baseId, activeValue: value }}>
      <div className={className}>
        <div className="border-b border-surface-200">
          <div role="tablist" className="flex items-center gap-1 -mb-px overflow-x-auto">
            {tabs.map((tab, i) => {
              const active = tab.value === value;
              return (
                <button
                  key={tab.value}
                  ref={(el) => {
                    tabRefs.current[tab.value] = el;
                  }}
                  id={`${baseId}-tab-${tab.value}`}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls={`${baseId}-panel-${tab.value}`}
                  tabIndex={active ? 0 : -1}
                  disabled={tab.disabled}
                  onClick={() => onChange(tab.value)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors focus-ring disabled:opacity-50 disabled:pointer-events-none ${
                    active
                      ? "border-copper-600 text-surface-900"
                      : "border-transparent text-surface-500 hover:text-surface-700 hover:border-surface-300"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabPanel must be used within Tabs");
  if (value !== ctx.activeValue) return null;
  return (
    <div id={`${ctx.baseId}-panel-${value}`} role="tabpanel" aria-labelledby={`${ctx.baseId}-tab-${value}`}>
      {children}
    </div>
  );
}
