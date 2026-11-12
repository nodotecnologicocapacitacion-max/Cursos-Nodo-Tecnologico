import React, { useState, useEffect } from 'react';
import { ScreenId, Language, Course } from './types';
import { COURSES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { CourseCatalogScreen } from './components/CourseCatalogScreen';
import { ClassroomScreen } from './components/ClassroomScreen';
import { StudentDashboardScreen } from './components/StudentDashboardScreen';
import { MakerspaceScreen } from './components/MakerspaceScreen';
import { CertificateScreen } from './components/CertificateScreen';
import { ProjectShowcaseScreen } from './components/ProjectShowcaseScreen';
import { ScreensOverview } from './components/ScreensOverview';
import { EnrollmentModal } from './components/EnrollmentModal';
import { Layers, ShieldCheck, Cpu, Terminal, BookOpen, Award, Users, ChevronRight } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('catalog');
  const [language, setLanguage] = useState<Language>('es');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [selectedCourse, setSelectedCourse] = useState<Course>(COURSES[0]);
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState<boolean>(false);
  const [enrollmentCourse, setEnrollmentCourse] = useState<Course | null>(null);

  // Sync dark class on documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleOpenEnrollment = (course?: Course) => {
    setEnrollmentCourse(course || selectedCourse);
    setIsEnrollmentModalOpen(true);
  };

  const isEs = language === 'es';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors selection:bg-teal-500/30 selection:text-teal-200">
      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        language={language}
        onToggleLanguage={toggleLanguage}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenEnrollment={() => handleOpenEnrollment()}
      />

      {/* Screen Presenter Sub-Bar (Informs the user which screen is active & allows quick jumping) */}
      <div className="bg-slate-900/90 border-b border-slate-800 text-xs px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-semibold text-teal-400">
              {isEs ? 'Pantalla Activa:' : 'Active Screen:'}
            </span>
            <span className="text-white font-medium">
              {currentScreen === 'catalog' && (isEs ? '01. Catálogo & Becas' : '01. Catalog & Grants')}
              {currentScreen === 'classroom' && (isEs ? '02. Aula Virtual & Código' : '02. Virtual Classroom & Code')}
              {currentScreen === 'dashboard' && (isEs ? '03. Portal del Estudiante' : '03. Student Campus')}
              {currentScreen === 'makerspace' && (isEs ? '04. Laboratorios & FabLab' : '04. Hardware Labs')}
              {currentScreen === 'certificates' && (isEs ? '05. Certificados Digitales' : '05. Verifiable Certificates')}
              {currentScreen === 'showcase' && (isEs ? '06. Proyectos & Hackathon' : '06. Capstones & Projects')}
              {currentScreen === 'screens_gallery' && (isEs ? 'Mural de Pantallas & Mockups' : 'Screens Showcase Wall')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              {isEs ? 'Navegación Rápida:' : 'Quick Jump:'}
            </span>
            <div className="flex items-center gap-1">
              {(['catalog', 'classroom', 'dashboard', 'makerspace', 'certificates', 'showcase'] as ScreenId[]).map((scr, idx) => (
                <button
                  key={scr}
                  onClick={() => setCurrentScreen(scr)}
                  className={`w-6 h-6 rounded text-[11px] font-mono font-bold transition-colors ${
                    currentScreen === scr
                      ? 'bg-teal-500 text-slate-950'
                      : 'text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700'
                  }`}
                  title={`Pantalla 0${idx + 1}`}
                >
                  0{idx + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentScreen('screens_gallery')}
                className={`px-2 h-6 rounded text-[11px] font-medium transition-colors ml-1 ${
                  currentScreen === 'screens_gallery'
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700'
                }`}
              >
                {isEs ? 'Ver Todas' : 'All'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Screen Renderer */}
      <main className="flex-1">
        {currentScreen === 'catalog' && (
          <CourseCatalogScreen
            language={language}
            onSelectCourse={(c) => {
              setSelectedCourse(c);
              setCurrentScreen('classroom');
            }}
            onOpenEnrollment={handleOpenEnrollment}
            onNavigateToScreen={setCurrentScreen}
          />
        )}

        {currentScreen === 'classroom' && (
          <ClassroomScreen
            language={language}
            selectedCourse={selectedCourse}
          />
        )}

        {currentScreen === 'dashboard' && (
          <StudentDashboardScreen
            language={language}
            onNavigateToScreen={setCurrentScreen}
          />
        )}

        {currentScreen === 'makerspace' && (
          <MakerspaceScreen
            language={language}
          />
        )}

        {currentScreen === 'certificates' && (
          <CertificateScreen
            language={language}
          />
        )}

        {currentScreen === 'showcase' && (
          <ProjectShowcaseScreen
            language={language}
          />
        )}

        {currentScreen === 'screens_gallery' && (
          <ScreensOverview
            language={language}
            onSelectScreen={setCurrentScreen}
          />
        )}
      </main>

      {/* Interactive Scholarship Enrollment Modal */}
      <EnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onClose={() => setIsEnrollmentModalOpen(false)}
        language={language}
        preselectedCourse={enrollmentCourse}
      />

      {/* Institutional Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 mt-auto text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="w-7 h-7 rounded bg-teal-500 flex items-center justify-center text-slate-950 font-bold text-xs">
              N
            </div>
            <div>
              <span className="font-bold text-white tracking-tight">Nodo Tecnológico</span>
              <span className="mx-2 text-slate-600">·</span>
              <span>Polo de Innovación, Robótica y Capacitación Digital</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentScreen('catalog')}
              className="hover:text-white transition-colors"
            >
              {isEs ? 'Catálogo de Cursos' : 'Courses'}
            </button>
            <button
              onClick={() => setCurrentScreen('makerspace')}
              className="hover:text-white transition-colors"
            >
              {isEs ? 'FabLab & Robótica' : 'FabLab & Robotics'}
            </button>
            <button
              onClick={() => setCurrentScreen('certificates')}
              className="hover:text-white transition-colors"
            >
              {isEs ? 'Validador Oficial' : 'Official Verification'}
            </button>
            <button
              onClick={() => setCurrentScreen('screens_gallery')}
              className="hover:text-teal-400 transition-colors font-medium"
            >
              {isEs ? 'Muestrario de Pantallas' : 'Screen Showcase'}
            </button>
          </div>

          <div className="text-slate-500 text-[11px] font-mono">
            © 2026 Nodo Tecnológico · Todos los derechos reservados
          </div>
        </div>
      </footer>
    </div>
  );
}
