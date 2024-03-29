import type { NextPage, GetStaticProps } from "next";
import { Layout } from "../../../components/Layout";
import { Seo } from "../../../components/Seo";
import { PageHeader } from "../../../components/PageHeader";
import { PageTitle } from "../../../components/PageTitle";
import { ProjectSelector } from "../../../components/ProjectSelector";
import { projects } from "../../../lib/projects";
import { ProjectComparison } from "../../../components/ProjectComparison";
import { useProjectData } from "../../../hooks/useProjectData";
import { ProjectData } from "../../../types/d.project";

type ProjectPath = {
  "project-a": string;
  "project-b": string;
};

type Path = {
  params: ProjectPath;
};

export const getStaticPaths = async () => {
  const paths: Path[] = [];
  projects.forEach((projectA) => {
    projects.forEach((projectB) => {
      paths.push({
        params: {
          "project-a": projectA.address,
          "project-b": projectB.address,
        },
      });
    });
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectA = projects.find(
    (project) => project.address === params?.["project-a"]
  );

  const projectB = projects.find(
    (project) => project.address === params?.["project-b"]
  );

  const notFound = !projectA || !projectB;

  return {
    props: {
      projectA,
      projectB,
    },
    notFound,
  };
};

type Project = {
  name: string;
  address: string;
};
interface IndexProps {
  projectA: Project;
  projectB: Project;
}

const Index: NextPage<IndexProps> = ({
  projectA = {} as Project,
  projectB = {} as Project,
}) => {
  const { projectData: projectAData, loading: projectALoading } =
    useProjectData(projectA?.address);

  const { projectData: projectBData, loading: projectBLoading } =
    useProjectData(projectB?.address);

  return (
    <Layout>
      <Seo
        title={`Compare ${projectA?.name} with ${projectB?.name} | Data by Origin Protocol`}
        ogTitle={`Compare ${projectA?.name} with ${projectB?.name}`}
        description={`See how your ${projectA?.name} and ${projectB?.name} are doing and make informed buying decisions with side-by-side project data`}
        contractA={projectA?.address}
        contractB={projectB?.address}
      />
      <PageHeader>
        <PageTitle>
          Comparing {projectA?.name} with {projectB?.name}
        </PageTitle>
      </PageHeader>
      <div className="mt-8">
        <ProjectSelector
          projectAValue={projectA?.name}
          projectBValue={projectB?.name}
        />
      </div>
      <div className="mt-8">
        <ProjectComparison
          projectAData={projectAData}
          projectALoading={projectALoading}
          projectBData={projectBData}
          projectBLoading={projectBLoading}
          projectAName={projectA?.name}
          projectBName={projectB?.name}
        />
      </div>
    </Layout>
  );
};

export default Index;
