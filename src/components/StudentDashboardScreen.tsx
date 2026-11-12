import React from 'react';
import { Language, ScreenId } from '../types';
import { CURRENT_STUDENT, COURSES, STUDENT_LEARNING_IMAGE } from '../data/mockData';
import { Calendar, CheckCircle2, Clock, Award, BookOpen, ArrowUpRight, Flame, ChevronRight } from 'lucide-react';

interface StudentDashboardScreenProps {
  language: Language;
  onNavigateToScreen: (screen: ScreenId) => void;
}

export const StudentDashboardScreen: React.FC<StudentDashboardScreenProps> = ({
  language,
  onNavigateToScreen,
}) => {
  const isEs = language === 'es';
  const student = CURRENT_STUDENT;
  const course = COURSES[0];

  const schedule = [
    {
      day: isEs ? 'Hoy · Miércoles 13 Nov' : 'Today · Wednesday Nov 13',
      time: '18:30 - 20:30 hs',
      title: isEs ? 'Taller de Visión Artificial: YOLOv10 en Edge' : 'Computer Vision Lab: YOLOv10 on Edge',
      location: isEs ? 'Lab Alfa + Transmisión en Vivo' : 'Lab Alpha + Live Stream',
      instructor: 'Dra. Elena Santillán',
      activeNow: true,
    },
    {
      day: isEs ? 'Viernes 15 Nov' : 'Friday Nov 15',
      time: '19:00 - 21:00 hs',
      title: isEs ? 'Mentoría Grupal de Proyecto Final' : 'Capstone Project Group Mentorship',
      location: isEs ? 'Aula Virtual Sala 3' : 'Virtual Classroom Room 3',
      instructor: 'Ing. Lucas Varela',
      activeNow: false,
    },
    {
      day: isEs ? 'Lunes 18 Nov' : 'Monday Nov 18',
      time: '18:00 - 20:00 hs',
      title: isEs ? 'Clase Magistral: Despliegue de Modelos con TensorRT' : 'Masterclass: Model Deployment with TensorRT',
      location: isEs ? 'Auditorio Nodo + Virtual' : 'Nodo Auditorium + Virtual',
      instructor: 'Lic. Camilo Benítez',
      activeNow: false,
    },
  ];

  const assignments = [
    {
      id: 1,
      title: isEs ? 'TP 3: Red Convolucional Personalizada en PyTorch' : 'Assignment 3: Custom ConvNet in PyTorch',
      dueDate: isEs ? '16 de Noviembre' : 'Nov 16',
      status: 'submitted',
      grade: '10/10 (Aprobado con Distinción)',
    },
    {
      id: 2,
      title: isEs ? 'TP 4: Detección y Conteo de Vehículos con Video' : 'Assignment 4: Vehicle Detection and Counting',
      dueDate: isEs ? '22 de Noviembre' : 'Nov 22',
      status: 'in_progress',
      grade: null,
    },
    {
      id: 3,
      title: isEs ? 'Propuesta de Proyecto Final de Cohorte' : 'Cohort Final Capstone Proposal',
      dueDate: isEs ? '30 de Noviembre' : 'Nov 30',
      status: 'pending',
      grade: null,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile & Welcome Card */}
        <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-teal-400 shrink-0">
                <img
                  src={STUDENT_LEARNING_IMAGE}
                  alt={student.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{student.cohort}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{student.idNumber}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white mt-1 font-display">
                  {student.name}
                </h1>
                <p className="text-xs text-teal-400 mt-1 font-medium">
                  {course.title[language]}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-8">
              <div>
                <div className="text-xs text-slate-400">{isEs ? 'Progreso' : 'Progress'}</div>
                <div className="text-xl font-bold text-white font-mono tabular-nums mt-0.5">
                  {student.completionPercentage}%
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">{isEs ? 'Asistencia' : 'Attendance'}</div>
                <div className="text-xl font-bold text-teal-400 font-mono tabular-nums mt-0.5">
                  {student.attendanceRate}%
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">{isEs ? 'Créditos' : 'Credits'}</div>
                <div className="text-xl font-bold text-white font-mono tabular-nums mt-0.5">
                  {student.completedCredits}/36
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">{isEs ? 'Racha' : 'Streak'}</div>
                <div className="text-xl font-bold text-amber-400 font-mono tabular-nums mt-0.5 flex items-center gap-1">
                  <Flame className="w-4 h-4 fill-current" />
                  <span>{student.currentStreakDays}d</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column (8 cols): Active Course & Assignments */}
          <div className="lg:col-span-8 space-y-6">
            {/* Active Enrolled Course Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  {isEs ? 'Trayecto en Curso' : 'Active Training Track'}
                </span>
                <span className="text-xs text-slate-400">
                  {isEs ? 'Semana 12 de 16' : 'Week 12 of 16'}
                </span>
              </div>

              <h2 className="text-lg font-bold text-white font-display">
                {course.title[language]}
              </h2>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {course.tagline[language]}
              </p>

              {/* Progress Bar */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-mono">
                  <span>{isEs ? 'Progreso hacia Certificación' : 'Certification Roadmap'}</span>
                  <span className="text-teal-400 font-semibold">{student.completionPercentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${student.completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigateToScreen('classroom')}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{isEs ? 'Continuar Clase Sincrónica' : 'Continue Lesson'}</span>
                </button>
                <button
                  onClick={() => onNavigateToScreen('makerspace')}
                  className="px-4 py-2.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {isEs ? 'Reservar Banco en Laboratorio' : 'Book Lab Bench'}
                </button>
                <button
                  onClick={() => onNavigateToScreen('certificates')}
                  className="px-4 py-2.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {isEs ? 'Ver Certificados Aprobados' : 'View Certificates'}
                </button>
              </div>
            </div>

            {/* Assignments & Capstone Submissions */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white font-display">
                  {isEs ? 'Entregas y Trabajos Prácticos' : 'Assignments & Deliverables'}
                </h3>
                <span className="text-xs text-slate-400">
                  {isEs ? '3 evaluaciones registradas' : '3 recorded assessments'}
                </span>
              </div>

              <div className="space-y-3">
                {assignments.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{item.title}</div>
                      <div className="text-slate-400 mt-1 flex items-center gap-2">
                        <span>{isEs ? `Fecha límite: ${item.dueDate}` : `Due: ${item.dueDate}`}</span>
                        {item.grade && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-teal-400 font-medium">{item.grade}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0">
                      {item.status === 'submitted' ? (
                        <span className="inline-flex items-center gap-1.5 text-teal-400 font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isEs ? 'Calificado' : 'Graded'}</span>
                        </span>
                      ) : item.status === 'in_progress' ? (
                        <button
                          onClick={() => onNavigateToScreen('classroom')}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium"
                        >
                          {isEs ? 'Subir Entrega' : 'Submit Work'}
                        </button>
                      ) : (
                        <span className="text-slate-500 font-mono">{isEs ? 'Pendiente' : 'Upcoming'}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Column (4 cols): Schedule & Important Deadlines */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 mb-4">
                <Calendar className="w-4 h-4" />
                <span>{isEs ? 'Próximas Sesiones' : 'Upcoming Schedule'}</span>
              </div>

              <div className="space-y-4">
                {schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-lg border text-xs transition-colors ${
                      item.activeNow
                        ? 'bg-teal-950/30 border-teal-500/80 text-teal-100'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span>{item.day}</span>
                      <span className="font-mono">{item.time}</span>
                    </div>

                    <div className="font-semibold text-white mt-1">{item.title}</div>

                    <div className="mt-2 text-slate-400 flex items-center justify-between text-[11px]">
                      <span>{item.location}</span>
                      <span className="text-slate-500">{item.instructor}</span>
                    </div>

                    {item.activeNow && (
                      <button
                        onClick={() => onNavigateToScreen('classroom')}
                        className="mt-3 w-full py-1.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded text-center transition-colors shadow-sm"
                      >
                        {isEs ? 'Unirse a la Sesión en Vivo' : 'Join Live Stream'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Notification Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                <Award className="w-4 h-4" />
                <span>{isEs ? 'Elegible para Beca Capstone' : 'Capstone Grant Eligible'}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {isEs
                  ? 'Por mantener asistencia mayor al 95% y promedio superior a 90/100, puedes postular al fondo semilla de prototipado del polo tecnológico.'
                  : 'Maintaining >95% attendance and >90 average unlocks fast-track seed grant funding from the tech innovation cluster.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
