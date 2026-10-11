import styles from "../style";
import { discount, quick2 } from "../assets";
import GetStarted from "./GetStarted";

const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="" aria-hidden="true" className="w-[32px] h-[32px]" />
            <p className={`${styles.paragraph} ml-2`}>
              Manufacturer and exporter of dental and surgical instruments from Sialkot, Pakistan
            </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[46px] text-[33px] text-primaryNavy ss:leading-[1.2] leading-[1.2]">
            Dental &amp; Surgical Instruments Manufacturer in Sialkot, Pakistan
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        {/* <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
  
        </h1> */}
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          

          We manufacture and export dental and surgical instruments from Sialkot, Pakistan. Our range includes products for extraction, restorative dentistry, diagnostics, orthodontics, and surgical procedures.
        </p>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >

        
        <img
          src={quick2}
          alt="Dental instrument illustrations showing a tooth, braces, implant, mirror, toothbrush and dental chair"
          width="1008"
          height="712"
          loading="lazy"
          className="w-[100%] h-[100%] relative z-[5]"
        />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
