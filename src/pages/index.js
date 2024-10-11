import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';  // Custom CSS file

export function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.homepageHeader)}>
      <div className={clsx("container", styles.headerContainer)}>
        <img
          src="/img/2020-Profile.jpg"  // Path to the image
          alt="profile"
          className={clsx(styles.profileImage)}  // Using custom styles
        />
        <h1 className={clsx(styles.headerTitle)}>{siteConfig.title}</h1>
        <p className={clsx(styles.headerTagline)}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`@Djongov`}
      description="This is the dev blog of @Djongov, where you can find PHP, Javascript, Powershell, Terraform and much more code snippets and info as well as blogs about implementations.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
