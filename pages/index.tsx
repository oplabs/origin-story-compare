import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { PageTitle } from "../components/PageTitle";
import { PageDescription } from "../components/PageDescription";
import { ProjectSelector } from "../components/ProjectSelector";

const Index: NextPage = () => (
  <Layout>
    <Seo
      title="Compare Top NFT Projects | Data by Origin Protocol"
      description="See how your favourite collection is doing and make informed buying decisions with side-by-side project data"
    />
    <PageHeader>
      <PageTitle>Compare Top NFT Projects</PageTitle>
      <PageDescription>
        See how your favourite collection is doing and make informed buying
        decisions with side-by-side project data
      </PageDescription>
    </PageHeader>
    <div className="mt-8">
      <ProjectSelector />
    </div>
  </Layout>
);

export default Index;
