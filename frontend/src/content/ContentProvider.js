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

function mergeLive(live) {
  return {
    profile: live?.profile ? { ...fallbackProfile, ...live.profile } : fallbackProfile,
    experience: Array.isArray(live?.experience) ? live.experience : fallbackExperience,
    education: Array.isArray(live?.education) ? live.education : fallbackEducation,
    skillGroups: Array.isArray(live?.skillGroups) ? live.skillGroups : fallbackSkillGroups,
    projects: Array.isArray(live?.projects) ? live.projects : fallbackProjects,
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
