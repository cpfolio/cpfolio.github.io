import React from 'react';

import Navbar from '@src/components/Navbar';
import UserTitle from '@components/UserTitle';
import Competitions from '@components/boxes/Competitions';
import Graph from '@components/boxes/Graph';

import { InputRatingData } from '@shared/types';

interface AppState {
   name: string;
   surname: string;
   username: string;
   profession: string;
   professionLevel: string;
   cp_handles: InputRatingData[];
   email: string;
   isLoggedIn: boolean;
}

export default class App extends React.Component<{}, AppState> {
   constructor(props: any) {
      super(props);
      this.state = {
         name: 'Pasquale',
         surname: 'Bianco',
         username: 'whiitex',
         profession: 'Software Engineer',
         professionLevel: 'Senior Level',
         cp_handles: [
            {
               platform: 'CODEFORCES',
               handle: 'whiitex',
            },
            {
               platform: 'LEETCODE',
               handle: 'whiitex',
            },
            {
               platform: 'ATCODER',
               handle: 'whiitex',
            },
            {
               platform: 'CODECHEF',
               handle: 'whiitex',
            },
         ],
         email: '',
         isLoggedIn: false,
      };
   }

   //  useeffect(() => {

   //  }, []);

   render() {
      return (
         <>
            <Navbar />

            <main className="p-0 m-0 mt-2">
               <UserTitle
                  name={this.state.name}
                  surname={this.state.surname}
                  username={this.state.username}
                  profession={this.state.profession}
                  professionLevel={this.state.professionLevel}
               />
            </main>

            <section className="double-container p-0 mt-4">
               <Competitions />
               <Graph cp_handles={this.state.cp_handles} />
            </section>

            <hr className="mt-5" />
            <footer className="text-center py-3">
               <p className="m-0">&copy; 2025 Pasquale Bianco - whiitex</p>
            </footer>
         </>
      );
   }
}
