import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export function CvContent() {
    return (
        // ok centered div for the cv content
        <div className="container">
            <h1 className="">CV</h1>
            <p className="">Coming soon</p>
        </div>
    );
}

export default function Cv() {
    const {siteConfig} = useDocusaurusContext();
    return (
      <Layout
        title={`CV`}
        description="This is my comprehensive CV (Dimtiar Djongov).">
        <main>
          <CvContent />
        </main>
      </Layout>
    );
  }