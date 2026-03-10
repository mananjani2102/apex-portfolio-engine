export function validateEmail(email) {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  return regex.test(email);
}

export function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

export function validateRequired(value) {
  return value && value.toString().trim().length > 0;
}

export function validateMinLength(value, min) {
  return value && value.toString().trim().length >= min;
}

export function validateDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

export function validateDateRange(startDate, endDate) {
  if (!startDate || !endDate) return true;
  if (endDate === 'Present' || endDate === 'Current') return true;

  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end;
}

export function suggestEmailCorrection(email) {
  const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
  const parts = email.split('@');

  if (parts.length !== 2) return null;

  const [username, domain] = parts;
  const lowerDomain = domain.toLowerCase();

  const typoMap = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'outlok.com': 'outlook.com',
    'hotmial.com': 'hotmail.com'
  };

  if (typoMap[lowerDomain]) {
    return `${username}@${typoMap[lowerDomain]}`;
  }

  return null;
}

export function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phone;
}

export function calculateDuration(startDate, endDate) {
  if (!startDate) return '';

  const start = new Date(startDate);
  const end = endDate === 'Present' || endDate === 'Current' ? new Date() : new Date(endDate);

  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  }
}
