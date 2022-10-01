import { apple, bill, google } from "../assets";
import styles, { layout } from "../style";

const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={bill} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Our prices are very competitive and flexible.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Seamoon industries is strongly determined to provide a dedicated service to customers that is built on foundation of quality and cost effectiveness. we are very flexible with our customers and provide maximum co-operation. our stock is always ready to be shipped to our valuable customers. we work hard to build our reputation in this evolving industry and our satisfied customers are our real strength. our company's motto is to keep customer satisfy becuase your satisfaction is our first priority
      </p>


    </div>
  </section>
);

export default Billing;
