import { HttpService } from '@nestjs/axios';

export const mockServiceGet = (
  service: HttpService,
  { mockData = {}, isError = false },
): void => {
  const toPromise = isError
    ? jest.fn().mockRejectedValueOnce(mockData)
    : jest.fn().mockResolvedValueOnce(mockData);

  service.get = jest.fn().mockReturnValueOnce({ toPromise });
};
