import * as pdfjsLib from 'pdfjs-dist';
import { nanoid } from 'nanoid';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function parseResumePDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }

    const extractedData = extractStructuredData(fullText);

    return {
      rawText: fullText,
      confidence: calculateConfidence(extractedData),
      ...extractedData
    };
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF. Please ensure it is not password-protected.');
  }
}

function extractStructuredData(text) {
  const data = {
    personalInfo: extractPersonalInfo(text),
    experience: extractExperience(text),
    education: extractEducation(text),
    skills: extractSkills(text),
    projects: extractProjects(text)
  };

  return data;
}

function extractPersonalInfo(text) {
  const info = {};

  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) info.email = emailMatch[0];

  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) info.phone = phoneMatch[0];

  const linkedinRegex = /linkedin\.com\/in\/([a-zA-Z0-9-]+)/;
  const linkedinMatch = text.match(linkedinRegex);
  if (linkedinMatch) info.linkedin = `https://linkedin.com/in/${linkedinMatch[1]}`;

  const githubRegex = /github\.com\/([a-zA-Z0-9-]+)/;
  const githubMatch = text.match(githubRegex);
  if (githubMatch) info.github = `https://github.com/${githubMatch[1]}`;

  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length > 0) {
    info.name = lines[0].trim();
  }

  const locationRegex = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,\s*[A-Z]{2}|[A-Z][a-z]+,\s*[A-Z][a-z]+)/;
  const locationMatch = text.match(locationRegex);
  if (locationMatch) info.location = locationMatch[0];

  return info;
}

function extractExperience(text) {
  const experiences = [];
  const sections = findSection(text, ['experience', 'work history', 'employment', 'professional experience']);

  if (!sections) return experiences;

  const jobTitlePatterns = [
    /(?:^|\n)((?:Senior|Junior|Lead|Principal|Staff|Software|Frontend|Backend|Full[- ]?Stack|Data|Product|Project|Marketing|Sales|Customer Success|DevOps|QA|UX|UI)\s+(?:Engineer|Developer|Designer|Manager|Analyst|Architect|Specialist|Consultant|Coordinator|Director|VP|Chief)[^\n]*)/gi
  ];

  let matches = [];
  jobTitlePatterns.forEach(pattern => {
    const found = [...sections.matchAll(pattern)];
    matches = matches.concat(found);
  });

  matches.forEach(match => {
    const titleLine = match[1].trim();
    const experience = {
      id: nanoid(),
      title: titleLine.split('|')[0].trim(),
      company: extractCompanyName(titleLine),
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      technologies: []
    };

    const datePattern = /(\d{1,2}\/\d{4}|\w+\s+\d{4})\s*[-–—]\s*(\d{1,2}\/\d{4}|\w+\s+\d{4}|Present|Current)/i;
    const dateMatch = titleLine.match(datePattern);
    if (dateMatch) {
      experience.startDate = dateMatch[1];
      experience.endDate = dateMatch[2];
      experience.current = /present|current/i.test(dateMatch[2]);
    }

    experiences.push(experience);
  });

  return experiences;
}

function extractEducation(text) {
  const education = [];
  const sections = findSection(text, ['education', 'academic', 'qualifications']);

  if (!sections) return education;

  const degreePattern = /(Bachelor|Master|PhD|Associate|B\.S\.|M\.S\.|B\.A\.|M\.A\.|MBA)[^\n]*/gi;
  const matches = [...sections.matchAll(degreePattern)];

  matches.forEach(match => {
    const degreeLine = match[0].trim();
    const yearPattern = /\b(19|20)\d{2}\b/;
    const yearMatch = degreeLine.match(yearPattern);

    education.push({
      id: nanoid(),
      institution: extractInstitution(degreeLine),
      degree: degreeLine.split(',')[0].trim(),
      field: '',
      graduationYear: yearMatch ? yearMatch[0] : '',
      gpa: extractGPA(degreeLine),
      honors: extractHonors(degreeLine)
    });
  });

  return education;
}

function extractSkills(text) {
  const skills = [];
  const sections = findSection(text, ['skills', 'technical skills', 'expertise', 'technologies']);

  if (!sections) return skills;

  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Angular', 'Vue', 'Node.js',
    'TypeScript', 'HTML', 'CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Azure',
    'Docker', 'Kubernetes', 'Git', 'Agile', 'Scrum', 'Figma', 'Photoshop',
    'Excel', 'Tableau', 'Power BI', 'Machine Learning', 'TensorFlow', 'PyTorch'
  ];

  const skillsText = sections.toLowerCase();
  commonSkills.forEach(skill => {
    if (skillsText.includes(skill.toLowerCase())) {
      skills.push({
        name: skill,
        proficiency: 'intermediate',
        years: 0,
        category: 'technical'
      });
    }
  });

  return skills;
}

function extractProjects(text) {
  const projects = [];
  const sections = findSection(text, ['projects', 'portfolio', 'work samples']);

  if (!sections) return projects;

  const projectPattern = /(?:^|\n)([A-Z][^\n]{10,80})(?:\n|$)/g;
  const matches = [...sections.matchAll(projectPattern)];

  matches.slice(0, 3).forEach(match => {
    projects.push({
      id: nanoid(),
      title: match[1].trim(),
      type: 'personal',
      description: '',
      role: '',
      technologies: [],
      duration: '',
      url: '',
      github: '',
      images: [],
      achievements: [],
      metrics: []
    });
  });

  return projects;
}

function findSection(text, keywords) {
  const lowerText = text.toLowerCase();

  for (const keyword of keywords) {
    const index = lowerText.indexOf(keyword);
    if (index !== -1) {
      const nextSectionIndex = findNextSection(lowerText, index + keyword.length);
      return text.substring(index, nextSectionIndex);
    }
  }

  return null;
}

function findNextSection(text, startIndex) {
  const sectionHeaders = ['experience', 'education', 'skills', 'projects', 'certifications', 'awards', 'references'];
  let minIndex = text.length;

  sectionHeaders.forEach(header => {
    const index = text.indexOf(header, startIndex + 10);
    if (index !== -1 && index < minIndex) {
      minIndex = index;
    }
  });

  return minIndex;
}

function extractCompanyName(line) {
  const parts = line.split(/[|@,]/);
  if (parts.length > 1) {
    return parts[1].trim();
  }
  return '';
}

function extractInstitution(line) {
  const parts = line.split(',');
  if (parts.length > 1) {
    return parts[1].trim();
  }
  return '';
}

function extractGPA(text) {
  const gpaPattern = /GPA:?\s*(\d\.\d{1,2})/i;
  const match = text.match(gpaPattern);
  return match ? match[1] : '';
}

function extractHonors(text) {
  const honorsPattern = /(Summa Cum Laude|Magna Cum Laude|Cum Laude|Dean's List|Honors)/i;
  const match = text.match(honorsPattern);
  return match ? match[1] : '';
}

function calculateConfidence(data) {
  let score = 0;
  let total = 0;

  if (data.personalInfo.email) { score += 1; total += 1; } else { total += 1; }
  if (data.personalInfo.name) { score += 1; total += 1; } else { total += 1; }
  if (data.experience.length > 0) { score += 2; total += 2; } else { total += 2; }
  if (data.education.length > 0) { score += 1; total += 1; } else { total += 1; }
  if (data.skills.length > 0) { score += 1; total += 1; } else { total += 1; }

  return total > 0 ? score / total : 0;
}
