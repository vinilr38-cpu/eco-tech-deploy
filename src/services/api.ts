import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Types
export interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    category: string;
    attendees: number;
    description?: string;
    location?: string;
    speaker?: string;
    createdAt?: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription?: string;
    icon: string;
    status: string;
    membersNeeded: number;
    skills: string[];
    lead?: string;
    members?: Array<{ name: string; email: string; joinedAt: string }>;
    milestones?: Array<{ title: string; completed: boolean }>;
    createdAt?: string;
}

export interface Member {
    id: number;
    name: string;
    role: string;
    initials: string;
    bio?: string | string[];
    skills?: string[];
    projects?: number[];
    email?: string;
    linkedin?: string;
    joinedAt?: string;
    photo_url?: string;
}

export interface Contact {
    id?: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt?: string;
    status?: string;
}

export interface Stats {
    totalEvents: number;
    totalProjects: number;
    totalMembers: number;
    activeProjects: number;
    upcomingEvents: number;
}

// Events API
export const eventsApi = {
    getAll: () => api.get<Event[]>('/events'),
    getById: (id: number) => api.get<Event>(`/events/${id}`),
    create: (data: Omit<Event, 'id'>) => api.post<Event>('/events', data),
    update: (id: number, data: Partial<Event>) => api.put<Event>(`/events/${id}`, data),
    delete: (id: number) => api.delete(`/events/${id}`),
    register: (id: number, data: { name: string; email: string }) =>
        api.post(`/events/${id}/register`, data),
};

// Projects API
export const projectsApi = {
    getAll: () => api.get<Project[]>('/projects'),
    getById: (id: number) => api.get<Project>(`/projects/${id}`),
    create: (data: Omit<Project, 'id'>) => api.post<Project>('/projects', data),
    update: (id: number, data: Partial<Project>) => api.put<Project>(`/projects/${id}`, data),
    delete: (id: number) => api.delete(`/projects/${id}`),
    join: (id: number, data: { name: string; email: string; skills: string }) =>
        api.post<Project>(`/projects/${id}/join`, data),
};

// Members API
export const membersApi = {
    getAll: () => api.get<Member[]>('/members'),
    getById: (id: number) => api.get<Member>(`/members/${id}`),
    create: (data: Omit<Member, 'id' | 'initials'>) => api.post<Member>('/members', data),
    update: (id: number, data: Partial<Member>) => api.put<Member>(`/members/${id}`, data),
    delete: (id: number) => api.delete(`/members/${id}`),
};

// Contact API
export const contactApi = {
    getAll: () => api.get<Contact[]>('/contacts'),
    submit: (data: Omit<Contact, 'id'>) => api.post<Contact>('/contacts', data),
};

// Stats API
export const statsApi = {
    get: () => api.get<Stats>('/stats'),
};

export default api;
