function SvgSmallSS({className} : {className: string}){
  return(
    <svg className={className} viewBox="0 0 104 67" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M66.2192 30.7344H37.2856C38.1604 15.154 50.6388 2.67557 66.2192 1.80078V30.7344Z" stroke="black" strokeWidth="3.5" strokeMiterlimit="10"/>
      <path d="M101.653 1.75C100.775 17.3307 88.2958 29.8077 72.7197 30.6826V1.75H101.653Z" stroke="black" strokeWidth="3.5" strokeMiterlimit="10"/>
      <path d="M66.2192 65.2188H37.2856C38.1604 49.6384 50.6388 37.1599 66.2192 36.2852V65.2188Z" stroke="black" strokeWidth="3.5" strokeMiterlimit="10"/>
      <path d="M101.653 36.2344C100.775 51.8151 88.2958 64.2921 72.7197 65.167V36.2344H101.653Z" stroke="black" strokeWidth="3.5" strokeMiterlimit="10"/>
      <path d="M31.3389 31.3389H1.16895C1.75826 14.9422 14.9422 1.75729 31.3389 1.16797V31.3389Z" fill="black" stroke="black" strokeWidth="2.29185" strokeMiterlimit="10"/>
      <path d="M31.3389 65.8232H1.16895C1.75826 49.4266 14.9422 36.2417 31.3389 35.6523V65.8232Z" fill="black" stroke="black" strokeWidth="2.29185" strokeMiterlimit="10"/>
      <path d="M66.8003 1.14551C66.2069 17.5425 53.0227 30.7261 36.6304 31.3154V1.14551H66.8003Z" fill="black" stroke="black" strokeWidth="2.29185" strokeMiterlimit="10"/>
      <path d="M66.8003 35.6299C66.2069 52.0268 53.0227 65.2104 36.6304 65.7998V35.6299H66.8003Z" fill="black" stroke="black" strokeWidth="2.29185" strokeMiterlimit="10"/>
    </svg>
  )
}

function SvgLargeSS({className} : {className: string}){
  return(
    <svg className={className} viewBox="0 0 207 134" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M133.438 62.4688H73.5186C74.7984 29.9566 100.926 3.82823 133.438 2.54883V62.4688Z" stroke="black"  strokeWidth="5" strokeMiterlimit="10"/>
      <path d="M204.358 2.5C203.07 35.0124 176.943 61.14 144.439 62.4199V2.5H204.358Z" stroke="black"  strokeWidth="5" strokeMiterlimit="10"/>
      <path d="M133.438 131.438H73.5186C74.7984 98.9254 100.926 72.797 133.438 71.5176V131.438Z" stroke="black"  strokeWidth="5" strokeMiterlimit="10"/>
      <path d="M204.358 71.4688C203.07 103.981 176.943 130.109 144.439 131.389V71.4688H204.358Z" stroke="black"  strokeWidth="5" strokeMiterlimit="10"/>
      <path d="M62.4697 62.4688H2.5498C3.82967 29.9566 29.9574 3.82823 62.4697 2.54883V62.4688Z" fill="black" stroke="black"  strokeWidth="5" strokeMiterlimit="10"/>
      <path d="M62.4697 131.438H2.5498C3.82967 98.9254 29.9574 72.797 62.4697 71.5176V131.438Z" fill="black" stroke="black"  strokeWidth="5" strokeMiterlimit="10"/>
      <path d="M133.39 2.5C132.102 35.0124 105.974 61.14 73.4707 62.4199V2.5H133.39Z" fill="black" stroke="black"  strokeWidth="5" strokeMiterlimit="10"/>
      <path d="M133.39 71.4688C132.102 103.981 105.974 130.109 73.4707 131.389V71.4688H133.39Z" fill="black" stroke="black"  strokeWidth="5" strokeMiterlimit="10"/>
    </svg>
  )
}

function SvgArrow({className} : {className: string}){
  return(
    <svg className={className} viewBox="0 0 52 62" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M47.8763 35.4594L26.2991 57.0366M26.2991 57.0366V20.1918V17.5C26.2991 9.76802 20.0311 3.5 12.2991 3.5H3.5M26.2991 57.0366L4.72199 35.4594" stroke="black" strokeWidth="7" strokeLinecap="round"/>
    </svg>
  )
}

function SvgSort({className} : {className: string}){
  return(
    <svg className={className} viewBox="0 0 52 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3H48.9598M3 17.4004H38.085M3 31.8008H29.1653" stroke="black" strokeWidth="5.6" strokeLinecap="round"/>
    </svg>
  )
}

export { SvgSmallSS, SvgLargeSS, SvgArrow, SvgSort }