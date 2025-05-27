import React from 'react';

interface Props {
   competitionDate: string;
   competitionName: string;
   competitionResult: string;
   competitionLink: string;
}

export default class CompetitionRow extends React.Component<Props> {
   constructor(props: Props) {
      super(props);
   }

   render() {
      return (
         <tr>
            <td data-label="Date">{this.props.competitionDate}</td>
            <td data-label="Competition">{this.props.competitionName}</td>
            <td data-label="Result">{this.props.competitionResult}</td>
            <td data-label="Link">
               <a href={this.props.competitionLink}>link</a>
            </td>
         </tr>
      );
   }
}
