import React from 'react';
import me from '../../assets/pictures/ismail_kid.jpg';
import meNow from '../../assets/pictures/ismail_suit.jpg';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1 style={{ marginLeft: -16 }}>Welcome</h1>
            <h3>I'm Mohammed Ismail</h3>
            <br />
            <div className="text-block">
                <p>
                    I am a final-year M.Tech Software Engineering student with a foundation in full-stack web 
                    development, data analytics, and product-focused engineering. I have hands-on experience 
                    shipping production-deployed applications with Next.js, Node.js, TypeScript, and PostgreSQL.
                </p>
                <br />
                <p>
                    Thank you for taking the time to check out my portfolio. I really hope you enjoy exploring it 
                    as much as I enjoyed building it. If you have any questions or comments, feel free to contact 
                    me using <Link to="/contact">this form</Link> or shoot me an email at{' '}
                    <a href="mailto:ismailqudsi2004@gmail.com">ismailqudsi2004@gmail.com</a>.
                </p>
            </div>
            <ResumeDownload />
            <div className="text-block">
                <h3>About Me</h3>
                <br />
                <p>
                    From a young age, I was fascinated by how complex software systems operate behind the scenes.
                    I am passionate about systems-minded, product-focused engineering. My technical background spans
                    across developing high-performance full-stack web apps, integrating AI-native capabilities 
                    (like RAG pipelines and Gemini API), and delivering robust backends and databases that scale.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={me} style={styles.image} alt="Me as a kid" />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 1:</b> Exploring computer systems at a young age
                        </sub>
                    </p>
                </div>

                <p>
                    Right now, I am seeking a software engineering internship or entry-level role where analytical 
                    problem solving and end-to-end ownership drive measurable impact. My tech stack includes 
                    TypeScript, Python, Java, Next.js, React, Node.js, Express, PostgreSQL, Supabase, and MongoDB.
                </p>
                <br />
                <p>
                    Recently, I built Mediflow Emerald Pro Max and ScappyV—systems engineered to resolve 
                    real-world inefficiencies using modern frontend paradigms and agentic backends. 
                    I thrive on the challenges of maintaining clean code, ensuring production stability, 
                    and creating highly responsive interfaces.
                </p>
                <br />
                <p>
                    When I'm not coding, I am experimenting with computer vision, deep diving into AI architectures, 
                    and learning new ways to push the boundaries of what web technologies can do.
                </p>
                <br />
            </div>

            <div className="text-block">
                <h3>Looking Forward</h3>
                <br />
                <div className="captioned-image">
                    <img src={meNow} style={styles.image} alt="Mohammed Ismail" />
                    <p style={styles.caption}>
                        <sub>
                            <b>Figure 2:</b> Me, 2026
                        </sub>
                    </p>
                </div>
                <p>
                    If you have any questions or comments I would love to hear them! You can reach me through the{' '}
                    <Link to="/contact">contact page</Link> or shoot me an email at{' '}
                    <a href="mailto:ismailqudsi2004@gmail.com">ismailqudsi2004@gmail.com</a>.
                </p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    contentHeader: {
        marginBottom: 16,
        fontSize: 48,
    },
    image: {
        height: 'auto',
        width: '100%',
    },
    topImage: {
        height: 'auto',
        width: '100%',
        marginBottom: 32,
    },
    verticalImage: {
        alignSelf: 'center',
        marginLeft: 32,
        flex: 0.8,
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
    },
    caption: {
        textAlign: 'center',
        marginTop: 8,
    }
};

export default About;
