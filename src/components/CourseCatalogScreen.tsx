import React, { useState, useMemo } from 'react';
import { Course, Language, ScreenId } from '../types';
import { COURSES, HERO_IMAGE } from '../data/mockData';
import { Search, Clock, Users, ArrowRight, BookOpen, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface CourseCatalogScreenProps {
  language: Language;
  onSelectCourse: (course: Course) => void;
  onOpenEnrollment: (course?: Course) => void;
  onNavigateToScreen: (screen: ScreenId) => void;
}

export const CourseCatalogScreen: React.FC<CourseCatalogScreenProps> = ({
  language,
  onSelectCourse,
  onOpenEnrollment,
  onNavigateToScreen,
}) => {
  const isEs = language === 'es';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSyllabusId, setExpandedSyllabusId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: isEs ? 'Todas las Especialidades' : 'All Tracks' },
    { id: 'ai', label: isEs ? 'Inteligencia Artificial' : 'AI & Deep Learning' },
    { id: 'robotics', label: isEs ? 'Robótica & Hardware' : 'Robotics & Hardware' },
    { id: 'web', label: isEs ? 'Cloud & Full-Stack' : 'Cloud & Full-Stack' },
    { id: 'data', label: isEs ? 'Ciencia de Datos' : 'Data Science' },
    { id: 'cyber', label: isEs ? 'Ciberseguridad' : 'Cybersecurity' },
    { id: 'design', label: isEs ? 'Diseño UX/UI' : 'UX/UI Product' },
  ];

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const titleText = isEs ? course.title.es : course.title.en;
      const taglineText = isEs ? course.tagline.es : course.tagline.en;
      const matchesSearch =
        searchQuery.trim() === '' ||
        titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        taglineText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, isEs]);

  const toggleSyllabus = (id: string) => {
    setExpandedSyllabusId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-slate-900/50 text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
        <div className="absolute inset-0 opacity-25">
          <img
            src={HERO_IMAGE}
            alt="Nodo Tecnológico Campus"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-teal-400 mb-4">
              <span>NODO TECNOLÓGICO</span>
              <span aria-hidden="true">·</span>
              <span>CAPACITACIÓN PÚBLICA & PRIVADA</span>
              <span aria-hidden="true">·</span>
              <span>COHORTE 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display text-balance leading-tight">
              {isEs
                ? 'Formación de vanguardia en Robótica, Inteligencia Artificial y Software.'
                : 'Pioneering training in Robotics, Artificial Intelligence & Cloud Software.'}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {isEs
                ? 'Diplomaturas universitarias y trayectos formativos intensivos en laboratorios de última generación. Becas del 100% financiadas por el polo tecnológico regional.'
                : 'Intensive university diplomas and hands-on tracks in state-of-the-art labs. 100% scholarships sponsored by the regional tech innovation cluster.'}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenEnrollment()}
                className="px-6 py-3 text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-sm transition-colors"
              >
                {isEs ? 'Explorar Convocatoria de Becas' : 'Explore Scholarship Grants'}
              </button>
              <button
                onClick={() => onNavigateToScreen('classroom')}
                className="px-5 py-3 text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-teal-400" />
                <span>{isEs ? 'Ver Demo de Aula Interactiva' : 'Launch Virtual Classroom Demo'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Proof Strip */}
        <div className="border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              <div>
                <div className="text-2xl font-bold text-white font-mono tabular-nums">4,850+</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {isEs ? 'Egresados Certificados' : 'Certified Graduates'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-400 font-mono tabular-nums">94.2%</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {isEs ? 'Inserción Laboral en Tech' : 'Tech Employment Rate'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono tabular-nums">32</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {isEs ? 'Bancos de Laboratorio y GPU' : 'Active Hardware & GPU Labs'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400 font-mono tabular-nums">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {isEs ? 'Becas de Gratuidad Activas' : 'Free Tuition Scholarships'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          {/* Interactive Category Segmented Control */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-teal-500 text-slate-950 shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEs ? 'Buscar por tecnología, lenguaje o tema...' : 'Search skills, tech, or topics...'}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mt-6 mb-8 text-xs text-slate-400">
          <span>
            {isEs
              ? `Mostrando ${filteredCourses.length} programas formativos disponibles`
              : `Showing ${filteredCourses.length} available training programs`}
          </span>
          <span className="text-teal-400">
            {isEs ? 'Inscripciones abiertas para Mayo/Junio 2026' : 'Admissions open for May/June 2026'}
          </span>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const title = isEs ? course.title.es : course.title.en;
            const tagline = isEs ? course.tagline.es : course.tagline.en;
            const modality = isEs ? course.modality.es : course.modality.en;
            const level = isEs ? course.level.es : course.level.en;
            const isSyllabusExpanded = expandedSyllabusId === course.id;

            return (
              <div
                key={course.id}
                className="group flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-200"
              >
                {/* Visual Header */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={course.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback gradient if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Clean unboxed metadata overlay */}
                  <div className="absolute top-3 left-3 text-xs font-medium text-teal-300 bg-slate-950/80 px-2 py-1 rounded backdrop-blur-sm border border-slate-800">
                    {course.categoryLabel[language]}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-mono tabular-nums">{course.durationWeeks} sem · {course.totalHours} hs</span>
                    <span className="text-amber-400 font-mono tabular-nums">★ {course.rating.toFixed(2)}</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata kicker */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span>{level}</span>
                      <span aria-hidden="true">·</span>
                      <span>{modality}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-2 leading-snug">
                      {title}
                    </h3>

                    <p className="mt-2.5 text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {tagline}
                    </p>

                    {/* Skills list */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {course.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
                        >
                          {skill}
                        </span>
                      ))}
                      {course.skills.length > 4 && (
                        <span className="text-[11px] font-mono text-slate-500 py-0.5">
                          +{course.skills.length - 4} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Syllabus Expandable Section */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80">
                    <button
                      onClick={() => toggleSyllabus(course.id)}
                      className="w-full flex items-center justify-between text-xs font-medium text-slate-400 hover:text-teal-400 transition-colors py-1"
                    >
                      <span>{isEs ? 'Ver Programa de Módulos' : 'View Module Syllabus'}</span>
                      {isSyllabusExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {isSyllabusExpanded && (
                      <div className="mt-3 space-y-2.5 bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs">
                        {course.syllabus.map((mod) => (
                          <div key={mod.moduleNumber} className="border-b border-slate-800/50 last:border-none pb-2 last:pb-0">
                            <div className="font-semibold text-slate-200">
                              {mod.moduleNumber}. {mod.title[language]}
                            </div>
                            <ul className="mt-1 text-[11px] text-slate-400 list-disc list-inside space-y-0.5">
                              {mod.topics.map((t, idx) => (
                                <li key={idx}>{t}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => onOpenEnrollment(course)}
                        className="flex-1 py-2 px-3 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-md transition-colors text-center shadow-sm"
                      >
                        {isEs ? 'Postular a Beca' : 'Apply for Seat'}
                      </button>
                      <button
                        onClick={() => {
                          onSelectCourse(course);
                          onNavigateToScreen('classroom');
                        }}
                        className="py-2 px-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
                        title={isEs ? 'Entrar al aula de muestra' : 'Open demo classroom'}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Cohort start text */}
                    <div className="mt-2 text-[11px] text-center text-slate-500">
                      {isEs ? `Inicio: ${course.nextCohortDate} · ${course.spotsLeft} cupos` : `Starts: ${course.nextCohortDate} · ${course.spotsLeft} spots`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
