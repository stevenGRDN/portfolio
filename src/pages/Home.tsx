import { projects, type projectsType } from "../data/projects"
import { Link } from "react-router-dom"
import styles from './home.module.css';
import { SvgSmallSS, SvgLargeSS, SvgArrow, SvgSort } from "../content/media/svgs";
import { useRef, useState } from "react";

export default function Home() {

  // const [displayProject, setDisplayProject] = useState<string | null>(null);
  const [displayProject, setDisplayProject] = useState<string | null>('project-a');
  const projectDisplay = useRef<HTMLDivElement | null>(null);
  const imgInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const projectImgs = useRef<HTMLImageElement[]>([]);

  function runFunction(e : React.MouseEvent<HTMLDivElement>){
    e.currentTarget.style.background = 'red';
    console.log(e.currentTarget.dataset.slug);
    let projectName = e.currentTarget.dataset.slug;
    if(projectName) setDisplayProject(projectName);

    clearImgInterval();

    // projectDisplay?.style.pointerEvents = 'none';
  }
  function leaveFunction(e : React.MouseEvent<HTMLDivElement>){
    e.currentTarget.style.background = 'inherit';
    setDisplayProject('');

    console.log(imgInterval.current);
    projectImgs.current = [];

    clearImgInterval();

  }

  function clearImgInterval(){
    if(imgInterval.current) {
      clearInterval(imgInterval.current);
      imgInterval.current = null;
    };
  }

  function returnProject(){
    let currentProject = projects.find(project => project.slug == displayProject)
    projectImgs.current = [];

    function returnProjectCovers(project : projectsType){
      let sources : string[] = [];

      project?.content.forEach(contentVal => {
        if(contentVal.type == 'cover'){
          sources.unshift(contentVal.src!)
        }
      })

      console.log(projectImgs.current);



      function projectImgsReveal(){
        if(projectImgs.current.length == sources.length && projectImgs.current.length > 1){
          console.log("running projectImgsReveal");
          let lengthVal = projectImgs.current.length - 1;
          let startVal = 0;

          clearImgInterval();
          
          imgInterval.current = setInterval(() => {
            console.log(startVal);

            if(startVal == lengthVal){
              projectImgs.current[0].style.zIndex = '0';
              projectImgs.current[0].style.opacity = '1';
            }

            projectImgs.current[startVal].style.opacity = '0';
            
            if(startVal == lengthVal){
              startVal = 0;
              projectImgs.current.forEach(img => {
                img.style.opacity = '1';
                img.style.zIndex = '1';
              })
            }
            else startVal++;

            console.log(startVal);
          }, 1200);
          
        }
      }

      return(
        <div className={styles.coverContainer}>
          {sources.map((source, index) => (
            <img loading={'lazy'} ref={(el) => {if(el) projectImgs.current.unshift(el); projectImgsReveal()}} key={index} className={styles.coverImage} src={source} alt="" />
          ))}
        </div>
      )
    }

    return (
      <div ref={projectDisplay} className={styles.homeProjectDisplay}>
        {returnProjectCovers(currentProject)}
      </div>
    )
  }

  return (
    
    <div>
      {/* <h1>Projects</h1> */}
      <div className={styles.homeHeader}>
        <SvgSmallSS className={styles.smallSS} />
        <p>STEVENS STUDIO</p>
      </div>

      <div className={styles.homeHero}>
        <SvgLargeSS className={styles.SvgLargeSS} />
        <div className={styles.homeHeroText}>
          <p>WELCOME TO</p>
          <p>STEVENS</p>
          {/* <p onMouseOver={() => {console.log(imgInterval.current); clearImgInterval()}}>STUDIO</p> */}
          <p>STUDIO</p>
        </div>
      </div>

      <div className={styles.homeCategories}>
        <div className={styles.homeCategoryLF}>
          PHOTOGRAPHY
        </div>
        <div className={styles.homeCategorySB}>
          3D
        </div>
        <div className={styles.homeCategorySF}>
          WEB/UI
        </div>
        <div className={styles.homeCategoryLB}>
          OTHER
        </div>
      </div>

      <div className={styles.homeProjectsRow}>
        <div className={styles.homeProjectsRowL}>
          <SvgArrow className={styles.SvgArrow}/>
          <p>All Projects</p>
        </div>
        <div className={styles.homeProjectsRowR}>
          <SvgSort className={styles.SvgSort}/>
          <p>date</p>
        </div>
      </div>

      <div className={styles.homeProjects}>
        {projects.map(project => (
          <Link className={styles.homeProjectLink} to={`/project/${project.slug}`}>
            <div data-slug={project.slug} onMouseEnter={(e) => runFunction(e)} onMouseLeave={(e) => leaveFunction(e)} className={styles.homeProjectRow}>
              {project.title}
            </div>
          </Link>
        ))}
        {/* {displayProject ? <div className={styles.homeProjectDisplay}>Hello</div> : ''} */}
        {displayProject ? returnProject() : ''}
      </div>

    </div>
  )
}