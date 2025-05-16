import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDateToLocaleString(dateString: string): string {
  if (!dateString) {
    return '';
  }

  const [datePart, timePart] = dateString.split(' ');
  const [year, month, day] = datePart.split(':').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);
  let date = new Date(year, month - 1, day, hours, minutes, seconds);

  if (!date) {
    return '';
  }

  return formatDateForDisplay(date);
}

function formatDateForDisplay(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}
