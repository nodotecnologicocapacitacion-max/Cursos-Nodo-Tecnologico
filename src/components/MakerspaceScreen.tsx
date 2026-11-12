import React, { useState } from 'react';
import { LabStation, Language } from '../types';
import { LAB_STATIONS, ROBOTICS_LAB_IMAGE } from '../data/mockData';
import { Cpu, Calendar, Clock, ShieldCheck, CheckCircle2, QrCode, AlertCircle, Wrench, X } from 'lucide-react';

interface MakerspaceScreenProps {
  language: Language;
}

export const MakerspaceScreen: React.FC<MakerspaceScreenProps> = ({ language }) => {
  const isEs = language === 'es';
  const [selectedStation, setSelectedStation] = useState<LabStation>(LAB_STATIONS[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>('14:00 - 16:00 hs');
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-14');
  const [safetyChecked, setSafetyChecked] = useState<boolean>(false);
  const [purpose, setPurpose] = useState<string>(
    isEs ? 'Calibración de cinemática inversa en brazo robótico UR5e' : 'UR5e robotic arm inverse kinematics calibration'
  );
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  const timeSlots = [
    '09:00 - 11:00 hs',
    '11:30 - 13:30 hs',
    '14:00 - 16:00 hs',
    '16:30 - 18:30 hs',
    '19:00 - 21:00 hs',
  ];

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!safetyChecked) return;
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    setBookingRef(`LAB-PASS-${randomHex}`);
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-medium text-teal-400 mb-2">
                <span>NODO TECNOLÓGICO</span>
                <span aria-hidden="true">·</span>
                <span>INFRAESTRUCTURA DE FABRICACIÓN</span>
                <span aria-hidden="true">·</span>
                <span>ACCESO BECARIOS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {isEs
                  ? 'Laboratorios de Innovación, Robótica & Fabricación Digital'
                  : 'Innovation Labs, Robotics & Digital Fabrication'}
              </h1>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-xl">
                {isEs
                  ? 'Espacio de investigación aplicada con bancos de trabajo dedicados, osciloscopios, impresoras 3D industriales y cluster de cómputo para entrenamiento de modelos.'
                  : 'Applied research facility featuring dedicated workbenches, oscilloscopes, industrial 3D printers, and a GPU compute cluster for model training.'}
              </p>
            </div>

            <div className="lg:col-span-5 relative h-48 sm:h-56 rounded-xl overflow-hidden border border-slate-800">
              <img
                src={ROBOTICS_LAB_IMAGE}
                alt="Laboratorio de Robótica"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs text-slate-200 bg-slate-950/80 px-2.5 py-1 rounded backdrop-blur-sm">
                {isEs ? 'Ala Robótica · Banco 04' : 'Robotics Wing · Bench 04'}
              </div>
            </div>
          </div>
        </div>

        {/* Stations Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white font-display">
              {isEs ? 'Estaciones y Laboratorios Disponibles' : 'Available Workstations & Labs'}
            </h2>
            <span className="text-xs text-slate-400">
              {isEs ? 'Selecciona un área para agendar' : 'Select a facility to book time'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {LAB_STATIONS.map((station) => {
              const isSelected = selectedStation.id === station.id;
              return (
                <button
                  key={station.id}
                  onClick={() => {
                    setSelectedStation(station);
                    setBookingConfirmed(false);
                  }}
                  className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-teal-400 bg-slate-900 shadow-md ring-1 ring-teal-400'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-[11px] text-teal-400 font-mono mb-1">{station.room}</div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {station.name[language]}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {station.description[language]}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                    <span className="font-mono tabular-nums">
                      {station.currentAvailableSlots} {isEs ? 'bancos libres' : 'slots open'}
                    </span>
                    <span className="text-teal-400 text-[11px] font-semibold">
                      {isSelected ? (isEs ? 'Seleccionado' : 'Selected') : (isEs ? 'Elegir' : 'Select')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reservation Terminal */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400 mb-2">
              <Clock className="w-4 h-4" />
              <span>{isEs ? 'Reserva de Turno en Laboratorio' : 'Lab Workbench Booking'}</span>
            </div>

            <h3 className="text-xl font-bold text-white font-display mb-1">
              {selectedStation.name[language]}
            </h3>
            <p className="text-xs text-slate-400 mb-6">{selectedStation.room} · {selectedStation.operatingHours}</p>

            {/* Equipment list tags */}
            <div className="mb-6 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              <div className="text-slate-400 mb-2 font-medium">
                {isEs ? 'Instrumental y equipamiento incluido:' : 'Included instrumentation & equipment:'}
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedStation.equipment.map((item, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[11px] bg-slate-900 text-slate-300 px-2 py-1 rounded border border-slate-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {!bookingConfirmed ? (
              <form onSubmit={handleConfirmReservation} className="space-y-5">
                {/* Date & Time Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      {isEs ? 'Fecha de Trabajo' : 'Work Date'}
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      {isEs ? 'Bloque Horario (2 Horas)' : 'Time Slot (2 Hours)'}
                    </label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {isEs ? 'Objetivo o Proyecto a Desarrollar' : 'Work Purpose / Project Description'}
                  </label>
                  <input
                    type="text"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder={isEs ? 'Ej: Prototipado de placa PCB para tesis' : 'E.g., PCB prototyping for capstone'}
                    className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
                    required
                  />
                </div>

                {/* Safety Protocol Checkbox */}
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="safety"
                    checked={safetyChecked}
                    onChange={(e) => setSafetyChecked(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-teal-400 focus:ring-teal-400"
                    required
                  />
                  <label htmlFor="safety" className="text-xs text-slate-300 cursor-pointer">
                    <strong className="text-amber-400 block mb-0.5">
                      {selectedStation.safetyTier[language]}
                    </strong>
                    {isEs
                      ? 'Confirmo que conozco los protocolos de bioseguridad, uso de protectores oculares y manejo seguro de instrumental del Nodo Tecnológico.'
                      : 'I acknowledge the lab safety guidelines, eye protection protocols, and safe instrument handling rules of Nodo Tecnológico.'}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!safetyChecked}
                  className="px-6 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 disabled:opacity-40 rounded-lg transition-colors shadow-sm"
                >
                  {isEs ? 'Confirmar Reserva de Banco' : 'Confirm Workbench Reservation'}
                </button>
              </form>
            ) : (
              /* Booking Pass Confirmed Card */
              <div className="p-6 bg-teal-950/40 border border-teal-500 rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-teal-400" />
                    <span>{isEs ? '¡Reserva de Laboratorio Confirmada!' : 'Lab Booking Confirmed!'}</span>
                  </div>
                  <span className="font-mono text-xs text-teal-300 bg-teal-900/60 px-2 py-0.5 rounded border border-teal-600">
                    {bookingRef}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-200 border-t border-teal-800/60 pt-4">
                  <div>
                    <span className="text-slate-400 block">{isEs ? 'Laboratorio' : 'Facility'}</span>
                    <strong className="text-white">{selectedStation.name[language]}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{isEs ? 'Fecha & Horario' : 'Date & Slot'}</span>
                    <strong className="text-white">{selectedDate} · {selectedSlot}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{isEs ? 'Banco Asignado' : 'Assigned Bench'}</span>
                    <strong className="text-teal-400 font-mono">Puesto #03 (Ala Principal)</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <QrCode className="w-4 h-4 text-teal-400" />
                    <span>{isEs ? 'Presenta este pase digital en el ingreso al laboratorio' : 'Present this pass upon physical arrival'}</span>
                  </div>
                  <button
                    onClick={() => setBookingConfirmed(false)}
                    className="text-xs text-teal-300 hover:underline"
                  >
                    {isEs ? 'Hacer otra reserva' : 'Book another slot'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
