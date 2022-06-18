import React from 'react'

function about() {
    return (
        <div className="about container text-center">
            <h1>About Us</h1>
            <div className="row margint">
                <div className="col-md-4">
                    <h3>Pratyush Tiwari</h3>
                    <h5>React Developer</h5>
                    <p>
                        Web developer, gamer and a movie enthusiast. A critic by nature with a skill set in front end and back end programming for web based platforms. Almost watched every movie, tv show and series ever(keyword: "almost"). Always in search of new horizons.
                    </p>
                </div>
                <div className="col-md-4">
                    <h3>Mohammad Amaan Sheikh</h3>
                    <h5>Front-End Developer</h5>
                    <p>
                        Determined Front-End Developer familiar with wide range of programming utilities and languages. Passion for responsive website design and a firm believer in the mobile-first approach. Constant learner of new technologies and enhancements.
                    </p>
                </div>
                <div className="col-md-4">
                    <h3>Priyanshu Singh</h3>
                    <h5>Web Developer</h5>
                    <p>
                        Prolific Web Developer with a passion for metrics and beating former "best-yets." Prototyped 25 new product features per year for Flexor, Inc. Consistently receive high user experience scores for all web development projects.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default about