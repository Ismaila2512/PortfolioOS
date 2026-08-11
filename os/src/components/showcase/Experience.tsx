import React from 'react';
import ResumeDownload from './ResumeDownload';

export interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className="site-page-content">
            <ResumeDownload />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Farida Shoes Pvt. Ltd.</h1>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Software Development Intern</h3>
                        <b>
                            <p>May 2026 – Jul 2026, Ambur, Tamil Nadu</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    <strong>Computer Vision & Automation</strong> - Engineered an automated, non-contact 
                    heel height inspection system using Python, OpenCV, and Node.js. This successfully 
                    replaced a fully manual production-line quality check.
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            Developed dynamic image preprocessing and self-calibrating measurement algorithms 
                            to overcome variable factory-floor lighting and part placement.
                        </p>
                    </li>
                    <li>
                        <p>
                            Sustained high detection accuracy in a rigorous manufacturing environment.
                        </p>
                    </li>
                    <li>
                        <p>
                            Partnered with manufacturing stakeholders to translate physical QA tolerances 
                            into robust software validation rules.
                        </p>
                    </li>
                    <li>
                        <p>
                            Delivered a prototype that was approved for live production integration.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
        marginTop: 48,
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
};

export default Experience;
