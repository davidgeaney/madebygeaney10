import Image from "next/image";
import Link from "next/link";

const portfolioProjects = [
  {
    title: "Davidson van de ven",
    description: "Website for a freelance photographer",
    imageUrl: "/projects/classcovernew.webp",
    href: "#",
  },
  {
    title: "Strive",
    description: "Website design for a digital agency",
    imageUrl: "/projects/creacynew.webp",
    href: "#",
  },
  {
    title: "Nord studio",
    description: "Premium creative agency website",
    imageUrl: "/projects/eliraurichnew.webp",
    href: "#",
  },
  {
    title: "Verts",
    description: "Premium website for freelance photographer",
    imageUrl: "/projects/smiledublinnew.webp",
    href: "#",
  },
  {
    title: "Architects",
    description: "Website design for architecture company",
    imageUrl: "https://cdn.prod.website-files.com/68021f034c14b8b248f6438a/680261a26701da9b84bab555_Editorial-layout-16apr-final-1.webp",
    href: "#",
  },
  {
    title: "Agency",
    description: "Projects section design for creative agency",
    imageUrl: "https://cdn.prod.website-files.com/68021f034c14b8b248f6438a/680261a2d73c1649cc89ef27_Editorial-layout-16apr-final-7.webp",
    href: "#",
  },
  {
    title: "Agency",
    description: "Premium editorial design for agency website",
    imageUrl: "https://cdn.prod.website-files.com/68021f034c14b8b248f6438a/680261a273d343f8be4e7938_Editorial-layout-16apr-final-5.webp",
    href: "#",
  },
  {
    title: "Agency",
    description: "Editorial design with a focus on storytelling",
    imageUrl: "https://cdn.prod.website-files.com/68021f034c14b8b248f6438a/680261a321438028d4c5e41b_Editorial-layout-16apr-final-4.webp",
    href: "#",
  },
];

type PortfolioProject = (typeof portfolioProjects)[0];

const ProjectCard = ({ project }: { project: PortfolioProject }) => (
  <Link href={project.href} className="group block w-full relative overflow-hidden">
    <div className="relative w-full pb-[100%] rounded-2xl">
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <Image
          src={project.imageUrl}
          alt={project.title || "Portfolio project image"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <p className="text-white text-sm font-medium">{project.description}</p>
        </div>
      </div>
    </div>
  </Link>
);

const Portfolio = () => {
  // Split projects into pairs for 2-column layout
  const projectPairs = [];
  for (let i = 0; i < portfolioProjects.length; i += 2) {
    projectPairs.push(portfolioProjects.slice(i, i + 2));
  }

  return (
    <section className="bg-background relative z-10 pt-64">
      <div className="w-full max-w-none px-4">
        <div className="grid grid-cols-1 gap-0">
          {projectPairs.map((pair, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2 w-full border-t border-gray-100 last:border-b">
              {pair.map((project, projectIndex) => (
                <div key={`project-${index}-${projectIndex}`} className="w-full">
                  <div className="max-w-[1800px] mx-auto py-1">
                    <ProjectCard project={project} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
