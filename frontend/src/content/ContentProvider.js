import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  profile as fallbackProfile,
  experience as fallbackExperience,
  education as fallbackEducation,
  skillGroups as fallbackSkillGroups,
} from '../profileData';
import { projects as fallbackProjects } from '../projectsData';
import { API_BASE_URL, CONTENT_ENDPOINT, RESUME_ENDPOINT } from '../config';

const ContentContext = createContext(null);

function mergeProjects(liveProjects) {
  if (!Array.isArray(liveProjects) || liveProjects.length === 0) return fallbackProjects;
  const defaultsById = new Map(fallbackProjects.map((project) => [String(project.id), project]));
  const liveIds = new Set(liveProjects.map((project) => String(project.id)));
  const patched = liveProjects.map((project) => {
    const fallback = defaultsById.get(String(project.id));
    if (!fallback) return project;
    return {
      ...project,
      featured: fallback.featured,
      comingSoon: fallback.comingSoon ?? project.comingSoon,
      highlightTags: fallback.highlightTags || project.highlightTags,
      image: typeof fallback.image === 'string' && fallback.image.startsWith('/') ? fallback.image : project.image,
      gallery:
        Array.isArray(fallback.gallery) && fallback.gallery[0]?.startsWith?.('/')
          ? fallback.gallery
          : project.gallery,
      summary: fallback.summary || project.summary,
      description: fallback.description || project.description,
      blurb: fallback.blurb?.length ? fallback.blurb : project.blurb,
      highlights: fallback.highlights?.length ? fallback.highlights : project.highlights,
      tags: fallback.tags?.length ? fallback.tags : project.tags,
      metrics: fallback.metrics?.length ? fallback.metrics : project.metrics,
      sourceUrl: fallback.sourceUrl || project.sourceUrl,
      liveUrl: fallback.liveUrl || project.liveUrl,
    };
  });
  const missing = fallbackProjects.filter((project) => !liveIds.has(String(project.id)));
  return missing.length ? [...missing, ...patched] : patched;
}

function mergeLive(live) {
  return {
    profile: live?.profile
      ? {
          ...fallbackProfile,
          ...live.profile,
          technicalProficiency: fallbackProfile.technicalProficiency,
          certifications: fallbackProfile.certifications,
          stats: fallbackProfile.stats,
        }
      : fallbackProfile,
    experience: Array.isArray(live?.experience) ? live.experience : fallbackExperience,
    education: Array.isArray(live?.education) ? live.education : fallbackEducation,
    skillGroups: fallbackSkillGroups,
    projects: mergeProjects(live?.projects),
    resume: live?.resume || { file: null, available: false, updatedAt: null },
  };
}

export async function downloadLiveResume(resume) {
  if (resume?.available) {
    try {
      const res = await fetch(`${RESUME_ENDPOINT}?v=${Date.now()}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = resume.file || 'Resume - Anish Kuila.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        return;
      }
    } catch {
      /* fall through */
    }
  }
  try {
    const res = await fetch(`/uploads/resume.json?v=${Date.now()}`);
    const data = await res.json();
    const filename = data?.file || 'Resume - Anish Kuila.pdf';
    const version = data?.v ? `?v=${encodeURIComponent(data.v)}` : '';
    const link = document.createElement('a');
    link.href = `/uploads/${encodeURIComponent(filename)}${version}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch {
    const link = document.createElement('a');
    link.href = '/uploads/Resume%20-%20Anish%20Kuila.pdf?v=20260905';
    link.download = 'Resume - Anish Kuila.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

export function ContentProvider({ children }) {
  const [bundle, setBundle] = useState(() => mergeLive(null));
  const [source, setSource] = useState('fallback');

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`${CONTENT_ENDPOINT}?v=${Date.now()}`);
      if (!res.ok) throw new Error('content unavailable');
      const live = await res.json();
      setBundle(mergeLive(live));
      setSource('live');
    } catch {
      setBundle(mergeLive(null));
      setSource('fallback');
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      ...bundle,
      source,
      apiBase: API_BASE_URL,
      refresh,
      downloadResume: () => downloadLiveResume(bundle.resume),
    }),
    [bundle, source, refresh]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    return {
      profile: fallbackProfile,
      experience: fallbackExperience,
      education: fallbackEducation,
      skillGroups: fallbackSkillGroups,
      projects: fallbackProjects,
      resume: { available: false },
      source: 'fallback',
      refresh: async () => {},
      downloadResume: () => downloadLiveResume({ available: false }),
    };
  }
  return ctx;
}
