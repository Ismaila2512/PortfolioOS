import React from 'react';
import ResumeDownload from './ResumeDownload';

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Projects</h1>
            <h3>Things I've built and shipped</h3>
            <br />
            <p>
                Here is a collection of my recent technical projects ranging from full-stack web applications to AI triage engines and computer vision integrations.
            </p>
            <br />
            <ResumeDownload />
            <br />

            <div className="text-block">
                <h2>MediFlow Emerald Pro Max</h2>
                <br />
                <p>
                    <strong>Next.js, PostgreSQL, Tailwind CSS, Framer Motion</strong>
                </p>
                <br />
                <ul>
                    <li><p>Engineered a premium UI/UX overhaul focusing on glassmorphic aesthetic transparency for complex dashboards.</p></li>
                    <li><p>Replaced mock data with live PostgreSQL queries and real-time computation for Doctor and Employee portals.</p></li>
                    <li><p>Implemented an end-to-end billing lifecycle module with server-side actions for instant payment status updates.</p></li>
                </ul>
            </div>
            
            <div className="text-block">
                <h2>ScappyV</h2>
                <br />
                <p>
                    <strong>Node.js, TypeScript, Express.js, Supabase, Gemini API</strong>
                </p>
                <br />
                <ul>
                    <li><p>Engineered an AI triage engine using the Gemini API to autonomously parse, categorize, and route infrastructure tickets to the responsible department.</p></li>
                    <li><p>Developed an admin assistant powered by RAG to execute administrative intents and query live database telemetry in natural language.</p></li>
                    <li><p>Implemented a role-based portal enforcing strict email domain validation across student, staff, and admin user types.</p></li>
                </ul>
            </div>

            <div className="text-block">
                <h2>MeltedStories</h2>
                <br />
                <p>
                    <strong>Next.js, Supabase, PostgreSQL, Tailwind CSS</strong>
                </p>
                <br />
                <ul>
                    <li><p>Built a multi-branch Supabase architecture with localStorage persistence to scope employee dashboards and order queues by store location.</p></li>
                    <li><p>Designed a unified component and notification system across the customer menu, admin, and staff portals for consistent UX.</p></li>
                    <li><p>Hardened the admin surface by migrating the staff portal to a custom non-indexed route, mitigating bot discovery.</p></li>
                </ul>
            </div>

            <div className="text-block">
                <h2>AZAM Radar</h2>
                <br />
                <p>
                    <strong>React, AI Parsing, Vercel, Zero-Regex</strong>
                </p>
                <br />
                <ul>
                    <li><p>Created a Vercel-hosted dashboard for managing sophisticated cross-platform internship automation pipelines.</p></li>
                    <li><p>Developed an LLM-based zero-regex AI parsing system for unstructured data extraction and continuous deployment.</p></li>
                    <li><p>Built a reliable, fully responsive serverless CI/CD pipeline integrated directly into the dashboard interface.</p></li>
                </ul>
            </div>

            <div className="text-block">
                <h2>Heel Height Inspector</h2>
                <br />
                <p>
                    <strong>Python, OpenCV, Node.js, Computer Vision</strong>
                </p>
                <br />
                <ul>
                    <li><p>Engineered a non-contact automated QA inspection system replacing a fully manual production-line quality check using Python and OpenCV.</p></li>
                    <li><p>Self-calibrating measurement algorithms overcame variable factory-floor lighting and part placement.</p></li>
                </ul>
            </div>

            <div className="text-block">
                <h2>Plasto ERP</h2>
                <br />
                <p>
                    <strong>ERP, Full-Stack, UI/UX, System Architecture</strong>
                </p>
                <br />
                <ul>
                    <li><p>Designed a comprehensive resource planning interface optimized for sustainable manufacturing workflows.</p></li>
                    <li><p>Elevated documentation presentation with premium SVG iconography and structured UI/UX design patterns.</p></li>
                </ul>
            </div>
            
        </div>
    );
};

export default Projects;
