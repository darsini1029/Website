#!/usr/bin/env node

// Enhanced Update Script for CSE Website
// Adds learning references and enhanced animations to all pages

const fs = require('fs');
const path = require('path');

const PAGES_DIR = './pages';
const BASE_DIR = './';

// Learning resources for each section
const learningResources = {
    'backend': [
        { icon: '🚀', name: 'Node.js', url: 'https://nodejs.org/' },
        { icon: '🐍', name: 'Django', url: 'https://www.djangoproject.com/' },
        { icon: '🌶️', name: 'Flask', url: 'https://flask.palletsprojects.com/' },
        { icon: '☕', name: 'Spring Boot', url: 'https://spring.io/projects/spring-boot' },
        { icon: '📡', name: 'Express.js', url: 'https://expressjs.com/' },
        { icon: '🔥', name: 'FastAPI', url: 'https://fastapi.tiangolo.com/' },
        { icon: '📊', name: 'Postman', url: 'https://www.postman.com/' },
        { icon: '🔧', name: 'Swagger', url: 'https://swagger.io/' }
    ],
    'database': [
        { icon: '🐘', name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
        { icon: '🐬', name: 'MySQL', url: 'https://www.mysql.com/' },
        { icon: '🍃', name: 'MongoDB', url: 'https://www.mongodb.com/' },
        { icon: '⚡', name: 'Redis', url: 'https://redis.io/' },
        { icon: '🔥', name: 'Firebase', url: 'https://firebase.google.com/' },
        { icon: '🌐', name: 'SQL Tutorial', url: 'https://www.w3schools.com/sql/' },
        { icon: '📊', name: 'DB Design', url: 'https://www.lucidchart.com/pages/database-diagram' },
        { icon: '🎯', name: 'SQLBolt', url: 'https://sqlbolt.com/' }
    ],
    'devops': [
        { icon: '🐳', name: 'Docker', url: 'https://www.docker.com/' },
        { icon: '☸️', name: 'Kubernetes', url: 'https://kubernetes.io/' },
        { icon: '🔧', name: 'Jenkins', url: 'https://www.jenkins.io/' },
        { icon: '☁️', name: 'AWS', url: 'https://aws.amazon.com/' },
        { icon: '🌐', name: 'Azure', url: 'https://azure.microsoft.com/' },
        { icon: '🔥', name: 'Terraform', url: 'https://www.terraform.io/' },
        { icon: '📊', name: 'Grafana', url: 'https://grafana.com/' },
        { icon: '🚀', name: 'GitLab CI', url: 'https://docs.gitlab.com/ee/ci/' }
    ],
    'mobile': [
        { icon: '⚛️', name: 'React Native', url: 'https://reactnative.dev/' },
        { icon: '🎯', name: 'Flutter', url: 'https://flutter.dev/' },
        { icon: '🍎', name: 'Swift', url: 'https://swift.org/' },
        { icon: '🤖', name: 'Kotlin', url: 'https://kotlinlang.org/' },
        { icon: '📱', name: 'Expo', url: 'https://expo.dev/' },
        { icon: '🔥', name: 'Ionic', url: 'https://ionicframework.com/' },
        { icon: '🎨', name: 'Figma', url: 'https://www.figma.com/' },
        { icon: '📊', name: 'App Store', url: 'https://developer.apple.com/' }
    ],
    'web-development': [
        { icon: '📚', name: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
        { icon: '🌐', name: 'W3Schools', url: 'https://www.w3schools.com/' },
        { icon: '🔥', name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/' },
        { icon: '📊', name: 'Can I Use', url: 'https://caniuse.com/' },
        { icon: '⚡', name: 'Web.dev', url: 'https://web.dev/' },
        { icon: '🎨', name: 'Dribbble', url: 'https://dribbble.com/' },
        { icon: '🚀', name: 'Netlify', url: 'https://www.netlify.com/' },
        { icon: '🔧', name: 'Vercel', url: 'https://vercel.com/' }
    ]
};

// Animation classes for cards
const animationClasses = [
    'slide-in-left magnetic',
    'scale-in magnetic',
    'slide-in-right magnetic',
    'flip-in magnetic',
    'bounce-in magnetic',
    'slide-in-left magnetic',
    'scale-in magnetic',
    'slide-in-right magnetic'
];

// Fix empty href attributes
function fixEmptyHrefs(content, pageType) {
    // Define proper URLs for different page types
    const pageUrls = {
        'ai': {
            'Machine Learning →': 'https://www.tensorflow.org/',
            'Deep Learning →': 'https://pytorch.org/',
            'Natural Language →': 'https://huggingface.co/',
            'Computer Vision →': 'https://opencv.org/',
            'Reinforcement Learning →': 'https://stable-baselines3.readthedocs.io/',
            'MLOps →': 'https://mlflow.org/',
            'AI Ethics →': 'https://www.partnershiponai.org/',
            'Robotics →': 'https://www.ros.org/'
        },
        'programming': {
            'Learn Python →': 'https://www.python.org/',
            'Master JavaScript →': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
            'Build with Java →': 'https://www.oracle.com/java/',
            'Code in C++ →': 'https://isocpp.org/',
            'Develop with C# →': 'https://dotnet.microsoft.com/',
            'Go Fast →': 'https://golang.org/',
            'Rust Systems →': 'https://www.rust-lang.org/',
            'Swift Development →': 'https://swift.org/'
        },
        'frontend': {
            'Build with React →': 'https://reactjs.org/',
            'Create with Vue →': 'https://vuejs.org/',
            'Develop with Angular →': 'https://angular.io/',
            'Try Svelte →': 'https://svelte.dev/',
            'Style with CSS →': 'https://developer.mozilla.org/en-US/docs/Web/CSS',
            'Build Tools →': 'https://vitejs.dev/',
            'Test Components →': 'https://testing-library.com/',
            'Optimize Performance →': 'https://web.dev/performance/'
        },
        'database': {
            'Learn PostgreSQL →': 'https://www.postgresql.org/',
            'Master MySQL →': 'https://www.mysql.com/',
            'Explore MongoDB →': 'https://www.mongodb.com/',
            'Cache with Redis →': 'https://redis.io/',
            'Build with Firebase →': 'https://firebase.google.com/',
            'Search with Elasticsearch →': 'https://www.elastic.co/',
            'Scale with Cassandra →': 'https://cassandra.apache.org/',
            'Graph with Neo4j →': 'https://neo4j.com/'
        },
        'devops': {
            'Automate CI/CD →': 'https://www.jenkins.io/',
            'Containerize Apps →': 'https://www.docker.com/',
            'Orchestrate Containers →': 'https://kubernetes.io/',
            'Code Infrastructure →': 'https://www.terraform.io/',
            'Monitor Systems →': 'https://grafana.com/',
            'Manage Config →': 'https://www.ansible.com/',
            'Collaborate Effectively →': 'https://github.com/',
            'Secure Deployments →': 'https://owasp.org/'
        },
        'mobile': {
            'Build with React Native →': 'https://reactnative.dev/',
            'Develop with Flutter →': 'https://flutter.dev/',
            'Build for iOS →': 'https://developer.apple.com/',
            'Build for Android →': 'https://developer.android.com/',
            'Create PWAs →': 'https://web.dev/progressive-web-apps/',
            'Develop with Xamarin →': 'https://dotnet.microsoft.com/apps/xamarin',
            'Build with Ionic →': 'https://ionicframework.com/',
            'Develop with Cordova →': 'https://cordova.apache.org/'
        }
    };

    // Fix card links
    const cardUrls = pageUrls[pageType] || {};
    Object.entries(cardUrls).forEach(([text, url]) => {
        const pattern = new RegExp(`<a href="#" class="card-link">${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</a>`, 'g');
        content = content.replace(pattern, `<a href="${url}" target="_blank" class="card-link">${text}</a>`);
    });

    // Fix social media links
    content = content.replace(/href="#" aria-label="GitHub"/g, 'href="https://github.com" target="_blank" aria-label="GitHub"');
    content = content.replace(/href="#" aria-label="LinkedIn"/g, 'href="https://linkedin.com" target="_blank" aria-label="LinkedIn"');
    content = content.replace(/href="#" aria-label="Twitter"/g, 'href="https://twitter.com" target="_blank" aria-label="Twitter"');
    content = content.replace(/href="#" aria-label="YouTube"/g, 'href="https://youtube.com" target="_blank" aria-label="YouTube"');

    return content;
}

function updatePageAnimationsAndReferences(filePath, pageType) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Fix empty href attributes first
        content = fixEmptyHrefs(content, pageType);
        
        // Add parallax background and floating icons
        const enhancedBg = `    <!-- Animated Background -->
    <div class="animated-bg">
        <div class="parallax-bg"></div>
        <div class="floating-shapes">
            <div class="shape"></div>
            <div class="shape"></div>
            <div class="shape"></div>
            <div class="shape"></div>
        </div>
        <div class="floating-icons">
            <div class="floating-icon" style="top: 20%; left: 10%; animation-delay: 0s;">${getPageIcon(pageType)}</div>
            <div class="floating-icon" style="top: 60%; right: 15%; animation-delay: 1s;">⚡</div>
            <div class="floating-icon" style="top: 80%; left: 20%; animation-delay: 2s;">💡</div>
            <div class="floating-icon" style="top: 30%; right: 30%; animation-delay: 3s;">🚀</div>
            <div class="floating-icon" style="top: 70%; left: 60%; animation-delay: 4s;">✨</div>
        </div>
    </div>`;

        // Replace simple animated background with enhanced version
        content = content.replace(
            /<!-- Animated Background -->[\s\S]*?<\/div>\s*<\/div>/,
            enhancedBg
        );

        // Update card animations
        let cardIndex = 0;
        content = content.replace(
            /<div class="card fade-in">/g,
            () => `<div class="card ${animationClasses[cardIndex++ % animationClasses.length]}">`
        );

        // Add learning references section before footer if not already present
        if (!content.includes('learning-references')) {
            const resources = learningResources[pageType] || learningResources['web-development'];
            const referencesSection = generateLearningReferencesSection(pageType, resources);
            
            // Find the last cards section and add references
            const lastCardsSectionEnd = content.lastIndexOf('</div>\n        </section>');
            if (lastCardsSectionEnd !== -1) {
                const insertPosition = lastCardsSectionEnd + '</div>\n        </section>'.length;
                content = content.slice(0, insertPosition) + 
                         '\n\n' + referencesSection + 
                         content.slice(insertPosition);
            }
        }

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated ${path.basename(filePath)} with enhanced animations and learning references`);
        
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

function getPageIcon(pageType) {
    const icons = {
        'backend': '⚙️',
        'database': '🗄️',
        'devops': '🚀',
        'mobile': '📱',
        'web-development': '🌐'
    };
    return icons[pageType] || '💻';
}

function generateLearningReferencesSection(pageType, resources) {
    const sectionTitle = getSectionTitle(pageType);
    
    const linksHtml = resources.map(resource => 
        `                    <a href="${resource.url}" target="_blank" class="reference-link">
                        <span>${resource.icon}</span>
                        <span>${resource.name}</span>
                    </a>`
    ).join('\n');

    return `            <!-- Learning References Section -->
            <div class="learning-references fade-in">
                <h3>🎓 ${sectionTitle} Learning Resources</h3>
                <div class="reference-links">
${linksHtml}
                </div>
            </div>`;
}

function getSectionTitle(pageType) {
    const titles = {
        'backend': 'Backend Development',
        'database': 'Database Systems',
        'devops': 'DevOps & Cloud',
        'mobile': 'Mobile Development',
        'web-development': 'Web Development'
    };
    return titles[pageType] || 'Web Development';
}

// Main execution
function main() {
    console.log('🚀 Starting enhanced website update...\n');

    const pagesToUpdate = [
        'backend.html',
        'database.html', 
        'devops.html',
        'mobile.html',
        'web-development.html'
    ];

    pagesToUpdate.forEach(pageFile => {
        const filePath = path.join(PAGES_DIR, pageFile);
        const pageType = pageFile.replace('.html', '');
        
        if (fs.existsSync(filePath)) {
            updatePageAnimationsAndReferences(filePath, pageType);
        } else {
            console.warn(`⚠️  File not found: ${filePath}`);
        }
    });

    console.log('\n✨ Website enhancement complete!');
    console.log('🎯 All pages now have:');
    console.log('   • Enhanced scroll animations (slide, scale, flip, bounce)');
    console.log('   • Magnetic card effects');
    console.log('   • Parallax backgrounds');
    console.log('   • Floating icons');
    console.log('   • Learning reference sections');
}

if (require.main === module) {
    main();
}

module.exports = {
    updatePageAnimationsAndReferences,
    learningResources
};
