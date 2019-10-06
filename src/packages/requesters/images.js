const TIMEOUT = 1000;
const images = [
  {
    id: '9cf51b31-147b-43cc-8ba1-33275a48b829',
    group: 'Group1',
    name: 'Name1',
    version: '0.1.0',
  },
  {
    id: 'c167d707-85de-4d1e-b313-2f21306f956d',
    group: 'Group2',
    name: 'Name2',
    version: '0.1.0',
  },
  {
    id: '6b114324-726e-4497-a276-221cd94caf6b',
    group: 'Group3',
    name: 'Name3',
    version: '0.1.0',
  },
];

export const requestImages = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve(images), TIMEOUT);
});
