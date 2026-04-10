import { otherProjects, photographyProjects, projects, projects3D, webProjects, type projectsType } from "../data/projects"
import { Link } from "react-router-dom"
import styles from './home.module.css';
import { SvgSmallSS, SvgArrow, SvgSort, SvgLine } from "../content/media/svgs";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

export default function Category({ projectType } : {projectType: string}) {

  // const [displayProject, setDisplayProject] = useState<string | null>('project-a');
  const [displayProject, setDisplayProject] = useState<string | null>(null);
  const projectDisplay = useRef<HTMLDivElement | null>(null);
  const imgInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const projectImgs = useRef<HTMLImageElement[]>([]);
  const projectElems = useRef<HTMLElement[]>([])
  const projectContainer = useRef<HTMLDivElement | null>(null);
  const displayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canMouseOver = useRef<boolean>(false);
  const continueScroll = useRef<boolean>(true);

  const currentProjects = useRef<projectsType[]>([]);
  const [currentProjectsArray, setCurrentProjectsArray] = useState<projectsType[]>([]);

  useEffect(() => {
    if(projectType == 'photography') {
      currentProjects.current = photographyProjects;
      setCurrentProjectsArray(photographyProjects);
    }

    if(projectType == 'web') {
      currentProjects.current = webProjects;
      setCurrentProjectsArray(webProjects);
    }

    if(projectType == '3d') {
      currentProjects.current = projects3D;
      setCurrentProjectsArray(projects3D);
    }

    if(projectType == 'other') {
      currentProjects.current = otherProjects;
      setCurrentProjectsArray(otherProjects);
    }
  }, [])

  useEffect(() => {

    function scrollFunc(){
      // console.log(continueScroll.current);
      if(currentProjects.current.length == 0) return;

      if(!continueScroll.current) return;
      let projectContainerRect = projectContainer.current?.getBoundingClientRect();
      // console.log(document.documentElement.clientHeight, document.documentElement.offsetHeight, document.documentElement.scrollTop, projectContainerRect?.top, projectContainerRect?.height);
      
      // console.log(projectContainerRect?.top / )

      if(projectContainer.current && projectContainerRect && projectContainerRect.top < (document.documentElement.clientHeight / 2)){
        // Starting when half the container is in view
        canMouseOver.current = false;


        let scrollMultiplier = 0.2 * ((document.documentElement.clientHeight - 350) / (630 - 350));
        // scrollMultiplier = 1.3 - scrollMultiplier;
        if(scrollMultiplier > 0.2) scrollMultiplier = 0.2;
        if(scrollMultiplier < 0) scrollMultiplier = 0;

        scrollMultiplier = 1.1 + scrollMultiplier;
        


        // console.log((projectContainerRect.top - document.documentElement.clientHeight), projectContainerRect?.height);
        // console.log(Math.trunc(-((projectContainerRect.top - document.documentElement.clientHeight) + (document.documentElement.clientHeight / 2)) / (projectContainerRect?.height - (document.documentElement.clientHeight / 2)) * currentProjects.current.length));
        let value = Math.trunc(-((projectContainerRect.top - document.documentElement.clientHeight) + (document.documentElement.clientHeight / 2)) / (projectContainerRect?.height * scrollMultiplier - (document.documentElement.clientHeight / 2)) * currentProjects.current.length);
        if(value >= currentProjects.current.length) value = currentProjects.current.length - 1;
        

        setDisplayProject(prevVal => {
          if(prevVal != currentProjects.current[value].slug) projectImgs.current = [];
          return currentProjects.current[value].slug;
        });
        
        resetElemStyling();

        if(displayTimeout.current){
          clearTimeout(displayTimeout.current)
          displayTimeout.current = null;
        }

        if(projectDisplay.current) projectDisplay.current.style.opacity = '1';

        // projectElems.current[value].style.background = 'red';
        setElemStyling(projectElems.current[value]);
        // console.log(projectImgs.current);
        // console.log(value, currentProjects.current[value]);
      }
      else if(projectContainer.current && projectContainerRect && projectContainerRect.top > (document.documentElement.clientHeight / 2)){
        // setDisplayProject('');
        // console.log(projectContainerRect.top);
        resetElemStyling();

        setDisplayProjectNone();
        clearImgInterval();
        projectImgs.current = [];
      }
      
    }

    function resetCanMouseOver(e : any){
      // if(canMouseOver.current) return;
      canMouseOver.current = true;
      continueScroll.current = false;
      // console.log(e.target.parentElement);
      // console.log(e.target);

      let realTarget;

      if(e.target.parentElement?.dataset.slug) realTarget = e.target.parentElement;
      if(e.target?.dataset.slug) realTarget = e.target;

      if(!realTarget) return;

      resetElemStyling();
      if(realTarget.children[0]) setElemStyling(realTarget.children[0]);


      // console.log(realTarget.dataset.slug);

      if(realTarget) setDisplayProject(realTarget.dataset.slug);
      // document.removeEventListener('mousemove', resetCanMouseOver);
    }

    function continueScrollTrue(){
      if(!continueScroll.current) continueScroll.current = true;
    }


    document.addEventListener('scroll', scrollFunc);
    document.addEventListener('pointerdown', continueScrollTrue)
    document.addEventListener('mousemove', resetCanMouseOver);

    // document.addEventListener('mousemove', resetCanMouseOver);


    return () => {
      document.removeEventListener('scroll', scrollFunc);
      document.removeEventListener('mousemove', resetCanMouseOver);
      document.removeEventListener('pointerdown', continueScrollTrue)

    }
  }, []);

  // useEffect(() => {

  //   const observer = new IntersectionObserver(entries => {
  //     if(entries[0].isIntersecting){
  //       // console.log("AAAH");
  //       let val = 0.1;
  //       [...homeCategories.current!.children].forEach(child => {
  //         (child as HTMLElement).style.animation = `displayCategories 0.5s ease ${val}s both`;
  //         val += 0.05;
  //       })
  //     }
  //   })

  //   observer.observe(homeCategories.current!);

  // }, []);

  useEffect(() => {
    const lenis = new Lenis({lerp: 0.1});

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    lenis.on("virtual-scroll", () => {
      if (!continueScroll.current) continueScroll.current = true;
      // console.log("USER is scrolling", e)
    })

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, []);

  function returnCategoryText(){

    if(projectType == 'photography') return(<div className={styles.photographyText}><p>PHOTOGRAPHY</p><p>PROJECTS</p></div>);
    if(projectType == 'web') return(<div className={styles.webText}><p>WEB / UI</p><p>PROJECTS</p></div>);
    if(projectType == '3d') return(<><p>3D</p><p>PROJECTS</p></>);
    if(projectType == 'other') return(<><p>OTHER</p><p>PROJECTS</p></>);

  }

  function setElemStyling(divElem : HTMLElement){
    divElem.style.background = '#000';
    divElem.style.color = '#fff';
    divElem.querySelectorAll('svg').forEach(svg => {
      (svg.children[0] as SVGElement).style.stroke = '#fff';
    })
  }

  function resetElemStyling(){
    projectElems.current.forEach(el => {
      el.style.background = '#fff'
      el.style.color = '#000'
      el.querySelectorAll('svg').forEach(svg => {
        (svg.children[0] as SVGElement).style.stroke = '#000';
      })
    });
  }


  // function runFunction(e : React.MouseEvent<HTMLDivElement>){
  function runFunction(e : React.MouseEvent<HTMLAnchorElement>){
    if(!canMouseOver.current) return;

    // e.currentTarget.style.background = 'red';
    resetElemStyling();

    setElemStyling((e.currentTarget.children[0] as HTMLElement));

    console.log(e.currentTarget.dataset.slug);

    // let oldProjectName = displayProject;
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

    resetElemStyling();

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

    if(projectDisplay.current) projectDisplay.current.style.opacity = '0';

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
            // console.log(startVal);

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

            // console.log(startVal);
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

        <div className={styles.projectDetails}>
          <span>{currentProject?.title}</span>
          <SvgLine className={styles.svgLineDetails} />
          <span className={styles.projectDetailsText}>{currentProject?.type}</span>
          <SvgLine className={styles.svgLineDetails} />
          <span className={styles.projectDetailsText}>{currentProject?.date.display}</span>
          <SvgLine className={styles.svgLineDetails} />
          {currentProject?.extras ? currentProject.extras.map((value, index) => (
            <span key={index}>
              <span className={styles.projectDetailsText}>{value}</span>
              <SvgLine key={"svg" + index} className={styles.svgLineDetails} />
            </span>
          )) : ''}
        </div>

      </div>
    )
  }

  return (
    
    <div>
      {/* <h1>Projects</h1> */}
      <div className={styles.homeHeader}>
        <Link to={`/`}>
          <SvgSmallSS className={styles.smallSS} />
          <p>STEVENS STUDIO</p>
        </Link>
      </div>

      <div className={styles.categoryHero}>
        <div className={styles.categoryHeroText}>
          {returnCategoryText()}
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
        {currentProjectsArray.map((project, index) => (
          <Link key={index} data-slug={project.slug} onMouseEnter={(e) => runFunction(e)} onMouseLeave={(e) => leaveFunction(e)} className={styles.homeProjectLink} to={`/project/${project.slug}`}>
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