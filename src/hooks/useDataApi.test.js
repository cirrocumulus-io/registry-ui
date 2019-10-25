/* global test expect */

import { renderHook, act } from '@testing-library/react-hooks';
import { useDataApi } from './useDataApi';

const images = [
  {
    id: '9cf51b31-147b-43cc-8ba1-33275a48b829',
    group: 'Group1',
    name: 'Name1',
    version: '0.1.0',
  }, {
    id: 'c167d707-85de-4d1e-b313-2f21306f956d',
    group: 'Group2',
    name: 'Name2',
    version: '0.1.0',
  }, {
    id: '6b114324-726e-4497-a276-221cd94caf6b',
    group: 'Group3',
    name: 'Name3',
    version: '0.1.0',
  },
];

const requestImages = () => new Promise((resolve) => {
  setTimeout(() => resolve({ data: images }), 0);
});

test('should call api', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useDataApi(requestImages));
  expect(result.current.isLoading).toBeTruthy();
  expect(result.current.isError).toBeFalsy();
  expect(result.current.data).toBeNull();

  await waitForNextUpdate();

  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.isError).toBeFalsy();
  expect(result.current.data).toBeDefined();
  expect(result.current.data.length).toBe(images.length);
});
