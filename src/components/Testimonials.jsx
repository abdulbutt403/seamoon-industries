import { feedback } from "../constants";
import styles from "../style";
import FeedbackCard from "./FeedbackCard";

const Testimonials = () => (
  <section class="testimonial-section" style={{overflow: 'auto'}}>
		<div class="large-container">
			<div class="sec-title">
     < h2 className={styles.heading2}>What clients are saying about us</h2>
			
			</div>

			<div class="testimonial-carousel owl-carousel owl-theme">
				
				<div class="testimonial-block">
					<div class="inner-box bg-primary">
						<div class="text">We have a great relation with Seamoon industries from past 10 years , there products are high in quality and the prices are highy competitive we would definately work with seamoon for long, If anyone is looking to buy good dental or surgical instruments, I can definately recommend seamoon industries to them</div>
						<div class="info-box">
							<div class="thumb"><img src="http://t.commonsupport.com/adro/images/resource/thumb-1.jpg" alt=""/></div>
							<h4 class="name">Mahfuz Riad</h4>
							<span class="designation">Deals in surgical instruments</span>
						</div>
					</div>
				</div>

			
			</div>

			<div class="thumb-layer paroller">
				<figure class="image"><img src="http://t.commonsupport.com/adro/images/resource/user-thumbs.png" alt=""/></figure>
			</div>
		</div>
	</section>
)

export default Testimonials;
