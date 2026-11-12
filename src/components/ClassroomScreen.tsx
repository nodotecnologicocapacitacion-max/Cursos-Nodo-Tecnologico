import React, { useState } from 'react';
import { Course, Language } from '../types';
import { COURSES, STUDENT_LEARNING_IMAGE } from '../data/mockData';
import { Play, Pause, RotateCcw, Terminal, HelpCircle, FileText, CheckCircle2, XCircle, ArrowRight, Sparkles, Volume2, Maximize2 } from 'lucide-react';

interface ClassroomScreenProps {
  language: Language;
  selectedCourse?: Course;
}

export const ClassroomScreen: React.FC<ClassroomScreenProps> = ({
  language,
  selectedCourse,
}) => {
  const isEs = language === 'es';
  const course = selectedCourse || COURSES[0];

  const [activeTab, setActiveTab] = useState<'code' | 'quiz' | 'notes'>('code');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [videoProgress, setVideoProgress] = useState<number>(38); // 38%
  
  // Interactive Code Sandbox State
  const initialPythonCode = `# Nodo Tecnológico - Sandbox de Visión Artificial
import torch
import torchvision.models as models

print("[INIT] Inicializando pipeline de detección...")
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"[HW] Acelerador activo: {device.upper()}")

# Cargar pesos preentrenados del modelo YOLOv10
model = models.resnet50(weights="DEFAULT")
model.eval()

# Tensor de entrada simulado (Batch: 1, Canales: 3, 224x224)
dummy_frame = torch.randn(1, 3, 224, 224)
with torch.no_grad():
    predictions = model(dummy_frame)

top_class = torch.argmax(predictions, dim=1).item()
confidence = torch.softmax(predictions, dim=1).max().item()

print(f"[OK] Inferencia completada en 8.4ms")
print(f"[RESULT] Clase detectada: ID #{top_class} | Confianza: {confidence * 100:.2f}%")
`;

  const [codeContent, setCodeContent] = useState<string>(initialPythonCode);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    '[INIT] Inicializando pipeline de detección...',
    '[HW] Acelerador activo: GPU NVIDIA RTX 4090 (Nodo Cluster)',
    '[OK] Pesos cargados correctamente en memoria VRAM.',
    '[STATUS] Listo para ejecutar. Presione "Ejecutar Código".',
  ]);
  const [isRunningCode, setIsRunningCode] = useState<boolean>(false);

  const handleRunCode = () => {
    setIsRunningCode(true);
    setTimeout(() => {
      const now = new Date().toLocaleTimeString();
      setConsoleOutput([
        `[${now}] >> Ejecución iniciada por el alumno...`,
        `[COMPILER] Sintaxis PyTorch validada (Zero errors).`,
        `[GPU] Asignando tensor en VRAM (cuda:0)...`,
        `[INFER] Procesando 30 fotogramas / segundo con latencia de 6.2ms`,
        `[OUTPUT] Detección confirmada: 12 objetos identificados con precisión 99.4%`,
        `[METRICS] Pérdida de función: 0.0142 | Consumo VRAM: 1.42 GB`,
        `[SUCCESS] Código finalizado con código de salida 0.`,
      ]);
      setIsRunningCode(false);
    }, 700);
  };

  // Interactive Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const correctAnswer = 1; // 0-indexed

  // Notes state
  const [notes, setNotes] = useState<string>(
    'Apuntes de la clase:\n- La capa de convolución preserva la coherencia espacial de los píxeles.\n- En robótica, el cálculo de odometría requiere fusionar IMU y encoders con EKF.\n- Recordar entregar el proyecto de YOLO antes del viernes.'
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Header */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{isEs ? 'Aula Virtual' : 'Virtual Classroom'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-400 font-medium">{course.title[language]}</span>
            <span aria-hidden="true">·</span>
            <span>{isEs ? 'Módulo 3: Visión y Redes Convolucionales' : 'Module 3: Vision & ConvNets'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1 font-display">
            {isEs
              ? 'Clase 08: Inferencia en Tiempo Real y Optimización de Tensores'
              : 'Lesson 08: Real-Time Inference and Tensor Acceleration'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            {isEs ? 'Progreso de la sesión:' : 'Session Progress:'} <strong className="text-white font-mono">74%</strong>
          </span>
          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-teal-400 rounded-full" style={{ width: '74%' }} />
          </div>
        </div>
      </div>

      {/* Main Two-Zone Classroom Split */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Video Lecture Stage (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Video Container */}
          <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between group">
            {/* Main Stage Image / Video Frame */}
            <img
              src={STUDENT_LEARNING_IMAGE}
              alt="Clase en vivo"
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />

            {/* Top Video Overlay Bar */}
            <div className="relative z-10 p-4 flex items-center justify-between text-xs text-slate-200">
              <span className="font-mono text-teal-400 bg-slate-950/80 px-2 py-1 rounded backdrop-blur-sm border border-slate-800">
                HD 1080p · Transmisión Sincrónica
              </span>
              <span className="text-slate-300 bg-slate-950/80 px-2 py-1 rounded backdrop-blur-sm border border-slate-800">
                Prof. Elena Santillán
              </span>
            </div>

            {/* Center Play Button Overlay */}
            <div className="relative z-10 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-teal-500/90 hover:bg-teal-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-none"
                aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
              >
                {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
              </button>
            </div>

            {/* Bottom Video Controls */}
            <div className="relative z-10 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/80">
              {/* Timeline scrubber bar */}
              <div
                className="w-full h-1.5 bg-slate-800 hover:h-2 rounded cursor-pointer transition-all relative mb-3"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newProgress = Math.round((clickX / rect.width) * 100);
                  setVideoProgress(Math.max(0, Math.min(100, newProgress)));
                }}
              >
                <div
                  className="h-full bg-teal-400 rounded relative"
                  style={{ width: `${videoProgress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                </div>
              </div>

              {/* Controls strip */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <span className="font-mono tabular-nums text-slate-400">
                    {Math.floor((videoProgress * 42) / 100)}:20 / 42:15
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Playback speed toggle */}
                  <button
                    onClick={() => {
                      const speeds = [1, 1.25, 1.5, 2];
                      const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                      setPlaybackSpeed(next);
                    }}
                    className="font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-teal-300"
                  >
                    {playbackSpeed}x
                  </button>
                  <Volume2 className="w-4 h-4 text-slate-400" />
                  <Maximize2 className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Outline & Key Concepts */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-bold text-white font-display mb-3">
              {isEs ? 'Conceptos Clave de la Sesión' : 'Session Core Concepts'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80">
                <strong className="text-teal-400 block mb-1">1. Fusión de Tensores</strong>
                {isEs
                  ? 'Reducción de overhead de memoria combinando capas Conv2d y BatchNorm antes de inferencia.'
                  : 'Memory overhead reduction by folding Conv2d and BatchNorm layers prior to inference.'}
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80">
                <strong className="text-cyan-400 block mb-1">2. Cuantización INT8</strong>
                {isEs
                  ? 'Compresión de pesos de coma flotante FP32 a enteros de 8 bits con mínima pérdida de mAP.'
                  : 'Compressing FP32 float weights into 8-bit integers with minimal mAP accuracy loss.'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Zone: Interactive Deck (5 cols) */}
        <div className="lg:col-span-5 flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          {/* Deck Tab Switcher */}
          <div className="flex items-center border-b border-slate-800 bg-slate-900/60 p-1 gap-1">
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'code'
                  ? 'bg-slate-950 text-teal-400 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{isEs ? 'Editor PyTorch' : 'Code Sandbox'}</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'quiz'
                  ? 'bg-slate-950 text-teal-400 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{isEs ? 'Evaluación Rápida' : 'Knowledge Quiz'}</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'notes'
                  ? 'bg-slate-950 text-teal-400 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isEs ? 'Mis Notas' : 'Notes'}</span>
            </button>
          </div>

          {/* Tab 1: Code Sandbox */}
          {activeTab === 'code' && (
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400">pipeline_inference.py</span>
                <span className="text-[11px] text-teal-400 font-mono">PyTorch 2.3 · CUDA 12</span>
              </div>

              {/* Code Textarea */}
              <textarea
                value={codeContent}
                onChange={(e) => setCodeContent(e.target.value)}
                className="w-full h-52 p-3 font-mono text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-teal-500 selection:bg-teal-500/20 leading-relaxed resize-none"
                spellCheck={false}
              />

              {/* Run Action Bar */}
              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={() => setCodeContent(initialPythonCode)}
                  className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isEs ? 'Restablecer' : 'Reset'}</span>
                </button>

                <button
                  onClick={handleRunCode}
                  disabled={isRunningCode}
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunningCode ? (isEs ? 'Ejecutando en Cluster...' : 'Executing...') : (isEs ? 'Ejecutar en GPU' : 'Run on GPU')}</span>
                </button>
              </div>

              {/* Console Output Box */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span className="font-mono">{isEs ? 'Terminal del Cluster' : 'Cluster Terminal Output'}</span>
                  <span className="text-[10px] text-slate-500 font-mono">rtx4090@nodo-cloud</span>
                </div>
                <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1 h-32 overflow-y-auto">
                  {consoleOutput.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.includes('[OK]') || line.includes('[SUCCESS]')
                          ? 'text-teal-400'
                          : line.includes('[HW]')
                          ? 'text-cyan-400'
                          : line.includes('[RESULT]')
                          ? 'text-amber-300'
                          : 'text-slate-400'
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Knowledge Check Quiz */}
          {activeTab === 'quiz' && (
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <div className="text-xs text-slate-400 mb-2">
                  {isEs ? 'Pregunta de Refuerzo · Módulo 3' : 'Knowledge Check · Module 3'}
                </div>
                <h3 className="text-sm font-bold text-white mb-4 leading-snug">
                  {isEs
                    ? '¿Por qué la técnica de cuantización INT8 reduce significativamente la latencia en inferencia de visión artificial?'
                    : 'Why does INT8 quantization dramatically reduce inference latency in computer vision?'}
                </h3>

                {/* Options List */}
                <div className="space-y-2.5">
                  {[
                    {
                      id: 0,
                      text: isEs
                        ? 'Porque incrementa la cantidad de capas de la red neuronal.'
                        : 'Because it multiplies the layer count inside the neural network.',
                    },
                    {
                      id: 1,
                      text: isEs
                        ? 'Porque sustituye operaciones de punto flotante de 32 bits por aritmética entera de 8 bits con menor uso de ancho de banda en memoria.'
                        : 'Because it replaces 32-bit floating point math with compact 8-bit integer operations, reducing memory bandwidth pressure.',
                    },
                    {
                      id: 2,
                      text: isEs
                        ? 'Porque descarta automáticamente el 90% de los píxeles de la imagen de entrada.'
                        : 'Because it automatically discards 90% of the input image pixels.',
                    },
                  ].map((opt) => {
                    const isSelected = selectedQuizOption === opt.id;
                    const isCorrect = opt.id === correctAnswer;

                    let borderClass = 'border-slate-800 bg-slate-900 hover:border-slate-700';
                    if (quizSubmitted) {
                      if (isCorrect) borderClass = 'border-teal-500 bg-teal-950/40 text-teal-200';
                      else if (isSelected) borderClass = 'border-rose-500 bg-rose-950/40 text-rose-200';
                    } else if (isSelected) {
                      borderClass = 'border-teal-400 bg-slate-900';
                    }

                    return (
                      <button
                        key={opt.id}
                        onClick={() => !quizSubmitted && setSelectedQuizOption(opt.id)}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-start gap-2.5 ${borderClass}`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono ${
                            isSelected ? 'border-teal-400 bg-teal-400 text-slate-950 font-bold' : 'border-slate-600'
                          }`}
                        >
                          {String.fromCharCode(65 + opt.id)}
                        </div>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback note when submitted */}
                {quizSubmitted && (
                  <div
                    className={`mt-4 p-3 rounded-lg text-xs border ${
                      selectedQuizOption === correctAnswer
                        ? 'bg-teal-950/40 border-teal-500 text-teal-200'
                        : 'bg-rose-950/40 border-rose-500 text-rose-200'
                    }`}
                  >
                    {selectedQuizOption === correctAnswer ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>
                          {isEs
                            ? '¡Respuesta Correcta! Sumaste +25 puntos de comprensión teórica.'
                            : 'Correct answer! You earned +25 comprehension points.'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>
                          {isEs
                            ? 'Incorrecto. La opción B es la correcta: las operaciones INT8 aprovechan los núcleos Tensor Cores para duplicar el throughput.'
                            : 'Incorrect. Option B is correct: INT8 tensor instructions double throughput on specialized GPU cores.'}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submit / Retry Button */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-2">
                {quizSubmitted ? (
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setSelectedQuizOption(null);
                    }}
                    className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md"
                  >
                    {isEs ? 'Intentar de Nuevo' : 'Retry Question'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (selectedQuizOption !== null) setQuizSubmitted(true);
                    }}
                    disabled={selectedQuizOption === null}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 disabled:opacity-40 rounded-md transition-colors"
                  >
                    {isEs ? 'Confirmar Respuesta' : 'Submit Answer'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Notes */}
          {activeTab === 'notes' && (
            <div className="p-4 flex flex-col flex-1">
              <div className="text-xs text-slate-400 mb-2">
                {isEs ? 'Cuaderno Digital del Alumno (Sincronizado)' : 'Student Digital Notebook (Auto-saved)'}
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-64 p-3 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-teal-500 leading-relaxed resize-none"
              />
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                <span>{isEs ? 'Guardado automáticamente' : 'Saved automatically'}</span>
                <span className="font-mono">{notes.length} caracteres</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
