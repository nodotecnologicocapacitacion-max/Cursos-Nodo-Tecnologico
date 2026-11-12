import React, { useState } from 'react';
import { ScreenId, Language } from '../types';
import { HERO_IMAGE, ROBOTICS_LAB_IMAGE, STUDENT_LEARNING_IMAGE } from '../data/mockData';
import { Monitor, Smartphone, Tablet, ExternalLink, Eye, Layers, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

interface ScreensOverviewProps {
  language: Language;
  onSelectScreen: (screen: ScreenId) => void;
}

export const ScreensOverview: React.FC<ScreensOverviewProps> = ({
  language,
  onSelectScreen,
}) => {
  const isEs = language === 'es';
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile' | 'grid'>('grid');

  const screens = [
    {
      id: 'catalog' as ScreenId,
      number: '01',
      title: {
        es: 'Pantalla 1: Catálogo de Formación & Becas',
        en: 'Screen 1: Training Catalog & Grants',
      },
      description: {
        es: 'Vista principal con carrusel de especialidades, filtros por área (IA, Robótica, Web, Datos, Ciber), métricas de egresados y postulaciones a becas.',
        en: 'Main discovery screen with track filters (AI, Robotics, Web, Data, Cyber), graduate employment stats, and scholarship enrollment.',
      },
      previewImage: HERO_IMAGE,
      badge: isEs ? 'Pantalla Principal' : 'Home Catalog',
      features: isEs
        ? ['Filtro reactivo por tecnología', 'Estadísticas del polo', 'Desplegable de temarios']
        : ['Reactive tech filters', 'Cluster telemetry stats', 'Accordion syllabus'],
    },
    {
      id: 'classroom' as ScreenId,
      number: '02',
      title: {
        es: 'Pantalla 2: Aula Virtual & Sandbox Interactivo',
        en: 'Screen 2: Virtual Classroom & Code Sandbox',
      },
      description: {
        es: 'Reproductor de clase sincrónica con consola interactiva de PyTorch, ejecución en GPU, evaluación rápida con feedback inmediato y apuntes sincronizados.',
        en: 'Live synchronous video lecture with PyTorch sandbox editor, GPU run simulation, instant knowledge check quiz, and notebook.',
      },
      previewImage: STUDENT_LEARNING_IMAGE,
      badge: isEs ? 'Aula & Código' : 'Classroom & Code',
      features: isEs
        ? ['Reproductor con barra de progreso', 'Sandbox PyTorch en vivo', 'Test con puntuación']
        : ['Scrubbing video player', 'Live PyTorch execution', 'Graded quiz module'],
    },
    {
      id: 'dashboard' as ScreenId,
      number: '03',
      title: {
        es: 'Pantalla 3: Portal del Estudiante & Mi Campus',
        en: 'Screen 3: Student Campus & Dashboard',
      },
      description: {
        es: 'Panel integral del alumno con porcentaje de avance, índice de asistencia, racha diaria, calendario de clases de la semana y estado de trabajos prácticos.',
        en: 'Student progress portal with completion meter, attendance percentage, study streak, weekly class calendar, and assignment submissions.',
      },
      previewImage: STUDENT_LEARNING_IMAGE,
      badge: isEs ? 'Campus Alumno' : 'Student Campus',
      features: isEs
        ? ['Métricas de rendimiento', 'Cronograma semanal', 'Entregas de TPs']
        : ['Performance metrics', 'Weekly schedule', 'Assignment tracking'],
    },
    {
      id: 'makerspace' as ScreenId,
      number: '04',
      title: {
        es: 'Pantalla 4: Laboratorios de Robótica & FabLab',
        en: 'Screen 4: Robotics Labs & Makerspace',
      },
      description: {
        es: 'Infraestructura física del polo con brazos robóticos, granja de impresión 3D y cluster GPU. Sistema de agendamiento de turnos de 2 horas con pase digital.',
        en: 'Physical hardware facility with robotic arms, 3D printing farm, and GPU cluster. Interactive 2-hour bench booking with digital pass QR.',
      },
      previewImage: ROBOTICS_LAB_IMAGE,
      badge: isEs ? 'Laboratorios Físicos' : 'Hardware Labs',
      features: isEs
        ? ['Bancos de trabajo en tiempo real', 'Protocolo de bioseguridad', 'Pase de acceso QR']
        : ['Real-time workbench status', 'Lab safety checklist', 'Digital pass QR'],
    },
    {
      id: 'certificates' as ScreenId,
      number: '05',
      title: {
        es: 'Pantalla 5: Validador de Certificados Oficiales',
        en: 'Screen 5: Verifiable Digital Certificates',
      },
      description: {
        es: 'Diploma digital con código criptográfico inmutable, generador de certificados con nombre en vivo, sellos institucionales y buscador público para empresas.',
        en: 'Cryptographically verified diploma with live student name generator, official director seals, QR code, and public employer verification search.',
      },
      previewImage: HERO_IMAGE,
      badge: isEs ? 'Certificación Digital' : 'Official Credentials',
      features: isEs
        ? ['Firma criptográfica SHA-256', 'Personalizador en vivo', 'Descarga e impresión']
        : ['SHA-256 validation hash', 'Live name customizer', 'Print & PDF export'],
    },
    {
      id: 'showcase' as ScreenId,
      number: '06',
      title: {
        es: 'Pantalla 6: Proyectos de Alumnos & Hackathon',
        en: 'Screen 6: Student Capstones & Hackathon',
      },
      description: {
        es: 'Muro de proyectos tecnológicos desarrollados por egresados (drones, visión en salud, IoT agrícola) con sistema de votación y formulario de postulación.',
        en: 'Showcase of open hardware and software capstones built by students with community upvoting and project submission modal.',
      },
      previewImage: ROBOTICS_LAB_IMAGE,
      badge: isEs ? 'Proyectos Abiertos' : 'Open Projects',
      features: isEs
        ? ['Votación comunitaria en vivo', 'Filtro por especialidad', 'Formulario de envío']
        : ['Live community upvoting', 'Track categorization', 'Proposal modal'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Gallery Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 mb-2">
                <Layers className="w-4 h-4" />
                <span>NODO TECNOLÓGICO · MAPA DE PANTALLAS DE LA APLICACIÓN</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {isEs ? 'Muestrario de Pantallas & Prototipos' : 'App Screen Architecture & Prototype Showcase'}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                {isEs
                  ? 'Explora las 6 pantallas diseñadas y programadas para el ecosistema del Nodo Tecnológico. Haz clic en cualquier tarjeta para ingresar a la pantalla en modo interactivo completo.'
                  : 'Explore all 6 designed and engineered screens for the Nodo Tecnológico application. Click on any card to enter the full interactive screen.'}
              </p>
            </div>

            {/* View Mode Controls */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 shrink-0">
              <button
                onClick={() => setDeviceMode('grid')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  deviceMode === 'grid'
                    ? 'bg-teal-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Mural</span>
              </button>
              <button
                onClick={() => setDeviceMode('desktop')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  deviceMode === 'desktop'
                    ? 'bg-teal-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  deviceMode === 'tablet'
                    ? 'bg-teal-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet</span>
              </button>
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  deviceMode === 'mobile'
                    ? 'bg-teal-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Screens Grid */}
        <div
          className={`grid gap-6 ${
            deviceMode === 'mobile'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto'
              : deviceMode === 'tablet'
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {screens.map((screen) => (
            <div
              key={screen.id}
              className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-teal-500/80 transition-all duration-300 flex flex-col justify-between group shadow-lg ${
                deviceMode === 'mobile' ? 'max-w-[340px] mx-auto' : ''
              }`}
            >
              {/* Screen Preview Container */}
              <div className="relative aspect-video bg-slate-950 overflow-hidden border-b border-slate-800">
                <img
                  src={screen.previewImage}
                  alt={screen.title[language]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Number & Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-teal-400 bg-slate-950/80 px-2.5 py-1 rounded backdrop-blur-sm border border-slate-800">
                    {screen.number}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded backdrop-blur-sm border border-slate-800">
                    {screen.badge}
                  </span>
                </div>

                {/* Overlay Action Button on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-[2px]">
                  <button
                    onClick={() => onSelectScreen(screen.id)}
                    className="px-4 py-2 bg-teal-400 text-slate-950 font-bold text-xs rounded-lg shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isEs ? 'Abrir Pantalla Interactiva' : 'Launch Screen'}</span>
                  </button>
                </div>
              </div>

              {/* Description & Features */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-display group-hover:text-teal-300 transition-colors">
                    {screen.title[language]}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {screen.description[language]}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-3">
                    {screen.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    id: #{screen.id}
                  </span>
                  <button
                    onClick={() => onSelectScreen(screen.id)}
                    className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1"
                  >
                    <span>{isEs ? 'Entrar' : 'Enter'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hotlink Image Assets Strip */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>{isEs ? 'Recursos Visuales & Fotografías del Campus' : 'Visual Assets & Campus Photography'}</span>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            {isEs
              ? 'Fotografías de alta fidelidad utilizadas en las pantallas del Nodo Tecnológico, disponibles para enlace directo.'
              : 'High-fidelity photographs embedded across Nodo Tecnológico screens, ready for direct linking.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <div className="aspect-video relative">
                <img
                  src={HERO_IMAGE}
                  alt="Campus Principal"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 text-xs">
                <div className="font-semibold text-white">Campus Principal & Clúster</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">nodo_campus_hero.jpg</div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <div className="aspect-video relative">
                <img
                  src={ROBOTICS_LAB_IMAGE}
                  alt="Laboratorio de Robótica"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 text-xs">
                <div className="font-semibold text-white">Laboratorio de Robótica & ROS2</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">nodo_robotics_lab.jpg</div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <div className="aspect-video relative">
                <img
                  src={STUDENT_LEARNING_IMAGE}
                  alt="Alumnos de IA"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-3 text-xs">
                <div className="font-semibold text-white">Aula Virtual & Entrenamiento IA</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">nodo_student_learning.jpg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
