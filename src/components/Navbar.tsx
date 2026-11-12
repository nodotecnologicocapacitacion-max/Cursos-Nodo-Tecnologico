import React from 'react';
import { ScreenId, Language } from '../types';
import { Sun, Moon, Globe, LayoutGrid, MonitorPlay } from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  language: Language;
  onToggleLanguage: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenEnrollment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onSelectScreen,
  language,
  onToggleLanguage,
  isDark,
  onToggleTheme,
  onOpenEnrollment,
}) => {
  const isEs = language === 'es';

  const navItems: { id: ScreenId; label: string }[] = [
    { id: 'catalog', label: isEs ? 'Cursos' : 'Courses' },
    { id: 'classroom', label: isEs ? 'Aula Virtual' : 'Classroom' },
    { id: 'dashboard', label: isEs ? 'Mi Campus' : 'Dashboard' },
    { id: 'makerspace', label: isEs ? 'Laboratorios' : 'Labs & FabLab' },
    { id: 'certificates', label: isEs ? 'Certificados' : 'Certificates' },
    { id: 'showcase', label: isEs ? 'Proyectos' : 'Projects' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 dark:bg-slate-950/90 bg-white/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onSelectScreen('catalog')}
          className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-md py-1"
        >
          <div className="w-8 h-8 rounded bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-slate-950 font-bold text-base shadow-sm">
            N
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0">
            Nodo Tecnológico
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectScreen(item.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Screens Gallery Toggle Button */}
          <button
            onClick={() => onSelectScreen(currentScreen === 'screens_gallery' ? 'catalog' : 'screens_gallery')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 ${
              currentScreen === 'screens_gallery'
                ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-sm'
                : 'text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
            title={isEs ? 'Ver todas las pantallas y mockups' : 'View all screens & mockups'}
          >
            {currentScreen === 'screens_gallery' ? (
              <MonitorPlay className="w-3.5 h-3.5" />
            ) : (
              <LayoutGrid className="w-3.5 h-3.5" />
            )}
            <span>{isEs ? 'Ver Pantallas' : 'All Screens'}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="p-1.5 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            title={isEs ? 'Cambiar a Inglés' : 'Switch to Spanish'}
            aria-label="Toggle language"
          >
            <div className="flex items-center gap-1 text-xs font-semibold px-1">
              <Globe className="w-3.5 h-3.5" />
              <span>{language.toUpperCase()}</span>
            </div>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            title={isDark ? 'Modo Claro' : 'Modo Oscuro'}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Primary CTA: Inscribirse */}
          <button
            onClick={onOpenEnrollment}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-md transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            {isEs ? 'Postular a Beca' : 'Apply for Cohort'}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-slate-200 dark:border-slate-800 gap-1 bg-slate-50 dark:bg-slate-950">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectScreen(item.id)}
            className={`px-3 py-1 text-xs font-medium rounded whitespace-nowrap shrink-0 ${
              currentScreen === item.id
                ? 'bg-teal-500 text-slate-950 font-semibold'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
