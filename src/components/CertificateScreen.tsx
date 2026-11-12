import React, { useState } from 'react';
import { Language } from '../types';
import { SAMPLE_CERTIFICATE, COURSES } from '../data/mockData';
import { Award, ShieldCheck, Download, Printer, CheckCircle2, QrCode, Search, Copy, Check } from 'lucide-react';

interface CertificateScreenProps {
  language: Language;
}

export const CertificateScreen: React.FC<CertificateScreenProps> = ({ language }) => {
  const isEs = language === 'es';
  const [studentName, setStudentName] = useState<string>(SAMPLE_CERTIFICATE.studentName);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState<string>(COURSES[0].title.es);
  const [certId, setCertId] = useState<string>(SAMPLE_CERTIFICATE.certificateId);
  const [certHash, setCertHash] = useState<string>(SAMPLE_CERTIFICATE.verificationHash);
  const [copied, setCopied] = useState<boolean>(false);
  const [searchHashInput, setSearchHashInput] = useState<string>('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(true);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(certHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleVerifyQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchHashInput) return;
    setVerificationResult(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 mb-2">
            <Award className="w-4 h-4" />
            <span>NODO TECNOLÓGICO · PORTAL OFICIAL DE CERTIFICACIÓN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
            {isEs ? 'Validador y Emisor de Certificados Digitales' : 'Digital Certificate Issuer & Validator'}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
            {isEs
              ? 'Todos los diplomas y certificaciones técnicas emitidos por el Nodo Tecnológico cuentan con firma criptográfica inmutable verificable por empresas y universidades.'
              : 'All technical diplomas and certificates issued by Nodo Tecnológico feature immutable cryptographic validation recognized by tech companies and universities.'}
          </p>
        </div>

        {/* Certificate Customizer Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="text-xs font-semibold text-teal-400 mb-3">
            {isEs ? 'Generador y Previsualizador de Credencial en Tiempo Real:' : 'Real-Time Credential Customizer & Preview:'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {isEs ? 'Nombre del Alumno Certificado' : 'Certified Student Name'}
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {isEs ? 'Programa / Especialidad' : 'Program Track'}
              </label>
              <select
                value={selectedCourseTitle}
                onChange={(e) => {
                  setSelectedCourseTitle(e.target.value);
                  const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
                  setCertId(`NODO-CERT-2026-${randomHex}`);
                  setCertHash(`0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 12)}`);
                }}
                className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
              >
                {COURSES.map((c) => (
                  <option key={c.id} value={c.title.es}>
                    {c.title[language]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Official Printable Certificate Canvas */}
        <div className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-teal-500/50 rounded-2xl p-8 sm:p-12 shadow-2xl overflow-hidden">
          {/* Subtle Guilloche / Watermark Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* Certificate Inner Frame */}
          <div className="relative border border-slate-700/80 rounded-xl p-6 sm:p-10 text-center flex flex-col justify-between min-h-[500px]">
            {/* Top Bar with Seal */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-6">
              <div className="text-left">
                <div className="text-xs font-mono text-teal-400 font-semibold tracking-wider">
                  REPÚBLICA ARGENTINA · POLO CIENTÍFICO TECNOLÓGICO
                </div>
                <div className="text-lg font-bold text-white font-display mt-0.5">
                  NODO TECNOLÓGICO
                </div>
              </div>

              <div className="w-14 h-14 rounded-full border-2 border-teal-400/80 bg-teal-950/40 flex items-center justify-center text-teal-300 font-bold text-xs shadow-inner">
                SEAL
              </div>
            </div>

            {/* Main Diploma Body */}
            <div className="my-8">
              <div className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-2">
                {isEs ? 'OTORGA EL PRESENTE DIPLOMA DE EXCELENCIA A' : 'PROUDLY CONFERS THIS DIPLOMA OF EXCELLENCE TO'}
              </div>

              <div className="text-2xl sm:text-4xl font-bold text-white font-display tracking-tight text-teal-200 my-4">
                {studentName || 'Estudiante'}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {isEs
                  ? `Por haber cumplimentado satisfactoriamente los requisitos académicos, evaluaciones teóricas y proyectos de laboratorio correspondientes a la diplomatura de:`
                  : `For successfully satisfying all academic requirements, rigorous theoretical evaluations, and laboratory projects corresponding to:`}
              </p>

              <div className="text-base sm:text-xl font-bold text-white mt-3 font-display">
                {selectedCourseTitle}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs text-slate-400 font-mono">
                <span>Carga Horaria: 180 Horas de Práctica en Lab</span>
                <span aria-hidden="true">·</span>
                <span className="text-teal-400 font-semibold">Calificación: 98/100 (Sobresaliente)</span>
                <span aria-hidden="true">·</span>
                <span>Cohorte 2026</span>
              </div>
            </div>

            {/* Bottom Signatures & Verification Badge */}
            <div className="border-t border-slate-800 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-xs">
              <div>
                <div className="font-serif italic text-sm text-slate-300 mb-1">Elena Santillán</div>
                <div className="w-32 h-px bg-slate-700 mx-auto mb-1" />
                <div className="text-[11px] text-slate-400">Directora Académica</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white p-1 rounded-md mb-2 shadow">
                  {/* Simplified QR pattern illustration */}
                  <div className="w-full h-full bg-slate-900 rounded p-1 grid grid-cols-4 gap-0.5">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-[1px] ${
                          (i % 3 === 0 || i % 5 === 0) ? 'bg-teal-400' : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="font-mono text-[10px] text-teal-400">{certId}</span>
              </div>

              <div>
                <div className="font-serif italic text-sm text-slate-300 mb-1">Lucas Pereyra</div>
                <div className="w-32 h-px bg-slate-700 mx-auto mb-1" />
                <div className="text-[11px] text-slate-400">Director General Nodo</div>
              </div>
            </div>

            {/* Cryptographic hash footer */}
            <div className="mt-6 pt-3 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 font-mono">
              <span className="truncate max-w-md">HASH: {certHash}</span>
              <span>VERIFICACIÓN EN LÍNEA: nodotecnologico.gob.ar/verify</span>
            </div>
          </div>
        </div>

        {/* Certificate Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Hash SHA-256:</span>
            <code className="text-teal-400 font-mono">{certHash.substring(0, 18)}...</code>
            <button
              onClick={handleCopyHash}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title="Copiar hash de verificación"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isEs ? 'Imprimir / Guardar como PDF' : 'Print / Save as PDF'}</span>
            </button>
            <button
              onClick={handleCopyHash}
              className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isEs ? 'Copiar Enlace de Verificación' : 'Copy Verification Link'}</span>
            </button>
          </div>
        </div>

        {/* Public Verifier Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-sm font-bold text-white font-display mb-2">
            {isEs ? 'Verificador Público de Autenticidad para Empleadores' : 'Public Authenticity Verification for Employers'}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            {isEs
              ? 'Ingresa el código alfanumérico o el hash de la credencial para verificar su validez en el registro central.'
              : 'Input the certificate ID or verification hash to validate credentials in the central ledger.'}
          </p>

          <form onSubmit={handleVerifyQuery} className="flex gap-2">
            <input
              type="text"
              value={searchHashInput}
              onChange={(e) => setSearchHashInput(e.target.value)}
              placeholder={isEs ? 'Ej: NODO-CERT-2026-9F8A12' : 'E.g., NODO-CERT-2026-9F8A12'}
              className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isEs ? 'Verificar' : 'Verify'}</span>
            </button>
          </form>

          {verificationResult && (
            <div className="mt-4 p-3 bg-teal-950/40 border border-teal-500 rounded-lg flex items-center gap-3 text-xs text-teal-200">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>
                {isEs
                  ? 'Certificado Válido y Vigente. Registrado en el Padrón de Egresados del Polo de Innovación Tecnológica.'
                  : 'Valid and active certificate. Officially recorded in the Technology Innovation Registry.'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
