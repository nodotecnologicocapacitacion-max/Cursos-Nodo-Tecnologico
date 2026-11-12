import React, { useState } from 'react';
import { Course, Language } from '../types';
import { COURSES } from '../data/mockData';
import { X, CheckCircle2, QrCode, Sparkles } from 'lucide-react';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  preselectedCourse?: Course | null;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  language,
  preselectedCourse,
}) => {
  const isEs = language === 'es';
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    preselectedCourse?.id || COURSES[0].id
  );
  const [fullName, setFullName] = useState<string>('Lucas Gómez');
  const [email, setEmail] = useState<string>('nodotecnologicocapacitacion@gmail.com');
  const [educationLevel, setEducationLevel] = useState<string>('universitario');
  const [scholarshipType, setScholarshipType] = useState<string>('full_polo');
  const [motivation, setMotivation] = useState<string>(
    isEs
      ? 'Deseo especializarme en automatización de procesos y robótica para desarrollar tecnología aplicada a la producción regional.'
      : 'I want to specialize in process automation and robotics to engineer applied technology for regional manufacturing.'
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hex = Math.random().toString(16).substring(2, 8).toUpperCase();
    setTicketId(`NODO-ADM-2026-${hex}`);
    setSubmitted(true);
  };

  const currentCourse = COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{isEs ? 'CONVOCATORIA DE BECAS 2026' : '2026 SCHOLARSHIP ADMISSIONS'}</span>
            </div>

            <h2 className="text-xl font-bold text-white font-display mb-1">
              {isEs ? 'Postulación a Formación Técnica' : 'Technical Training Application'}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              {isEs
                ? 'Las diplomaturas del Nodo Tecnológico son 100% gratuitas con cupos limitados otorgados por mérito y motivación.'
                : 'Nodo Tecnológico tracks are 100% tuition-free with seats awarded based on motivation and merit.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Program Track Selection */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isEs ? 'Especialidad Seleccionada' : 'Selected Track'}
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
                >
                  {COURSES.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title[language]} ({course.durationWeeks} semanas)
                    </option>
                  ))}
                </select>
              </div>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {isEs ? 'Nombre Completo' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {isEs ? 'Correo Electrónico' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
                    required
                  />
                </div>
              </div>

              {/* Education Level & Grant Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {isEs ? 'Nivel de Estudios' : 'Education Level'}
                  </label>
                  <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
                  >
                    <option value="secundario">{isEs ? 'Secundario Completo' : 'High School'}</option>
                    <option value="tecnico">{isEs ? 'Técnico Terciario' : 'Technical Degree'}</option>
                    <option value="universitario">{isEs ? 'Universitario / Estudiante' : 'University'}</option>
                    <option value="autodidacta">{isEs ? 'Autodidacta / En Ejercicio' : 'Self-Taught / Working'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    {isEs ? 'Tipo de Beca Solicitada' : 'Grant Type'}
                  </label>
                  <select
                    value={scholarshipType}
                    onChange={(e) => setScholarshipType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
                  >
                    <option value="full_polo">{isEs ? 'Beca 100% Polo Tecnológico' : '100% Tech Cluster Grant'}</option>
                    <option value="hardware">{isEs ? 'Beca + Acceso Libre a Laboratorio' : 'Grant + Hardware Lab Access'}</option>
                  </select>
                </div>
              </div>

              {/* Motivation */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  {isEs ? 'Motivación y Proyecto Personal' : 'Motivation & Goals'}
                </label>
                <textarea
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400 resize-none leading-relaxed"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  {isEs ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold rounded-lg transition-colors shadow-sm"
                >
                  {isEs ? 'Enviar Postulación Oficial' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Ticket */
          <div className="text-center py-4 space-y-5">
            <div className="w-12 h-12 bg-teal-950 border border-teal-500 rounded-full flex items-center justify-center text-teal-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white font-display">
                {isEs ? '¡Postulación Registrada Exitosamente!' : 'Application Successfully Registered!'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                {isEs
                  ? 'Hemos recibido tus antecedentes. El comité académico revisará tu perfil en un plazo de 48 hs hábiles.'
                  : 'We have received your dossier. The academic admissions board will review your profile within 48 hours.'}
              </p>
            </div>

            {/* Ticket Card */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-left text-xs space-y-2 font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">TICKET ADMISIÓN:</span>
                <span className="text-teal-400 font-bold">{ticketId}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">POSTULANTE:</span>
                <span className="text-white font-sans font-semibold">{fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">TRAYECTO:</span>
                <span className="text-slate-300 font-sans">{currentCourse.title[language]}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-slate-400">ESTADO:</span>
                <span className="text-cyan-400 font-bold">En Revisión Prioritaria</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="w-full py-2.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold rounded-lg text-xs transition-colors"
            >
              {isEs ? 'Entendido, Volver al Catálogo' : 'Done, Return to Catalog'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
