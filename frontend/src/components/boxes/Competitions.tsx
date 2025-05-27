import React from 'react';
import CompetitionRow from './CompetitinoRow';

export default class Competitions extends React.Component {
   render() {
      return (
         <div className="box">
            <h3 className="text-center m-0">Competitions 👑</h3>
            <table>
               <thead>
                  <tr>
                     <th>Date</th>
                     <th>Competition</th>
                     <th>Result</th>
                     <th>Link</th>
                  </tr>
               </thead>
               <tbody>
                  <CompetitionRow
                     competitionName="Meta"
                     competitionDate="21-02-2001"
                     competitionLink="#"
                     competitionResult="1st place"
                  />
                  <CompetitionRow
                     competitionName="Meta"
                     competitionDate="21-02-2001"
                     competitionLink="#"
                     competitionResult="1st place"
                  />
                  <CompetitionRow
                     competitionName="Meta"
                     competitionDate="21-02-2001"
                     competitionLink="#"
                     competitionResult="1st place"
                  />
               </tbody>
            </table>
         </div>
      );
   }
}
