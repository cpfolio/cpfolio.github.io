import { Platform } from '@shared/interfaces';
import { InputRatingData, RatingData } from '@shared/types';

const DataGetter = {
   CODEFORCES: function getCodeforcesData(handle: string): Promise<RatingData> {
      return fetch(`https://codeforces.com/api/user.rating?handle=${handle}`)
         .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
         })
         .then(data => {
            return {
               x: data.result.map(
                  (c: any) =>
                     new Date(c.ratingUpdateTimeSeconds * 1000)
                        .toISOString()
                        .split('T')[0] as string
               ),
               y: data.result.map((item: any) => Math.round(item.newRating as number)),
               platform: Platform.CODEFORCES,
            } as RatingData;
         });
   },

   LEETCODE: (handle: string): Promise<RatingData> => {
      const baseUrl =
         typeof window === 'undefined' || process.env.NODE_ENV === 'test'
            ? 'https://leetcode.com'
            : '/leetcode-api';
      return fetch(`${baseUrl}/graphql/`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            query: `
            query userContestRankingInfo($username: String!) {
               userContestRanking(username: $username) {
                  rating
               }
               userContestRankingHistory(username: $username) {
                  attended
                  rating
                  contest { title startTime } 
               }
            }  
         `,
            variables: { username: handle },
            operationName: 'userContestRankingInfo',
         }),
      })
         .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
         })
         .then(data => {
            const attended = data.data.userContestRankingHistory.filter(
               (contest: any) => contest.attended === true
            );
            return {
               x: attended.map(
                  (c: any) =>
                     new Date(c.contest.startTime * 1000).toISOString().split('T')[0] as string
               ),
               y: attended.map((c: any) => Math.round(c.rating as number)),
               platform: Platform.LEETCODE,
            } as RatingData;
         });
   },

   ATCODER: (handle: string): Promise<RatingData> => {
      const baseUrl =
         typeof window === 'undefined' || process.env.NODE_ENV === 'test'
            ? 'https://atcoder.jp'
            : '/atcoder-api';
      return fetch(`${baseUrl}/users/${handle}/history/json`, {
         method: 'GET',
      })
         .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
         })
         .then(data => {
            const rated = data.filter((contest: any) => contest.IsRated === true);
            return {
               x: rated.map((c: any) => c.EndTime.split('T')[0] as string),
               y: rated.map((c: any) => Math.round(c.NewRating as number)),
               platform: Platform.ATCODER,
            } as RatingData;
         });
   },

   CODECHEF: (handle: string): Promise<RatingData> => {
      return fetch(`https://codechef-api.vercel.app/handle/${handle}`)
         .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
         })
         .then(data => {
            return {
               x: data.ratingData.map((c: any) => c.end_date.split(' ')[0] as string),
               y: data.ratingData.map((c: any) => Math.round(c.rating as number)),
               platform: Platform.CODECHEF,
            } as RatingData;
         });
   },
} as const;

export default function getRatingsByPlatform(data: InputRatingData): Promise<any> {
   switch (data.platform.toUpperCase()) {
      case Platform.CODEFORCES: {
         return DataGetter.CODEFORCES(data.handle);
      }
      case Platform.LEETCODE: {
         return DataGetter.LEETCODE(data.handle);
      }
      case Platform.ATCODER: {
         return DataGetter.ATCODER(data.handle);
      }
      case Platform.CODECHEF: {
         return DataGetter.CODECHEF(data.handle);
      }
      default: {
         return Promise.reject(new Error('Platform not supported'));
      }
   }
}

// /**
//  * @format data:
//  * [
//  *   { platform: string, handle: string },
//  *   ...
//  * ]
//  */
// async function getRatingsData(
//    data: InputRatingData[]
// ): Promise<RatingData[]> {
//    const promises: Promise<RatingData>[] = data
//       .reduce((acc: InputRatingData[], curr: InputRatingData) => {
//          if (acc.find(item => item.platform === curr.platform)) {
//             return acc;
//          }
//          return [...acc, curr];
//       }, [])
//       .map((InputRatingData: InputRatingData) => {
//          return getRatingsByPlatform(InputRatingData);
//       });

//    return (await Promise.allSettled(promises))
//       .filter(result => result.status === 'fulfilled')
//       .map(result => (result as PromiseFulfilledResult<RatingData>).value);
// }
