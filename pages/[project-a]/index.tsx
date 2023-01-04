import type { NextPage, GetStaticProps } from "next";
import { Layout } from "../../components/Layout";
import { Seo } from "../../components/Seo";
import { PageHeader } from "../../components/PageHeader";
import { PageTitle } from "../../components/PageTitle";
import { ProjectSelector } from "../../components/ProjectSelector";
import { projects } from "../../lib/projects";
import { ProjectComparison } from "../../components/ProjectComparison";
import { useProjectData } from "../../hooks/useProjectData";

export const getStaticPaths = async () => {
  const paths = projects.map((project) => ({
    params: { "project-a": project.address },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      projectA: projects.find(
        (project) => project.address === params?.["project-a"]
      ),
    },
  };
};

type Project = {
  name: string;
  address: string;
};
interface IndexProps {
  projectA: Project;
}

const Index: NextPage<IndexProps> = ({ projectA = {} }) => {
  const { projectData: projectAData, loading: projectALoading } =
    useProjectData(projectA?.address);

  return (
    <Layout>
      <Seo
        title={`Comparing ${projectA?.name} with... | Data by Origin Protocol`}
        description={`See how your ${projectA?.name} is doing and make informed buying decisions with side-by-side project data`}
      />
      <PageHeader>
        <PageTitle>Comparing {projectA?.name} with...</PageTitle>
      </PageHeader>
      <div className="mt-8">
        <ProjectSelector projectAValue={projectA?.name} />
      </div>
      <div className="mt-8">
        <ProjectComparison
          projectAData={projectAData}
          projectALoading={projectALoading}
          projectAName={projectA?.name}
        />
      </div>
    </Layout>
  );
};

export default Index;
