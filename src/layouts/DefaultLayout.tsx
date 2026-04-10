import { Link } from "react-router-dom"
import { SvgArrow, SvgLine, SvgSmallSS } from "../content/media/svgs"
import styles from './defaultLayout.module.css';
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";


export default function DefaultLayout({ project } : { project : any}) {

  const descriptionText = useRef<HTMLDivElement | null>(null);
  const projectPhotoContainer = useRef<HTMLDivElement | null>(null);
  const projectScrollContainer = useRef<HTMLDivElement | null>(null);
  const photoOverScroll = useRef<boolean>(false);

  let firstDesc = project.content.find((content : any) => content.type == 'display').description || '';
  const [photoDescription, setPhotoDescription] = useState<string | null>(firstDesc);
  const projectPhotoDescription = useRef<HTMLDivElement | null>(null);




  useEffect(() => {
    if(!descriptionText.current || !projectPhotoContainer.current || !projectScrollContainer.current) return;

    let allImages = project.content.filter((image : any) => image.type == 'display');
    let allImagesAmount = allImages.length;

    const lenisDesc = new Lenis({
      wrapper: descriptionText.current, // The element that holds the scrollbar
      content: descriptionText.current, // The element that actually scrolls (usually the immediate child)
    });
    const lenisScroll = new Lenis({
      wrapper: projectScrollContainer.current, // The element that holds the scrollbar
      content: projectScrollContainer.current, // The element that actually scrolls (usually the immediate child)
    });
    const lenisPhoto = new Lenis({
      wrapper: projectPhotoContainer.current, // The element that holds the scrollbar
      content: projectPhotoContainer.current, // The element that actually scrolls (usually the immediate child)
      orientation: 'horizontal', // Key configuration [10]
      gestureOrientation: 'vertical', // Scroll vertically to move horizontally
    });
    const lenis = new Lenis();

    let rafId: number;

    function render(time: number) {
      lenisDesc.raf(time);
      lenisScroll.raf(time);
      lenisPhoto.raf(time);
      lenis.raf(time);
      rafId = requestAnimationFrame(render); // Save the ID to cancel later
    }

    // requestAnimationFrame(rafPhoto);
    // requestAnimationFrame(rafDesc);
    // requestAnimationFrame(rafScroll);
    // requestAnimationFrame(raf);

    rafId = requestAnimationFrame(render);


    lenisScroll.on('scroll', () => {
      if(projectPhotoContainer.current && !photoOverScroll.current) lenisPhoto.scrollTo(lenisScroll.progress * (allImagesAmount - 1) * (projectPhotoContainer.current?.children[0] as HTMLElement).offsetWidth);
      // let currentImage = Math.trunc(lenisPhoto.progress * (allImagesAmount - 1) + 0.4)
      // console.log(currentImage);      
    })

    lenisPhoto.on('scroll', () => {
      if(photoOverScroll.current && photoOverScroll.current) lenisScroll.scrollTo(lenisPhoto.progress * (allImagesAmount - 1) * (projectScrollContainer.current?.children[0] as HTMLElement).offsetHeight);
      let currentImage = Math.trunc(lenisPhoto.progress * (allImagesAmount - 1) + 0.45)
      // console.log(currentImage);

      if(allImages[currentImage].description == ''){
        if(projectPhotoDescription.current) projectPhotoDescription.current.style.opacity = '0';

        setTimeout(() => {
          setPhotoDescription('');
        }, 250);
      }
      else{
        if(projectPhotoDescription.current && projectPhotoDescription.current.style.opacity ==  '0') {
          setTimeout(() => {
            if(projectPhotoDescription.current) projectPhotoDescription.current.style.opacity = '0.5';
          }, 200);
        }

        setPhotoDescription(allImages[currentImage].description);
      }

    })


    lenisScroll.on('virtual-scroll', () => {
      photoOverScroll.current = false;
    })

    lenisPhoto.on('virtual-scroll', () => {
      photoOverScroll.current = true;
    })

    if (lenis) {
      // console.log();
      lenis.scrollTo(0, {immediate: false});
    } else {
      window.scrollTo(0, 0)
    }



    return () => {
      cancelAnimationFrame(rafId); // STOP the loop

      lenisScroll.destroy();
      lenisPhoto.destroy();
      lenisDesc.destroy();
      lenis.destroy();
    }
  }, []);

  useEffect(() => {
    // if(!projectPhotoContainer.current || !projectScrollContainer.current) return;

    const setOverScrollTrue = () => photoOverScroll.current = true;
    const setOverScrollFalse = () => photoOverScroll.current = false;
    

    projectPhotoContainer.current?.addEventListener('pointerdown', setOverScrollTrue);
    projectScrollContainer.current?.addEventListener('pointerdown', setOverScrollFalse);

    return () => {
      projectPhotoContainer.current?.removeEventListener('pointerdown', setOverScrollTrue);
      projectScrollContainer.current?.removeEventListener('pointerdown', setOverScrollFalse);
    }
  }, [])

  useEffect(() => {
    // if(photoDescription && projectPhotoDescription.current) projectPhotoDescription.current.style.opacity = '0.5';
    // if(!photoDescription && projectPhotoDescription.current) projectPhotoDescription.current.style.opacity = '0';
  }, [photoDescription]);



  function returnCover() {
    let imgSrc = project.content.find((contentType : any) => contentType.type == 'projectCover')?.src || null;
    
    // console.log(imgSrc);

    return(
      <>
        {imgSrc ? <img fetchPriority={'high'} src={imgSrc} className={styles.imgContainer}/> : ''}
      </>
    )
  }

  function returnPhotos(){
    let allImages = project.content.filter((image : any) => image.type == 'display');
    
    return(
      <>
        {allImages.map((value : any, index : number) => (
          <div key={index} className={styles.projectPhoto}>
            <img fetchPriority={'high'} src={value.src} />

          </div>
        ))}
      </>
    )
  }

  function returnScrolls(){
    let allImages = project.content.filter((image : any) => image.type == 'display');
    
    return(
      <>
          <div className={styles.projectScroll}></div>
          <div className={styles.projectScroll}></div>
        {allImages.map((value : any, index : number) => (
          <div key={index} className={styles.projectScroll}>
            <div className={styles.projectScrollImgContainer}>
              <img fetchPriority={'high'} src={value.src} />
            </div>
          </div>
        ))}
          <div className={styles.projectScroll}></div>
          <div className={styles.projectScroll}></div>
      </>
    )
  }



  return (
    <>
      <div className={styles.homeHeader}>
        <Link to={`/`}>
          <SvgSmallSS className={styles.smallSS} />
          <p>STEVENS STUDIO</p>
        </Link>
      </div>
      
      <div className={styles.mainContainer}>
        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionTitle}>{project.title}</p>
          <p className={styles.descriptionType}>{project.type}</p>

          <div ref={descriptionText} className={styles.descriptionText}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. <br /><br />
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. <br /><br />
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. <br /><br />
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. <br /><br />
            <div className={styles.descriptionTextOverlay}></div>
          </div>
        </div>
        <div className={styles.coverContainer}>
          <div className={styles.coverOuter}>
            <div className={styles.coverInner}>
              {returnCover()}
              <div className={styles.projectDetails}>
                <span>{project.title}</span>
                <SvgLine className={styles.svgLineDetails} />
                <span className={styles.projectDetailsText}>{project.type}</span>
                <SvgLine className={styles.svgLineDetails} />
                <span className={styles.projectDetailsText}>{project.date.display}</span>
                <SvgLine className={styles.svgLineDetails} />
                {project?.extras ? project.extras.map((value : string, index : number) => (
                  <span key={index}>
                    <span className={styles.projectDetailsText}>{value}</span>
                    <SvgLine key={"svg" + index} className={styles.svgLineDetails} />
                  </span>
                )) : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.projectsPhotosText}>
        <SvgArrow className={styles.SvgArrow}/>
        <p>Project Photos</p>
      </div>

      <div className={styles.projectPhotoFlexContainer}>

        <div ref={projectPhotoContainer} className={styles.projectPhotoContainer}>
          {returnPhotos()}
        </div>
        <div ref={projectScrollContainer} className={styles.projectScrollContainer}>
          {returnScrolls()}
        </div>
        <div ref={projectPhotoDescription} className={styles.projectPhotoDescription}>{photoDescription}</div>

      </div>
      {/* {project.content.map((block : any, i : number) => {
        if (block.type === "text") {
          return <p key={i}>{block.text}</p>
        }
        return null
      })} */}
    </>
  )
}