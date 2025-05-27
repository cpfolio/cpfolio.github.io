import React from 'react';

interface UserTitleProps {
   name: string;
   surname: string;
   username: string;
   profession: string;
   professionLevel: string;
}

export default class UserTitle extends React.Component<UserTitleProps> {
   constructor(props: UserTitleProps) {
      super(props);
   }

   render(): React.ReactNode {
      return (
         <section
            className="user-info m-0"
            aria-label="user Info"
         >
            <h1 className="user-name m-0">
               {this.props.name} {this.props.surname} -{' '}
               <span id="alias"> {this.props.username}</span>
            </h1>
            <h2 className="user-title m-0">{this.props.profession}</h2>
            <h2 className="user-level m-0">{this.props.professionLevel}</h2>
         </section>
      );
   }
}
