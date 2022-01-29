import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import Github from '../../widgets/Icons/Github';
import Star from '../../widgets/Icons/Star';
import Fade from 'react-reveal/Fade';
import { Popover } from 'react-tiny-popover';

function InfoSection({ project }) {
  const {
    title,
    desc,
    win,
    link,
    points,
    tools,
    i,
    hackathon
  } = project;

  const [winnerHover, setWinnerHover] = useState(false);

  return (
    <Fade exit >
      <div className={styles.boundingBox}>
        <div className={`${styles.projectSection}`}>
          <div className={styles.contentBox}>
            <div className={`container ${styles.titleBox} mb_1`}>
              <div className="container">
                <div className="h3 mr_2">{title}</div>
                {win &&
                  <Popover
                    isOpen={true}
                    positions={['right']} // preferred positions by priority
                    content={
                      <Fade when={winnerHover} duration={300} distance="10px" left>
                        <div className="container alignItemsCenter row">
                          <div className={`${styles.triangle} ml_1`} />
                          <div className={styles.popover}>
                            {hackathon}
                          </div>
                        </div>
                      </Fade>
                    }
                  >
                    <div
                      className={`container alignItemsCenter ${styles.winner}`}
                      onMouseEnter={() => setWinnerHover(true)}
                      onMouseLeave={() => setWinnerHover(false)}
                    >
                      <Star />
                      <div className={`${styles.winnerText}`}>Winner</div>
                    </div>
                  </Popover>
                }
              </div>
              <a className={styles.icon} href={link} target="_blank"><Github /></a>
            </div>
            <div className="body">{desc}</div>
            <ul>
              {points.map((point) => (
                <li className={`${styles.point} body`}>{point}</li>
              ))}
            </ul>
          </div>
          <div className={styles.chipContainer}>
            {tools.map((tool) => (
              <div className={`${styles.toolChip} mini`}>{tool}</div>
            ))}
          </div>
        </div>
      </div>
    </Fade >
  )
}
AboutMe.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  parity: PropTypes.bool.isRequired,
  animation: PropTypes.object.isRequired,
}


function AboutMe({ id }) {
  const content = [
    {
      title: 'Coda',
      desc: 'Quick-add songs to your spotify playlist',
      win: false,
      link: 'https://github.com/annxiesun/coda',
      points: [
        'Implemented an infinite add to queue system that avoids duplicates',
        'Designed endpoints that interacted with SpotifyAPI and integrated them with client-side functions',
      ],
      tools: [
        'React',
        'Next.js',
        'Typescript',
      ]
    },
    {
      title: 'Ingrid',
      desc: 'A heat-map visualizer for Educational Apps',
      win: true,
      hackathon: '3rd @ ULHacks',
      link: 'https://github.com/ul-hacks',
      points: [
        'Designed the UI and created mockups using Figma',
        'Implemented the front-end',
        'Created login and sign-in pages with error checking'
      ],
      tools: [
        'React',
        'MaterialUI',
        'JavaScript',
        'GraphQL'
      ]
    },
    {
      title: 'Inclusify',
      desc: 'An app that detects non-inclusive language and suggests alternative words',
      win: true,
      hackathon: 'Inclusivity Winner @ PearlHacks',
      link: 'https://github.com/annxiesun/inclusify',
      points: [
        'Implemented a Grammarly-like UI that checks inputted text and suggests changes',
        'Created branding & graphics for project'
      ],
      tools: [
        'React',
        'JavaScript'
      ]
    },
    {
      title: 'FeatherFinder',
      desc: 'An quiz that tells you what kind of bird you are!',
      win: false,
      link: 'https://github.com/annxiesun/birdquiz',
      points: [
        'Designed and implemented quiz UI',
        'Elevated quiz by adding animations and interactivity',
        'Created 8 custom tarot-card inspired illustrations for quiz results'
      ],
      tools: [
        'React',
        'JavaScript'
      ]
    },
  ];
  return (
    <div id={id} className="section">
      <div className="section-container">
        <div className="h3 bold">My Projects</div>
        <div className={styles.projectContainer}>
          {content.map((project, i) => (
            <InfoSection i={i} key={project.title} project={project} />
          ))}
        </div>
        <br />
      </div>
    </div>
  );
}

AboutMe.propTypes = {
  id: PropTypes.string.isRequired
}

export default AboutMe;