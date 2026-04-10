import { Link } from "react-router-dom"
import { SvgArrow, SvgLine, SvgSmallSS } from "../content/media/svgs"
import styles from './defaultLayout.module.css';
import { useEffect, useRef } from "react";
import Lenis from "lenis";


export default function DefaultLayout({ project } : { project : any}) {

  const descriptionText = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(!descriptionText.current) return;

    const lenisDesc = new Lenis({
      wrapper: descriptionText.current, // The element that holds the scrollbar
      content: descriptionText.current, // The element that actually scrolls (usually the immediate child)
    });
    const lenis = new Lenis();

    function rafDesc(time: number) {
      lenisDesc.raf(time)
      requestAnimationFrame(rafDesc)
    }

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(rafDesc)
    requestAnimationFrame(raf)

    return () => {
      lenisDesc.destroy()
      lenis.destroy()
    }
  }, []);

  useEffect(() => {

  }, [])



    function returnCover() {
      let imgSrc = project.content.find((contentType : any) => contentType.type == 'projectCover')?.src || null;
      
      console.log(imgSrc);

      return(
        <>
          {imgSrc ? <img src={imgSrc} className={styles.imgContainer}/> : ''}
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

        <div className={styles.projectPhotoContainer}>
          
        </div>
        <div className={styles.projectScrollContainer}>

        </div>

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