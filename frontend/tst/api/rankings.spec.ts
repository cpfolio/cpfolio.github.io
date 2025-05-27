import getRatingsByPlatform from '@src/api/rankings';
import { Platform } from '@shared/interfaces';
import { InputRatingData, RatingData } from '@shared/types';

const leetcode: InputRatingData = {
   platform: Platform.LEETCODE,
   handle: 'whiitex',
};

const codeforces: InputRatingData = {
   platform: Platform.CODEFORCES,
   handle: 'whiitex',
};

const atcoder: InputRatingData = {
   platform: Platform.ATCODER,
   handle: 'whiitex',
};

const codechef: InputRatingData = {
   platform: Platform.CODECHEF,
   handle: 'whiitex',
};

const wrong: InputRatingData = {
   platform: 'wrongPlatform',
   handle: 'whiitex',
};

describe('getRatingsData', () => {
   it('should return correct LeetCode data', async () => {
      const result: RatingData = await getRatingsByPlatform(leetcode);

      expect(result.platform).toBe(Platform.LEETCODE);
      expect(result.x).toBeDefined();
      expect(result.y).toBeDefined();

      expect(result.x[0]).toBe('2025-01-18');
      expect(result.y[0]).toBe(1601);
      expect(result.x[1]).toBe('2025-02-15');
      expect(result.y[1]).toBe(1759);
      expect(result.x[2]).toBe('2025-03-01');
      expect(result.y[2]).toBe(1793);
   });

   it('should return correct Codeforces data', async () => {
      const result: RatingData = await getRatingsByPlatform(codeforces);

      expect(result.platform).toBe(Platform.CODEFORCES);
      expect(result.x).toBeDefined();
      expect(result.y).toBeDefined();

      expect(result.x[0]).toBe('2023-10-22');
      expect(result.y[0]).toBe(375);
      expect(result.x[1]).toBe('2023-10-28');
      expect(result.y[1]).toBe(725);
      expect(result.x[2]).toBe('2023-11-19');
      expect(result.y[2]).toBe(940);
   });

   it('should return correct AtCoder data', async () => {
      const result: RatingData = await getRatingsByPlatform(atcoder);

      expect(result.platform).toBe(Platform.ATCODER);
      expect(result.x).toBeDefined();
      expect(result.y).toBeDefined();

      expect(result.x[0]).toBe('2024-02-04');
      expect(result.y[0]).toBe(12);
      expect(result.x[1]).toBe('2025-04-12');
      expect(result.y[1]).toBe(299);
      expect(result.x[2]).toBe('2025-04-27');
      expect(result.y[2]).toBe(641);
   });

   it('should return correct CodeChef data', async () => {
      const result: RatingData = await getRatingsByPlatform(codechef);

      expect(result.platform).toBe(Platform.CODECHEF);
      expect(result.x).toBeDefined();
      expect(result.y).toBeDefined();

      expect(result.x[0]).toBe('2024-08-21');
      expect(result.y[0]).toBe(1737);
      expect(result.x[1]).toBe('2024-08-28');
      expect(result.y[1]).toBe(1988);
      expect(result.x[2]).toBe('2025-05-14');
      expect(result.y[2]).toBe(2098);
   });

   it('should return empty array for unsupported platform', async () => {
      await expect(getRatingsByPlatform(wrong)).rejects.toThrow('Platform not supported');
   });

   it('should ignore invalid platform', async () => {
      const data: InputRatingData[] = [codeforces, wrong];
      const promises = data.map(getRatingsByPlatform);
      const result: RatingData[] = await Promise.allSettled(promises).then(results =>
         results
            .filter(result => result.status === 'fulfilled')
            .map(result => (result as PromiseFulfilledResult<RatingData>).value)
      );

      expect(result).toHaveLength(1);
      expect(result[0].platform).toBe(Platform.CODEFORCES);
      expect(result[0].x).toBeDefined();
      expect(result[0].y).toBeDefined();

      expect(result[0].x[0]).toBe('2023-10-22');
      expect(result[0].y[0]).toBe(375);
      expect(result[0].x[1]).toBe('2023-10-28');
      expect(result[0].y[1]).toBe(725);
      expect(result[0].x[2]).toBe('2023-11-19');
      expect(result[0].y[2]).toBe(940);
   });
});
