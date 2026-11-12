import React, { useState } from 'react';
import { Language, ProjectSubmission } from '../types';
import { COMMUNITY_PROJECTS } from '../data/mockData';
import { ThumbsUp, GitBranch, ExternalLink, Sparkles, Plus, CheckCircle2, X } from 'lucide-react';

interface ProjectShowcaseScreenProps {
  language: Language;
}

export const ProjectShowcaseScreen: React.FC<ProjectShowcaseScreenProps> = ({ language }) => {
  const isEs = language === 'es';
  const [projects, setProjects] = useState<ProjectSubmission[]>(COMMUNITY_PROJECTS);
  const [votedProjectIds, setVotedProjectIds] = useState<Set<string>>(new Set());
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTrack, setNewTrack] = useState('Robótica & IA');
  const [newAuthor, setNewAuthor] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleVote = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const alreadyVoted = votedProjectIds.has(id);
          const nextVotes = alreadyVoted ? p.votes - 1 : p.votes + 1;
          return { ...p, votes: nextVotes };
        }
        return p;
      })
    );

    setVotedProjectIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAuthor) return;

    const newProj: ProjectSubmission = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      author: newAuthor,
      cohort: 'Cohorte 2026',
      track: newTrack,
      summary: { es: newSummary, en: newSummary },
      votes: 1,
      tags: [newTrack, 'Nodo 2026', 'Open Source'],
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
    };

    setProjects([newProj, ...projects]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsSubmitModalOpen(false);
      setNewTitle('');
      setNewAuthor('');
      setNewSummary('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>NODO TECNOLÓGICO · HACKATHONS & PROYECTOS FINALES</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {isEs ? 'Innovación Abierta & Desarrollos de Alumnos' : 'Open Innovation & Student Capstones'}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-2xl">
              {isEs
                ? 'Soluciones tecnológicas reales desarrolladas durante las diplomaturas con hardware y cluster del Nodo. Apoya a los equipos con tu voto para el fondo de aceleración.'
                : 'Real-world tech solutions built during training tracks using Nodo hardware and GPU cluster. Vote for projects to support seed accelerator grants.'}
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>{isEs ? 'Postular Proyecto' : 'Submit Project'}</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const hasVoted = votedProjectIds.has(project.id);
            return (
              <div
                key={project.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="text-teal-400 font-semibold">{project.track}</span>
                    <span className="font-mono">{project.cohort}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white font-display leading-snug">
                    {project.title}
                  </h3>

                  <div className="text-xs text-slate-400 mt-1">
                    {isEs ? 'Desarrollado por:' : 'Created by:'}{' '}
                    <strong className="text-slate-300 font-medium">{project.author}</strong>
                  </div>

                  <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                    {project.summary[language] || project.summary.es}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Código</span>
                    </a>
                    <span aria-hidden="true">·</span>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Demo</span>
                    </a>
                  </div>

                  <button
                    onClick={() => handleVote(project.id)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      hasVoted
                        ? 'bg-teal-400 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="font-mono tabular-nums">{project.votes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Modal */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-bold text-white font-display mb-1">
                {isEs ? 'Postular Proyecto de Cohorte' : 'Submit Capstone Project'}
              </h2>
              <p className="text-xs text-slate-400 mb-5">
                {isEs
                  ? 'Comparte el desarrollo de tu equipo con la comunidad del Nodo y postula a financiamiento.'
                  : 'Share your team development with the Nodo community and apply for seed grants.'}
              </p>

              {submittedSuccess ? (
                <div className="py-8 text-center space-y-2 text-teal-300">
                  <CheckCircle2 className="w-10 h-10 text-teal-400 mx-auto" />
                  <div className="text-sm font-bold">
                    {isEs ? '¡Proyecto Registrado con Éxito!' : 'Project Submitted Successfully!'}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      {isEs ? 'Título del Proyecto' : 'Project Title'}
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder={isEs ? 'Ej: Sistema de Monitoreo con Microcontroladores' : 'E.g., Microcontroller Monitoring System'}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        {isEs ? 'Área / Especialidad' : 'Track'}
                      </label>
                      <select
                        value={newTrack}
                        onChange={(e) => setNewTrack(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
                      >
                        <option value="Robótica & IA">Robótica & IA</option>
                        <option value="Cloud & Full-Stack">Cloud & Full-Stack</option>
                        <option value="Ciencia de Datos">Ciencia de Datos</option>
                        <option value="Ciberseguridad">Ciberseguridad</option>
                        <option value="Hardware & IoT">Hardware & IoT</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        {isEs ? 'Autor o Equipo' : 'Author / Team'}
                      </label>
                      <input
                        type="text"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="Ej: Sofia Ramos & Equipo 4"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      {isEs ? 'Resumen Técnico' : 'Technical Summary'}
                    </label>
                    <textarea
                      value={newSummary}
                      onChange={(e) => setNewSummary(e.target.value)}
                      placeholder={isEs ? 'Describe brevemente la solución y el hardware/software utilizado...' : 'Briefly describe problem, stack, and outcome...'}
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-teal-400 resize-none"
                      required
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(false)}
                      className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                    >
                      {isEs ? 'Cancelar' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold rounded-lg"
                    >
                      {isEs ? 'Publicar Proyecto' : 'Publish Project'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
