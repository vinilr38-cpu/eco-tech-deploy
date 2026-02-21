import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database file paths
const DB_PATH = join(__dirname, 'data');
const EVENTS_FILE = join(DB_PATH, 'events.json');
const PROJECTS_FILE = join(DB_PATH, 'projects.json');
const MEMBERS_FILE = join(DB_PATH, 'members.json');
const CONTACTS_FILE = join(DB_PATH, 'contacts.json');
const REGISTRATIONS_FILE = join(DB_PATH, 'registrations.json');

// Helper functions 
const readJSON = (file) => {
    if (!existsSync(file)) return [];
    try {
        return JSON.parse(readFileSync(file, 'utf-8'));
    } catch {
        return [];
    }
};

const writeJSON = (file, data) => {
    writeFileSync(file, JSON.stringify(data, null, 2));
};

// ============== EVENTS API ==============
app.get('/api/events', (req, res) => {
    const events = readJSON(EVENTS_FILE);
    res.json(events);
});

app.get('/api/events/:id', (req, res) => {
    const events = readJSON(EVENTS_FILE);
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
});

app.post('/api/events', (req, res) => {
    const events = readJSON(EVENTS_FILE);
    const newEvent = {
        id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1,
        ...req.body,
        attendees: 0,
        createdAt: new Date().toISOString()
    };
    events.push(newEvent);
    writeJSON(EVENTS_FILE, events);
    res.status(201).json(newEvent);
});

app.put('/api/events/:id', (req, res) => {
    const events = readJSON(EVENTS_FILE);
    const index = events.findIndex(e => e.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Event not found' });
    events[index] = { ...events[index], ...req.body };
    writeJSON(EVENTS_FILE, events);
    res.json(events[index]);
});

app.delete('/api/events/:id', (req, res) => {
    let events = readJSON(EVENTS_FILE);
    events = events.filter(e => e.id !== parseInt(req.params.id));
    writeJSON(EVENTS_FILE, events);
    res.status(204).send();
});

// Register for event
app.post('/api/events/:id/register', (req, res) => {
    const events = readJSON(EVENTS_FILE);
    const registrations = readJSON(REGISTRATIONS_FILE);
    const eventIndex = events.findIndex(e => e.id === parseInt(req.params.id));

    if (eventIndex === -1) return res.status(404).json({ error: 'Event not found' });

    const registration = {
        id: registrations.length > 0 ? Math.max(...registrations.map(r => r.id)) + 1 : 1,
        eventId: parseInt(req.params.id),
        ...req.body,
        registeredAt: new Date().toISOString()
    };

    registrations.push(registration);
    events[eventIndex].attendees = (events[eventIndex].attendees || 0) + 1;

    writeJSON(REGISTRATIONS_FILE, registrations);
    writeJSON(EVENTS_FILE, events);

    res.status(201).json(registration);
});

// ============== PROJECTS API ==============
app.get('/api/projects', (req, res) => {
    const projects = readJSON(PROJECTS_FILE);
    res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
    const projects = readJSON(PROJECTS_FILE);
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
});

app.post('/api/projects', (req, res) => {
    const projects = readJSON(PROJECTS_FILE);
    const newProject = {
        id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
        ...req.body,
        createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    writeJSON(PROJECTS_FILE, projects);
    res.status(201).json(newProject);
});

app.put('/api/projects/:id', (req, res) => {
    const projects = readJSON(PROJECTS_FILE);
    const index = projects.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Project not found' });
    projects[index] = { ...projects[index], ...req.body };
    writeJSON(PROJECTS_FILE, projects);
    res.json(projects[index]);
});

app.delete('/api/projects/:id', (req, res) => {
    let projects = readJSON(PROJECTS_FILE);
    projects = projects.filter(p => p.id !== parseInt(req.params.id));
    writeJSON(PROJECTS_FILE, projects);
    res.status(204).send();
});

// Join project
app.post('/api/projects/:id/join', (req, res) => {
    const projects = readJSON(PROJECTS_FILE);
    const index = projects.findIndex(p => p.id === parseInt(req.params.id));

    if (index === -1) return res.status(404).json({ error: 'Project not found' });

    if (!projects[index].members) projects[index].members = [];
    projects[index].members.push({
        ...req.body,
        joinedAt: new Date().toISOString()
    });

    if (projects[index].membersNeeded > 0) {
        projects[index].membersNeeded -= 1;
    }

    writeJSON(PROJECTS_FILE, projects);
    res.json(projects[index]);
});

// ============== MEMBERS API ==============
app.get('/api/members', (req, res) => {
    const members = readJSON(MEMBERS_FILE);
    res.json(members);
});

app.get('/api/members/:id', (req, res) => {
    const members = readJSON(MEMBERS_FILE);
    const member = members.find(m => m.id === parseInt(req.params.id));
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
});

app.post('/api/members', (req, res) => {
    const members = readJSON(MEMBERS_FILE);
    const newMember = {
        id: members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1,
        ...req.body,
        initials: req.body.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        joinedAt: new Date().toISOString()
    };
    members.push(newMember);
    writeJSON(MEMBERS_FILE, members);
    res.status(201).json(newMember);
});

app.put('/api/members/:id', (req, res) => {
    const members = readJSON(MEMBERS_FILE);
    const index = members.findIndex(m => m.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Member not found' });
    members[index] = { ...members[index], ...req.body };
    writeJSON(MEMBERS_FILE, members);
    res.json(members[index]);
});

app.delete('/api/members/:id', (req, res) => {
    let members = readJSON(MEMBERS_FILE);
    members = members.filter(m => m.id !== parseInt(req.params.id));
    writeJSON(MEMBERS_FILE, members);
    res.status(204).send();
});

// ============== CONTACT API ==============
app.get('/api/contacts', (req, res) => {
    const contacts = readJSON(CONTACTS_FILE);
    res.json(contacts);
});

app.post('/api/contacts', (req, res) => {
    const contacts = readJSON(CONTACTS_FILE);
    const newContact = {
        id: contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
        ...req.body,
        createdAt: new Date().toISOString(),
        status: 'pending'
    };
    contacts.push(newContact);
    writeJSON(CONTACTS_FILE, contacts);
    res.status(201).json(newContact);
});

// ============== STATS API ==============
app.get('/api/stats', (req, res) => {
    const events = readJSON(EVENTS_FILE);
    const projects = readJSON(PROJECTS_FILE);
    const members = readJSON(MEMBERS_FILE);

    res.json({
        totalEvents: events.length,
        totalProjects: projects.length,
        totalMembers: members.length,
        activeProjects: projects.filter(p => p.status === 'Active').length,
        upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length
    });
});

// Root route - API info
app.get('/', (req, res) => {
    res.json({
        message: '🌿 Eco Tech API Server',
        info: 'This is the backend API. The frontend website is at http://localhost:5173',
        endpoints: {
            events: '/api/events',
            projects: '/api/projects',
            members: '/api/members',
            contacts: '/api/contacts',
            stats: '/api/stats'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🌿 Eco Tech API Server running on http://localhost:${PORT}`);
});
