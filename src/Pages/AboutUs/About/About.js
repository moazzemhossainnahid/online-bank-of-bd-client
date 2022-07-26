import React from 'react';
import PageTitle from '../../PageTitle/PageTitle';
import AboutBank from './AboutBank';
import AboutCounter from './AboutCounter';
import AboutTopSection from './AboutTopSection';
import Milestone from './Milestone';

const About = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            {/* title */}

            <PageTitle title="About"></PageTitle>

            {/* end */}


            <AboutTopSection />
            <AboutBank />
            <AboutCounter />
            <Milestone />
        </div>
    );
};

export default About;