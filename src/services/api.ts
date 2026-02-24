import axios from 'axios';

const isProduction = import.meta.env.PROD;
const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, '');
const API_BASE_URL = isProduction
    ? `${BASE_URL}/api`
    : 'http://localhost:3001/api';

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.status, error.message, error.config?.url);
        return Promise.reject(error);
    }
);

// Types
export interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    category: string;
    attendees: number;
    description?: string;
    longDescription?: string;
    location?: string;
    speaker?: string;
    whatsappLink?: string;
    registrationLink?: string;
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
    getAll: () => api.get<Event[]>(isProduction ? '/events.json' : '/events'),
    getById: async (id: number) => {
        if (isProduction) {
            const response = await eventsApi.getAll();
            const event = response.data.find(e => e.id === id);
            if (!event) throw new Error('Event not found');
            return { data: event };
        }
        return api.get<Event>(`/events/${id}`);
    },
    create: (data: Omit<Event, 'id'>) => api.post<Event>('/events', data),
    update: (id: number, data: Partial<Event>) => api.put<Event>(`/events/${id}`, data),
    delete: (id: number) => api.delete(`/events/${id}`),
    register: (id: number, data: { name: string; email: string }) =>
        api.post(`/events/${id}/register`, data),
};

// Projects API
export const projectsApi = {
    getAll: () => api.get<Project[]>(isProduction ? '/projects.json' : '/projects'),
    getById: async (id: number) => {
        if (isProduction) {
            const response = await projectsApi.getAll();
            const project = response.data.find(p => p.id === id);
            if (!project) throw new Error('Project not found');
            return { data: project };
        }
        return api.get<Project>(`/projects/${id}`);
    },
    create: (data: Omit<Project, 'id'>) => api.post<Project>('/projects', data),
    update: (id: number, data: Partial<Project>) => api.put<Project>(`/projects/${id}`, data),
    delete: (id: number) => api.delete(`/projects/${id}`),
    join: (id: number, data: { name: string; email: string; skills: string }) =>
        api.post<Project>(`/projects/${id}/join`, data),
};

// Members API
export const membersApi = {
    getAll: () => api.get<Member[]>(isProduction ? '/members.json' : '/members'),
    getById: async (id: number) => {
        if (isProduction) {
            const response = await membersApi.getAll();
            const member = response.data.find(m => m.id === id);
            if (!member) throw new Error('Member not found');
            return { data: member };
        }
        return api.get<Member>(`/members/${id}`);
    },
    create: (data: Omit<Member, 'id' | 'initials'>) => api.post<Member>('/members', data),
    update: (id: number, data: Partial<Member>) => api.put<Member>(`/members/${id}`, data),
    delete: (id: number) => api.delete(`/members/${id}`),
};

// Contact API
export const contactApi = {
    getAll: () => api.get<Contact[]>(isProduction ? '/contacts.json' : '/contacts'),
    submit: (data: Omit<Contact, 'id'>) => api.post<Contact>('/contacts', data),
};

// Stats API
export const statsApi = {
    get: async () => {
        if (isProduction) {
            const [events, projects, members] = await Promise.all([
                eventsApi.getAll(),
                projectsApi.getAll(),
                membersApi.getAll()
            ]);
            return {
                data: {
                    totalEvents: events.data.length,
                    totalProjects: projects.data.length,
                    totalMembers: members.data.length,
                    activeProjects: projects.data.filter(p => p.status === 'Active').length,
                    upcomingEvents: events.data.filter(e => new Date(e.date) > new Date()).length
                }
            };
        }
        return api.get<Stats>('/stats');
    },
};

export default api;
