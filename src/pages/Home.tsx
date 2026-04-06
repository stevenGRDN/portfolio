import { projects, type projectsType } from "../data/projects"
import { Link } from "react-router-dom"
import styles from './home.module.css';
import { SvgSmallSS, SvgLargeSS, SvgArrow, SvgSort, SvgLine } from "../content/media/svgs";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  // const [displayProject, setDisplayProject] = useState<string | null>('project-a');
  const [displayProject, setDisplayProject] = useState<string | null>(null);
  const projectDisplay = useRef<HTMLDivElement | null>(null);
  const imgInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const projectImgs = useRef<HTMLImageElement[]>([]);
  const projectElems = useRef<HTMLElement[]>([])
  const projectContainer = useRef<HTMLDivElement | null>(null);
  const displayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canMouseOver = useRef<boolean>(false);


  useEffect(() => {

    function consoleLogFunc(){
      let projectContainerRect = projectContainer.current?.getBoundingClientRect();
      // console.log(document.documentElement.clientHeight, document.documentElement.offsetHeight, document.documentElement.scrollTop, projectContainerRect?.top, projectContainerRect?.height);
      
      // console.log(projectContainerRect?.top / )
      if(projectContainer.current && projectContainerRect && projectContainerRect.top < (document.documentElement.clientHeight / 2)){
        // Starting when half the container is in view
        canMouseOver.current = false;
        document.addEventListener('mousemove', resetCanMouseOver);



        // console.log((projectContainerRect.top - document.documentElement.clientHeight), projectContainerRect?.height);
        // console.log(Math.trunc(-((projectContainerRect.top - document.documentElement.clientHeight) + (document.documentElement.clientHeight / 2)) / (projectContainerRect?.height - (document.documentElement.clientHeight / 2)) * projects.length));
        let value = Math.trunc(-((projectContainerRect.top - document.documentElement.clientHeight) + (document.documentElement.clientHeight / 2)) / (projectContainerRect?.height - (document.documentElement.clientHeight / 2)) * projects.length);
        if(value >= projects.length) value = projects.length - 1;
        

        setDisplayProject(prevVal => {
          if(prevVal != projects[value].slug) projectImgs.current = [];
          return projects[value].slug;
        });
        projectElems.current.forEach(el => el.style.background = '#fff');

        if(displayTimeout.current){
          clearTimeout(displayTimeout.current)
          displayTimeout.current = null;
        }

        if(projectDisplay.current) projectDisplay.current.style.opacity = '1';

        projectElems.current[value].style.background = 'red';
        // console.log(projectImgs.current);
        // console.log(value, projects[value]);
      }
      else if(projectContainer.current && projectContainerRect && projectContainerRect.top > (document.documentElement.clientHeight / 2)){
        // setDisplayProject('');
        // console.log(projectContainerRect.top);
        setDisplayProjectNone();
        clearImgInterval();
        projectImgs.current = [];
      }
      
    }

    function resetCanMouseOver(e : any){
      // if(canMouseOver.current) return;
      canMouseOver.current = true;
      // console.log(e.target.parentElement);
      // console.log(e.target);

      let realTarget;

      if(e.target.parentElement?.dataset.slug) realTarget = e.target.parentElement;
      if(e.target?.dataset.slug) realTarget = e.target;

      // console.log(realTarget.dataset.slug);

      if(realTarget) setDisplayProject(realTarget.dataset.slug);
      document.removeEventListener('mousemove', resetCanMouseOver);
    }


    document.addEventListener('scroll', consoleLogFunc);
    // document.addEventListener('mousemove', resetCanMouseOver);


    return () => {
      document.removeEventListener('scroll', consoleLogFunc);
      document.removeEventListener('mousemove', resetCanMouseOver);
    }
  }, [])


  // function runFunction(e : React.MouseEvent<HTMLDivElement>){
  function runFunction(e : React.MouseEvent<HTMLAnchorElement>){
    if(!canMouseOver.current) return;

    e.currentTarget.style.background = 'red';
    console.log(e.currentTarget.dataset.slug);

    let oldProjectName = displayProject;
    let projectName = e.currentTarget.dataset.slug;
    
    if(projectName) setDisplayProject(prevVal => {
      if(!prevVal){
        setTimeout(() => {
          if(projectDisplay.current) projectDisplay.current.style.opacity = '1';
        }, 10);
      }
      return projectName;
    });

    if(projectDisplay.current) projectDisplay.current.style.opacity = '1';

    if(displayTimeout.current){
      clearTimeout(displayTimeout.current)
      displayTimeout.current = null;
    }

    // if(oldProjectName != projectName) {
    //   console.log(true)
    //   clearImgInterval();
    // }
  }

  // function leaveFunction(e : React.MouseEvent<HTMLDivElement>){
  function leaveFunction(e : React.MouseEvent<HTMLAnchorElement>){
    if(!canMouseOver.current) return;

    e.currentTarget.style.background = 'inherit';
    setDisplayProjectNone();

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

  function setDisplayProjectNone(){
    if(displayTimeout.current){
      clearTimeout(displayTimeout.current)
      displayTimeout.current = null;
    }

    if(projectDisplay.current) projectDisplay.current.style.opacity = '0.2';

    displayTimeout.current = setTimeout(() => {
      setDisplayProject('');
    }, 200);
  }

  function returnProject(){
    let currentProject = projects.find(project => project.slug == displayProject);
    // projectImgs.current = [];

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

          projectImgs.current.forEach(img => {
            img.style.opacity = '1';
            img.style.zIndex = '1';
          })

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
            <img fetchPriority={'high'} loading={'lazy'} ref={(el) => {if(el) projectImgs.current.unshift(el); projectImgsReveal()}} key={index} className={styles.coverImage} src={source} alt="" />
          ))}
        </div>
      )
    }

    return (
      <div ref={projectDisplay} className={styles.homeProjectDisplay}>
        {currentProject ? returnProjectCovers(currentProject) : ''}
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

      <div ref={projectContainer} className={styles.homeProjects}>
        {projects.map(project => (
          <Link data-slug={project.slug} onMouseEnter={(e) => runFunction(e)} onMouseLeave={(e) => leaveFunction(e)} className={styles.homeProjectLink} to={`/project/${project.slug}`}>
            {/* <div className={styles.homeProjectRow}> */}
            {/* <div ref={el => {if(el && !projectElems.current.includes(el)) projectElems.current.push(el)}} data-slug={project.slug} onMouseEnter={(e) => runFunction(e)} onMouseLeave={(e) => leaveFunction(e)} className={styles.homeProjectRow}> */}
            <div ref={el => {if(el && !projectElems.current.includes(el)) projectElems.current.push(el)}} className={styles.homeProjectRow}>
              <p>{project.title}</p>
              <SvgLine className={styles.svgLine} />
              <p className={styles.secondaryProjectText}>{project.type}</p>
              <SvgLine className={styles.svgLine} />
              <p className={styles.secondaryProjectText}>{project.date.display}</p>
            </div>
          </Link>
        ))}
        {/* {displayProject ? <div className={styles.homeProjectDisplay}>Hello</div> : ''} */}
        {displayProject ? returnProject() : ''}
      </div>

      <div className={styles.addedGap}></div>

    </div>
  )
}