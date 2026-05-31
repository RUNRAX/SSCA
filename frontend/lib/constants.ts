export const WEATHER_DATA = {
  city: 'San Francisco',
  temperature: 53,
  condition: 'Partly Cloudy',
  high: 56,
  low: 50,
  hourly: [
    { hour: '10 AM', temp: 53, icon: 'cloud' },
    { hour: '11 AM', temp: 54, icon: 'cloud-sun' },
    { hour: '12 PM', temp: 55, icon: 'sun' },
    { hour: '1 PM', temp: 56, icon: 'sun' },
    { hour: '2 PM', temp: 53, icon: 'cloud-sun' },
    { hour: '3 PM', temp: 54, icon: 'cloud' },
  ],
};

export const REMINDERS_DEFAULT = [
  { id: 'r1', text: 'Pick up contac...', checked: false },
  { id: 'r2', text: 'Order plant food', checked: false },
  { id: 'r3', text: 'Water Monstera', checked: false },
];

export const NOTIFICATION_DATA = [
  { name: 'Ray Pai...', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', time: 'Now', avatar: 'roy' },
  { name: 'Rose', text: 'Lorem ipsum dolor sit amet...', time: '12m ago', avatar: 'rose' },
];

export const LOCATION_DATA = {
  name: 'Sotto Mare',
  description: 'Lorem ipsum...',
  city: 'San Francisco',
  visits: 34,
  categories: { nature: 34, cities: 45 },
};

export const FILTER_ITEMS = [
  { icon: 'check', label: 'Messages', count: null },
  { icon: 'user-x', label: 'Unknown Senders', count: 2 },
  { icon: 'alert-triangle', label: 'Spam', count: null },
  { icon: 'trash-2', label: 'Recently Deleted', count: null },
];

export const PHONE_BUTTONS = ['Speaker', 'FaceTime', 'Mute', 'Keypad', 'More'];
