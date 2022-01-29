import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Fade from 'react-reveal/Fade';
import Github from '../../widgets/Icons/Github';

function ProjectSection({ project }) {
  const {
    title,
    desc,
    companySite,
    gitLink,
  } = project;

  const openLink = (link) => {
    window.open(
      link,
      '_blank' // <- This is what makes it open in a new window.
    );
  }
  return (
    <div className="project-section my_6">
      <Fade>
        <div className="project-text flex column justifyCenter">
          <div className="project-title subtitle mb_1">
            {title}
          </div>
          <div className="project-bullets">
          </div>
          <div className="body">
            {desc}
          </div>
        </div>
      </Fade>
      <Fade delay={500}>
        <div className="mock-website-container">
          <div className="mock-website-topbar flex alignItemsCenter">
            <div className="mock-website-circle" />
            <div className="mock-website-circle" />
            <div className="mock-website-circle" />
          </div>
          <div className="mock-website-page flex justifyCenter alignItemsCenter column">
            <div className="mock-website-content flex justifyCenter alignItemsCenter column">
              <img className="project-logo" src={`resources/${project.img}`} />
              <div className="button-container">
                <button onClick={() => openLink(companySite)} className="mock-website-button mini">Visit Site
                  <div className="mock-website-button-hover" /></button>
              </div>
              {gitLink &&
                <div className="button-container">
                  <button onClick={() => openLink(gitLink)} className="mock-website-button mini">Github
                    <Github className="gitIconSite" />
                    <div className="mock-website-button-hover" /></button>
                </div>
              }
            </div>
          </div>
        </div>
      </Fade>
    </div>
  )
}

ProjectSection.propType = {
  project: PropTypes.object.isRequired
}
function Projects({ id }) {
  const projects2 = [
    {
      title: 'Enzuzo — Data Privacy Start-up',
      desc: 'For the last four months, I worked as a web developer for Enzuzo, helping to design and implement a new onboarding experience & a new dashboard.\n\nBeing a start-up, I also became the resident graphic designer.', img: 'enzuzo.svg',
      companySite: 'https://app.enzuzo.com/onboarding'
    },
    {
      title: 'Fashion for Change',
      desc: 'In this non-profit organization, I took on the task of implementing the redesign of their website. (Work in progress!) \n\nFor the new site, I designed the architecture, implemented every page, and properly documented everything so future students can make easy updates.', img: 'fc.svg',
      companySite: 'https://fc-site-main.herokuapp.com',
      gitLink: 'https://github.com/annxiesun/fc-site'
    }, ,
  ];

  return (
    <div id={id} className="section">
      <div className="projects-container section-container">
        <div className="h3 bold mb_3">My Work</div>
        <div className="content-container">
          <div className="timeline">
            <div className="small-circle" />
            <div className="line" />
            <div className="small-circle" />
            <div className="line" />
            <div className="small-circle" />
          </div>
          <div className="project-card-container">
            {projects2.map((project) => (
              <ProjectSection key={project} project={project} />
            ))}
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}

Projects.propTypes = {
  id: PropTypes.string.isRequired
}

export default Projects;