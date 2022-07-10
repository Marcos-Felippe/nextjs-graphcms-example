import { GetServerSideProps } from "next";
import { useProjectQuery, useProjectsQuery, ProjectDocument } from "../generated/graphql";
import { client, ssrCache } from "../lib/urql";

export default function Home() {

  // Fazendo uma query de um unico project
  // Se o data já estiver sido salvo em cache, será pego sem necessidade de fazer a requisição completa
  const [{ data: project }] = useProjectQuery({
    variables:{
      slug: 'scienceproject'
    }
  });

  // Fazendo uma query de todos os projects
  const [{ data: projects }] = useProjectsQuery();

  return (
    <>
      <h1>Highlight - {project?.project?.title}</h1>
      <ul>{projects?.projects.map((p: any) => <li key={p.title}>{p.title}: {p.description}</li>)}</ul>
    </>
    
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  await client.query(ProjectDocument, { slug: 'scienceproject' }).toPromise();

  return {
    props: {
      // Colocando a query feita em cache para ser utilizada posteriormente
      urqlState: ssrCache.extractData()
    }
  }
}