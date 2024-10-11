import React from 'react';
import styles from './styles.module.css'; // You can add custom styles here

const FeatureList = [
  {
    title: 'Azure Architecture',
    Svg: require('@site/static/img/azure/azure-icon.svg').default,
    description: (
      <>
        A seasoned veteran in Azure architecture, I have worked on numerous projects and have a deep understanding of the Azure ecosystem.
      </>
    ),
  },
  {
    title: 'AWS',
    Svg: require('@site/static/img/aws/aws-icon.svg').default,
    description: (
      <>
        Decent knowledge of AWS.
      </>
    ),
  }
];

function Feature({Svg, title, description}) {
  return (
    <div className={`card ${styles.featureCard} margin-vert--md padding--md`}>
      <div className="card__image">
        <Svg className={styles.featureSvg} alt={title} title={title} />
      </div>
      <div className="card__body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.featuresSection}>
      <div className="row">
        {FeatureList.map((props, idx) => (
          <div key={idx + 1} className="col col--4">
            <Feature {...props} />
          </div>
        ))}
      </div>
    </section>
  );
}
